import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const isProtectedRoute = createRouteMatcher([
    '/profile(.*)',
    '/chat(.*)',
    '/tours(.*)',
  ]);
  
export default clerkMiddleware((auth, req) => {
  console.log("***",req)
    if (isProtectedRoute(req)) auth().protect();
});

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}