import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// rotas públicas que não exigem autenticação
const isPublicRoute = createRouteMatcher([
  "/", 
  "/planos", 
  "/termos-de-uso", 
  "/politica-de-privacidade", 
  "/api/webhook", 
  "/api/chat"
]);

export default clerkMiddleware(async (auth, req) => {
  // Só protege as rotas que NÃO estão em isPublicRoute
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};