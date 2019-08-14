import React from "react";
// import logo from "../logo.svg";
import * as _ from "lodash";
import { Classes, setHotkeysDialogProps } from "@blueprintjs/core";
import * as H from "history";

import { SideMenu } from "../components/SideMenu";
import { TopNavBar } from "../components/TopNavBar";
import { getPages, IPageNode, displayPage } from "./Pages";
import { getCurrentRoute } from "../utils";

const classNames = require("classnames");

export interface IDashboardProps {
  history: H.History;
}

export interface IDashboardState {
  useDarkTheme: boolean;
  themeName: string;
  pages: IPageNode[];
  activeRoute: string;
}

export class Dashboard extends React.PureComponent<
  IDashboardProps,
  IDashboardState
> {
  public constructor(props: IDashboardProps) {
    super(props);
    const tn: string = getTheme();
    const ud: boolean = tn === DARK_THEME;
    this.state = {
      useDarkTheme: ud,
      themeName: tn,
      pages: getPages(),
      activeRoute: window.location.pathname
    };
  }

  private handleMenuItemClick = (currentRoute: string, newRoute: string) => {
    this.setState(state => {
      const newState: IDashboardState = { ...state, activeRoute: newRoute };
      const historyState = { ...newState, pages: [] };
      this.props.history.push(newRoute, historyState);
      console.log(`NEXT_PAGE: ${JSON.stringify(historyState, null, 2)}`);
      return newState;
    });
  };

  private onBackButtonEvent = (e: any) => {
    e.preventDefault();
    let historyState = e.state;
    if (
      !_.isEmpty(e.state) &&
      !_.isEmpty(e.state.state) &&
      !_.isEmpty(e.state.state.activeRoute)
    ) {
      historyState = e.state.state;
    }
    this.setState(state => {
      if (_.isEmpty(historyState)) {
        let path = getCurrentRoute();
        console.log(`HISTORY_STATE_NULL: Setting active route to ${path}`);
        historyState = { activeRoute: path };
      }
      console.log(`HISTORY_STATE: ${JSON.stringify(historyState)}`);
      const newState = {
        ...state,
        activeRoute: historyState.activeRoute,
        useDarkTheme: historyState.useDarkTheme,
        themeName: historyState.themeName
      };
      console.log(`PREV_PAGE:${JSON.stringify({ ...newState, pages: null })}`);
      return newState;
    });
  };

  public componentDidMount = () => {
    window.onpopstate = this.onBackButtonEvent;
  };

  public render() {
    const rootClasses = classNames(
      "docs-root",
      "grid-container",
      { "docs-examples-only": window.location.search === "?examples" },
      this.state.themeName
    );
    console.log(`RENDER_PATHNAME: ${window.location.pathname}`);
    return (
      <React.Fragment>
        <div className={rootClasses}>
          <div className="header-area">
            <TopNavBar
              useDarkTheme={this.state.useDarkTheme}
              onToggleTheme={this.handleDarkSwitchChange}
              onMenuItemClick={this.handleMenuItemClick}
            />
          </div>
          <div className="menu-area">
            <SideMenu
              activeRoute={this.state.activeRoute}
              items={this.state.pages}
              level={1}
              onMenuItemClick={this.handleMenuItemClick}
            />
          </div>
          <div className="main-area">{displayPage()}</div>
          <div className="footer-area">Footer</div>
        </div>
      </React.Fragment>
    );
  }

  private handleDarkSwitchChange = (useDark: boolean) => {
    const nextThemeName = useDark ? DARK_THEME : LIGHT_THEME;
    setTheme(nextThemeName);
    setHotkeysDialogProps({ className: nextThemeName });
    this.setState({ themeName: nextThemeName, useDarkTheme: useDark });
  };
}

// Dark/Light Theme
const DARK_THEME = Classes.DARK;
const LIGHT_THEME = "";
const THEME_LOCAL_STORAGE_KEY = "blueprint-docs-theme";

/** Return the current theme className. */
export function getTheme(): string {
  return localStorage.getItem(THEME_LOCAL_STORAGE_KEY) || LIGHT_THEME;
}

/** Persist the current theme className in local storage. */
export function setTheme(themeName: string) {
  localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeName);
}
