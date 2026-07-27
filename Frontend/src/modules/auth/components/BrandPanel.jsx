export default function BrandPanel() {
  return (
    <>
      {/* ── Mobile: logo + wordmark on light bg ── */}
      <div className="flex lg:hidden flex-col items-center justify-center px-6 pt-6 bg-[#F5F5F7]">
        <img
          src="/logo.jpeg"
          alt="Vower icon"
          className="h-32 w-32 object-cover rounded-2xl shadow-md"
        />
        {/* WORDLOGON.png is a square image with text in center — crop whitespace */}
        <div className="w-48 h-8 overflow-hidden mt-2">
          <img
            src="/WORDLOGON.png"
            alt="Vower"
            className="w-full h-auto mt-[-38%]"
          />
        </div>
      </div>

      {/* ── Desktop: full half-panel ── */}
      <div className="relative hidden lg:flex w-1/2 flex-col justify-between overflow-hidden bg-[#18181B] px-14 py-12">
        {/* Logo — extra large */}
        <div className="flex items-center justify-center z-10">
          <div className="rounded-3xl bg-[#18181B] p-1 overflow-hidden">
            <img
              src="/logo.jpeg"
              alt="Vower icon"
              className="h-44 w-44 object-contain rounded-3xl"
              style={{ mixBlendMode: 'lighten' }}
            />
          </div>
        </div>

        {/* Written Logo + Tagline — extra large */}
        <div className="z-10 flex flex-col items-center text-center">
          <img
            src="/WORDLOGON.png"
            alt="Vower"
            className="h-56 w-auto object-contain"
            style={{ filter: 'invert(1) contrast(2) brightness(1.5)', mixBlendMode: 'screen' }}
          />
          <p className="mt-5 text-2xl text-white/50">
            &ldquo;Powering Every Promise&rdquo;
          </p>
        </div>

        {/* Signature animation — scaled up */}
        <div className="z-10 flex flex-1 items-center justify-center">
          <div className="relative flex items-center scale-150">
            {/* Cable + plug, sliding toward the socket */}
            <div className="animate-plugSlide">
              <svg width="120" height="64" viewBox="0 0 120 64" fill="none">
                <path
                  d="M0 32h58"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.2"
                />
                <rect x="58" y="20" width="26" height="24" rx="4" fill="white" opacity="0.9" />
                <rect x="80" y="26" width="10" height="4" rx="1" fill="#18181B" />
                <rect x="80" y="34" width="10" height="4" rx="1" fill="#18181B" />
              </svg>
            </div>

            {/* Socket + expanding pulse rings */}
            <div className="relative -ml-1 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/20">
              <span className="absolute h-20 w-20 rounded-full border-2 border-white/40 animate-pulseRing" />
              <span
                className="absolute h-20 w-20 rounded-full border-2 border-white/40 animate-pulseRing"
                style={{ animationDelay: '1.2s' }}
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="animate-boltFlicker"
              >
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* Curved right-edge divider */}
        <div className="pointer-events-none absolute inset-y-0 -right-px z-20 w-24">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M100,0 C30,25 30,75 100,100 L100,0 Z" fill="#F5F5F7" />
          </svg>
        </div>

        {/* Ambient floating accents */}
        <div className="pointer-events-none absolute -right-10 top-1/4 h-40 w-40 rounded-full bg-white/5 blur-3xl animate-floatSlow" />
        <div
          className="pointer-events-none absolute -left-16 bottom-10 h-52 w-52 rounded-full bg-white/5 blur-3xl animate-floatSlow"
          style={{ animationDelay: '2s' }}
        />
      </div>
    </>
  )
}
