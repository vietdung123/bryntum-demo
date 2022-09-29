import { IPause } from './event.model';

export interface IPrintEvent {
  id: number;
  type: string;
  subtype: string;
  start: string;
  stop: string;
  published: boolean;
  pauses: IPause[];
}

export interface IPrintEmployee {
  id: number;
  fullname: string;
  events: IPrintEvent[];
  total: number;
}

export interface IPrintDepartment {
  id: number;
  name: string;
  hasHeader?: boolean;
  employees: IPrintEmployee[];
}
export interface IExportPrint {
  period_start: string;
  period_end: string;
  departments: IPrintDepartment[];
}
