export default function SuccessScreen() {
    return (
        <div className="w-full max-w-md px-2">
            {/* Mobile-only brand block */}
            <div className="mb-6 flex flex-col items-center text-center lg:hidden">
                <img
                    src="/logo.jpeg"
                    alt="Vower icon"
                    className="h-32 w-32 object-contain rounded-3xl shadow-lg shadow-black/10 relative z-10"
                />
                <img
                    src="/WORDLOGON.png"
                    alt="Vower"
                    className="h-28 w-auto object-contain -mt-6 relative z-0 scale-125"
                />
            </div>

            {/* Animated checkmark */}
            <div className="flex flex-col items-center text-center">
                <div className="animate-successPop flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                </div>

                <h2 className="font-display text-2xl font-bold text-volt-deep">
                    You're all set!
                </h2>
                <p className="mt-2 text-sm text-volt-deep/50 max-w-[260px]">
                    Your account has been verified. Welcome to Vower — let's get started.
                </p>

                <button
                    type="button"
                    onClick={() => {
                        // TODO: Navigate to the main app / dashboard
                        window.location.href = '/'
                    }}
                    className="mt-8 flex w-full max-w-xs items-center justify-center rounded-2xl bg-[#2A2A2E] py-4 text-base font-semibold text-white shadow-sm shadow-black/20 transition hover:bg-[#3A3A3E] active:scale-[0.97]"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}
