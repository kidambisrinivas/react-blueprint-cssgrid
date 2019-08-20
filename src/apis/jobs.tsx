import { servicePath1, getBaseUrl } from "./backends";
import { withAuth } from "./login";
import { IJobs } from "./types";

// Get list of jobs from jobserver
export const getJobs = async (): Promise<IJobs> => {
  const backendUrl = `${getBaseUrl(servicePath1)}/jobs/sadfa`;
  const request = new Request(backendUrl, { method: "GET" });
  console.log(request);
  const response = await fetch(withAuth(request));
  const body: IJobs = await response.json();
  console.log(body);
  return body;
};

export const mockJobs = async (): Promise<IJobs> => {
  let jobs: IJobs = {
    jobs: [
      {
        job_type: "job_type1",
        desc: "Pipeline1 for customer1",
        user_name: "user1",
        success: 15634,
        failed: 2345,
        total: 17834,
        created_at: 1565325774812,
        updated_at: 1566299962480,
        job_id: "job_type1_xcfst2534",
        status: "RUNNING"
      },
      {
        job_type: "job_type2",
        desc: "Pipeline1 for customer2",
        user_name: "user2",
        success: 102324,
        failed: 24535,
        total: 134653,
        created_at: 1565929961867,
        updated_at: 1566299952206,
        job_id: "job_type1_xcfst2534",
        status: "COMPLETED"
      },
      {
        job_type: "job_type2",
        desc: "Pipeline1 for customer2",
        user_name: "user2",
        success: 102324,
        failed: 24535,
        total: 134653,
        created_at: 1565929961867,
        updated_at: 1566299952206,
        job_id: "job_type1_xcfst2534",
        status: "COMPLETED"
      },
      {
        job_type: "job_type2",
        desc: "Pipeline1 for customer2",
        user_name: "user2",
        success: 102324,
        failed: 24535,
        total: 134653,
        created_at: 1565929961867,
        updated_at: 1566299952206,
        job_id: "job_type1_xcfst2534",
        status: "COMPLETED"
      },
      {
        job_type: "job_type2",
        desc: "Pipeline1 for customer2",
        user_name: "user2",
        success: 102324,
        failed: 24535,
        total: 134653,
        created_at: 1565929961867,
        updated_at: 1566299952206,
        job_id: "job_type1_xcfst2534",
        status: "CANCELED"
      },
      {
        job_type: "job_type2",
        desc: "Pipeline1 for customer2",
        user_name: "user2",
        success: 102324,
        failed: 24535,
        total: 134653,
        created_at: 1565929961867,
        updated_at: 1566299952206,
        job_id: "job_type1_xcfst2534",
        status: "COMPLETED"
      }
    ],
    count: 20,
    total_results_count: 1900
  };
  return jobs;
};
