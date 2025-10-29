/**
 * Sentry error tracking configuration
 * 
 * To enable Sentry:
 * 1. Sign up at https://sentry.io and create a new project
 * 2. Get your DSN from the project settings
 * 3. Add VITE_SENTRY_DSN to your .env file
 * 4. Add VITE_SENTRY_DSN to apps/web/src/env.ts
 * 5. Uncomment the initSentry() call in main.tsx
 * 6. Install: pnpm add @sentry/react
 */

import * as Sentry from "@sentry/react";

export function initSentry() {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  if (!sentryDsn) {
    console.warn("⚠️ Sentry DSN not configured. Error tracking disabled.");
    return;
  }

  try {
    Sentry.init({
      dsn: sentryDsn,
      environment: import.meta.env.MODE,
      integrations: [
        // Sentry.browserTracingIntegration(),
        // Sentry.replayIntegration({
        //   maskAllText: false,
        //   blockAllMedia: false,
        // }),
      ],
      // Performance Monitoring
      tracesSampleRate: import.meta.env.MODE === "production" ? 0.1 : 1.0, // 10% in prod, 100% in dev
      // Session Replay
      replaysSessionSampleRate: 0.1, // Sample 10% of sessions
      replaysOnErrorSampleRate: 1.0, // Record 100% of sessions with errors
      // Ignore common errors
      ignoreErrors: [
        // Browser extensions
        "top.GLOBALS",
        // Random plugins/extensions
        "originalCreateNotification",
        "canvas.contentDocument",
        "MyApp_RemoveAllHighlights",
        // Facebook borked
        "fb_xd_fragment",
        // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
        "bmi_SafeAddOnload",
        "EBCallBackMessageReceived",
        // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
        "conduitPage",
        // Network errors
        "NetworkError",
        "Network request failed",
        "Failed to fetch",
      ],
      denyUrls: [
        // Chrome extensions
        /extensions\//i,
        /^chrome:\/\//i,
        /^chrome-extension:\/\//i,
      ],
      beforeSend(event, hint) {
        // Filter out events from development
        if (import.meta.env.MODE === "development") {
          console.log("🐛 Sentry Event (dev mode, not sent):", event);
          return null; // Don't send in development
        }
        return event;
      },
    });

    console.log("✅ Sentry error tracking initialized");
  } catch (error) {
    console.error("⚠️ Failed to initialize Sentry:", error);
  }
}

/**
 * Capture an exception with Sentry
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (import.meta.env.MODE === "development") {
    console.error("🐛 Error (dev mode, not sent to Sentry):", error, context);
    return;
  }
  Sentry.captureException(error, { extra: context });
}

/**
 * Capture a message with Sentry
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = "info") {
  if (import.meta.env.MODE === "development") {
    console.log(`🐛 Message (dev mode, not sent to Sentry) [${level}]:`, message);
    return;
  }
  Sentry.captureMessage(message, level);
}

/**
 * Set user context for Sentry
 */
export function setUserContext(user: { id: string; email?: string; username?: string } | null) {
  if (user) {
    Sentry.setUser({ id: user.id, email: user.email, username: user.username });
  } else {
    Sentry.setUser(null);
  }
}

