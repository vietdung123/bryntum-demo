
export type TData<T, K> = K extends boolean ? T : T[];
export interface IResponse<T, K = undefined> {
  data: TData<T, K>;
  links?: TLink;
  meta?: TMeta;
}
export type TLink = {
  first: string;
  last: string;
  next: string;
  prev: string;
};
export type TMeta = {
  currentPage: number;
  from?: number;
  lastPage: number;
  perPage?: number;
  to?: number;
  total?: number;
};

