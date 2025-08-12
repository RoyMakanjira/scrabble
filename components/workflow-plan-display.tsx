"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2, Lightbulb, ExternalLink, ArrowRight, Zap, DollarSign, Star } from "lucide-react"
import type { WorkflowPlan } from "@/lib/enhanced-actions"
import { WorkflowStepCard } from "./workflow-step-card"

interface WorkflowPlanDisplayProps {
  workflow: WorkflowPlan
}

export function WorkflowPlanDisplay({ workflow }: WorkflowPlanDisplayProps) {
  const [steps, setSteps] = useState(workflow.steps)

  const completedSteps = steps.filter((step) => step.completed).length
  const progressPercentage = (completedSteps / steps.length) * 100

  const handleToggleComplete = (stepId: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === stepId ? { ...step, completed: !step.completed } : step)),
    )
  }

  const isStepBlocked = (step: (typeof steps)[0]) => {
    return step.dependencies.some((depId) => !steps.find((s) => s.id === depId)?.completed)
  }

  const getPricingColor = (pricing: string) => {
    if (pricing.toLowerCase().includes("free")) return "text-green-600"
    if (pricing.includes("$")) return "text-blue-600"
    return "text-slate-600"
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* Workflow Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          DeepSeek AI Generated Workflow
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{workflow.title}</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">{workflow.description}</p>

        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">Total time: {workflow.totalEstimatedTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">{steps.length} steps</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-slate-500">
            {completedSteps} of {steps.length} steps completed ({Math.round(progressPercentage)}%)
          </p>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">Step-by-Step Process</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <WorkflowStepCard
              key={step.id}
              step={step}
              stepNumber={index + 1}
              onToggleComplete={handleToggleComplete}
              isBlocked={isStepBlocked(step)}
            />
          ))}
        </div>
      </div>

      {/* Tool Ecosystem */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">Recommended Tool Ecosystem</h3>
        <p className="text-slate-600">These tools work together seamlessly to maximize your workflow efficiency.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflow.recommendedTools.map((tool, index) => (
            <Card
              key={index}
              className="bg-white border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h4>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    {tool.category}
                  </Badge>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">{tool.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className={getPricingColor(tool.pricing)}>{tool.pricing}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {tool.difficulty}
                  </Badge>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 h-auto font-medium w-full justify-start"
                  onClick={() => window.open(tool.url, "_blank")}
                >
                  Try {tool.name} <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Efficiency Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-amber-50 border-amber-200 p-6">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-6 h-6 text-amber-600 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">Efficiency Tips</h3>
              <ul className="space-y-2">
                {workflow.efficiencyTips.map((tip, index) => (
                  <li key={index} className="text-amber-800 text-sm flex items-start space-x-2">
                    <Zap className="w-3 h-3 mt-1 text-amber-600 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card className="bg-blue-50 border-blue-200 p-6">
          <div className="flex items-start space-x-3">
            <Star className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">Alternative Approaches</h3>
              <ul className="space-y-2">
                {workflow.alternatives.map((alternative, index) => (
                  <li key={index} className="text-blue-800 text-sm flex items-start space-x-2">
                    <ArrowRight className="w-3 h-3 mt-1 text-blue-600 flex-shrink-0" />
                    <span>{alternative}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
