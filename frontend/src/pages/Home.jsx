import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import coderImg from "../../assests/coder.png";

function Home() {
  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col font-sans selection:bg-[#0084ff]/30 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="border-b border-slate-900 bg-[#06080d]/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-2.5 group transition-transform duration-200"
          >
            <div className="size-8 rounded-lg bg-[#0084ff] flex items-center justify-center text-white shadow-[0_0_12px_rgba(0,132,255,0.4)] group-hover:scale-105 transition-transform">
              <Code2Icon className="size-5" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight font-sans">
              CodeS
            </span>
          </Link>

          {/* AUTH BTN */}
          <SignInButton mode="modal">
            <button className="px-5 py-2 bg-[#0084ff] hover:bg-[#0070e0] text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:scale-[1.03] shadow-[0_0_15px_rgba(0,132,255,0.25)] cursor-pointer">
              Get Started
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 w-full grow overflow-hidden">
        {/* Subtle Top Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-[#0084ff]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN (TEXT & CONTROLS) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col items-start">
            {/* Accent Line */}
            <div className="w-12 h-1 bg-[#0084ff] rounded-full" />

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.1]">
              Elevate Your Code, <br />
              <span className="text-[#0084ff]">Together.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[15px] sm:text-base text-slate-400 leading-relaxed max-w-md">
              A collaborative coding platform built for technical interviews, pair programming, and real-time problem solving.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                "Live Video Chat",
                "Code Editor",
                "Multi-Language"
              ].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-900 bg-[#0c0f16]/60 text-xs text-slate-300 font-medium"
                >
                  <div className="size-4 rounded-full border border-[#0084ff]/40 bg-[#0084ff]/10 flex items-center justify-center text-[#0084ff]">
                    <CheckIcon className="size-2.5 stroke-[3.5]" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-2">
              <SignInButton mode="modal">
                <button className="group flex items-center gap-2.5 px-7 py-3.5 bg-[#0084ff] hover:bg-[#0070e0] text-white rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_20px_rgba(0,132,255,0.4)] cursor-pointer">
                  <span>Start Coding Now</span>
                  <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignInButton>
            </div>
          </div>

          {/* RIGHT COLUMN (IMAGE & BADGES) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end relative">
            <div className="relative max-w-xl w-full group">
              {/* Glow behind image */}
              <div className="absolute -inset-1.5 bg-[#0084ff]/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              
              {/* The Image Container */}
              <div className="relative border border-slate-800/80 bg-[#0d1117] rounded-[22px] p-2 shadow-2xl overflow-hidden">
                <img
                  src={coderImg}
                  alt="CodeS Platform"
                  className="w-full h-auto rounded-2xl object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </div>

              {/* Floating Badge 1: LIVE SESSIONS (Top Right) */}
              <div className="absolute -top-3.5 -right-3.5 bg-[#0c0f16]/95 border border-slate-800 rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-lg backdrop-blur-md select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] tracking-wider font-extrabold text-slate-300 font-sans uppercase">
                  Live Sessions
                </span>
              </div>

              {/* Floating Badge 2: COLLABORATIVE (Bottom Left) */}
              <div className="absolute -bottom-4 -left-4 bg-[#0c0f16]/95 border border-slate-800 rounded-2xl p-3 flex items-center gap-3.5 shadow-xl backdrop-blur-md max-w-50 select-none">
                <div className="size-10 rounded-xl bg-[#0084ff]/10 border border-[#0084ff]/20 flex items-center justify-center text-[#0084ff] shrink-0">
                  <UsersIcon className="size-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">Collaborative</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-none">Pair Programming</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60 relative w-full">
        {/* Decorative Glow */}
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-[#0084ff]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to <span className="text-[#0084ff]">Succeed</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Powerful features designed to make your coding interviews seamless and productive.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: VideoIcon,
              title: "Video Call",
              desc: "Crystal clear video and low-latency audio for seamless communication during intense coding interviews."
            },
            {
              icon: Code2Icon,
              title: "Real-time Code Editor",
              desc: "Powerful shared IDE with syntax highlighting, IntelliSense, and support for 50+ programming languages."
            },
            {
              icon: UsersIcon,
              title: "Seamless Collaboration",
              desc: "Share your screen, discuss complex solutions, and learn from each other in an integrated workspace."
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative border border-slate-900 bg-[#0c0f16]/40 hover:border-slate-800/80 rounded-2xl p-8 hover:bg-[#0c0f16]/80 transition-all duration-300 flex flex-col items-start text-left"
              >
                {/* Card subtle neon top border highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#0084ff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

                {/* Icon Container */}
                <div className="size-12 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-[#0084ff] shadow-[0_0_15px_rgba(0,132,255,0.05)] group-hover:shadow-[0_0_15px_rgba(0,132,255,0.15)] group-hover:border-[#0084ff]/30 transition-all duration-300 mb-6 shrink-0">
                  <Icon className="size-5" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#0084ff] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-[#06080d] py-12 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* LOGO */}
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-[#0084ff] flex items-center justify-center text-white shadow-[0_0_10px_rgba(0,132,255,0.3)]">
              <Code2Icon className="size-5" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight font-sans">
              CodeS
            </span>
          </div>

          {/* GITHUB LINK */}
          <a
            href="https://github.com/Salil2005/CodeS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors duration-200"
            aria-label="GitHub Repository"
          >
            <svg
              className="size-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* COPYRIGHT */}
          <span className="text-xs text-slate-500 font-medium">
            © 2026 CodeS. Code together, learn together.
          </span>
        </div>
      </footer>

    </div>
  );
}

export default Home;