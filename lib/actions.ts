"use server"

import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

const deepseek = createOpenAI({
  name: "deepseek",
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://api.deepseek.com/v1/chat/completions",
})

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

export async function generateToolSuggestions(query: string): Promise<Tool[]> {
  try {
    const { text } = await generateText({
      model: deepseek("deepseek-chat"),
      system: `You are an AI assistant that suggests the best tools and resources for any given task or query. 
      You must analyze the user's request carefully and provide highly relevant, practical workflow suggestions.
      
      Return your response as a JSON array of tools with the following structure:
      [
        {
          "name": "Tool Name",
          "description": "Brief description of what the tool does and why it's perfect for this workflow",
          "category": "Category (e.g., Design, Development, Research, Productivity, AI Tools, etc.)",
          "url": "https://example.com"
        }
      ]
      
      Guidelines for tool suggestions:
      - Suggest 4-6 highly relevant tools that would create an efficient workflow
      - Prioritize tools that work well together in a workflow
      - Include both popular and specialized tools when appropriate
      - Make sure all tools are real and URLs are accurate
      - Focus on tools that directly solve the user's specific needs
      - Consider the user's skill level and provide a mix of beginner-friendly and advanced tools`,
      prompt: `User query: "${query}". 
      
      Please analyze this request and suggest the best tools and resources that would create an efficient workflow for this specific task. Consider:
      1. What type of work this involves
      2. What tools would work best together
      3. Both free and premium options when relevant
      4. Tools that can streamline the entire process from start to finish`,
    })

    // Parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim()
    const tools = JSON.parse(cleanedText)

    return Array.isArray(tools) ? tools : []
  } catch (error) {
    console.error("Error generating tool suggestions:", error)

    return [
      {
        name: "DeepSeek Chat",
        description:
          "Advanced AI assistant for research, coding, and workflow optimization with reasoning capabilities",
        category: "AI Assistant",
        url: "https://chat.deepseek.com",
      },
      {
        name: "Notion",
        description: "All-in-one workspace for project planning, documentation, and workflow management",
        category: "Productivity",
        url: "https://notion.so",
      },
      {
        name: "Linear",
        description: "Modern issue tracking and project management for streamlined development workflows",
        category: "Project Management",
        url: "https://linear.app",
      },
      {
        name: "Figma",
        description: "Collaborative design tool for creating workflows, mockups, and design systems",
        category: "Design",
        url: "https://figma.com",
      },
    ]
  }
}

export async function analyzeTabs(tabs: TabInfo[]): Promise<string> {
  try {
    const tabsDescription = tabs.map((tab) => `${tab.title} (${tab.category})`).join(", ")

    const { text } = await generateText({
      model: deepseek("deepseek-chat"),
      system: `You are a helpful AI assistant that analyzes browser tabs to provide insightful, actionable workflow suggestions. 
      
      Analyze the user's open tabs and provide:
      1. A brief insight about their current workflow
      2. A practical suggestion for optimization or productivity
      
      Keep your response conversational, encouraging, and under 60 words. Focus on being genuinely helpful rather than generic.`,
      prompt: `The user currently has these tabs open: ${tabsDescription}. 
      
      Based on these tabs, what can you infer about their current workflow? Provide a helpful insight or suggestion that could improve their productivity or workflow efficiency.`,
    })

    return text
  } catch (error) {
    console.error("Error analyzing tabs:", error)
    return "I notice you have several productive tabs open! Consider using a workflow management tool like Notion or Linear to organize your research and create a more streamlined process. 🚀"
  }
}
