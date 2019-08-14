export function getCurrentRoute(): string {
  let path = window.location.href;
  return path.replace(window.location.origin, "");
}

export function getPathFromRoute(activeRoute: string): string {
  activeRoute = activeRoute.replace(/\?.*/, "");
  activeRoute = activeRoute.replace(/#.*/, "");
  return activeRoute;
}
