import React from "react";
import * as _ from "lodash";
import * as H from "history";
import DocumentTitle from "react-document-title";
import { Classes, setHotkeysDialogProps } from "@blueprintjs/core";

import { SideMenu } from "../components/SideMenu";
import { TopNavBar } from "../components/TopNavBar";
import {
  getPages,
  IPageNode,
  displayPage,
  getTitleForRoute,
  isDataIntensivePage
} from "./Pages";
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
  title: string;
}

export class Dashboard extends React.PureComponent<
  IDashboardProps,
  IDashboardState
> {
  private firstPage: boolean = true;

  public constructor(props: IDashboardProps) {
    super(props);
    const tn: string = getTheme();
    const ud: boolean = tn === DARK_THEME;
    const pn = window.location.pathname;
    this.state = {
      useDarkTheme: ud,
      themeName: tn,
      pages: getPages(),
      activeRoute: pn,
      title: getTitleForRoute(pn)
    };
  }

  private handleMenuItemClick = (
    newRoute: string,
    title: string,
    replace: boolean
  ) => {
    this.setState(state => {
      const newState: IDashboardState = {
        ...state,
        activeRoute: newRoute,
        title: title
      };
      const historyState = { ...newState, pages: [] };
      console.log(`DASH_NEXT_PAGE: ${JSON.stringify(historyState, null, 2)}`);
      if (!replace) this.props.history.push(newRoute, historyState);
      else this.props.history.replace(newRoute, historyState);
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
        console.log(`DASH_HISTORY_NULL: Setting active route to ${path}`);
        historyState = { activeRoute: path, title: getTitleForRoute(path) };
      }
      const newState = {
        ...state,
        activeRoute: historyState.activeRoute,
        title: historyState.title,
        useDarkTheme: historyState.useDarkTheme,
        themeName: historyState.themeName
      };
      const str = JSON.stringify({ ...newState, pages: null });
      console.log(`DASH_HISTORY: ${str}`);
      return newState;
    });
  };

  public setTitle = (newTitle: string) => {
    this.setState(state => {
      if (this.firstPage) {
        this.handleMenuItemClick(this.state.activeRoute, newTitle, true);
        this.firstPage = false;
      }
      return { ...state, title: newTitle };
    });
  };

  public componentDidMount = () => {
    window.onpopstate = this.onBackButtonEvent;
  };

  public render() {
    const pn = window.location.pathname;
    const idpb = isDataIntensivePage(pn);
    const idp = idpb ? "grid-container-data-intensive" : "grid-container";
    const rootClasses = classNames("docs-root", idp, this.state.themeName);
    const title = this.state.title;
    const bgColor = this.state.useDarkTheme ? "#202B33" : "#ebf1f5";
    console.log(`DASH_RENDER_PATH: ${pn}, title: ${title}`);
    return (
      <DocumentTitle title={title}>
        <div className={rootClasses} style={{ backgroundColor: bgColor }}>
          <div className="header-area">
            <TopNavBar
              useDarkTheme={this.state.useDarkTheme}
              onToggleTheme={this.handleDarkSwitchChange}
              onMenuItemClick={this.handleMenuItemClick}
              title={this.state.title}
            />
          </div>
          <div className="menu-area">
            <SideMenu
              activeRoute={this.state.activeRoute}
              items={this.state.pages}
              level={1}
              onMenuItemClick={this.handleMenuItemClick}
              displayTooltip={idpb}
            />
          </div>
          <div className="main-area">{displayPage()}</div>
          <div className="footer-area">Footer</div>
        </div>
      </DocumentTitle>
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
