'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const samplePrompt = 'Soạn 5 bài viết giới thiệu bộ sưu tập mới kèm hình ảnh, phân bổ vào khung giờ vàng tuần tới trên Fanpage và TikTok.';

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const platforms = [
    { name: 'Facebook', desc: 'Trang & Nhóm', color: 'bg-blue-600/20 text-blue-400 border-blue-500/30' },
    { name: 'Instagram', desc: 'Feed & Reels', color: 'bg-pink-600/20 text-pink-400 border-pink-500/30' },
    { name: 'TikTok', desc: 'Video ngắn', color: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30' },
    { name: 'YouTube', desc: 'Shorts & Video', color: 'bg-red-600/20 text-red-400 border-red-500/30' },
    { name: 'Threads', desc: 'Bài viết ngắn', color: 'bg-purple-600/20 text-purple-400 border-purple-500/30' },
    { name: 'LinkedIn', desc: 'Hồ sơ & Công ty', color: 'bg-sky-600/20 text-sky-400 border-sky-500/30' },
    { name: 'X / Twitter', desc: 'Tweets & Threads', color: 'bg-neutral-600/20 text-neutral-300 border-neutral-500/30' },
    { name: 'Pinterest', desc: 'Ghim hình ảnh', color: 'bg-rose-600/20 text-rose-400 border-rose-500/30' },
  ];

  const faqs = [
    {
      q: 'Dùng thử 14 ngày có mất phí hoặc cần thẻ tín dụng không?',
      a: 'Hoàn toàn không. Bạn chỉ cần đăng ký bằng tài khoản Google hoặc Email là được kích hoạt ngay gói dùng thử 14 ngày với đầy đủ tính năng, kết nối tối đa 8 kênh mạng xã hội mà không cần nhập thẻ tín dụng hay Visa/Mastercard.',
    },
    {
      q: 'Đăng bài tự động qua Social có bị checkpoint hay khóa tài khoản không?',
      a: 'Không. Social kết nối hoàn toàn thông qua API và OAuth 2.0 chính thức được phê duyệt bởi Meta (Facebook, Instagram, Threads), TikTok, Google (YouTube), LinkedIn, X và Pinterest. Chúng tôi không sử dụng tool cào lậu hay giả lập trình duyệt, đảm bảo an toàn tuyệt đối 100% cho kênh của bạn.',
    },
    {
      q: 'Kết nối AI qua giao thức MCP (Model Context Protocol) hoạt động như thế nào?',
      a: 'Trong phần Cài đặt > Apps, bạn tạo một ứng dụng OAuth hoặc lấy Token API. Sau đó thêm Social MCP vào trợ lý AI của bạn (như Claude Desktop, Cursor, Gemini CLI, n8n, ChatGPT). Bạn chỉ cần gõ yêu cầu bằng tiếng Việt (ví dụ: "Lên lịch 3 bài cho tuần này"), AI sẽ tự động phân tích khung giờ vàng và tạo lịch đăng trong Social.',
    },
    {
      q: 'Cách thanh toán gói Standard 99.000đ/tháng như thế nào?',
      a: 'Hệ thống hỗ trợ quét mã VietQR tự động. Bạn chỉ cần mở bất kỳ ứng dụng ngân hàng nào tại Việt Nam (Vietcombank, Techcombank, MB, ACB,...) hoặc MoMo, quét mã QR hiển thị trên màn hình. Gói cước của bạn sẽ được kích hoạt tức thì chỉ sau vài giây.',
    },
    {
      q: 'Tôi có thể quản lý nhiều kênh cùng một lúc và phân quyền cho nhân viên không?',
      a: 'Có. Gói Pro và Doanh nghiệp hỗ trợ tính năng Quản lý Đội nhóm (Teams), cho phép bạn mời cộng sự, biên tập viên vào soạn bài và phân quyền duyệt bài trước khi xuất bản ra các kênh chính thức.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07070B] text-slate-100 selection:bg-[#612BD3] selection:text-white font-sans">
      {/* Background radial gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#612BD3]/25 via-[#FC69FF]/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#612BD3]/15 blur-[140px] rounded-full" />
        <div className="absolute top-[70%] left-[-10%] w-[500px] h-[500px] bg-[#3B82F6]/10 blur-[140px] rounded-full" />
      </div>

      {/* Sticky Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#07070B]/80 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#612BD3] via-[#7B3FE4] to-[#FC69FF] flex items-center justify-center shadow-lg shadow-[#612BD3]/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl tracking-tight">S</span>
            </div>
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-purple-200 transition-colors">
              Social<span className="text-[#FC69FF]">.</span>
            </span>
          </Link>

          {/* Nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Tính năng</a>
            <a href="#heatmap" className="hover:text-white transition-colors">Khung giờ vàng</a>
            <a href="#mcp" className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>Kết nối AI (MCP)</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FC69FF]/20 text-[#FC69FF] border border-[#FC69FF]/30">HOT</span>
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">Bảng giá 99k</a>
            <a href="#faq" className="hover:text-white transition-colors">Hỏi đáp</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              Đăng nhập
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#612BD3] to-[#8B5CF6] hover:from-[#6D34E5] hover:to-[#966CF8] text-white shadow-lg shadow-[#612BD3]/30 hover:shadow-[#612BD3]/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Dùng thử 14 ngày
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-sm text-xs sm:text-sm font-medium text-purple-200 mb-8 hover:border-purple-400/40 transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#FC69FF] animate-pulse" />
            <span>Hệ sinh thái xuất bản mạng xã hội tự động × AI MCP</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.18] sm:leading-[1.15]">
            Phần mềm đăng bài tự động đa kênh thông minh cho{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#FC69FF] to-[#60A5FA]">
              Doanh Nghiệp & Creator
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Lên lịch đăng bài tập trung lên Facebook, TikTok, Instagram, YouTube, Threads, LinkedIn. Tối ưu thời điểm vàng tương tác cao và giao việc tự động cho AI chỉ với một câu prompt tiếng Việt.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#612BD3] via-[#7B3FE4] to-[#FC69FF] hover:opacity-95 text-white font-bold text-base shadow-xl shadow-[#612BD3]/35 hover:shadow-[#FC69FF]/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Bắt đầu dùng thử 14 ngày miễn phí</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a
              href="#pricing"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-slate-200 font-semibold text-base transition-all hover:border-white/25"
            >
              Xem bảng giá chỉ 99k/tháng →
            </a>
          </div>

          {/* Value Props Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              14 ngày đầy đủ tính năng
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Không yêu cầu thẻ tín dụng
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Quét mã VietQR tiện lợi
            </span>
          </div>

          {/* Supported Platforms Grid */}
          <div className="mt-14 pt-10 border-t border-white/[0.08]">
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-400 mb-6">
              Hỗ trợ kết nối chính thức các nền tảng mạng xã hội phổ biến
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-6xl mx-auto">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className={`px-3 py-2.5 rounded-xl border backdrop-blur-sm ${p.color} transition-all hover:scale-105 flex flex-col items-center justify-center text-center`}
                >
                  <span className="font-bold text-sm text-white">{p.name}</span>
                  <span className="text-[11px] opacity-80 mt-0.5">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature 1 & 2 Spotlight: Best Time Heatmap & Command Palette */}
        <section id="features" className="py-20 bg-white/[0.02] border-y border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-[#FC69FF]">Độc quyền & Tối ưu vượt trội</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                Công cụ tối tân giúp bạn bứt phá tương tác
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base">
                Không chỉ lên lịch đơn thuần, Social tích hợp thuật toán phân tích hành vi người dùng và trải nghiệm phím tắt đỉnh cao.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Heatmap Card */}
              <div id="heatmap" className="rounded-2xl p-7 bg-gradient-to-b from-[#141422] to-[#0C0C14] border border-white/[0.1] relative overflow-hidden group hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#612BD3]/30 text-purple-300 border border-[#612BD3]/40">
                    🔥 ĐỘ TƯƠNG TÁC +42%
                  </span>
                  <span className="text-xs text-slate-400 font-mono">7 ngày × 24 giờ</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Biểu đồ thời điểm vàng (Best Time Heatmap)</h3>
                <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                  Thuật toán đo lường mật độ tương tác cho từng mạng xã hội (Facebook, TikTok, LinkedIn,...). Hệ thống tô sáng các ô giờ vàng có tỷ lệ reach cao nhất, chỉ cần 1 cú click để lên lịch vào thời điểm tối ưu.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/[0.08] font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Thứ Tư · 19:00 - 21:00</span>
                    <span className="text-[#FC69FF] font-bold">Chỉ số tương tác: 98/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-gradient-to-r from-purple-950 via-purple-600 to-[#FC69FF] w-full" />
                  <p className="text-[11px] text-slate-400 text-center pt-1">
                    Nhấn vào bất kỳ ô giờ vàng nào để mở ngay trình soạn thảo bài đăng
                  </p>
                </div>
              </div>

              {/* Command Palette Card */}
              <div className="rounded-2xl p-7 bg-gradient-to-b from-[#141422] to-[#0C0C14] border border-white/[0.1] relative overflow-hidden group hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FC69FF]/20 text-[#FC69FF] border border-[#FC69FF]/30">
                    ⚡ SIÊU TỐC ĐỘ
                  </span>
                  <span className="text-xs text-slate-400 font-mono">⌘K / Ctrl+K</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Bảng lệnh thông minh (Command Palette)</h3>
                <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                  Điều khiển toàn bộ ứng dụng chỉ bằng bàn phím. Nhấn <code>⌘K</code> để tìm kiếm bài viết, chuyển trang phân tích, mở thư viện đa phương tiện hoặc tạo bài mới tức thì mà không cần dùng chuột.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs text-slate-200">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" strokeWidth={2} />
                      <path d="m21 21-4.3-4.3" strokeWidth={2} />
                    </svg>
                    <span>Tìm tác vụ, trang và cài đặt…</span>
                    <kbd className="ml-auto text-[10px] bg-white/[0.1] px-1.5 py-0.5 rounded font-mono">ESC</kbd>
                  </div>
                  <div className="flex items-center justify-between text-xs px-3 py-1.5 text-slate-300">
                    <span>Tạo bài đăng mới</span>
                    <kbd className="text-[10px] bg-white/[0.1] px-1.5 py-0.5 rounded font-mono">C</kbd>
                  </div>
                  <div className="flex items-center justify-between text-xs px-3 py-1.5 text-slate-300">
                    <span>Lịch xuất bản</span>
                    <kbd className="text-[10px] bg-white/[0.1] px-1.5 py-0.5 rounded font-mono">L</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Showcase: AI & MCP Protocol */}
        <section id="mcp" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#120B2E] via-[#0D091F] to-[#07070B] border border-purple-500/30 relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FC69FF]/10 text-[#FC69FF] text-xs font-bold border border-[#FC69FF]/20 mb-4">
                ✦ AUTO SOCIAL × MODEL CONTEXT PROTOCOL
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Kết nối AI. Giao việc bằng một prompt tiếng Việt.
              </h2>
              <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                Từ <strong>Claude Desktop, Cursor, Gemini CLI đến ChatGPT & n8n</strong>: kết nối với Social qua giao thức MCP để soạn bài, chọn kênh và đặt lịch chỉ bằng một câu lệnh tự nhiên.
              </p>
            </div>

            {/* Prompt Box Interactive Showcase */}
            <div className="mt-10 max-w-2xl bg-black/60 border border-white/[0.12] rounded-2xl p-5 sm:p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Agent Prompt (Claude / ChatGPT / Cursor)</span>
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 text-xs transition-colors flex items-center gap-1.5"
                >
                  {copiedPrompt ? 'Đã sao chép! ✓' : 'Sao chép prompt'}
                </button>
              </div>

              <p className="mt-4 text-sm sm:text-base text-purple-200 font-medium italic">
                “{samplePrompt}”
              </p>

              <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center gap-3 text-xs text-slate-400">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">200 OK</span>
                <span>AI gọi công cụ <code>social_create_post</code> và phân bổ lịch đăng tự động.</span>
              </div>
            </div>

            {/* Steps */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.1]">
              <div>
                <span className="text-sm font-bold text-[#FC69FF]">01. Lấy Token</span>
                <p className="text-xs text-slate-300 mt-1">Tạo ứng dụng OAuth trong Cài đặt &gt; Apps để nhận mã token kết nối.</p>
              </div>
              <div>
                <span className="text-sm font-bold text-[#FC69FF]">02. Thêm vào MCP</span>
                <p className="text-xs text-slate-300 mt-1">Dán cấu hình Social MCP Server vào Claude Desktop hoặc Cursor.</p>
              </div>
              <div>
                <span className="text-sm font-bold text-[#FC69FF]">03. Giao việc tự động</span>
                <p className="text-xs text-slate-300 mt-1">Nói bằng tiếng Việt để AI tự động xuất bản bài viết lên các kênh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white/[0.02] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-[#FC69FF]">Bảng giá minh bạch</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Chi phí tối ưu, hiệu quả tối đa
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                Không giới hạn số bài đăng. Chọn gói phù hợp với quy mô của bạn.
              </p>

              {/* Billing Cycle Switcher */}
              <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-white/[0.06] border border-white/[0.1]">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-[#612BD3] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Thanh toán theo tháng
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    billingCycle === 'yearly'
                      ? 'bg-[#612BD3] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Thanh toán theo năm</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Tiết kiệm 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {/* Free Trial Card */}
              <div className="rounded-2xl p-7 bg-[#0E0E17] border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Dùng thử (Trial)</h3>
                  <p className="text-xs text-slate-400 mt-1">Trải nghiệm toàn diện giải pháp</p>
                  <div className="mt-6">
                    <span className="text-4xl font-black text-white">0đ</span>
                    <span className="text-xs text-slate-400 ml-2">/ 14 ngày</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2">✓ Kết nối tối đa 8 kênh mạng xã hội</li>
                    <li className="flex items-center gap-2">✓ Không giới hạn số bài đăng</li>
                    <li className="flex items-center gap-2">✓ Lịch xuất bản & Best Time Heatmap</li>
                    <li className="flex items-center gap-2">✓ Thư viện đa phương tiện 5GB</li>
                    <li className="flex items-center gap-2">✓ Hỗ trợ kết nối AI MCP Server</li>
                  </ul>
                </div>
                <Link
                  href="/auth/register?plan=trial"
                  className="mt-8 block text-center py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-sm transition-all"
                >
                  Bắt đầu dùng thử miễn phí
                </Link>
              </div>

              {/* Standard Card (Best Seller) */}
              <div className="rounded-2xl p-8 bg-gradient-to-b from-[#1E113E] to-[#120B24] border-2 border-[#FC69FF] flex flex-col justify-between relative shadow-2xl shadow-[#612BD3]/30 scale-105 z-10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#612BD3] to-[#FC69FF] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                  Gói được chọn nhiều nhất
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Standard</h3>
                  <p className="text-xs text-purple-200 mt-1">Dành cho cá nhân, Creator & Shop online</p>
                  <div className="mt-6">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {billingCycle === 'monthly' ? '99.000đ' : '79.000đ'}
                    </span>
                    <span className="text-xs text-purple-200 ml-2">/ tháng</span>
                    {billingCycle === 'yearly' && (
                      <div className="text-[11px] text-emerald-400 mt-1">Thanh toán 948.000đ / năm (Tiết kiệm 240k)</div>
                    )}
                  </div>
                  <ul className="mt-6 space-y-3 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-center gap-2">⭐ <strong>8 kênh mạng xã hội chính thức</strong></li>
                    <li className="flex items-center gap-2">⭐ <strong>Không giới hạn số lượng bài đăng</strong></li>
                    <li className="flex items-center gap-2">⭐ Biểu đồ thời điểm vàng (Best Time Heatmap)</li>
                    <li className="flex items-center gap-2">⭐ Hỗ trợ toàn diện giao thức AI MCP Server</li>
                    <li className="flex items-center gap-2">⭐ Bảng lệnh nhanh Command Palette ⌘K</li>
                    <li className="flex items-center gap-2">⭐ Thư viện đa phương tiện 20GB</li>
                    <li className="flex items-center gap-2">⭐ Thanh toán quét mã VietQR tự động</li>
                  </ul>
                </div>
                <Link
                  href="/auth/register?plan=standard"
                  className="mt-8 block text-center py-3.5 rounded-xl bg-gradient-to-r from-[#612BD3] to-[#FC69FF] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-[#612BD3]/50 transition-all hover:scale-[1.02]"
                >
                  Chọn gói Standard 99k →
                </Link>
              </div>

              {/* Pro Agency Card */}
              <div className="rounded-2xl p-7 bg-[#0E0E17] border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Pro Agency</h3>
                  <p className="text-xs text-slate-400 mt-1">Dành cho Team & Doanh nghiệp</p>
                  <div className="mt-6">
                    <span className="text-4xl font-black text-white">
                      {billingCycle === 'monthly' ? '299.000đ' : '239.000đ'}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">/ tháng</span>
                    {billingCycle === 'yearly' && (
                      <div className="text-[11px] text-emerald-400 mt-1">Thanh toán 2.868.000đ / năm</div>
                    )}
                  </div>
                  <ul className="mt-6 space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2">✓ <strong>Không giới hạn số kênh kết nối</strong></li>
                    <li className="flex items-center gap-2">✓ Quản lý Đội nhóm (Teams) & Phân quyền</li>
                    <li className="flex items-center gap-2">✓ Hệ thống Webhooks & Developer API</li>
                    <li className="flex items-center gap-2">✓ Đăng bài tự động & Tự gắn chữ ký thương hiệu</li>
                    <li className="flex items-center gap-2">✓ Thư viện lưu trữ 100GB</li>
                    <li className="flex items-center gap-2">✓ Hỗ trợ kỹ thuật 24/7 ưu tiên</li>
                  </ul>
                </div>
                <Link
                  href="/auth/register?plan=pro"
                  className="mt-8 block text-center py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-sm transition-all"
                >
                  Đăng ký gói Pro Agency
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Tại sao nên chọn Social thay vì giải pháp khác?
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.1] bg-[#0E0E17]">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-white/[0.04] text-slate-200 border-b border-white/[0.08]">
                <tr>
                  <th className="p-4 sm:p-5">Tính năng</th>
                  <th className="p-4 sm:p-5 text-[#FC69FF] font-bold">Social.claro.vn</th>
                  <th className="p-4 sm:p-5 text-slate-400">Đăng bài thủ công</th>
                  <th className="p-4 sm:p-5 text-slate-400">Công cụ quốc tế (Buffer, Hootsuite)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Chi phí hàng tháng</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold">Chỉ từ 99.000đ</td>
                  <td className="p-4 sm:p-5">0đ (Tốn rất nhiều thời gian)</td>
                  <td className="p-4 sm:p-5">1.200.000đ - 3.000.000đ+</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Giao thức AI MCP</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold">Hỗ trợ đầy đủ tiếng Việt</td>
                  <td className="p-4 sm:p-5 text-rose-400">Không hỗ trợ</td>
                  <td className="p-4 sm:p-5 text-rose-400">Không có hoặc rất phức tạp</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Giao diện tiếng Việt</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold">100% Chuẩn tiếng Việt</td>
                  <td className="p-4 sm:p-5">Tiếng Việt</td>
                  <td className="p-4 sm:p-5 text-slate-400">Tiếng Anh</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Biểu đồ giờ vàng (Heatmap)</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold">Ma trận 7x24h trực quan</td>
                  <td className="p-4 sm:p-5 text-rose-400">Tự phỏng đoán</td>
                  <td className="p-4 sm:p-5 text-slate-400">Chỉ có trên gói đắt tiền</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Phương thức thanh toán</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold">Quét mã VietQR ngân hàng</td>
                  <td className="p-4 sm:p-5">—</td>
                  <td className="p-4 sm:p-5 text-slate-400">Bắt buộc thẻ Visa/Mastercard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white/[0.02] border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-[#FC69FF]">Giải đáp thắc mắc</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Câu hỏi thường gặp
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="rounded-xl border border-white/[0.08] bg-[#0E0E17] overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-purple-300 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <svg
                        className={`w-5 h-5 text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-[#612BD3] via-[#7B3FE4] to-[#FC69FF] shadow-2xl shadow-[#612BD3]/40 text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Sẵn sàng đưa việc xuất bản nội dung lên tầm cao mới?
            </h2>
            <p className="mt-4 text-purple-100 max-w-2xl mx-auto text-sm sm:text-base">
              Bắt đầu ngay hôm nay với 14 ngày dùng thử miễn phí. Trải nghiệm sức mạnh của việc đăng bài tự động đa kênh và kết nối AI thông minh.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-900 font-extrabold text-base hover:bg-slate-100 transition-all shadow-lg hover:scale-105"
              >
                Dùng thử 14 ngày miễn phí
              </Link>
              <Link
                href="/auth/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-semibold text-base transition-all"
              >
                Đăng nhập tài khoản
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050508] py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#612BD3] to-[#FC69FF] flex items-center justify-center text-white font-bold text-xs">
              S
            </div>
            <span className="font-semibold text-slate-300">Social by Claro</span>
            <span>— Phần mềm đăng bài tự động đa kênh</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Chính sách bảo mật</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Điều khoản dịch vụ</Link>
            <Link href="/support" className="hover:text-slate-300 transition-colors">Trung tâm hỗ trợ</Link>
          </div>

          <p>© {new Date().getFullYear()} Social. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
