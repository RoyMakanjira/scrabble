"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Chrome, Sparkles, Zap, Brain, Globe, ArrowRight, Bell } from "lucide-react"
import { generateToolSuggestions, analyzeTabs } from "./actions"
import { authClient } from "@/lib/auth-client"

interface Tool {
  name: string
  description: string
  category: string
  url: string
}

interface TabInfo {
  title: string
  url: string
  category: string
}

export default function ScrabbleLanding() {
  const [query, setQuery] = useState("")
  const [tools, setTools] = useState<Tool[]>([])
  const [tabs, setTabs] = useState<TabInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])

  // Simulate Chrome tab reading (in real implementation, this would require a browser extension)
  useEffect(() => {
    const simulatedTabs = [
      { title: "React Documentation", url: "https://react.dev", category: "Development" },
      { title: "Figma Design", url: "https://figma.com", category: "Design" },
      { title: "GitHub Repository", url: "https://github.com", category: "Development" },
      { title: "Stack Overflow", url: "https://stackoverflow.com", category: "Development" },
    ]
    setTabs(simulatedTabs)

    // Analyze tabs and create notifications
    const analyzeTabsAsync = async () => {
      try {
        const analysis = await analyzeTabs(simulatedTabs)
        setNotifications([analysis])
      } catch (error) {
        console.error("Error analyzing tabs:", error)
      }
    }

    analyzeTabsAsync()
  }, [])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const suggestions = await generateToolSuggestions(query)
      setTools(suggestions)
    } catch (error) {
      console.error("Error generating suggestions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/30 backdrop-blur-xl border-gray-300/50 shadow-2xl">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-black" />
                <span className="text-xl font-bold text-black">scrabble</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-black hover:bg-gray-300/30 transition-all duration-300">
                  discover
                </Button>
                <Button 
                onClick={() => 
                  authClient.signIn.social({
                    provider: "github",
                    callbackURL: "/dashboard",
                    errorCallbackURL: "/login?error=true"
                  })
                }
                
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-black border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  login
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </nav>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-6 z-50 max-w-sm">
          {notifications.map((notification, index) => (
            <Card
              key={index}
              className="bg-white/30 backdrop-blur-xl border-gray-300/50 shadow-2xl mb-4 animate-slide-in-right"
            >
              <div className="p-4 flex items-start space-x-3">
                <Bell className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm text-black/90">{notification}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold text-black leading-tight">
              Turn Chaos into{" "}
              <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                efficient
              </span>
              <br />
              workflows...
            </h1>
            <p className="text-xl text-black/80 max-w-2xl mx-auto">
              AI-powered tool discovery that analyzes your workflow and suggests the perfect resources for any task
            </p>
          </div>

          {/* Search Section */}
          <Card className="bg-white/30 backdrop-blur-xl border-gray-300/50 shadow-2xl p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/60 w-5 h-5" />
                  <Input
                    placeholder="Hi help find the best resources for my assignment today"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-12 bg-white/10 border-white/20 text-black placeholder:text-black/60 focus:border-purple-400 transition-all duration-300"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-black border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </div>

              {/* Chrome Tabs Integration */}
              <div className="flex items-center justify-center space-x-2 text-black/60">
                <Chrome className="w-4 h-4" />
                <span className="text-sm">Analyzing {tabs.length} open tabs for context</span>
              </div>
            </div>
          </Card>

          {/* Tool Suggestions */}
          {tools.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-black">AI-Suggested Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                  <Card
                    key={index}
                    className="bg-white/30 backdrop-blur-xl border-gray-300/50 shadow-2xl hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-black group-hover:text-purple-300 transition-colors">
                          {tool.name}
                        </h3>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                          {tool.category}
                        </Badge>
                      </div>
                      <p className="text-black/70 text-sm">{tool.description}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-300 hover:text-black hover:bg-purple-500/20 transition-all duration-300"
                        onClick={() => window.open(tool.url, "_blank")}
                      >
                        Try it out <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <Card className="bg-white/20 backdrop-blur-xl border-gray-300/30 shadow-2xl p-6 text-center hover:bg-gray-300/20 transition-all duration-300">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">AI-Powered Matching</h3>
              <p className="text-black/70">Smart algorithms analyze your needs and suggest perfect tools</p>
            </Card>
            <Card className="bg-white/20 backdrop-blur-xl border-gray-300/30 shadow-2xl p-6 text-center hover:bg-gray-300/20 transition-all duration-300">
              <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">Context Awareness</h3>
              <p className="text-black/70">Reads your browser tabs to understand your current workflow</p>
            </Card>
            <Card className="bg-white/20 backdrop-blur-xl border-gray-300/30 shadow-2xl p-6 text-center hover:bg-gray-300/20 transition-all duration-300">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">Instant Results</h3>
              <p className="text-black/70">Get personalized tool recommendations in seconds</p>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/20 backdrop-blur-xl border-gray-300/30 shadow-2xl">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-2 text-black/70">
                <span>© 2025 Scrabble</span>
              </div>
              <div className="flex items-center space-x-6">
                <Button variant="ghost" size="sm" className="text-black/70 hover:text-black hover:bg-gray-300/20">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm" className="text-black/70 hover:text-black hover:bg-gray-300/20">
                  Terms
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </footer>
    </div>
  )
}
