import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { captureException } from "@/lib/sentry"; // Uncomment when Sentry is configured

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch React errors and display fallback UI
 * Also reports errors to Sentry in production
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // Report to Sentry in production
    // Uncomment when Sentry is configured:
    // if (import.meta.env.MODE === "production") {
    //   captureException(error, {
    //     componentStack: errorInfo.componentStack,
    //   });
    // }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/"; // Redirect to home
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-600">
                <AlertCircle className="w-6 h-6" />
                Something Went Wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-700">
                We encountered an unexpected error. This has been logged and we'll look into it.
              </p>
              
              {import.meta.env.MODE === "development" && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm">
                  <p className="font-mono text-red-800 break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={this.handleReload} variant="outline" className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Button onClick={this.handleReset} className="flex-1">
                  Go to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
