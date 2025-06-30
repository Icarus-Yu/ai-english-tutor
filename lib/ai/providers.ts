import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
// 关键修正：导入 createOpenAI 工厂函数
import { createOpenAI } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

// 1. 定义您的讯飞星火密钥
const SPARK_API_PASSWORD = 'NDnjQUDTYlWsdDfZgyen:plgXohdmeSXouLyCzNkZ';

// 2. 使用 createOpenAI 创建一个专门用于连接讯飞的实例
const spark = createOpenAI({
  baseURL: 'https://spark-api-open.xf-yun.com/v1', // 讯飞的OpenAI兼容地址
  apiKey: SPARK_API_PASSWORD, // 将您的完整 APIPassword 作为 apiKey
  // 你可以在这里添加额外的请求头，如果需要的话
  headers: {
    // 例如: 'X-Custom-Header': 'value'
  },
});

export const myProvider = isTestEnvironment
  ? customProvider({
      // 测试环境配置保持不变
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        // 您原有的 xai 模型保持不变
        'chat-model': xai('grok-2-vision-1212'),
        'chat-model-reasoning': wrapLanguageModel({
          model: xai('grok-3-mini-beta'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model':  spark('4.0Ultra'),
        'artifact-model':spark('4.0Ultra'),

        // 3. 在这里使用我们刚刚创建的 spark 实例
        'spark-4.0-ultra': spark('4.0Ultra'),
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
