"use client"

import { useState } from "react"
import { Search, ArrowRight, Brain, Zap, Target, Clock, CheckCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WorkflowStepCard } from "@/components/workflow-step-card"
import { generatePreciseWorkflow, optimizeExistingWorkflow, type PreciseWorkflow } from "@/lib/enhanced-actions"
import NavBar from "@/components/NavBar"
import WorkflowCard from "@/components/WorkflowCard"
import Hero from "@/components/Hero"

interface Tool {
  name: string
  description: string
  category: string
  url: string
  pricing: "free" | "freemium" | "paid"
  difficulty: "beginner" | "intermediate" | "advanced"
}

interface WorkflowStep {
  id: string
  title: string
  description: string
  estimatedTime: string
  tools: Tool[]
  dependencies: string[]
  priority: "high" | "medium" | "low"
  category: string
}

const complexityColors = {
  simple: "bg-green-50 text-green-700 border-green-200",
  moderate: "bg-yellow-50 text-yellow-700 border-yellow-200",
  complex: "bg-red-50 text-red-700 border-red-200",
}

export default function PreciseWorkflowGenerator() {
  const [query, setQuery] = useState("")
  const [workflow, setWorkflow] = useState<PreciseWorkflow | null>(null)
  const [optimizations, setOptimizations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [activeStep, setActiveStep] = useState<string | null>(null)

  const handleGenerateWorkflow = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const generatedWorkflow = await generatePreciseWorkflow(query)
      setWorkflow(generatedWorkflow)
      setCompletedSteps(new Set())
      setActiveStep(generatedWorkflow.steps[0]?.id || null)

      // Generate optimizations
      const workflowDescription = `${generatedWorkflow.title}: ${generatedWorkflow.description}`
      const optimizationSuggestions = await optimizeExistingWorkflow(workflowDescription)
      setOptimizations(optimizationSuggestions)
    } catch (error) {
      console.error("Error generating workflow:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleComplete = (stepId: string) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId)
    } else {
      newCompleted.add(stepId)
    }
    setCompletedSteps(newCompleted)

    // Auto-advance to next incomplete step
    if (!newCompleted.has(stepId) && workflow) {
      const currentIndex = workflow.steps.findIndex((step) => step.id === stepId)
      const nextStep = workflow.steps.find((step, index) => index > currentIndex && !newCompleted.has(step.id))
      setActiveStep(nextStep?.id || null)
    }
  }

  const isStepBlocked = (stepId: string): boolean => {
    if (!workflow) return false
    const step = workflow.steps.find((s) => s.id === stepId)
    if (!step) return false

    return step.dependencies.some((depId) => !completedSteps.has(depId))
  }

  const completionPercentage = workflow ? Math.round((completedSteps.size / workflow.steps.length) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavBar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight">
              Automate{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your</span>
              <br />
              Workflows
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              Scrabble is your AI-powered co-pilot that transforms <br className="hidden sm:block" />
              "What should I do next?" into "Here's the fastest way to get it done"
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mt-8 sm:mt-12 px-4 sm:px-0">
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-xl p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Describe your project or goal (e.g., 'Launch a SaaS product', 'Create a marketing campaign')"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleGenerateWorkflow()}
                      className="pl-12 h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <Button
                    onClick={handleGenerateWorkflow}
                    disabled={isLoading || !query.trim()}
                    className="h-12 px-6 sm:px-8 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Generate <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center text-sm text-slate-500">Get precise, actionable workflows in seconds</div>
              </div>
            </Card>
          </div>

          {/* WorkflowCard */}
          <div className="flex justify-center mt-8 sm:mt-12 px-4">
            <div className="transform rotate-1 sm:rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
              <WorkflowCard />
            </div>
          </div>

          <Hero />
        </div>
      </div>

      {/* Workflow Results */}
      {workflow && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Workflow Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{workflow.title}</h2>
                <p className="text-slate-600 text-base sm:text-lg">{workflow.description}</p>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{completionPercentage}%</div>
                <div className="text-sm text-slate-500">Complete</div>
              </div>
            </div>

            {/* Badges and Metadata */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Badge variant="outline" className={complexityColors[workflow.complexity]}>
                {workflow.complexity} complexity
              </Badge>
              <div className="flex items-center space-x-2 text-slate-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm sm:text-base">{workflow.totalEstimatedTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Target className="w-4 h-4" />
                <span className="text-sm sm:text-base">{workflow.steps.length} steps</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 text-center sm:text-left">Workflow Steps</h3>
            <div className="space-y-3 sm:space-y-4">
              {workflow.steps.map((step, index) => (
                <WorkflowStepCard
                  key={step.id}
                  step={step}
                  stepNumber={index + 1}
                  isCompleted={completedSteps.has(step.id)}
                  isActive={activeStep === step.id}
                  onToggleComplete={handleToggleComplete}
                  isBlocked={isStepBlocked(step.id)}
                />
              ))}
            </div>
          </div>

          {/* Core Tools & Optimizations */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Recommended Tools */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                Core Tools
              </h3>
              <div className="space-y-3">
                {workflow.recommendedTools.map((tool, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-slate-50 rounded-lg space-y-2 sm:space-y-0"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900 text-sm sm:text-base">{tool.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {tool.pricing}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{tool.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(tool.url, "_blank")}
                      className="text-blue-600 hover:text-blue-700 self-start sm:self-center"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Efficiency Tips */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-amber-600" />
                Efficiency Tips
              </h3>
              <div className="space-y-3">
                {workflow.efficiencyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700">{tip}</p>
                  </div>
                ))}
                {optimizations.map((optimization, index) => (
                  <div key={`opt-${index}`} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Brain className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700">{optimization}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Alternatives */}
          {workflow.alternatives.length > 0 && (
            <Card className="p-4 sm:p-6 mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 text-center sm:text-left">
                Alternative Approaches
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {workflow.alternatives.map((alternative, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-slate-700 text-sm sm:text-base">{alternative}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Precision Workflow Features</h2>
          <p className="text-slate-600 text-sm sm:text-base px-4">
            Advanced capabilities designed for maximum efficiency and results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="bg-white border-slate-200 shadow-sm p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Step-by-Step Precision</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Get detailed, actionable steps with time estimates, dependencies, and priority levels. No more guessing
              what to do next.
            </p>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Integrated Tool Ecosystem</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Recommendations for tools that actually work together, with pricing and difficulty levels to match your
              needs and budget.
            </p>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">AI-Powered Optimization</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              DeepSeek AI analyzes your workflow and provides specific optimization suggestions to eliminate bottlenecks
              and improve efficiency.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
