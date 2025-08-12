"use server"

import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

const deepseek = createOpenAI({
  name: "deepseek",
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://api.deepseek.com/v1/chat/completions",
})

interface WorkflowStep {
  id: string
  title: string
  description: string
  estimatedTime: string
  tools: Tool[]
  dependencies: string[]
  priority: "high" | "medium" | "low"
  category: string
  completed?: boolean
}

interface Tool {
  name: string
  description: string
  category: string
  url: string
  pricing: "free" | "freemium" | "paid"
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface PreciseWorkflow {
  title: string
  description: string
  totalEstimatedTime: string
  complexity: "simple" | "moderate" | "complex"
  steps: WorkflowStep[]
  recommendedTools: Tool[]
  efficiencyTips: string[]
  alternatives: string[]
}

// Export WorkflowPlan as alias for PreciseWorkflow to match page.tsx imports
export type WorkflowPlan = PreciseWorkflow

export async function generatePreciseWorkflow(query: string, context?: string): Promise<PreciseWorkflow> {
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error("DEEPSEEK_API_KEY is not configured")
    return getFallbackWorkflow(query)
  }

  try {
    const { text } = await generateText({
      model: deepseek("deepseek-chat"),
      system: `You are an expert workflow architect and efficiency consultant. Your task is to create precise of the task in the prompt, step-by-step workflows that maximize efficiency and minimize wasted effort.

      You must analyze the user's request and create a comprehensive workflow with:
      1. Clear, actionable steps in logical order
      2. Time estimates for each step
      3. Tool recommendations with specific use cases
      4. Dependencies between steps
      5. Efficiency optimization tips
      6. Alternative approaches

      IMPORTANT: Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
      {
        "title": "Workflow Title",
        "description": "Brief overview of what this workflow accomplishes",
        "totalEstimatedTime": "X hours/days",
        "complexity": "simple",
        "steps": [
          {
            "id": "step-1",
            "title": "Step Title",
            "description": "Detailed description of what to do in this step",
            "estimatedTime": "X minutes/hours",
            "tools": [
              {
                "name": "Tool Name",
                "description": "Why this tool is perfect for this step",
                "category": "Category",
                "url": "https://example.com",
                "pricing": "free",
                "difficulty": "beginner"
              }
            ],
            "dependencies": [],
            "priority": "high",
            "category": "Planning",
            "completed": false
          }
        ],
        "recommendedTools": [
          {
            "name": "Primary Tool",
            "description": "Core tool for the entire workflow",
            "category": "Category",
            "url": "https://example.com",
            "pricing": "free",
            "difficulty": "beginner"
          }
        ],
        "efficiencyTips": [
          "Specific tip to save time or improve quality"
        ],
        "alternatives": [
          "Alternative approach or tool if primary doesn't work"
        ]
      }

      Guidelines:
      - Create 4-8 logical steps that build upon each other
      - Be specific about time estimates (realistic, not optimistic)
      - Recommend tools that actually integrate well together
      - Include both free and premium options
      - Consider different skill levels
      - Focus on practical, actionable advice
      - Prioritize efficiency and quality outcomes`,

      prompt: `Create a precise, step-by-step workflow for: "${query}"
      
      ${context ? `Additional context: ${context}` : ""}
      
      Focus on:
      1. Maximum efficiency - eliminate unnecessary steps
      2. Tool integration - recommend tools that work well together
      3. Clear dependencies - what must be done before each step
      4. Realistic time estimates
      5. Quality outcomes - not just speed
      
      Make this workflow actionable and specific enough that someone could follow it immediately.`,
    })

    let cleanedText = text.trim()

    // Remove markdown code blocks if present
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
    }

    // Try to find JSON object if there's extra text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanedText = jsonMatch[0]
    }

    const workflow = JSON.parse(cleanedText)

    if (!workflow.title || !workflow.steps || !Array.isArray(workflow.steps)) {
      throw new Error("Invalid workflow structure returned from AI")
    }

    return workflow
  } catch (error) {
    console.error("Error generating precise workflow:", error)
    console.error("Error details:", error instanceof Error ? error.message : String(error))

    return getFallbackWorkflow(query)
  }
}

function getFallbackWorkflow(query: string): PreciseWorkflow {
  return {
    title: `Workflow: ${query}`,
    description: "A structured approach to accomplish your goals efficiently",
    totalEstimatedTime: "2-4 hours",
    complexity: "moderate",
    steps: [
      {
        id: "step-1",
        title: "Planning & Research",
        description: "Define objectives, gather requirements, and research best practices for your project",
        estimatedTime: "30-45 minutes",
        tools: [
          {
            name: "Notion",
            description: "Organize research and create project structure",
            category: "Productivity",
            url: "https://notion.so",
            pricing: "freemium",
            difficulty: "beginner",
          },
          {
            name: "Miro",
            description: "Create visual mind maps and workflow diagrams",
            category: "Design",
            url: "https://miro.com",
            pricing: "freemium",
            difficulty: "beginner",
          },
        ],
        dependencies: [],
        priority: "high",
        category: "Planning",
        completed: false,
      },
      {
        id: "step-2",
        title: "Setup & Preparation",
        description: "Set up necessary tools, accounts, and workspace for efficient execution",
        estimatedTime: "45-60 minutes",
        tools: [
          {
            name: "Slack",
            description: "Set up communication channels for team coordination",
            category: "Communication",
            url: "https://slack.com",
            pricing: "freemium",
            difficulty: "beginner",
          },
        ],
        dependencies: ["step-1"],
        priority: "high",
        category: "Planning",
        completed: false,
      },
      {
        id: "step-3",
        title: "Core Implementation",
        description: "Execute the main work based on your plan and research",
        estimatedTime: "2-3 hours",
        tools: [],
        dependencies: ["step-2"],
        priority: "high",
        category: "Development",
        completed: false,
      },
      {
        id: "step-4",
        title: "Review & Optimization",
        description: "Test, review, and optimize your work for quality and efficiency",
        estimatedTime: "30-45 minutes",
        tools: [],
        dependencies: ["step-3"],
        priority: "medium",
        category: "Testing",
        completed: false,
      },
    ],
    recommendedTools: [
      {
        name: "DeepSeek Chat",
        description: "AI assistant for guidance throughout the workflow",
        category: "AI Assistant",
        url: "https://chat.deepseek.com",
        pricing: "freemium",
        difficulty: "beginner",
      },
      {
        name: "Todoist",
        description: "Track progress and manage tasks efficiently",
        category: "Productivity",
        url: "https://todoist.com",
        pricing: "freemium",
        difficulty: "beginner",
      },
    ],
    efficiencyTips: [
      "Break large tasks into smaller, manageable chunks of 25-45 minutes",
      "Use time-blocking to maintain focus on each step without distractions",
      "Set up templates for recurring workflow patterns to save setup time",
      "Use the Pomodoro technique during implementation phases",
    ],
    alternatives: [
      "Consider using project management tools like Asana or Monday.com for complex workflows",
      "Adapt the timeline based on your experience level - beginners should add 50% more time",
      "For team projects, add collaboration checkpoints between major steps",
      "Use automation tools like Zapier to connect different workflow tools",
    ],
  }
}

export async function optimizeExistingWorkflow(workflowDescription: string): Promise<string[]> {
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error("DEEPSEEK_API_KEY is not configured")
    return getFallbackOptimizations()
  }

  try {
    const { text } = await generateText({
      model: deepseek("deepseek-chat"),
      system: `You are a workflow optimization expert. Analyze existing workflows and provide specific, actionable improvements.
      
      Return your response as a JSON array of optimization suggestions (no markdown, no extra text):
      [
        "Specific optimization tip with clear action",
        "Another concrete improvement suggestion"
      ]
      
      Focus on:
      - Eliminating bottlenecks
      - Reducing context switching
      - Improving tool integration
      - Automating repetitive tasks
      - Enhancing quality control`,

      prompt: `Analyze this workflow and suggest 4-6 specific optimizations: "${workflowDescription}"
      
      Provide concrete, actionable suggestions that would measurably improve efficiency or quality.`,
    })

    let cleanedText = text.trim()

    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
    }

    const arrayMatch = cleanedText.match(/\[[\s\S]*\]/)
    if (arrayMatch) {
      cleanedText = arrayMatch[0]
    }

    const optimizations = JSON.parse(cleanedText)

    return Array.isArray(optimizations) ? optimizations : getFallbackOptimizations()
  } catch (error) {
    console.error("Error optimizing workflow:", error)
    console.error("Error details:", error instanceof Error ? error.message : String(error))
    return getFallbackOptimizations()
  }
}

function getFallbackOptimizations(): string[] {
  return [
    "Batch similar tasks together to reduce context switching and maintain focus",
    "Set up templates and checklists for recurring workflow patterns",
    "Use automation tools like Zapier or Make to handle repetitive steps",
    "Implement quality checkpoints at key milestones to catch issues early",
    "Create a dedicated workspace free from distractions during focused work",
    "Use time-tracking tools to identify and eliminate time-wasting activities",
  ]
}
