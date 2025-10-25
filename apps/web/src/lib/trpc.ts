import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../../functions/src/trpc/router";

/**
 * tRPC React hooks for client-side
 */
export const trpc = createTRPCReact<AppRouter>();


