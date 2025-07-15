'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-yellow-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-10 w-10 rounded-lg object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              智言
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border border-amber-200 text-amber-700 font-semibold bg-transparent hover:bg-amber-50 transition-all duration-200"
              onClick={() => router.push('/login')}
            >
              登录
            </button>
            <button
              type="button"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => router.push('/register')}
            >
              注册学习
            </button>
          </div>
        </div>
      </header>

      {/* 主视觉区 */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            让英语学习变得
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              简单有趣
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            专为中小学生设计的AI英语学习平台，通过智能对话、个性化学习路径和丰富的互动内容，让每个孩子都能轻松掌握英语
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => router.push('/register')}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
              </svg>
              开始学习之旅
            </button>
            <button
              type="button"
              className="px-8 py-3 rounded-lg border border-yellow-200 text-yellow-700 text-lg font-semibold bg-transparent hover:bg-yellow-50 transition-all duration-200"
              onClick={() =>
                window.open('https://your-demo-link.com', '_blank')
              }
            >
              观看演示
            </button>
          </div>
        </div>
      </section>

      {/* 平台优势区 */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          为什么选择智言？
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M4 19.5A2.25 2.25 0 0 0 6.25 21h11.5A2.25 2.25 0 0 0 20 19.5V5.25A2.25 2.25 0 0 0 17.75 3H6.25A2.25 2.25 0 0 0 4 5.25V19.5z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2 text-amber-700">丰富书库</h4>
            <p className="text-gray-600 text-sm text-center leading-relaxed">
              精选适合不同年级的英语教材，从基础到进阶，循序渐进提升英语水平
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-amber-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2 text-orange-700">
              AI智能对话
            </h4>
            <p className="text-gray-600 text-sm text-center leading-relaxed">
              24小时AI英语老师陪伴，支持语音和文字对话，随时随地练习英语
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-orange-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2 text-red-600">学习追踪</h4>
            <p className="text-gray-600 text-sm text-center leading-relaxed">
              可视化学习进度，智能分析薄弱环节，制定个性化学习计划
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-red-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M17 20h5v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2h5" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2 text-pink-600">互动学习</h4>
            <p className="text-gray-600 text-sm text-center leading-relaxed">
              游戏化学习体验，与同学一起学习，让英语学习充满乐趣
            </p>
          </div>
        </div>
      </section>

      {/* 数据展示区 */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">注册学生</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">精选教材</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">95%</div>
              <div className="text-gray-600">学习满意度</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">24/7</div>
              <div className="text-gray-600">AI陪伴学习</div>
            </div>
          </div>
        </div>
      </section>

      {/* 用户评价区 */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          学生和家长都在说
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={`star-1-${i}`}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              "我家孩子现在每天都主动要求学英语，AI老师很有耐心，发音也很标准！"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-amber-600 font-semibold">李</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">李妈妈</div>
                <div className="text-sm text-gray-500">小学三年级家长</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-amber-100 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={`star-2-${i}`}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              "学习进度一目了然，孩子的薄弱环节都能及时发现和改进，真的很棒！"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-orange-600 font-semibold">王</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">王爸爸</div>
                <div className="text-sm text-gray-500">初中一年级家长</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-orange-100 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={`star-3-${i}`}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              "界面很可爱，学习起来一点都不枯燥，我的英语成绩提高了很多！"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 font-semibold">小</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">小明</div>
                <div className="text-sm text-gray-500">小学五年级学生</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 底部引导区 */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            准备好开始你的英语学习之旅了吗？
          </h3>
          <p className="text-xl text-amber-100 mb-8">
            加入我们，让AI老师陪伴你快乐学英语！
          </p>
          <button
            type="button"
            className="px-10 py-3 rounded-lg bg-white text-amber-600 hover:bg-amber-50 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => router.push('/register')}
          >
            立即免费注册
          </button>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="h-8 w-8 rounded-lg object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <h4 className="text-xl font-bold">智言</h4>
              </div>
              <p className="text-gray-400 leading-relaxed">
                专业的AI英语学习平台，让每个孩子都能轻松掌握英语。
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">学习功能</h5>
              <ul className="space-y-2 text-gray-400">
                <li>AI智能对话</li>
                <li>个性化学习</li>
                <li>进度追踪</li>
                <li>发音评测</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">帮助支持</h5>
              <ul className="space-y-2 text-gray-400">
                <li>使用指南</li>
                <li>常见问题</li>
                <li>联系客服</li>
                <li>意见反馈</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">关于我们</h5>
              <ul className="space-y-2 text-gray-400">
                <li>公司介绍</li>
                <li>教学理念</li>
                <li>隐私政策</li>
                <li>服务条款</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 智言. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
