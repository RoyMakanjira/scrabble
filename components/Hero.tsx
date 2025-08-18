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
                You deploy way more than you think
              </p>
              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Workflow tells you where
                <span className="block">you went wrong</span>
              </h1>
              <p className="font-serif text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                After every deployment, Workflow tells you how to improve, whether you're building features, fixing
                bugs, managing releases, or just coding.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-gray-900 px-4 sm:px-0">
                Development AI that helps during the build, not after.
              </h2>
              <p className="font-serif text-blue-400 text-base sm:text-lg">Try Workflow on your next project today.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-xl shadow-lg"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Get for Mac
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white border-gray-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-xl shadow-lg"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v18l-6-1.5V3.5L20 3zm-8 8.25V5.13L8.5 4.5v6.48L12 11.25z" />
                </svg>
                Get for Windows
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
