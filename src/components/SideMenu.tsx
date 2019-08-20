import React from "react";
import * as _ from "lodash";

import {
  Classes,
  Menu,
  MenuDivider,
  MenuItem,
  IMenuItemProps,
  Popover,
  PopoverInteractionKind,
  PopoverPosition
} from "@blueprintjs/core";

import { getPathFromRoute } from "../utils";
import { IPageNode, OnPageClickFn } from "../pages/Pages";

export interface ISideMenuProps {
  activeRoute: string;
  items: IPageNode[];
  level: number;
  onMenuItemClick: OnPageClickFn;
  displayTooltip: boolean;
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
    const pathname = getPathFromRoute(this.props.activeRoute);
    let menu: JSX.Element[] = pages.map(pageNode => {
      if (pageNode.isHeading) return <MenuDivider title={pageNode.title} />;

      const isActive = pageNode.route === pathname;
      let props: IMenuItemProps = {
        // text: <Link to={pageNode.route}>{pageNode.title}</Link>,
        // text: pageNode.title,
        text: "",
        disabled: pageNode.disabled
      };
      if (!this.props.displayTooltip || this.props.level > 1) {
        props.text = pageNode.title;
        if (pageNode.tag !== "") props.label = pageNode.tag;
      }
      if (pageNode.icon != null) props.icon = pageNode.icon;
      let onClick = () => {
        this.props.onMenuItemClick(pageNode.route, pageNode.title, false);
      };
      props.onClick = onClick;
      props.popoverProps = {};
      if (this.props.displayTooltip)
        props.popoverProps = {
          position: PopoverPosition.RIGHT,
          modifiers: {
            offset: { offset: `90%, -50%`, enabled: true },
            flip: { enabled: false }
          },
          boundary: "viewport"
        };
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

    if (this.props.level === 1) {
      let style = { minWidth: "160px" };
      if (this.props.displayTooltip) {
        // large = true;
        style = { minWidth: "60px" };
        menu = menu.map((menuItem: JSX.Element, index: number) => {
          let offsetx = "0",
            offsety = "-50%";
          let position: PopoverPosition = PopoverPosition.RIGHT;
          if (!_.isEmpty(pages[index].children)) {
            position = PopoverPosition.TOP_RIGHT;
            offsetx = "150%";
            offsety = "0%";
          }
          return (
            <div>
              <Popover
                popoverClassName={`${Classes.POPOVER_CONTENT_SIZING}`}
                hoverOpenDelay={200}
                inheritDarkTheme={true}
                interactionKind={PopoverInteractionKind.HOVER}
                content={pages[index].title}
                position={position}
                usePortal={true}
                modifiers={{
                  offset: { offset: `${offsetx}, ${offsety}`, enabled: true },
                  flip: { enabled: false }
                }}
                boundary={"viewport"}
                fill={false}
              >
                {menuItem}
              </Popover>
            </div>
          );
        });
      }
      return (
        <Menu className={Classes.ELEVATION_1} style={style}>
          {menu}
        </Menu>
      );
    } else return menu;
  }
}
