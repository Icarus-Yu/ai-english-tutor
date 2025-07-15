'use client';
import { useState } from 'react';
import Link from 'next/link';
import { auth } from '../(auth)/auth';
import {
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaPlus,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { toast } from '@/components/toast';

export default function PlanPage() {
  // 邮箱（可替换为session）
  const email = '2649643365@qq.com';
  const emailWidth = Math.max(120, Math.min(260, email.length * 12 + 40));

  // 学习目标设置
  const [dailyGoal, setDailyGoal] = useState(45);
  const [weeklyGoal, setWeeklyGoal] = useState(300);

  // 学习目标列表（示例）
  const [targets, setTargets] = useState([
    {
      title: '完成新概念英语第一册',
      tag: '教材学习',
      percent: 65,
      date: '2024-06-30',
      desc: '系统学习基础英语知识。',
    },
    {
      title: '掌握500个核心词汇',
      tag: '词汇积累',
      percent: 80,
      date: '2024-04-15',
      desc: '通过AI对话练习巩固记忆。',
    },
    {
      title: '提升口语表达能力',
      tag: '口语练习',
      percent: 45,
      date: '2024-05-20',
      desc: '每日AI对话打卡15分钟。',
    },
  ]);
  // 添加目标表单显示状态
  const [showAddTarget, setShowAddTarget] = useState(false);
  // 新目标表单内容
  const [newTarget, setNewTarget] = useState({
    title: '',
    tag: '',
    percent: 0,
    date: '',
    desc: '',
  });

  // 每周计划（7天，每天可开关/切换内容）
  const weekPlanInit = [
    { day: '周一', enabled: true, subject: '语法练习', time: '30分钟' },
    { day: '周二', enabled: true, subject: '词汇学习', time: '45分钟' },
    { day: '周三', enabled: true, subject: '听力训练', time: '30分钟' },
    { day: '周四', enabled: true, subject: '口语训练', time: '30分钟' },
    { day: '周五', enabled: true, subject: '阅读训练', time: '60分钟' },
    { day: '周六', enabled: false, subject: '综合复习', time: '30分钟' },
    { day: '周日', enabled: false, subject: '写作练习', time: '30分钟' },
  ];
  const [weekPlan, setWeekPlan] = useState(weekPlanInit);

  // 提醒设置
  const [remindDaily, setRemindDaily] = useState(true);
  const [remindTime, setRemindTime] = useState('19:00');
  const [remindPush, setRemindPush] = useState(false);
  const [remindGoal, setRemindGoal] = useState(true);
  const [remindParent, setRemindParent] = useState(true);

  // 计划概览
  const activeDays = weekPlan.filter((d) => d.enabled).length;
  const totalMinutes = weekPlan
    .filter((d) => d.enabled)
    .reduce((sum, d) => sum + Number.parseInt(d.time), 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 font-sans text-[15px]">
      {/* 顶部导航 */}
      <header className="flex items-center px-8 py-6 bg-white/80 backdrop-blur-sm border-b border-yellow-100 sticky top-0 z-50 justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center group">
            <button
              type="button"
              className="flex items-center justify-center rounded-full bg-amber-500 text-white hover:bg-orange-500 p-2 mr-3 shadow-md transition"
              title="返回学习中心"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-lg font-bold text-amber-600 group-hover:underline">
              返回学习中心
            </span>
          </Link>
        </div>
        <div className="flex-1 text-center text-2xl font-extrabold text-gray-800 tracking-tight">
          学习计划
        </div>
        <span
          className="flex items-center justify-center rounded-full bg-yellow-100 text-amber-700 font-semibold transition text-base px-4 py-2 select-none"
          style={{ minWidth: emailWidth, maxWidth: 260 }}
        >
          {email}
        </span>
      </header>

      <main className="flex flex-col items-center w-full px-2 md:px-4 py-2 md:py-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主内容 */}
          <div className="col-span-2 flex flex-col gap-8">
            {/* 学习目标设置 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-yellow-100 mb-2">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M4 19.5A2.25 2.25 0 0 0 6.25 21h11.5A2.25 2.25 0 0 0 20 19.5V5.25A2.25 2.25 0 0 0 17.75 3H6.25A2.25 2.25 0 0 0 4 5.25V19.5z" />
                </svg>
                <div className="text-lg font-bold text-gray-800 tracking-tight">
                  学习目标设置
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="w-36 text-amber-600 font-semibold text-sm">
                    每日学习目标（分钟）
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={300}
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="w-28 px-3 py-2 rounded-lg border border-yellow-200 text-gray-800 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-36 text-amber-600 font-semibold text-sm">
                    每周学习目标（分钟）
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={2000}
                    value={weeklyGoal}
                    onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                    className="w-28 px-3 py-2 rounded-lg border border-yellow-200 text-gray-800 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base"
                  />
                </div>
                <div className="text-xs text-amber-400 mt-2">
                  建议每日30-60分钟，每周不少于5天
                </div>
              </div>
            </div>
            {/* 学习目标列表 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-amber-100 mb-2">
              <div className="flex items-center gap-2 mb-4">
                <FaPlus className="text-orange-500 text-base" />
                <div className="text-lg font-bold text-gray-800 tracking-tight">
                  学习目标
                </div>
                <button
                  type="button"
                  className="ml-auto flex items-center gap-1 px-3 py-1 rounded bg-orange-100 text-orange-600 font-semibold hover:bg-orange-200 transition text-xs"
                  onClick={() => setShowAddTarget(true)}
                >
                  <FaPlus className="text-orange-500" /> 添加目标
                </button>
              </div>
              {/* 添加目标表单 */}
              {showAddTarget && (
                <div className="mb-4 p-4 rounded-xl bg-orange-50 border border-orange-200 flex flex-col gap-2">
                  <input
                    className="border rounded px-2 py-1"
                    placeholder="目标标题"
                    value={newTarget.title}
                    onChange={(e) =>
                      setNewTarget({ ...newTarget, title: e.target.value })
                    }
                  />
                  <input
                    className="border rounded px-2 py-1"
                    placeholder="标签"
                    value={newTarget.tag}
                    onChange={(e) =>
                      setNewTarget({ ...newTarget, tag: e.target.value })
                    }
                  />
                  <input
                    className="border rounded px-2 py-1"
                    placeholder="进度（0-100）"
                    type="number"
                    min={0}
                    max={100}
                    value={newTarget.percent}
                    onChange={(e) =>
                      setNewTarget({
                        ...newTarget,
                        percent: Number(e.target.value),
                      })
                    }
                  />
                  <input
                    className="border rounded px-2 py-1"
                    placeholder="目标日期"
                    type="date"
                    value={newTarget.date}
                    onChange={(e) =>
                      setNewTarget({ ...newTarget, date: e.target.value })
                    }
                  />
                  <input
                    className="border rounded px-2 py-1"
                    placeholder="描述"
                    value={newTarget.desc}
                    onChange={(e) =>
                      setNewTarget({ ...newTarget, desc: e.target.value })
                    }
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      className="px-4 py-1 rounded bg-amber-500 text-white"
                      onClick={() => {
                        if (!newTarget.title || !newTarget.date) {
                          toast({
                            type: 'error',
                            description: '请填写标题和日期',
                          });
                          return;
                        }
                        setTargets([...targets, newTarget]);
                        setNewTarget({
                          title: '',
                          tag: '',
                          percent: 0,
                          date: '',
                          desc: '',
                        });
                        setShowAddTarget(false);
                      }}
                    >
                      添加
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 rounded bg-gray-200"
                      onClick={() => setShowAddTarget(false)}
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-6">
                {targets.map((item, idx) => (
                  <div
                    key={`${item.title}-${item.date}`}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-orange-600 text-base">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded font-semibold">
                          {item.tag}
                        </span>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-orange-100 transition"
                        >
                          <FaEdit className="text-orange-500 text-sm" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-red-100 transition"
                          onClick={() => {
                            setTargets(targets.filter((_, i) => i !== idx));
                          }}
                        >
                          <FaTrash className="text-red-500 text-sm" />
                        </button>
                      </div>
                    </div>
                    <div className="text-gray-600 text-xs mb-1">
                      {item.desc}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-yellow-100 rounded-full">
                        <div
                          className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-orange-600 font-bold ml-2">
                        {item.percent}%
                      </span>
                      <span className="text-xs text-amber-400 ml-2">
                        目标日期：{item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 每周计划 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-orange-100 mb-2">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 6v6l4 2" />
                </svg>
                <div className="text-lg font-bold text-gray-800 tracking-tight">
                  每周计划
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {weekPlan.map((item, idx) => (
                  <div
                    key={item.day}
                    className={`flex items-center gap-4 rounded-lg px-4 py-2 transition border ${item.enabled ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <button
                      type="button"
                      className={`w-8 h-8 flex items-center justify-center rounded-full border transition ${item.enabled ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-amber-300 border-gray-200'}`}
                      onClick={() => {
                        setWeekPlan((weekPlan) =>
                          weekPlan.map((d, i) =>
                            i === idx ? { ...d, enabled: !d.enabled } : d,
                          ),
                        );
                      }}
                      title={item.enabled ? '点击关闭' : '点击开启'}
                    >
                      {item.enabled ? (
                        <FaRegCheckCircle className="w-5 h-5" />
                      ) : (
                        <FaRegTimesCircle className="w-5 h-5" />
                      )}
                    </button>
                    <span
                      className={`font-semibold text-base ${item.enabled ? 'text-orange-600' : 'text-amber-300'}`}
                    >
                      {item.day}
                    </span>
                    <span
                      className={`text-sm ${item.enabled ? 'text-gray-600' : 'text-amber-300'}`}
                    >
                      {item.subject}
                    </span>
                    <span
                      className={`ml-auto text-sm font-bold ${item.enabled ? 'text-orange-600' : 'text-amber-300'}`}
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-amber-400 mt-3">
                可根据实际情况自定义每周学习内容和时间
              </div>
            </div>
          </div>

          {/* 右侧计划概览/操作区 */}
          <div className="col-span-1 flex flex-col gap-8">
            {/* 计划概览 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-yellow-100 flex flex-col items-center mb-2">
              <div className="text-lg font-bold text-orange-600 mb-2">
                计划概览
              </div>
              <div className="w-24 h-24 rounded-full border-8 border-yellow-100 flex items-center justify-center text-orange-500 text-2xl font-bold mb-2">
                {activeDays}天
              </div>
              <div className="text-gray-600 text-sm">每周学习天数</div>
              <div className="text-gray-600 text-xs">
                每周总时长 {totalMinutes} 分钟
              </div>
            </div>
            {/* 提醒设置 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-red-100 mb-2">
              <div className="text-lg font-bold text-red-500 mb-4 tracking-tight">
                提醒设置
              </div>
              <div className="flex flex-col gap-3">
                <div
                  className={`flex items-center gap-4 rounded-lg px-4 py-2 border transition ${remindDaily ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <button
                    type="button"
                    className={`w-8 h-8 flex items-center justify-center rounded-full border transition ${remindDaily ? 'bg-red-500 text-white border-red-500' : 'bg-white text-red-200 border-gray-200'}`}
                    onClick={() => setRemindDaily((v) => !v)}
                  >
                    {remindDaily ? (
                      <FaRegCheckCircle className="w-5 h-5" />
                    ) : (
                      <FaRegTimesCircle className="w-5 h-5" />
                    )}
                  </button>
                  <span
                    className={`font-semibold text-base ${remindDaily ? 'text-red-500' : 'text-red-200'}`}
                  >
                    每日学习提醒
                  </span>
                  <span className="ml-auto text-sm text-gray-600">
                    在固定时间提醒你学习
                  </span>
                  <input
                    type="time"
                    value={remindTime}
                    onChange={(e) => setRemindTime(e.target.value)}
                    className="ml-4 px-2 py-1 rounded border border-red-200 text-gray-800 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                  />
                </div>
                <div
                  className={`flex items-center gap-4 rounded-lg px-4 py-2 border transition ${remindPush ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <button
                    type="button"
                    className={`w-8 h-8 flex items-center justify-center rounded-full border transition ${remindPush ? 'bg-red-500 text-white border-red-500' : 'bg-white text-red-200 border-gray-200'}`}
                    onClick={() => setRemindPush((v) => !v)}
                  >
                    {remindPush ? (
                      <FaRegCheckCircle className="w-5 h-5" />
                    ) : (
                      <FaRegTimesCircle className="w-5 h-5" />
                    )}
                  </button>
                  <span
                    className={`font-semibold text-base ${remindPush ? 'text-red-500' : 'text-red-200'}`}
                  >
                    推送通知
                  </span>
                  <span className="ml-auto text-sm text-gray-600">
                    开启后将通过App推送提醒
                  </span>
                </div>
                <div
                  className={`flex items-center gap-4 rounded-lg px-4 py-2 border transition ${remindGoal ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <button
                    type="button"
                    className={`w-8 h-8 flex items-center justify-center rounded-full border transition ${remindGoal ? 'bg-red-500 text-white border-red-500' : 'bg-white text-red-200 border-gray-200'}`}
                    onClick={() => setRemindGoal((v) => !v)}
                  >
                    {remindGoal ? (
                      <FaRegCheckCircle className="w-5 h-5" />
                    ) : (
                      <FaRegTimesCircle className="w-5 h-5" />
                    )}
                  </button>
                  <span
                    className={`font-semibold text-base ${remindGoal ? 'text-red-500' : 'text-red-200'}`}
                  >
                    学习目标达成提醒
                  </span>
                  <span className="ml-auto text-sm text-gray-600">
                    目标达成时自动提醒
                  </span>
                </div>
                <div
                  className={`flex items-center gap-4 rounded-lg px-4 py-2 border transition ${remindParent ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <button
                    type="button"
                    className={`w-8 h-8 flex items-center justify-center rounded-full border transition ${remindParent ? 'bg-red-500 text-white border-red-500' : 'bg-white text-red-200 border-gray-200'}`}
                    onClick={() => setRemindParent((v) => !v)}
                  >
                    {remindParent ? (
                      <FaRegCheckCircle className="w-5 h-5" />
                    ) : (
                      <FaRegTimesCircle className="w-5 h-5" />
                    )}
                  </button>
                  <span
                    className={`font-semibold text-base ${remindParent ? 'text-red-500' : 'text-red-200'}`}
                  >
                    家长同步提醒
                  </span>
                  <span className="ml-auto text-sm text-gray-600">
                    学习进度同步到家长邮箱
                  </span>
                </div>
              </div>
            </div>
            {/* 操作按钮区 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-amber-100 flex flex-col gap-4 items-center">
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base shadow hover:scale-105 transition mb-1"
                onClick={() =>
                  toast({ type: 'success', description: '计划保存成功！' })
                }
              >
                保存计划
              </button>
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-orange-100 text-orange-600 font-bold text-base shadow hover:bg-orange-200 transition mb-1"
                onClick={() =>
                  toast({ type: 'success', description: '开始执行计划！' })
                }
              >
                开始执行计划
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
