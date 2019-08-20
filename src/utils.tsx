import React from "react";
import { Spinner } from "@blueprintjs/core";
import * as moment from "moment";

// getCurrentRoute gets current URL from address bar
export function getCurrentRoute(): string {
  let path = window.location.href;
  return path.replace(window.location.origin, "");
}

// Strip query params and hash params from URL
export function getPathFromRoute(activeRoute: string): string {
  activeRoute = activeRoute.replace(/\?.*/, "");
  activeRoute = activeRoute.replace(/#.*/, "");
  return activeRoute;
}

// Return a component or loading component based on a flag
export function getLoadingComponent(
  c: JSX.Element,
  isLoading: boolean
): JSX.Element {
  if (isLoading) return <Spinner size={Spinner.SIZE_STANDARD} />;
  return c;
}

export function getLocalDateStr(utcEpoch: number) {
  return moment
    .utc(utcEpoch)
    .local()
    .toString()
    .replace(/GMT.*/, "");
}
