import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* Top left - Chat/Communication icon */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-500 rounded-2xl shadow-lg transform rotate-12 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>

        {/* Top right - Calendar */}
        <div className="absolute top-16 right-20 w-20 h-20 bg-white rounded-2xl shadow-xl transform -rotate-6 flex flex-col items-center justify-center border">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-t-lg w-full text-center">JAN</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">23</div>
        </div>

        {/* Left side - Search/Analytics */}
        <div className="absolute top-1/2 left-16 w-14 h-14 bg-white rounded-full shadow-lg transform -translate-y-1/2 rotate-12 flex items-center justify-center">
          <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Right side - Video call */}
        <div className="absolute top-1/2 right-16 w-16 h-16 bg-blue-400 rounded-2xl shadow-lg transform -translate-y-1/2 -rotate-12 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
          </svg>
        </div>

        {/* Bottom floating elements */}
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gray-200 rounded-xl shadow-md transform rotate-45 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600 transform -rotate-45"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="absolute bottom-40 right-1/4 w-10 h-10 bg-purple-100 rounded-lg shadow-sm transform -rotate-12"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none hidden md:block lg:hidden">
        {/* Simplified decorative elements for tablet */}
        <div className="absolute top-20 left-10 w-12 h-12 bg-blue-500 rounded-xl shadow-lg transform rotate-12 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="absolute top-16 right-10 w-16 h-16 bg-white rounded-xl shadow-lg transform -rotate-6 flex flex-col items-center justify-center border">
          <div className="bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-t-lg w-full text-center">JAN</div>
          <div className="text-lg font-bold text-gray-800">23</div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {/* Hero Section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <p className="font-serif text-blue-500 text-base sm:text-lg font-medium">
                Save, track and refine workflows
              </p>
              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Workflow tells you where
                <span className="block">you went wrong</span>
              </h1>
              <p className="font-serif text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                Scrabble learns from your open tabs, tools, and habits to suggest next-best actions.Think of it as your workflow co-pilot — always analyzing, always optimizing.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-gray-900 px-4 sm:px-0">
                Development AI that helps during the build, not after.
              </h2>
              <p className="font-serif text-blue-400 text-base sm:text-lg">Try Scrabble on your next project today.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-xl shadow-lg"
              >
                <svg
  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <path d="M12 .296c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.044.138 3.003.404 2.293-1.552 3.3-1.23 3.3-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .317.216.686.825.57C20.565 22.092 24 17.592 24 12.296 24 5.669 18.627.296 12 .296z" />
</svg>

                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white border-gray-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-xl shadow-lg"
              >
                <svg
  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
  fill="currentColor"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm6 12 6-4-6-4v8z" />
</svg>

                Book for a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
