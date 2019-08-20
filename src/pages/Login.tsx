import React from "react";
import { Button } from "@blueprintjs/core";

export interface ILoginProps {
  nextRoute: string;
}

// Login page
export class Login extends React.PureComponent<ILoginProps, {}> {
  public constructor(props: ILoginProps) {
    super(props);
  }
  public render() {
    return (
      <div className="login-page">
        <div className="login-form-area">
          <div className="wrapper">
            <div className="contacts">
              <h3>Console</h3>
            </div>

            <div className="form">
              <h3>
                You need to be signed in with a valid Google account to be able
                to access this web page
              </h3>
              <form action="" className="login-form">
                <p className="full-width">
                  <Button
                    rightIcon="log-in"
                    intent="success"
                    text="Login with Google"
                  />
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
