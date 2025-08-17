"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { gsap } from "gsap"

interface WorkflowJob {
  id: string
  title: string
  description: string
  timestamp: string
  status: "completed" | "running" | "failed" | "pending"
  duration?: string
  branch?: string
}

const workflowJobs: WorkflowJob[] = [
  {
    id: "1",
    title: "Build and Test",
    description: "Running automated tests and building application artifacts...",
    timestamp: "2 minutes ago",
    status: "running",
    duration: "3m 24s",
    branch: "main",
  },
  {
    id: "2",
    title: "Deploy to Staging",
    description: "Deploying application to staging environment for testing...",
    timestamp: "15 minutes ago",
    status: "completed",
    duration: "2m 18s",
    branch: "develop",
  },
  {
    id: "3",
    title: "Security Scan",
    description: "Scanning codebase for security vulnerabilities and compliance...",
    timestamp: "1 hour ago",
    status: "completed",
    duration: "4m 52s",
    branch: "main",
  },
  {
    id: "4",
    title: "Code Quality Check",
    description: "Analyzing code quality metrics and enforcing standards...",
    timestamp: "2 hours ago",
    status: "failed",
    duration: "1m 33s",
    branch: "feature/auth",
  },
  {
    id: "5",
    title: "Database Migration",
    description: "Applying database schema changes and data migrations...",
    timestamp: "3 hours ago",
    status: "completed",
    duration: "5m 41s",
    branch: "main",
  },
  {
    id: "6",
    title: "Performance Tests",
    description: "Running load tests and performance benchmarks...",
    timestamp: "5 hours ago",
    status: "pending",
    branch: "develop",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500"
    case "running":
      return "bg-blue-500 animate-pulse"
    case "failed":
      return "bg-red-500"
    case "pending":
      return "bg-gray-400"
    default:
      return "bg-gray-400"
  }
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default"
    case "running":
      return "secondary"
    case "failed":
      return "destructive"
    case "pending":
      return "outline"
    default:
      return "outline"
  }
}

const randomMessages = [
  "Checking deployment status...",
  "Validating test results...",
  "Monitoring performance metrics...",
  "Reviewing code changes...",
  "Analyzing build artifacts...",
  "Verifying security compliance...",
  "Processing workflow logs...",
  "Updating deployment pipeline...",
  "Synchronizing with remote repository...",
  "Optimizing build configuration...",
]

const getRandomMessage = () => {
  return randomMessages[Math.floor(Math.random() * randomMessages.length)]
}

export default function WorkflowCard() {
  const [selectedJob, setSelectedJob] = useState<WorkflowJob | null>(null)
  const [hoveredJob, setHoveredJob] = useState<string | null>(null)
  const [hoverMessage, setHoverMessage] = useState<string>("")
  const [hoverProgress, setHoverProgress] = useState<number>(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timelineRef.current) {
      // Animate timeline dots on mount
      gsap.fromTo(
        ".timeline-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      )

      // Animate connecting lines
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.5,
          delay: 0.6,
          ease: "power2.out",
        },
      )
    }
  }, [])

  const handleJobClick = (job: WorkflowJob) => {
    setSelectedJob(job)

    // Animate job selection
    gsap.to(`.job-item-${job.id}`, {
      scale: 1.02,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })

    // Animate details panel
    if (detailsRef.current) {
      gsap.fromTo(detailsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
    }
  }

  const handleJobHover = (jobId: string) => {
    setHoveredJob(jobId)
    setHoverMessage(getRandomMessage())
    setHoverProgress(0)

    // Animate job item to the left
    gsap.to(`.job-item-${jobId}`, {
      x: -12,
      duration: 0.3,
      ease: "power2.out",
    })

    // Animate progress bar appearance
    gsap.fromTo(
      `.hover-content-${jobId}`,
      { opacity: 0, height: 0, y: -10 },
      { opacity: 1, height: "auto", y: 0, duration: 0.3, ease: "power2.out" },
    )

    // Animate progress bar fill
    gsap.to(
      {},
      {
        duration: 2,
        onUpdate: function () {
          const progress = this.progress() * 100
          setHoverProgress(progress)
        },
        ease: "power2.out",
      },
    )
  }

  const handleJobLeave = (jobId: string) => {
    setHoveredJob(null)
    setHoverProgress(0)

    // Animate job item back to original position
    gsap.to(`.job-item-${jobId}`, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    })

    // Animate hover content disappearance
    gsap.to(`.hover-content-${jobId}`, {
      opacity: 0,
      height: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card ref={cardRef} className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">App Production Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={timelineRef} className="relative">
            {workflowJobs.map((job, index) => (
              <div key={job.id} className="relative">
                {/* Timeline line */}
                {index < workflowJobs.length - 1 && (
                  <div className="timeline-line absolute left-2 top-8 w-0.5 h-12 bg-gray-200 origin-top" />
                )}

                {/* Job item */}
                <div
                  className={`job-item-${job.id} flex items-start space-x-4 pb-6 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors`}
                  onClick={() => handleJobClick(job)}
                  onMouseEnter={() => handleJobHover(job.id)}
                  onMouseLeave={() => handleJobLeave(job.id)}
                >
                  {/* Timeline dot */}
                  <div
                    className={`timeline-dot w-4 h-4 rounded-full ${getStatusColor(job.status)} flex-shrink-0 mt-1`}
                  />

                  {/* Job content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{job.title}</h3>
                      <span className="text-xs text-gray-500 ml-2">{job.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{job.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={getStatusBadgeVariant(job.status)} className="text-xs">
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                      {job.branch && <span className="text-xs text-gray-500">on {job.branch}</span>}
                    </div>

                    {/* Hover content with progress bar and message input */}
                    {hoveredJob === job.id && (
                      <div className={`hover-content-${job.id} mt-3 space-y-2 overflow-hidden`}>
                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-100 ease-out"
                            style={{ width: `${hoverProgress}%` }}
                          />
                        </div>

                        {/* Message input */}
                        <div className="flex items-center space-x-2">
                          <Input
                            type="text"
                            placeholder={hoverMessage}
                            className="text-xs h-7 bg-white border-gray-300 focus:border-blue-500"
                            readOnly
                          />
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs bg-transparent">
                            Send
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="text-sm text-blue-600 hover:text-blue-800 mt-4"
            onClick={() => {
              gsap.to(window, { scrollTo: 0, duration: 0.5, ease: "power2.out" })
            }}
          >
            View changelog →
          </Button>
        </CardContent>
      </Card>

      {/* Job Details Panel */}
      {selectedJob && (
        <Card ref={detailsRef} className="shadow-lg border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Job Details: {selectedJob.title}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedJob(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <Badge variant={getStatusBadgeVariant(selectedJob.status)}>
                    {selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {selectedJob.duration && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Duration</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedJob.duration}</p>
                </div>
              )}

              {selectedJob.branch && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Branch</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                    {selectedJob.branch}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <p className="mt-1 text-sm text-gray-600">{selectedJob.description}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Timestamp</label>
              <p className="mt-1 text-sm text-gray-600">{selectedJob.timestamp}</p>
            </div>

            {selectedJob.status === "running" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-800 font-medium">Job is currently running...</span>
                </div>
              </div>
            )}

            {selectedJob.status === "failed" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-800 font-medium">Job failed - check logs for details</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
