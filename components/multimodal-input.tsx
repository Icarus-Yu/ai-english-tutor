'use client';

import type { Attachment, UIMessage } from 'ai';
import cx from 'classnames';
import type React from 'react';
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  memo,
} from 'react';
import { toast } from '@/components/toast';
import { useLocalStorage, useWindowSize } from 'usehooks-ts';

import { ArrowUpIcon, MicrophoneIcon, PaperclipIcon, StopIcon } from './icons';
import { PreviewAttachment } from './preview-attachment';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { SuggestedActions } from './suggested-actions';
import equal from 'fast-deep-equal';
import type { UseChatHelpers } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import type { VisibilityType } from './visibility-selector';

type DialogueState = 'idle' | 'recording' | 'transcribing' | 'thinking' | 'speaking';

function PureMultimodalInput({
  chatId,
  input,
  setInput,
  status,
  stop,
  attachments,
  setAttachments,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
  selectedVisibilityType,
}: {
  chatId: string;
  input: UseChatHelpers['input'];
  setInput: UseChatHelpers['setInput'];
  status: UseChatHelpers['status'];
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers['setMessages'];
  append: UseChatHelpers['append'];
  handleSubmit: UseChatHelpers['handleSubmit'];
  className?: string;
  selectedVisibilityType: VisibilityType;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [dialogueState, setDialogueState] = useState<DialogueState>('idle');

  useEffect(() => {
    if (textareaRef.current) adjustHeight();
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '98px';
    }
  };

  const [localStorageInput, setLocalStorageInput] = useLocalStorage('input', '');

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      const finalValue = domValue || localStorageInput || '';
      setInput(finalValue);
      adjustHeight();
    }
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  const submitForm = useCallback(() => {
    window.history.replaceState({}, '', `/chat/${chatId}`);
    handleSubmit(undefined, { experimental_attachments: attachments });
    setAttachments([]);
    setLocalStorageInput('');
    resetHeight();
    if (width && width > 768) textareaRef.current?.focus();
  }, [attachments, handleSubmit, setAttachments, setLocalStorageInput, width, chatId]);

  const sendAudioToBackend = async (audioBlob: Blob) => {
    setDialogueState('transcribing');
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try {
      const response = await fetch('http://localhost:5000/api/transcribe', { method: 'POST', body: formData });
      const result = await response.json();

      if (response.ok && result.success && result.text) {
        append({ role: 'user', content: result.text });
        setAttachments([]);
        setInput('');
      } else {
        const errorMessage = result.error || '什么都没有识别到，请再试一次。';
        toast({ type: 'error', description: errorMessage });
      }
    } catch (error) {
      toast({ type: 'error', description: '无法连接到语音服务，请检查后端是否运行。' });
    } finally {
      setDialogueState('idle');
    }
  };

  const handleMicClick = () => {
    if (dialogueState === 'idle') {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
          mediaRecorderRef.current = newMediaRecorder;
          audioChunksRef.current = [];
          newMediaRecorder.ondataavailable = event => audioChunksRef.current.push(event.data);
          newMediaRecorder.onstart = () => setDialogueState('recording');
          newMediaRecorder.start();
        }).catch(() => toast({ type: 'error', description: '无法访问麦克风，请检查权限。' }));
    } else if (dialogueState === 'recording') {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            if (audioBlob.size > 1000) { // 简单检查一下不是完全空的
                sendAudioToBackend(audioBlob);
            } else {
                toast({ type: 'error', description: '录音太短了，请再说一次。' });
                setDialogueState('idle');
            }
        };
        mediaRecorderRef.current.stop();
      }
    }
  };

  // ... (剩余的组件渲染逻辑不变) ...
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch('/api/files/upload', { method: 'POST', body: formData, });
        if (response.ok) {
            const data = await response.json();
            return { url: data.url, name: data.pathname, contentType: data.contentType, };
        }
        const { error } = await response.json();
        toast.error(error);
    } catch (error) {
        toast.error('Failed to upload file, please try again!');
    }
  };
  const handleFileChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadQueue(files.map((file) => file.name));
    try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter((attachment) => attachment !== undefined);
        setAttachments((currentAttachments) => [...currentAttachments, ...successfullyUploadedAttachments,]);
    } catch (error) {
        console.error('Error uploading files!', error);
    } finally {
        setUploadQueue([]);
    }
  }, [setAttachments]);
  const { isAtBottom, scrollToBottom } = useScrollToBottom();
  useEffect(() => {
    if (status === 'submitted') {
        scrollToBottom();
    }
  }, [status, scrollToBottom]);
  const isRecording = dialogueState === 'recording';
  const isProcessingAudio = dialogueState === 'recording' || dialogueState === 'transcribing';

  return (
    <div className="relative w-full flex flex-col gap-4">
      <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute left-1/2 bottom-28 -translate-x-1/2 z-50"
          >
            <Button
              data-testid="scroll-to-bottom-button"
              className="rounded-full"
              size="icon"
              variant="outline"
              onClick={(event) => { event.preventDefault(); scrollToBottom(); }}
            >
              <ArrowDown />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {messages.length === 0 && attachments.length === 0 && uploadQueue.length === 0 && (
          <SuggestedActions append={append} chatId={chatId} selectedVisibilityType={selectedVisibilityType} />
      )}
      <input type="file" className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none" ref={fileInputRef} multiple onChange={handleFileChange} tabIndex={-1} />
      {(attachments.length > 0 || uploadQueue.length > 0) && (
        <div data-testid="attachments-preview" className="flex flex-row gap-2 overflow-x-scroll items-end">
          {attachments.map((attachment) => (<PreviewAttachment key={attachment.url} attachment={attachment} />))}
          {uploadQueue.map((filename) => (<PreviewAttachment key={filename} attachment={{ url: '', name: filename, contentType: '', }} isUploading={true} />))}
        </div>
      )}
      <Textarea
        data-testid="multimodal-input"
        ref={textareaRef}
        placeholder={
          dialogueState === 'recording' ? '正在录音...' :
          dialogueState === 'transcribing' ? '正在识别...' :
          '发送消息...'
        }
        value={input}
        onChange={handleInput}
        className={cx('min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700', className)}
        rows={2}
        autoFocus
        disabled={isProcessingAudio}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            if (status !== 'ready') {
              toast.error('Please wait for the model to finish its response!');
            } else {
              submitForm();
            }
          }
        }}
      />
      <div className="absolute bottom-0 p-2 w-fit flex flex-row justify-start">
        <AttachmentsButton fileInputRef={fileInputRef} status={status} />
      </div>
      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row items-center gap-2">
        <Button
          type="button"
          className={cx('rounded-full p-1.5 h-fit border dark:border-zinc-600', {
            'bg-red-500 hover:bg-red-600 text-white': isRecording,
            'animate-pulse': dialogueState === 'transcribing'
          })}
          onClick={handleMicClick}
          disabled={status !== 'ready' && !isRecording}
        >
          {isRecording ? <StopIcon size={14} /> : <MicrophoneIcon size={14} />}
        </Button>
        {status === 'submitted' ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
          <SendButton input={input} submitForm={submitForm} uploadQueue={uploadQueue} disabled={isProcessingAudio} />
        )}
      </div>
    </div>
  );
}

// ... (memo 和其他子组件保持不变) ...
export const MultimodalInput = memo(PureMultimodalInput, (prevProps, nextProps) => {
    if (prevProps.input !== nextProps.input) return false;
    if (prevProps.status !== nextProps.status) return false;
    if (!equal(prevProps.attachments, nextProps.attachments)) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) return false;
    if (prevProps.dialogueState !== nextProps.dialogueState) return false;
    return true;
});
function PureAttachmentsButton({ fileInputRef, status,}: { fileInputRef: React.MutableRefObject<HTMLInputElement | null>; status: UseChatHelpers['status']; }) {
    return (<Button data-testid="attachments-button" className="rounded-md rounded-bl-lg p-[7px] h-fit dark:border-zinc-700 hover:dark:bg-zinc-900 hover:bg-zinc-200" onClick={(event) => { event.preventDefault(); fileInputRef.current?.click(); }} disabled={status !== 'ready'} variant="ghost"> <PaperclipIcon size={14} /> </Button>);
}
const AttachmentsButton = memo(PureAttachmentsButton);
function PureStopButton({ stop, setMessages,}: { stop: () => void; setMessages: UseChatHelpers['setMessages']; }) {
    return (<Button data-testid="stop-button" className="rounded-full p-1.5 h-fit border dark:border-zinc-600" onClick={(event) => { event.preventDefault(); stop(); setMessages((messages) => messages); }}> <StopIcon size={14} /> </Button>);
}
const StopButton = memo(PureStopButton);
function PureSendButton({ submitForm, input, uploadQueue, disabled,}: { submitForm: () => void; input: string; uploadQueue: Array<string>; disabled: boolean; }) {
    return (<Button data-testid="send-button" className="rounded-full p-1.5 h-fit border dark:border-zinc-600" onClick={(event) => { event.preventDefault(); submitForm(); }} disabled={disabled || input.length === 0 || uploadQueue.length > 0}> <ArrowUpIcon size={14} /> </Button>);
}
const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
    if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length) return false;
    if (prevProps.input !== nextProps.input) return false;
    if (prevProps.disabled !== nextProps.disabled) return false;
    return true;
});
