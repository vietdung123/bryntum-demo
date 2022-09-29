import { EventModel, Scheduler } from '@bryntum/scheduler';
type TAction = 'drag';
export interface IPause {
  pause_end: string;
  pause_start: string;
}
export interface IEvent {
  pauses: IPause[];

  employee_id?: number;
  event_start: string;
  event_stop: string;
  event_subtype: string;
  event_type: string;
  id: number;
  published?: boolean;
  cls?: string;
  action?: TAction;
}
export interface IFormattedEvent extends Partial<EventModel> {
  id: number;
  employee_id: number;
  wrapStartDate: string;
  wrapEndDate: string;
  event_subtype: string;
  event_type: string;
  pauses: IPause[];
  published?: boolean;
  cls?: string;
  draggable?: boolean;
  resourceId?: number;
}

export interface IPayloadPublish {
  period_start: string;
  period_end: string;
  departments: string[] | number[];
}
export interface IEventPublish {
  data: {
    published: number[];
  };
}
export const eventInitialState = {
  events: [] as IEvent[],
  unpublished: 0,
};

export interface IEventSelectionChange {
  action: string;
  selected: [];
  selection: Array<IFormattedEvent>;
  source: Scheduler;
}
