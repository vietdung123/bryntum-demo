export const workerInitialState: WorkerState = {
  workers: [],
};

export const OverHoursInitialState = {
  overHours: [] as IOverHours[],
};

export interface WorkerState {
  workers: IEmployee[];
}
export interface IFormattedEmployee {
  id: string | number;
  employeeId?: number;
  name: string;
  expanded?: boolean;
  leaf?: boolean;
  locationId?: number;
  divisionId?: number;
  isLocation?: boolean;
  isDepartment?: boolean;
  children: IFormattedEmployee[];
  overhours_minutes?: number;
  underhours?: string;
  workhours_minutes?: number;
  overhours_per_minutes?: number;
  cls?: string;
}

export interface IEmployee {
  area_code?: string;
  createdAt?: string;
  customerId: number;
  deletedAt: string;
  email: string;
  firstName: string;
  id: number;
  identifiers: any;
  lastName: string;
  locations: ILocation[];
  name: string;
  nationalIdentificationNumber?: string;
  personalIdentificationNumber?: number;
  phone: string;
  role: IRole;
  roleId: string;
  status?: string;
  updatedAt?: string;
  overhours_minutes: number;
  underhours: string;
  workhours_minutes: number;
  overhours_per_minutes: number;
}

export interface ILocation {
  divisions: IDivision[];
  id: number;
  name: string;
}
export interface IRole {
  id: string;
  name: string;
}

export interface IDivision {
  id: number;
  name: string;
}

export interface IOverHours {
  Id: number;
  worker_id: number;
  add_hours: number;
  firstname: string;
  lastname: string;
  id: number;
  fullname: string;
  overhours_minutes: number;
  underhours: string;
  workhours_minutes: number;
  overhours_per_minutes: number;
}
export interface IHoliday {
  country: string;
  h_day: string;
  h_descr: string;
  id: number;
  shortened_day: boolean;
}

export interface IFormatedHoliday {
  id: number;
  startDate: string;
  durationUnit: string;
  shortened_day: boolean;
  duration: number;
  cls: string;
}

export interface IWeekendOfMonth {
  startDate: string;
  cls: string;
  shortened_day: boolean;
}

export type TWorkerState = typeof workerInitialState;
