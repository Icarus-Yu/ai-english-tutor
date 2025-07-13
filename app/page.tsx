'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5f7fa] to-[#e8ecf5]">
      {/* 顶部导航 */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-8 w-8"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <span className="text-2xl font-bold text-[#7c3aed]">
            智慧英语学堂
          </span>
        </div>
        <div>
          <button
            className="mr-4 px-6 py-2 rounded border border-[#7c3aed] text-[#7c3aed] font-semibold bg-white hover:bg-[#f0f0ff] transition"
            onClick={() => router.push('/login')}
          >
            登录
          </button>
          <button
            className="px-6 py-2 rounded bg-[#7c3aed] text-white font-semibold hover:bg-[#6366f1] transition"
            onClick={() => router.push('/register')}
          >
            注册学习
          </button>
        </div>
      </header>

      {/* 主视觉区 */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#22223b]">
          让英语学习变得
          <span className="text-[#7c3aed]">简单有趣</span>
        </h1>
        <p className="text-lg md:text-xl text-[#4b5563] mb-8 max-w-2xl">
          专为中小学生设计的AI英语学习平台，通过智能对话、个性化学习路径和丰富的互动内容，让每个孩子都能轻松掌握英语
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-[#7c3aed] text-white text-lg font-semibold shadow hover:bg-[#6366f1] transition"
            onClick={() => router.push('/register')}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-3A2.25 2.25 0 0 0 8.25 5.25V9m7.5 0v10.5A2.25 2.25 0 0 1 13.5 21h-3a2.25 2.25 0 0 1-2.25-2.25V9m7.5 0H8.25" />
            </svg>
            开始学习之旅
          </button>
          <button
            className="px-8 py-3 rounded-lg border border-[#7c3aed] text-[#7c3aed] text-lg font-semibold bg-white hover:bg-[#f0f0ff] transition"
            onClick={() => window.open('https://your-demo-link.com', '_blank')}
          >
            观看演示
          </button>
        </div>
      </section>

      {/* 平台优势区 */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-12 px-4">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="bg-[#7c3aed]/10 text-[#7c3aed] rounded-full p-3 mb-3">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M4 19.5A2.25 2.25 0 0 0 6.25 21h11.5A2.25 2.25 0 0 0 20 19.5V5.25A2.25 2.25 0 0 0 17.75 3H6.25A2.25 2.25 0 0 0 4 5.25V19.5z" />
            </svg>
          </div>
          <div className="font-bold text-lg mb-1 text-[#22223b]">丰富书库</div>
          <div className="text-[#4b5563] text-sm text-center">
            精选适合不同年级的英语教材，从基础到进阶，循序渐进提升英语水平
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="bg-[#6366f1]/10 text-[#6366f1] rounded-full p-3 mb-3">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
            </svg>
          </div>
          <div className="font-bold text-lg mb-1 text-[#22223b]">
            AI智能对话
          </div>
          <div className="text-[#4b5563] text-sm text-center">
            24小时AI英语老师陪伴，支持语音和文字对话，随时随地练习英语
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="bg-[#34d399]/10 text-[#34d399] rounded-full p-3 mb-3">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className="font-bold text-lg mb-1 text-[#22223b]">学习追踪</div>
          <div className="text-[#4b5563] text-sm text-center">
            可视化学习进度，智能分析薄弱环节，制定个性化学习计划
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="bg-[#fb923c]/10 text-[#fb923c] rounded-full p-3 mb-3">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M17 20h5v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2h5" />
            </svg>
          </div>
          <div className="font-bold text-lg mb-1 text-[#22223b]">互动学习</div>
          <div className="text-[#4b5563] text-sm text-center">
            游戏化学习体验，和同学一起学习，让英语学习充满乐趣
          </div>
        </div>
      </section>

      {/* 数据展示区 */}
      <section className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 px-4">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[#7c3aed]">10,000+</div>
          <div className="text-[#4b5563] text-sm">注册学生</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[#6366f1]">500+</div>
          <div className="text-[#4b5563] text-sm">精选教材</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[#34d399]">95%</div>
          <div className="text-[#4b5563] text-sm">学习满意度</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[#fb923c]">24/7</div>
          <div className="text-[#4b5563] text-sm">AI陪伴学习</div>
        </div>
      </section>

      {/* 用户评价区 */}
      <section className="max-w-5xl mx-auto mb-12 px-4">
        <div className="text-xl font-bold mb-6 text-center text-[#22223b]">
          学生和家长都在说
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
            </div>
            <div className="text-[#4b5563] text-sm mb-2 text-center">
              “我家孩子现在每天都主动要求学英语，AI老师很有耐心，发音也很标准！”
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-gray-100 text-[#7c3aed] rounded-full px-2 py-1 text-xs">
                李
              </span>
              <span className="text-xs text-[#6b7280]">
                李妈妈 小学三年级家长
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
            </div>
            <div className="text-[#4b5563] text-sm mb-2 text-center">
              “学习进度一目了然，孩子的薄弱环节能及时发现和改进，真的很棒！”
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-purple-100 text-[#7c3aed] rounded-full px-2 py-1 text-xs">
                王
              </span>
              <span className="text-xs text-[#6b7280]">
                王爸爸 初中一年级家长
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
            </div>
            <div className="text-[#4b5563] text-sm mb-2 text-center">
              “界面很可爱，学习起来一点都不枯燥，我的英语成绩进步很快！”
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-100 text-[#7c3aed] rounded-full px-2 py-1 text-xs">
                小
              </span>
              <span className="text-xs text-[#6b7280]">
                小明 小学五年级学生
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 底部引导区 */}
      <section className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] py-12 text-center">
        <div className="text-2xl font-bold text-white mb-4">
          准备好开始你的英语学习之旅了吗？
        </div>
        <div className="text-white mb-8">
          加入我们，让AI老师陪伴你快乐学英语！
        </div>
        <button
          className="px-10 py-3 rounded-lg bg-[#7c3aed] text-white text-lg font-semibold shadow hover:bg-[#6366f1] transition"
          onClick={() => router.push('/register')}
        >
          立即免费注册
        </button>
      </section>

      {/* 页脚 */}
      <footer className="bg-[#22223b] text-gray-200 py-8 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/images/logo.png"
                alt="logo"
                className="h-6 w-6"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className="font-bold text-lg text-white">智慧英语学堂</span>
            </div>
            <div className="text-sm">
              专为AI英语学习平台，让每个孩子都能轻松掌握英语。
            </div>
          </div>
          <div>
            <div className="font-bold mb-2 text-white">学习功能</div>
            <div className="text-sm">
              AI智能对话
              <br />
              个性化学习
              <br />
              进度追踪
              <br />
              发音评测
            </div>
          </div>
          <div>
            <div className="font-bold mb-2 text-white">帮助支持</div>
            <div className="text-sm">
              使用指南
              <br />
              常见问题
              <br />
              联系客服
              <br />
              意见反馈
            </div>
          </div>
          <div>
            <div className="font-bold mb-2 text-white">关于我们</div>
            <div className="text-sm">
              公司介绍
              <br />
              教学理念
              <br />
              隐私政策
              <br />
              服务条款
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-8">
          © 2024 智慧英语学堂. 保留所有权利.
        </div>
      </footer>
    </div>
  );
}
