"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

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

interface WorkflowStepCardProps {
  step: WorkflowStep
  stepNumber: number
  isCompleted?: boolean
  isActive?: boolean
  onToggleComplete?: (stepId: string) => void
  isBlocked?: boolean
}

const priorityColors = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  low: "bg-green-50 text-green-700 border-green-200",
}

const difficultyColors = {
  beginner: "bg-green-50 text-green-600",
  intermediate: "bg-yellow-50 text-yellow-600",
  advanced: "bg-red-50 text-red-600",
}

const pricingColors = {
  free: "bg-green-50 text-green-600",
  freemium: "bg-blue-50 text-blue-600",
  paid: "bg-purple-50 text-purple-600",
}

export function WorkflowStepCard({
  step,
  stepNumber,
  isCompleted = false,
  isActive = false,
  onToggleComplete,
  isBlocked = false,
}: WorkflowStepCardProps) {
  return (
    <Card
      className={`p-6 transition-all duration-300 ${
        isCompleted
          ? "bg-green-50 border-green-200"
          : isActive
            ? "bg-blue-50 border-blue-200 shadow-lg"
            : isBlocked
              ? "bg-slate-50 border-slate-200 opacity-60"
              : "bg-white border-slate-200 hover:shadow-md"
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isActive
                    ? "bg-blue-500 text-white"
                    : isBlocked
                      ? "bg-slate-300 text-slate-500"
                      : "bg-slate-200 text-slate-600"
              }`}
            >
              {isCompleted ? <CheckCircle className="w-4 h-4" /> : stepNumber}
            </div>
            <div>
              <h3 className={`font-semibold ${isBlocked ? "text-slate-500" : "text-slate-900"}`}>{step.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className={priorityColors[step.priority]}>
                  {step.priority} priority
                </Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                  {step.category}
                </Badge>
                {isBlocked && (
                  <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-300">
                    blocked
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className={`flex items-center space-x-2 ${isBlocked ? "text-slate-400" : "text-slate-500"}`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm">{step.estimatedTime}</span>
          </div>
        </div>

        {/* Description */}
        <p className={`leading-relaxed ${isBlocked ? "text-slate-400" : "text-slate-600"}`}>{step.description}</p>

        {/* Dependencies */}
        {step.dependencies.length > 0 && (
          <div className="flex items-center space-x-2">
            <AlertCircle className={`w-4 h-4 ${isBlocked ? "text-slate-400" : "text-amber-500"}`} />
            <span className={`text-sm ${isBlocked ? "text-slate-400" : "text-slate-600"}`}>
              Requires: {step.dependencies.join(", ")}
            </span>
          </div>
        )}

        {/* Tools */}
        {step.tools.length > 0 && (
          <div className="space-y-3">
            <h4 className={`font-medium ${isBlocked ? "text-slate-500" : "text-slate-900"}`}>Recommended Tools:</h4>
            <div className="space-y-2">
              {step.tools.map((tool, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isBlocked ? "bg-slate-100" : "bg-slate-50"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`font-medium ${isBlocked ? "text-slate-500" : "text-slate-900"}`}>
                        {tool.name}
                      </span>
                      <Badge variant="outline" className={pricingColors[tool.pricing]}>
                        {tool.pricing}
                      </Badge>
                      <Badge variant="outline" className={difficultyColors[tool.difficulty]}>
                        {tool.difficulty}
                      </Badge>
                    </div>
                    <p className={`text-sm ${isBlocked ? "text-slate-400" : "text-slate-600"}`}>{tool.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(tool.url, "_blank")}
                    className={`${isBlocked ? "text-slate-400" : "text-blue-600 hover:text-blue-700"}`}
                    disabled={isBlocked}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {onToggleComplete && (
          <Button
            onClick={() => onToggleComplete(step.id)}
            variant={isCompleted ? "outline" : "default"}
            className="w-full"
            disabled={isBlocked && !isCompleted}
          >
            {isCompleted ? "Mark as Incomplete" : isBlocked ? "Complete Dependencies First" : "Mark as Complete"}
          </Button>
        )}
      </div>
    </Card>
  )
}
