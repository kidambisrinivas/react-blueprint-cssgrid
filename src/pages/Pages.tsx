import React from "react";
import * as _ from "lodash";

import { IconName } from "@blueprintjs/icons";
import { MaybeElement } from "@blueprintjs/core";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import * as doc from "@documentalist/client";

import { ReactPage } from "./React";
import { Jobs } from "./Jobs";

export type Component =
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;

// Page link properties for SideMenu items
export interface IPageLink {
  route: string;
  title: string;
  icon: IconName | MaybeElement;
  tag: string;
  isHeading: boolean;
  disabled: boolean;
}

// Page node extends page link with ability to have sub-menus
export interface IPageNode extends IPageLink {
  children: IPageNode[] | null;
}

export type IPageProps = IPageLink & RouteComponentProps<any>;
export type OnPageClickFn = (
  newRoute: string,
  title: string,
  replace: boolean
) => void;

// AppPages registry: Stores all pages of the app to display link
// in SideMenu bar as well as display page component in the main area
export interface AppPages {
  sideMenu: IPageNode[];
  pages: IPageLink[];
  components: Component[];
  search: doc.IPageNode[];
}

// Stores the side menu with items and their sub-menus
export let appPages: AppPages = {
  sideMenu: [],
  pages: [],
  components: [],
  search: []
};
const ec = ReactPage;

export function getPages(): IPageNode[] {
  if (appPages.sideMenu && appPages.sideMenu.length > 0)
    return appPages.sideMenu;

  const lpn = page(
    "/long",
    "Long items when they reach max-width",
    "book",
    "",
    ec
  );

  const menu: IPageNode[] = [
    heading("User"),
    page("/jobs/list", "Jobs List", "multi-select", "", Jobs),
    page("/cut", "Cut", "cut", "⌘X", ec),
    page("/copy", "Copy", "duplicate", "⌘C", ec),
    page("/paste", "Paste", "clipboard", "⌘V", ec, true),
    heading("Text"),
    page("/alignment", "Alignment", "align-left", "", ec, false, [
      page("/left", "Left", "align-left", "", ec),
      page("/center", "Center", "align-center", "", ec),
      page("/right", "Right", "align-right", "", ec),
      page("/justify", "Justify", "align-justify", "", ec)
    ]),
    page("/style", "Style", "style", "", ec, false, [
      page("/bold", "Bold", "bold", "", ec),
      page("/italic", "Italic", "italic", "", ec),
      page("/underline", "Underline", "underline", "", ec)
    ]),
    page("/misc", "Misc", "asterisk", "", ec, false, [
      page("/badge", "Badge", "badge", "", ec),
      lpn,
      page("/more", "More items", "more", "", ec, false, [
        page("/briefcase", "Briefcase", "briefcase", "", ec),
        page("/calculator", "Calculator", "calculator", "", ec),
        page("/dollar", "Dollar", "dollar", "", ec),
        page("/shapes", "Shapes", "dot", "", ec, false, [
          page("/full-circle", "Full circle", "full-circle", "", ec),
          page("/ring", "Ring", "ring", "", ec),
          page("/square", "Square", "square", "", ec)
        ])
      ])
    ])
  ];
  appPages.sideMenu = menu;
  appPages.search = buildPagesSearch(appPages.sideMenu, 1);
  return menu;
}

export function isDataIntensivePage(route: string): boolean {
  if (route.match(/(?:\/jobs\/list|\/wrappers\/\w+)/)) return true;
  else return false;
}

// Build index for app pages search
export function buildPagesSearch(
  pages: IPageNode[],
  level: number
): doc.IPageNode[] {
  let pagesSearch: doc.IPageNode[] = [];
  for (let i = 0; i < pages.length; i++) {
    let page: doc.IPageNode = {
      reference: pages[i].route,
      title: pages[i].title,
      route: pages[i].route,
      level: level,
      children: []
    };
    if (!_.isEmpty(pages[i].children)) {
      page.children = buildPagesSearch(
        pages[i].children as IPageNode[],
        level + 1
      );
    }
    pagesSearch.push(page);
  }
  return pagesSearch;
}

// Get page component for a given route
export function displayPage(): JSX.Element {
  let pagesComponents: JSX.Element[] = [];
  for (let i = 0; i < appPages.pages.length; i++) {
    const pageNode = appPages.pages[i] as IPageLink;
    const Page = appPages.components[i];
    pagesComponents.push(
      <Route
        exact={true}
        path={pageNode.route}
        render={props => {
          return <Page {...props} {...pageNode} />;
        }}
      />
    );
  }
  let pageNotFound = page("/notfound", "Not found", "moon", "", ec);
  pagesComponents.push(
    <Route
      render={props => {
        return <ReactPage {...props} {...pageNotFound} />;
      }}
    />
  );
  return <Switch>{pagesComponents}</Switch>;
}

// Get title for route. Used only on first page load
// For menu item clicks, title is already available from props
export function getTitleForRoute(route: string): string {
  let title: string = "Console";
  route = route.replace(/\?.*/, "");
  for (let i = 0; i < appPages.pages.length; i++) {
    if (appPages.pages[i].route === route) title = appPages.pages[i].title;
  }
  return title;
}

// Helpers to construct page nodes
export function page(
  route: string,
  title: string,
  icon: IconName | MaybeElement,
  tag: string,
  pageComponent: Component,
  disabled: boolean = false,
  children: IPageNode[] | null = null
): IPageNode {
  let p: IPageNode = {
    route: route,
    title: title,
    icon: icon,
    tag: tag,
    isHeading: false,
    disabled: disabled,
    children: children
  };

  // Push page to appPages registry
  appPages.pages.push(p as IPageLink);
  appPages.components.push(pageComponent);
  return p;
}

export function noAction() {}

export function heading(title: string): IPageNode {
  return {
    route: "",
    title: title,
    icon: null,
    tag: "",
    isHeading: true,
    disabled: false,
    children: null
  };
}

export function GetComponentForRoute() {}
