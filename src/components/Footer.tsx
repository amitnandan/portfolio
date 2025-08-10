export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-6 bg-[#0B0F14]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-white/60 text-sm">
          &copy; {new Date().getFullYear()} Amit Nandan. All rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://github.com/amitnandan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/12 border border-white/25 hover:bg-white/20 hover:border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.45)] hover:shadow-[0_0_20px_rgba(255,255,255,0.75)] transition focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-white" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.58 0-.287-.011-1.245-.017-2.259-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.467-1.332-5.467-5.932 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.172 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 6 0c2.292-1.552 3.298-1.23 3.298-1.23.655 1.649.243 2.869.12 3.172.77.84 1.235 1.911 1.235 3.221 0 4.61-2.806 5.625-5.479 5.922.431.372.816 1.103.816 2.223 0 1.606-.015 2.899-.015 3.293 0 .321.217.695.825.577C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"/>
            </svg>
          </a>

          <a
            href="https://linkedin.com/in/amit-nandan-an21"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#0077B5]/25 border border-[#0077B5]/45 hover:bg-[#0077B5]/35 hover:border-[#59b3e3] shadow-[0_0_12px_rgba(0,119,181,0.65)] hover:shadow-[0_0_22px_rgba(0,119,181,0.95)] transition focus:outline-none focus:ring-2 focus:ring-[#59b3e3]/60"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-white" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.984 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM.75 8.25h4.5v15h-4.5v-15zM8.25 8.25h4.309v2.051h.062c.6-1.138 2.067-2.338 4.259-2.338 4.556 0 5.395 3.001 5.395 6.9v8.387h-4.5v-7.44c0-1.776-.032-4.064-2.476-4.064-2.48 0-2.86 1.938-2.86 3.94v7.564h-4.5v-15z"/>
            </svg>
          </a>

          <a
            href="/resume"
            className="group flex items-center gap-2 pl-3 pr-3 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/30 shadow-[0_0_10px_rgba(255,215,0,0.6)] hover:shadow-[0_0_20px_rgba(255,215,0,0.85)] transition focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
            aria-label="Resume"
            title="Resume"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 2h8l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v6h6" />
            </svg>
            <span className="text-sm text-white/90 group-hover:text-white">Resume</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
