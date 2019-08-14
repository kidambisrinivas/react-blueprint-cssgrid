import React from "react";
import logo from "../logo.svg";
import DocumentTitle from "react-document-title";
import { IPageLink } from "./Pages";

export class ReactPage extends React.PureComponent<IPageLink, {}> {
  public render() {
    return (
      <React.Fragment>
        <DocumentTitle title={this.props.title}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>{this.props.route}</p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}
