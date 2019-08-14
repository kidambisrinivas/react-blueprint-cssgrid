export function getCurrentRoute() {
  let path = window.location.href;
  return path.replace(window.location.origin, "");
}
