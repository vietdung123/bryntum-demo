export const authInitialState = {
  auth: {} as IAuth,
  permission: {} as IPermission,
  lang: '' as string,
};

export interface IAuth {
  profile: {
    account_type: number;
    customer_id: number;
    firstname: string;
    has_multiple_contracts: string;
    lang: number;
    lastname: string;
    sub: number;
    user_id: number;
    worker_id: number;
  };
}

export interface IPermission {
  can_change_users_limit_in_billing: boolean | null;
  can_confirm_overtimes: boolean;
  can_confirm_schedules: boolean;
  can_confirm_times: boolean;
  can_create_times: boolean;
  can_finalize_time_confirmations: boolean;
  can_receive_app_notifications: boolean;
  can_receive_emails_when_absent: boolean;
  can_receive_emails_when_fever: boolean;
  can_register_times: boolean;
  can_register_times_from_webclock: boolean;
  can_update_administrators: boolean;
  can_update_company_settings: boolean;
  can_update_divisions: boolean;
  can_update_identifiers: boolean;
  can_update_objects: boolean;
  can_update_only_own_times: boolean;
  can_update_reports: boolean;
  can_update_requests: boolean;
  can_update_schedules: boolean;
  can_update_time_comment: boolean;
  can_update_times: boolean;
  can_update_users: boolean;
  can_update_works: boolean;
}
