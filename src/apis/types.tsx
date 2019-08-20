export interface IJob {
  job_type: string;
  desc: string;
  job_id: string;
  success: number;
  total: number;
  failed: number;
  status: string;
  user_name: string;
  created_at: number;
  updated_at: number;
}

export interface IJobs {
  jobs?: IJob[];
  count?: number;
  total_results_count?: number;
  code?: string;
  message?: string;
}

export interface MapStr {
  [key: string]: string;
}
