"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

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
      model: openai("gpt-4o"),
      system: `You are an AI assistant that suggests the best tools and resources for any given task or query. 
      Return your response as a JSON array of tools with the following structure:
      [
        {
          "name": "Tool Name",
          "description": "Brief description of what the tool does",
          "category": "Category (e.g., Design, Development, Research, etc.)",
          "url": "https://example.com"
        }
      ]
      
      Suggest 3-6 relevant tools that would be most helpful for the user's query. Make sure the tools are real and the URLs are accurate.`,
      prompt: `User query: "${query}". Please suggest the best tools and resources for this task.`,
    })

    // Parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim()
    const tools = JSON.parse(cleanedText)

    return Array.isArray(tools) ? tools : []
  } catch (error) {
    console.error("Error generating tool suggestions:", error)

    // Fallback suggestions
    return [
      {
        name: "ChatGPT",
        description: "AI assistant for research and writing help",
        category: "AI Assistant",
        url: "https://chat.openai.com",
      },
      {
        name: "Google Scholar",
        description: "Academic search engine for research papers",
        category: "Research",
        url: "https://scholar.google.com",
      },
      {
        name: "Notion",
        description: "All-in-one workspace for notes and organization",
        category: "Productivity",
        url: "https://notion.so",
      },
    ]
  }
}

export async function analyzeTabs(tabs: TabInfo[]): Promise<string> {
  try {
    const tabsDescription = tabs.map((tab) => `${tab.title} (${tab.category})`).join(", ")

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a helpful AI assistant that analyzes browser tabs to provide casual, friendly insights about the user's workflow. 
      Keep your response conversational and under 50 words. Focus on being helpful and encouraging.`,
      prompt: `The user has these tabs open: ${tabsDescription}. Provide a brief, casual notification about their workflow or suggest how they might be more productive.`,
    })

    return text
  } catch (error) {
    console.error("Error analyzing tabs:", error)
    return "I notice you have several development and design tabs open. Looks like you're working on something creative! 🚀"
  }
}
