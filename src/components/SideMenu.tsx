import React from "react";

import {
  Classes,
  Menu,
  MenuDivider,
  MenuItem,
  IMenuItemProps
} from "@blueprintjs/core";

import { IPageNode } from "../pages/Pages";

export interface ISideMenuProps {
  activeRoute: string;
  items: IPageNode[];
  level: number;
  onMenuItemClick: (currentRoute: string, newRoute: string) => void;
}
export interface ISideMenuState {}

// SideMenu is the left menu bar with links to all pages
export class SideMenu extends React.PureComponent<
  ISideMenuProps,
  ISideMenuState
> {
  public constructor(props: ISideMenuProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return this.renderPages(this.props.items);
  }

  public renderPages(pages: IPageNode[]) {
    const menu = pages.map(pageNode => {
      if (pageNode.isHeading) return <MenuDivider title={pageNode.title} />;

      const isActive = pageNode.route === this.props.activeRoute;
      const activeRoute = this.props.activeRoute;
      let props: IMenuItemProps = {
        // text: <Link to={pageNode.route}>{pageNode.title}</Link>,
        text: pageNode.title,
        disabled: pageNode.disabled
      };
      if (pageNode.icon != null) props.icon = pageNode.icon;
      if (pageNode.tag !== "") props.label = pageNode.tag;
      let onClick = () => {
        this.props.onMenuItemClick(activeRoute, pageNode.route);
      };
      props.onClick = onClick;
      if (isActive) props.active = isActive;

      if (pageNode.children == null) return <MenuItem {...props} />;
      else {
        return (
          <MenuItem {...props}>
            <SideMenu
              {...this.props}
              level={this.props.level + 1}
              items={pageNode.children}
            />
          </MenuItem>
        );
      }
    });

    if (this.props.level === 1)
      return <Menu className={Classes.ELEVATION_1}>{menu}</Menu>;
    else return menu;
  }
}
