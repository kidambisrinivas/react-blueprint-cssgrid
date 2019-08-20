import React from "react";
import { HTMLTable, Checkbox, Code } from "@blueprintjs/core";
import * as _ from "lodash";

import { IJobs, IJob, MapStr } from "../apis/types";
import { getLocalDateStr } from "../utils";

export interface IListJobsProps {
  jobs_resp: IJobs;
}

// Jobs list page
export class ListJobs extends React.PureComponent<IListJobsProps, {}> {
  public constructor(props: IListJobsProps) {
    super(props);
  }

  public render() {
    let rows: JSX.Element[] = [];
    if (
      !_.isEmpty(this.props.jobs_resp) &&
      !_.isEmpty(this.props.jobs_resp.jobs)
    ) {
      rows = (this.props.jobs_resp.jobs as IJob[]).map(job => {
        const statusClass: MapStr = {
          RUNNING: "status-violet",
          PAUSED: "status-red",
          COMPLETED: "status-green",
          CANCELED: "status-red"
        };
        const cl = job.status;
        let createdAtStr = getLocalDateStr(job.created_at);
        let editedAtStr = getLocalDateStr(job.updated_at);
        return (
          <tr>
            <td className="center-align">
              <Checkbox label="" />
            </td>
            <td className="center-align">
              <b>{job.job_id}</b>
              <br />
              <div style={{ fontSize: "12px" }}>{job.desc}</div>
            </td>
            <td className="center-align">
              <Code className={statusClass[cl]}>{cl}</Code>
            </td>
            <td className="center-align">{job.success}</td>
            <td className="center-align">{job.failed}</td>
            <td className="center-align">{job.total}</td>
            <td className="center-align">
              <b>{job.user_name}</b>
              <br />
              <div style={{ fontSize: "12px" }}>{createdAtStr}</div>
            </td>
            <td className="center-align">
              <div style={{ fontSize: "12px" }}>{editedAtStr}</div>
            </td>
          </tr>
        );
      });
    }
    return (
      <HTMLTable
        bordered={true}
        condensed={true}
        interactive={true}
        className="table-list"
      >
        <thead>
          <tr>
            <th className="table-col-select">
              <Checkbox label="" />
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Success</th>
            <th>Failed</th>
            <th>Total</th>
            <th>Started</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </HTMLTable>
    );
  }
}
