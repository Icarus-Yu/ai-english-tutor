import { auth } from '../(auth)/auth';
import Link from 'next/link';
import {
  FaBookOpen,
  FaRegCalendarCheck,
  FaRegStar,
  FaRegSmile,
  FaRegChartBar,
  FaRegLightbulb,
  FaRegGem,
  FaRegUser,
} from 'react-icons/fa';

export default async function DashboardPage() {
  const session = await auth();
  const email = session?.user?.email || '同学';
  const emailWidth = Math.max(120, Math.min(260, email.length * 12 + 40));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* 顶部导航 */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-sm border-b border-yellow-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            智言
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/books">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border border-amber-200 text-amber-700 font-semibold bg-transparent hover:bg-amber-50 transition-all duration-200"
            >
              书库
            </button>
          </Link>
          <span
            className="flex items-center justify-center rounded-full bg-yellow-100 text-amber-700 font-semibold transition text-base px-4 py-2 select-none"
            style={{ minWidth: emailWidth, maxWidth: 260 }}
          >
            {email}
          </span>
        </div>
      </header>

      <main className="flex flex-col items-center w-full px-4 py-10">
        {/* 欢迎语 */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          欢迎回来，<span className="text-amber-600">同学</span>！
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          你今天已经学习 <span className="text-amber-600 font-bold">45</span>{' '}
          分钟，继续保持好习惯！
        </p>

        {/* 顶部统计区块（更丰富） */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-yellow-100">
            <FaBookOpen className="text-amber-500 text-2xl mb-2" />
            <div className="text-amber-600 text-base font-bold mb-1">
              本周学习时长
            </div>
            <div className="text-3xl font-bold text-amber-700 mb-1">
              20h 50m
            </div>
            <div className="text-gray-600 text-xs">已完成 180 / 300 分钟</div>
            <div className="w-full bg-yellow-100 h-2 rounded-full mt-3 mb-1">
              <div
                className="bg-amber-500 h-2 rounded-full"
                style={{ width: '60%' }}
              />
            </div>
            <div className="text-xs text-amber-600">60%</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-amber-100">
            <FaRegStar className="text-orange-500 text-2xl mb-2" />
            <div className="text-orange-600 text-base font-bold mb-1">
              先修课程
            </div>
            <div className="text-3xl font-bold text-orange-700 mb-1">
              45/144
            </div>
            <div className="text-gray-600 text-xs">已完成课程数</div>
            <button
              type="button"
              className="mt-3 px-6 py-2 rounded bg-amber-500 text-white font-semibold hover:bg-orange-500 transition"
            >
              查看课程
            </button>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-orange-100">
            <FaRegCalendarCheck className="text-red-500 text-2xl mb-2" />
            <div className="text-red-600 text-base font-bold mb-1">
              累计学习天数
            </div>
            <div className="text-3xl font-bold text-red-700 mb-1">120</div>
            <div className="text-gray-600 text-xs">已连续打卡 7 天</div>
            <button
              type="button"
              className="mt-3 px-6 py-2 rounded bg-orange-500 text-white font-semibold hover:bg-red-500 transition"
            >
              打卡
            </button>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-red-100">
            <FaRegChartBar className="text-pink-500 text-2xl mb-2" />
            <div className="text-pink-600 text-base font-bold mb-1">
              当前等级
            </div>
            <div className="text-3xl font-bold text-pink-700 mb-1">A2</div>
            <div className="text-gray-600 text-xs">再坚持 35%，即可升级</div>
            <div className="w-full flex justify-center mt-3">
              <div className="w-16 h-16 rounded-full border-4 border-orange-200 flex items-center justify-center text-orange-500 text-xl font-bold">
                65%
              </div>
            </div>
          </div>
        </div>

        {/* 主内容区，两栏布局 */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主内容 */}
          <div className="col-span-2 flex flex-col gap-8">
            {/* 本周学习进度卡片 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-yellow-100 mb-2">
              <div className="flex items-center gap-2 mb-4">
                <FaBookOpen className="text-amber-500 text-xl" />
                <div className="text-lg font-bold text-gray-800">
                  本周学习进度
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-yellow-100 rounded-full">
                    <div
                      className="h-2 bg-amber-500 rounded-full"
                      style={{ width: '60%' }}
                    />
                  </div>
                  <span className="text-xs text-amber-600 font-semibold ml-2">
                    60%
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-2 mt-4">
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(
                    (day, index) => (
                      <div key={day} className="text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                            index < 5
                              ? 'bg-amber-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {index < 5 ? '✔' : day[1]}
                        </div>
                        <span className="text-xs text-gray-500">{day}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            {/* 学习路径卡片 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-amber-100">
              <div className="flex items-center gap-2 mb-4">
                <FaRegLightbulb className="text-orange-500 text-xl" />
                <div className="text-lg font-bold text-gray-800">学习路径</div>
              </div>
              <div className="flex flex-col gap-6">
                {/* 每条路径 */}
                {[
                  { title: '新概念英语第一册', tag: '基础教材', percent: 65 },
                  { title: '剑桥少儿英语', tag: '少儿英语', percent: 30 },
                  { title: '牛津小学英语', tag: '小学教材', percent: 85 },
                  { title: '朗文英语世界', tag: '国际教材', percent: 40 },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-amber-600">
                        {item.title}
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1 rounded bg-orange-100 text-orange-600 font-semibold hover:bg-orange-200 transition text-xs"
                      >
                        继续学习
                      </button>
                    </div>
                    <div className="text-gray-600 text-xs mb-1">{item.tag}</div>
                    <div className="w-full bg-yellow-100 h-2 rounded-full">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <div className="text-xs text-amber-600 text-right">
                      {item.percent}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 技能分析区块 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-orange-100">
              <div className="flex items-center gap-2 mb-4">
                <FaRegGem className="text-red-500 text-xl" />
                <div className="text-lg font-bold text-gray-800">技能分析</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: '词汇',
                    value: 80,
                    icon: <FaBookOpen className="text-amber-500" />,
                  },
                  {
                    label: '听力',
                    value: 55,
                    icon: <FaRegUser className="text-orange-500" />,
                  },
                  {
                    label: '口语',
                    value: 70,
                    icon: <FaRegSmile className="text-red-500" />,
                  },
                  {
                    label: '阅读',
                    value: 85,
                    icon: <FaRegStar className="text-pink-500" />,
                  },
                  {
                    label: '写作',
                    value: 60,
                    icon: <FaRegLightbulb className="text-amber-500" />,
                  },
                  {
                    label: '语法',
                    value: 75,
                    icon: <FaRegChartBar className="text-orange-500" />,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                      {item.icon}
                      <span className="font-semibold text-gray-800">
                        {item.label}
                      </span>
                      <span className="ml-auto text-xs text-amber-600 font-bold">
                        {item.value}%
                      </span>
                    </div>
                    <div className="w-full bg-yellow-100 h-2 rounded-full">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧统计/成就/操作区 */}
          <div className="col-span-1 flex flex-col gap-8">
            {/* 等级卡片 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-orange-100 flex flex-col items-center mb-2">
              <div className="text-lg font-bold text-orange-600 mb-2">
                等级进度
              </div>
              <div className="w-24 h-24 rounded-full border-8 border-orange-200 flex items-center justify-center text-orange-500 text-2xl font-bold mb-2">
                65%
              </div>
              <div className="text-gray-600 text-sm">A2 → B1</div>
              <div className="text-gray-600 text-xs">再坚持 35%，即可升级</div>
            </div>
            {/* 成就徽章卡片 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-yellow-100 flex flex-col items-center mb-2">
              <div className="text-lg font-bold text-gray-800 mb-4">
                成就徽章
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-amber-600 font-bold mb-1">
                    学
                  </div>
                  <div className="text-xs text-gray-600">连续学习</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-orange-600 font-bold mb-1">
                    优
                  </div>
                  <div className="text-xs text-gray-600">优异成绩</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-red-500 font-bold mb-1">
                    奖
                  </div>
                  <div className="text-xs text-gray-600">进步奖章</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-pink-500 font-bold mb-1">
                    星
                  </div>
                  <div className="text-xs text-gray-600">活跃之星</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-700 font-bold mb-1">
                    测
                  </div>
                  <div className="text-xs text-gray-600">测评达人</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold mb-1">
                    词
                  </div>
                  <div className="text-xs text-gray-600">单词之星</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-4 text-center">
                更多徽章敬请期待...
              </div>
            </div>
            {/* 快捷操作卡片 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-amber-100 flex flex-col gap-4 items-center">
              <div className="text-lg font-bold text-gray-800 mb-2">
                快捷操作
              </div>
              <Link href="/books" className="w-full">
                <button
                  type="button"
                  className="w-full py-2 rounded-lg bg-amber-500 hover:bg-orange-500 text-white font-semibold text-base shadow hover:shadow-lg transition mb-2"
                >
                  选择新教材
                </button>
              </Link>
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-orange-100 text-orange-600 font-semibold text-base shadow hover:bg-orange-200 transition mb-2"
              >
                选择学习路径
              </button>
              <Link href="/plan" className="w-full">
                <button
                  type="button"
                  className="w-full py-2 rounded-lg bg-red-100 text-red-600 font-semibold text-base shadow hover:bg-red-200 transition"
                >
                  设置学习计划
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      {/* 右下角浮动按钮：查看详细报告 */}
      <Link href="/report">
        <button
          type="button"
          className="fixed bottom-10 right-10 z-50 flex flex-col items-center justify-center bg-amber-500 hover:bg-orange-500 text-white rounded-full shadow-lg p-4 transition group"
          style={{ boxShadow: '0 4px 24px 0 rgba(251,146,60,0.15)' }}
          title="查看详细报告"
        >
          <svg
            className="w-7 h-7 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M9 17v-2a4 4 0 0 1 4-4h5" />
            <path d="M3 3v18h18" />
            <circle cx="17" cy="7" r="3" />
          </svg>
          <span className="text-xs font-semibold">查看详细报告</span>
        </button>
      </Link>
    </div>
  );
}
