import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

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
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-100">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-error">
                <AlertCircle className="w-6 h-6" />
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-700">
                We encountered an unexpected error. Please try refreshing the page.
              </p>
              {this.state.error && (
                <details className="text-sm text-neutral-600">
                  <summary className="cursor-pointer font-medium">
                    Error details
                  </summary>
                  <pre className="mt-2 p-2 bg-neutral-50 rounded text-xs overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
              <Button onClick={this.handleReset} className="w-full gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

