import React from "react";
import { IconNames } from "@blueprintjs/icons";
import {
  Alignment,
  Button,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  H3
} from "@blueprintjs/core";
import { Navigator } from "./Navigator";
import { Link } from "react-router-dom";

import logo from "../logo.svg";
import { appPages, OnPageClickFn } from "../pages/Pages";

export interface ITopNavBarProps {
  useDarkTheme: boolean;
  onToggleTheme: (useDark: boolean) => void;
  onMenuItemClick: OnPageClickFn;
  title: string;
}

export interface ITopNavBarState {
  isNavigatorOpen: boolean;
}

export class TopNavBar extends React.PureComponent<
  ITopNavBarProps,
  ITopNavBarState
> {
  public constructor(props: ITopNavBarProps) {
    super(props);
    this.state = {
      isNavigatorOpen: false
    };
  }

  public render() {
    return (
      <Navbar>
        {/* Top navigation bar */}
        <Navbar.Group align={Alignment.LEFT} style={{ width: "46%" }}>
          <NavbarHeading>
            <Link to="/" style={{ color: "white" }}>
              <img src={logo} style={{ height: "30px" }} alt="logo" />
            </Link>
          </NavbarHeading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          {/* <Button className="bp3-minimal" icon="document" text="Files" /> */}
        </Navbar.Group>

        <div className="navbar-padding">
          <H3 className="bp3-minimal">{this.props.title}</H3>
        </div>

        <NavbarGroup align={Alignment.RIGHT}>
          <Button
            className="bp3-minimal"
            icon={this.props.useDarkTheme ? "flash" : "moon"}
            // text={this.props.useDarkTheme ? "Light theme" : "Dark theme"}
            text=""
            onClick={this.onToggleTheme}
          />
          <Button
            className="bp3-minimal"
            icon="search"
            text="Search..."
            onClick={this.handleOpenNavigator}
          />
          <NavbarHeading>
            <Button icon={IconNames.USER} className="bp3-minimal">
              {sessionStorage.getItem("email") || "Developer"}
            </Button>
          </NavbarHeading>
        </NavbarGroup>
        <Navigator
          isOpen={this.state.isNavigatorOpen}
          items={appPages.search}
          onMenuItemClick={this.props.onMenuItemClick}
          onClose={this.handleCloseNavigator}
        />
        {/* <HotKeyTargets onToggleTheme={this.onToggleTheme} /> */}
      </Navbar>
    );
  }

  private handleCloseNavigator = () =>
    this.setState({ isNavigatorOpen: false });
  private handleOpenNavigator = () => this.setState({ isNavigatorOpen: true });

  private onToggleTheme = () => {
    this.props.onToggleTheme(!this.props.useDarkTheme);
  };
}

// export interface IHotKeyTargetsProps {
//   onToggleTheme: () => void;
// }

// @HotkeysTarget
// export class HotKeyTargets extends React.PureComponent<
//   IHotKeyTargetsProps,
//   {}
// > {
//   public constructor(props: IHotKeyTargetsProps) {
//     super(props);
//   }
//   public render() {
//     return <div id="hotkeytargets" className="hotkeytargets" />;
//   }

//   public renderHotkeys() {
//     return (
//       <Hotkeys>
//         <Hotkey
//           global={true}
//           combo="shift + d"
//           label="Toggle dark theme"
//           onKeyDown={this.props.onToggleTheme}
//         />
//       </Hotkeys>
//     );
//   }
// }
