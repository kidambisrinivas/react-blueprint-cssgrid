import {
  Classes,
  Icon,
  IInputGroupProps,
  MenuItem,
  Utils
} from "@blueprintjs/core";
import { ItemListPredicate, ItemRenderer, Omnibar } from "@blueprintjs/select";

import { IHeadingNode, IPageNode, isPageNode } from "@documentalist/client";
import { filter } from "fuzzaldrin-plus";
import * as React from "react";
import { OnPageClickFn } from "../pages/Pages";

export interface INavigatorProps {
  /** Whether navigator is open. */
  isOpen: boolean;

  /** All potentially navigable items. */
  items: Array<IPageNode | IHeadingNode>;

  onMenuItemClick: OnPageClickFn;

  /** Callback to determine if a given item should be excluded. */
  itemExclude?: (node: IPageNode | IHeadingNode) => boolean;

  /**
   * Callback invoked when the navigator is closed. Navigation is performed by
   * updating browser `location` directly.
   */
  onClose: () => void;
}

export interface INavigationSection {
  path: string[];
  route: string;
  title: string;
}

const NavOmnibar = Omnibar.ofType<INavigationSection>();
let INPUT_PROPS: IInputGroupProps = {
  placeholder: "Fuzzy search headings..."
};

export class Navigator extends React.PureComponent<INavigatorProps> {
  private sections: INavigationSection[] = [];

  public componentDidMount() {
    this.sections = [];
    eachLayoutNode(this.props.items, (node, parents) => {
      if (Utils.safeInvoke(this.props.itemExclude, node) === true) {
        // ignore excluded item
        return;
      }
      const { route, title } = node;
      const path = parents.map(p => p.title).reverse();
      this.sections.push({ path, route, title });
    });
  }

  public render() {
    if (!this.sections) {
      return null;
    }
    return (
      <NavOmnibar
        className="docs-navigator-menu"
        inputProps={INPUT_PROPS}
        itemListPredicate={this.filterMatches}
        isOpen={this.props.isOpen}
        items={this.sections}
        itemRenderer={this.renderItem}
        onItemSelect={this.handleItemSelect}
        onClose={this.props.onClose}
        resetOnSelect={true}
      />
    );
  }

  private filterMatches: ItemListPredicate<INavigationSection> = (
    query,
    items
  ) =>
    filter(items, query, {
      key: "route",
      maxInners: items.length / 5,
      maxResults: 10,
      pathSeparator: "/",
      usePathScoring: true
    });

  private renderItem: ItemRenderer<INavigationSection> = (section, props) => {
    if (!props.modifiers.matchesPredicate) {
      return null;
    }

    // insert caret-right between each path element
    const pathElements = section.path.reduce<React.ReactChild[]>(
      (elems, el) => {
        elems.push(el, <Icon key={el} icon="caret-right" />);
        return elems;
      },
      []
    );
    pathElements.pop();

    const text = (
      <>
        <div>{section.title}</div>
        <small className={Classes.TEXT_MUTED}>{pathElements}</small>
      </>
    );
    let parent = this;
    return (
      <MenuItem
        active={props.modifiers.active}
        // href={section.route}
        key={section.route}
        multiline={true}
        onClick={() => {
          parent.handleItemSelect(section);
        }}
        text={text}
      />
    );
  };

  // updating location.hash will trigger hashchange event, which Documentation will receive and use to navigate.
  private handleItemSelect = (item: INavigationSection) => {
    this.props.onMenuItemClick(item.route, item.title, false);
    this.props.onClose();
  };
}

/**
 * Performs an in-order traversal of the layout tree, invoking the callback for each node.
 * Callback receives an array of ancestors with direct parent first in the list.
 */
export function eachLayoutNode(
  layout: Array<IHeadingNode | IPageNode>,
  callback: (node: IHeadingNode | IPageNode, parents: IPageNode[]) => void,
  parents: IPageNode[] = []
) {
  layout.forEach(node => {
    callback(node, parents);
    if (isPageNode(node)) {
      eachLayoutNode(node.children, callback, [node, ...parents]);
    }
  });
}
