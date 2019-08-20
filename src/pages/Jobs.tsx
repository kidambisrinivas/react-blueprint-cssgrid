import React from "react";
import {
  Card,
  Button,
  HTMLSelect,
  Classes,
  ControlGroup,
  ButtonGroup,
  Intent,
  Toaster,
  IToastProps
} from "@blueprintjs/core";
import * as _ from "lodash";
import { IconNames } from "@blueprintjs/icons";

import { IPageProps } from "./Pages";
import { ListJobs } from "../components/ListJobs";
import { mockJobs } from "../apis/jobs";
import { IJobs } from "../apis/types";
import { getLoadingComponent } from "../utils";

const classNames = require("classnames");

export interface IJobsState {
  jobs_resp: IJobs;
  loading: boolean;
  toasterProps: IToastProps;
}

// Jobs list page
export class Jobs extends React.PureComponent<IPageProps, IJobsState> {
  private toaster: Toaster;

  private refHandlers = {
    toaster: (ref: Toaster) => (this.toaster = ref)
  };

  public constructor(props: IPageProps) {
    super(props);
    this.state = {
      jobs_resp: { jobs: [], count: 0, total_results_count: 0 },
      loading: true,
      toasterProps: {
        icon: "ban-circle",
        intent: Intent.DANGER,
        message: "Moved 6 files"
      }
    };
    this.toaster = new Toaster();
    this.fillList();
  }

  private fillList = async () => {
    let resp: IJobs = {},
      message = "",
      code = "";

    try {
      resp = await mockJobs();
      if (!_.isEmpty(resp.message)) {
        message = resp.message as string;
        code = resp.code as string;
      }
    } catch (e) {
      message = e.toString();
      code = "EXCEPTION";
    }

    if (_.isEmpty(message)) {
      this.setState(state => {
        return { ...state, jobs_resp: resp, loading: false };
      });
    } else {
      let toast: IToastProps = {
        icon: "warning-sign",
        intent: Intent.DANGER,
        message: (
          <div>
            JOB_SERVER_REQ_FAILURE
            <br />
            CODE: {code}
            <br />
            MESSAGE: {message}
            <br />
          </div>
        )
      };
      toast.timeout = 5000;
      if (this.toaster) this.toaster.show(toast);
      console.log(`JOB_SERVER_RESP: ${JSON.stringify(resp, null, 2)}`);
    }
  };

  public render() {
    const tableClasses = classNames(
      Classes.ELEVATION_1,
      Classes.CARD,
      "card-mediumpad"
    );
    return (
      <React.Fragment>
        {/* View filter/query card */}
        <Card className="card-lowpad">
          <ControlGroup className="config-bar">
            <HTMLSelect value={""} onChange={() => {}}>
              <option value={"ANY"}>Job Type</option>
              <option value={"job_type1"}>JobType1</option>
              <option value={"job_type2"}>JobType2</option>
            </HTMLSelect>

            <HTMLSelect value={""} onChange={() => {}}>
              <option value={"ANY"}>Job Status</option>
              <option value={"RUNNING"}>Running</option>
              <option value={"PAUSED"}>Paused</option>
              <option value={"COMPLETED"}>Completed</option>
              <option value={"CANCELED"}>Canceled</option>
            </HTMLSelect>

            <HTMLSelect value={""} onChange={() => {}}>
              <option value={"ANY"}>Freq</option>
              <option value={"24"}>Daily</option>
              <option value={"168"}>Weekly</option>
              <option value={"744"}>Monthly</option>
            </HTMLSelect>

            <input
              value={""}
              onChange={() => {}}
              className="bp3-input"
              type="text"
              placeholder="Cluster"
              dir="auto"
            />
            <input
              value={""}
              onChange={() => {}}
              className="bp3-input"
              type="text"
              placeholder="Site"
              dir="auto"
            />

            <Button
              icon={IconNames.ADD}
              text="Start job"
              onClick={() => {
                this.setState({ ...this.state });
              }}
              intent={Intent.SUCCESS}
            />
            <Button
              icon={IconNames.TAKE_ACTION}
              text="Actions"
              onClick={() => {
                this.setState({ ...this.state });
              }}
              intent={Intent.PRIMARY}
            />

            <Button disabled={true} style={{ width: "180px" }}>
              Showing 10-20 of 523
            </Button>
            <ButtonGroup>
              <Button
                disabled={false}
                icon={IconNames.CHEVRON_LEFT}
                onClick={() => {
                  console.log("Back");
                }}
              />
              <Button
                disabled={false}
                icon={IconNames.CHEVRON_RIGHT}
                onClick={() => {
                  console.log("Front");
                }}
              />
            </ButtonGroup>
          </ControlGroup>
        </Card>
        {/* View jobs card */}
        <Card className={tableClasses}>
          <Toaster ref={this.refHandlers.toaster} />
          {getLoadingComponent(
            <ListJobs jobs_resp={this.state.jobs_resp} />,
            this.state.loading
          )}
        </Card>
      </React.Fragment>
    );
  }
}
