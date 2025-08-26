"use client"

import React from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {AlertTriangle, RefreshCw} from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode}, ErrorBoundaryState> {
  constructor(props: {children: React.ReactNode}) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true, error}
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
      if(this.state.hasError){
          return (
              <Card className="min-h-screen bg-background flex items-center justify-center p-4">
                  <CardHeader>
                      <CardTitle className="flex items-center text-red-600"><AlertTriangle className="mr-2"/> Something went wrong</CardTitle>
                      <CardDescription>
                          An unexpected error occurred. Please try again later.
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="mb-4">
                          {this.state.error?.message}
                      </div>
                      <Button variant="outline" onClick={() => window.location.reload()}><RefreshCw className="mr-2"/> Reload Page</Button>
                  </CardContent>
              </Card>
          )
      }
      return this.props.children
  }
}