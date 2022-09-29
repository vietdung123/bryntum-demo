export * from './counter1.model';
export * from './department.model';
export * from './store.models';
export * from './worker.model';
export declare type InternalNamePath = (string | number)[];
export declare type NamePath = string | number | InternalNamePath;
export declare type ValidateFields<Values = any> = (nameList?: NamePath[]) => Promise<Values>;
export declare interface IParamsSerializer {
  period_start?: string;
  period_end?: string;
  departments?: string;
  'filter[status]'?: 'active';
  'filter[divisions]'?: string;
  'page[number]'?: number;
}
