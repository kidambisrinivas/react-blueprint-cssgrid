import React from "react";
import ReactDOM from "react-dom";
import * as _ from "lodash";

import * as serviceWorker from "./serviceWorker";

import "./index.css";
import App from "./App";
import { isSignedIn } from "./apis/login";
import { Login } from "./pages/Login";

export async function renderWithLogin(): Promise<JSX.Element> {
  let route = window.location.href.replace(window.location.origin, "");
  let isLoginRoute: boolean = !_.isEmpty(route.match(/\/login/));
  let showLoginPage: boolean = isLoginRoute;
  if (process.env.NODE_ENV === "production") {
    const signedIn = await isSignedIn();
    if (!signedIn) showLoginPage = true;
  }
  if (showLoginPage) {
    let nextRoute = route;
    if (isLoginRoute) nextRoute = route.replace("/login", "/cut");
    return <Login nextRoute={nextRoute} />;
  } else return <App />;
}

async function main() {
  let page = await renderWithLogin();
  ReactDOM.render(page, document.getElementById("root"));
}

main();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
