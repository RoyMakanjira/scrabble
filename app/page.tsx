"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Chrome,
  Sparkles,
  Zap,
  Brain,
  Globe,
  ArrowRight,
  Bell,
  Star,
  Users,
  Shield,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation - Cluely-inspired clean design */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Sparkles className="w-7 h-7 text-indigo-600" />
              <span className="text-xl font-bold text-slate-900">scrabble</span>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Features
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Pricing
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Enterprise
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Help Center
              </Button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                Log in
              </Button>
              <Button
                onClick={() =>
                  authClient.signIn.social({
                    provider: "github",
                    callbackURL: "/dashboard",
                    errorCallbackURL: "/login?error=true",
                  })
                }
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-6 z-50 max-w-sm">
          {notifications.map((notification, index) => (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-xl border-slate-200 shadow-lg mb-4 animate-slide-in-right"
            >
              <div className="p-4 flex items-start space-x-3">
                <Bell className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-700">{notification}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center space-y-8">
            {/* Hero Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                DeepSeek AI-Powered Workflow Intelligence
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Turn Chaos into{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Efficient
                </span>
                <br />
                Workflows
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                DeepSeek AI-powered workflow discovery that analyzes your needs and suggests comprehensive tool
                ecosystems. Get intelligent, multi-step workflow recommendations that actually work together.
              </p>
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white border-slate-200 shadow-xl p-8">
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        placeholder="Help me create a complete workflow for my project today"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        className="pl-12 h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <Button
                      onClick={handleSearch}
                      disabled={isLoading}
                      className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {/* Chrome Integration Status */}
                  <div className="flex items-center justify-center space-x-2 text-slate-500">
                    <Chrome className="w-4 h-4" />
                    <span className="text-sm">Analyzing {tabs.length} open tabs for context</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Tool Suggestions */}
        {tools.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">DeepSeek AI Workflow Recommendations</h2>
              <p className="text-slate-600">
                Comprehensive tool ecosystems designed to work together for maximum efficiency
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <Card
                  key={index}
                  className="bg-white border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {tool.name}
                      </h3>
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        {tool.category}
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{tool.description}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 h-auto font-medium"
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

        {/* Features Section */}
        <div className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Scrabble?</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Powerful features designed to streamline your workflow and boost productivity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-slate-200 shadow-sm p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">AI-Powered Matching</h3>
                <p className="text-slate-600 leading-relaxed">
                  DeepSeek AI analyzes your requirements and suggests complete workflow ecosystems, not just individual
                  tools. Get recommendations that actually work together.
                </p>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Context Awareness</h3>
                <p className="text-slate-600 leading-relaxed">
                  Intelligently reads your browser tabs and current projects to understand your workflow and provide
                  relevant suggestions.
                </p>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Instant Results</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get personalized tool recommendations in seconds, not minutes. Fast, accurate, and tailored to your
                  specific needs.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by Professionals</h2>
              <p className="text-xl text-slate-600">See what our users are saying about Scrabble</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-slate-200 shadow-sm p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  "Scrabble has completely transformed how I discover and use tools for my projects. The AI
                  recommendations are spot-on!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-semibold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Sarah Johnson</p>
                    <p className="text-sm text-slate-500">Product Designer</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  "The context awareness feature is incredible. It knows exactly what I need based on my current work."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Mike Chen</p>
                    <p className="text-sm text-slate-500">Software Engineer</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  "Saves me hours every week. I no longer waste time searching for the right tools - Scrabble finds them
                  for me."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-600 font-semibold">ER</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Emily Rodriguez</p>
                    <p className="text-sm text-slate-500">Marketing Manager</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-indigo-600 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who use Scrabble to discover the perfect tools for their projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-50 px-8 py-3 text-lg font-semibold">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 text-lg font-semibold bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-7 h-7 text-indigo-400" />
                <span className="text-xl font-bold">scrabble</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                AI-powered tool discovery that transforms chaotic workflows into efficient, productive systems. Discover
                the perfect tools for any task in seconds.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Features
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Integrations
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    API
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Chrome Extension
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Mobile App
                  </Button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    About Us
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Careers
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Press
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Blog
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Partners
                  </Button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Help Center
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Community
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Contact Us
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto font-normal">
                    Status
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-slate-400 text-sm">
                <span>© 2025 Scrabble. All rights reserved.</span>
                <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto text-sm font-normal">
                  Privacy Policy
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto text-sm font-normal">
                  Terms of Service
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white p-0 h-auto text-sm font-normal">
                  Cookie Policy
                </Button>
              </div>

              <div className="flex items-center space-x-4 text-slate-400 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>10,000+ users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>SOC 2 Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
