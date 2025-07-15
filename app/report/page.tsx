import Link from 'next/link';

export default function ReportPage() {
  // 错题和成就数据
  const wrongQuestions = [
    {
      q: 'Choose the correct form: I ___ (go) to school yesterday.',
      a: 'went',
      date: '2024-04-15',
    },
    {
      q: 'Fill in the blank: She ___ been studying English for 3 years.',
      a: 'has',
      date: '2024-04-14',
    },
    {
      q: 'Choose the right word: The book is ___ the table.',
      a: 'on',
      date: '2024-04-13',
    },
  ];
  const achievements = [
    {
      title: '连续学习一周',
      date: '2024-05-09',
      color: 'bg-[#ede9fe] text-[#7c3aed]',
    },
    {
      title: '词汇突破3000单词',
      date: '2024-05-08',
      color: 'bg-[#e0e7ff] text-[#6366f1]',
    },
    {
      title: '口语练习达人',
      date: '2024-05-07',
      color: 'bg-[#bbf7d0] text-[#34d399]',
    },
  ];
  // 邮箱展示，风格与dashboard一致
  const email = '2649643365@qq.com'; // 可替换为动态session
  const emailWidth = Math.max(120, Math.min(260, email.length * 12 + 40));
  // 中文周几
  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 font-sans text-[15px]">
      {/* 顶部导航+返回+邮箱 */}
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
          学习报告
        </div>
        {/* 右上角邮箱标签 */}
        <span
          className="flex items-center justify-center rounded-full bg-yellow-100 text-amber-700 font-semibold transition text-base px-4 py-2 select-none"
          style={{ minWidth: emailWidth, maxWidth: 260 }}
        >
          {email}
        </span>
      </header>

      <main className="flex flex-col items-center w-full px-2 md:px-4 py-2 md:py-6">
        {/* 顶部统计区块 */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* 卡片样式更细腻，带描述 */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-yellow-100 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="text-amber-600 text-sm font-bold mb-1 tracking-wide">
              本月学习天数
            </div>
            <div className="text-3xl font-extrabold text-amber-700 mb-1">
              45
            </div>
            <div className="text-amber-500 text-xs mb-1">已学习 61 分钟</div>
            <div className="text-xs text-amber-400">
              本月已坚持学习，继续加油！
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-amber-100 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="text-orange-600 text-sm font-bold mb-1 tracking-wide">
              本月学习时长
            </div>
            <div className="text-3xl font-extrabold text-orange-700 mb-1">
              47h 30m
            </div>
            <div className="text-orange-500 text-xs mb-1">已完成 35%</div>
            <div className="text-xs text-orange-400">距离目标还差 2h 30m</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-orange-100 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="text-red-600 text-sm font-bold mb-1 tracking-wide">
              完成度
            </div>
            <div className="text-3xl font-extrabold text-red-700 mb-1">78%</div>
            <div className="text-red-500 text-xs mb-1">本月目标</div>
            <div className="text-xs text-red-400">再坚持一周即可达成</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-red-100 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="text-pink-600 text-sm font-bold mb-1 tracking-wide">
              最佳连续天数
            </div>
            <div className="text-3xl font-extrabold text-pink-700 mb-1">
              12 天
            </div>
            <div className="text-pink-500 text-xs mb-1">已连续打卡</div>
            <div className="text-xs text-pink-400">挑战自我，刷新记录！</div>
          </div>
        </div>

        {/* 主内容区，两栏布局 */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主内容 */}
          <div className="col-span-2 flex flex-col gap-8">
            {/* 月度学习趋势 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-7 border border-yellow-100 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3v18h18" />
                  <circle cx="17" cy="7" r="3" />
                </svg>
                <div className="text-base font-bold text-gray-800 tracking-tight">
                  月度学习趋势
                </div>
              </div>
              <div className="text-xs text-amber-400 mb-4">
                每周学习时长与完成率，帮助你持续进步
              </div>
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4].map((week, idx) => (
                  <div key={`week-${week}`} className="flex items-center gap-4">
                    <div className="w-16 text-amber-600 font-semibold text-xs">
                      第{week}周
                    </div>
                    <div className="flex-1 h-2 bg-yellow-100 rounded-full relative overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                        style={{ width: `${78 - idx * 7}%` }}
                      />
                    </div>
                    <span className="text-xs text-amber-600 font-bold ml-2">
                      {78 - idx * 7}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-amber-400 mt-3">
                本月已累计学习 47 小时 30 分钟
              </div>
            </div>
            {/* 技能进步分析 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-7 border border-amber-100 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 6v6l4 2" />
                </svg>
                <div className="text-base font-bold text-gray-800 tracking-tight">
                  技能进步分析
                </div>
              </div>
              <div className="text-xs text-orange-400 mb-4">
                各项英语能力进步趋势，查找你的优势与短板
              </div>
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: '语法',
                    value: 75,
                    trend: '+10%',
                    desc: '语法知识掌握提升明显',
                  },
                  {
                    label: '阅读',
                    value: 85,
                    trend: '+5%',
                    desc: '阅读理解能力持续进步',
                  },
                  {
                    label: '听力',
                    value: 68,
                    trend: '+4%',
                    desc: '听力理解能力稳步提升',
                  },
                  {
                    label: '口语',
                    value: 72,
                    trend: '+2%',
                    desc: '口语表达更自信流畅',
                  },
                  {
                    label: '写作',
                    value: 88,
                    trend: '+7%',
                    desc: '写作能力大幅提升',
                  },
                  {
                    label: '词汇',
                    value: 65,
                    trend: '+3%',
                    desc: '词汇量持续增长',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-14 text-orange-600 font-semibold text-xs">
                        {item.label}
                      </div>
                      <div className="flex-1 h-2 bg-yellow-100 rounded-full relative overflow-hidden">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-xs text-orange-600 font-bold ml-2">
                        {item.value}%{' '}
                        <span className="text-green-500">({item.trend})</span>
                      </span>
                    </div>
                    <div className="text-xs text-orange-400 ml-14">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 本周学习活动 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-7 border border-orange-100 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M4 19.5A2.25 2.25 0 0 0 6.25 21h11.5A2.25 2.25 0 0 0 20 19.5V5.25A2.25 2.25 0 0 0 17.75 3H6.25A2.25 2.25 0 0 0 4 5.25V19.5z" />
                </svg>
                <div className="text-base font-bold text-gray-800 tracking-tight">
                  本周学习活动
                </div>
              </div>
              <div className="text-xs text-red-400 mb-4">
                每日坚持打卡，养成良好学习习惯
              </div>
              <div className="flex flex-row gap-3 justify-between">
                {weekDays.map((day, idx) => (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-base shadow mb-1">
                      ✔
                    </div>
                    <div className="text-[11px] text-gray-600">{day}</div>
                    <div className="text-[11px] text-orange-600">45分钟</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-red-400 mt-3">已连续打卡 7 天</div>
            </div>
          </div>

          {/* 右侧统计/成就/操作区 */}
          <div className="col-span-1 flex flex-col gap-8">
            {/* 最近错题 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-7 border border-red-100 mb-2">
              <div className="text-base font-bold text-red-600 mb-3 tracking-tight">
                最近错题
              </div>
              <div className="text-xs text-red-400 mb-2">
                查漏补缺，巩固易错知识点
              </div>
              <div className="flex flex-col gap-3">
                {wrongQuestions.map((item) => (
                  <div
                    key={item.q}
                    className="bg-red-50 rounded-lg p-3 flex flex-col gap-1 shadow-sm border border-red-100"
                  >
                    <div className="text-[13px] text-red-600 font-bold mb-1">
                      {item.q}
                    </div>
                    <div className="text-xs text-gray-600">
                      正确答案：{item.a}
                    </div>
                    <div className="text-xs text-red-400">{item.date}</div>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 text-xs text-orange-600 hover:underline font-semibold"
                >
                  查看更多错题
                </button>
              </div>
            </div>
            {/* 最近成就 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-7 border border-yellow-100 mb-2">
              <div className="text-base font-bold text-gray-800 mb-3 tracking-tight">
                最近成就
              </div>
              <div className="text-xs text-amber-400 mb-2">
                你的努力正在被记录，每一次进步都值得表扬
              </div>
              <div className="flex flex-col gap-3">
                {achievements.map((item, idx) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-2 bg-yellow-50 rounded-lg p-2 shadow-sm border border-yellow-100"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow bg-amber-100 text-amber-700`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] text-orange-600 font-semibold">
                        {item.title}
                      </div>
                      <div className="text-xs text-amber-400">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 报告操作区 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-7 border border-amber-100 flex flex-col gap-3 items-center">
              <div className="text-base font-bold text-gray-800 mb-2 tracking-tight">
                报告操作
              </div>
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base shadow hover:scale-105 transition mb-1"
              >
                下载PDF报告
              </button>
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-orange-100 text-orange-600 font-bold text-base shadow hover:bg-orange-200 transition mb-1"
              >
                发送到家长邮箱
              </button>
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-red-100 text-red-600 font-bold text-base shadow hover:bg-red-200 transition"
              >
                智能学习建议
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
