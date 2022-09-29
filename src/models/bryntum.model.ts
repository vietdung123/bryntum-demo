import { EventDrag } from '@bryntum/scheduler';

import { IEvent, IFormattedEvent } from './event.model';
import { IFormattedEmployee } from './worker.model';

export interface IFormattedEventBrytum<
  Ev = Event,
  RecordData = IFormattedEmployee,
> {
  resourceRecord: {
    data: RecordData;
    originalData: RecordData;
  };
  eventRecord: {
    data: IFormattedEvent;
    originalData: IFormattedEvent;
    published: boolean;
  };
  event: Ev;
  record: {
    data: RecordData;
    originalData: RecordData;
  };
  context: {
    valid: boolean;
    startDate?: Date;
    eventRecord: {
      data: IFormattedEvent;
      originalData: IFormattedEvent;
    };
    eventRecords: IDrapEvent[];
    assignmentRecord: {
      data: {
        resource: {
          data: IFormattedEmployee;
        };
      };
    };
    newResource: {
      data: IFormattedEmployee;
      originalData: IFormattedEmployee;
    };
  };
  assignmentRecords: IDropEvent[];
  data: IFormattedEmployee;
}

export interface IRendererFeatureGroup {
  isFirstColumn: boolean;
  groupRowFor: string;
  size: {
    configuredHeight: number;
    height: number;
  };
}

export interface IRendererEvent {
  eventRecord: {
    data: IEvent;
  };
  renderData: {
    style: string;
    eventColor: string;
    minWidth: number;
  };
}

export interface IEventBodyTemplate {
  data: IFormattedEvent;
}

export interface IScroll {
  scrollTop: number;
  source: {
    virtualScrollHeight: number;
  };
}

export interface IGridRowDrop {
  context: {
    insertBefore: {
      originalData: IFormattedEmployee;
    };
    records: {
      originalData: IFormattedEmployee;
      parent: {
        originalData: IFormattedEmployee;
      };
    }[];
    parent: {
      originalData: IFormattedEmployee;
    };
  };
}

export interface IDrag {
  source: {
    features: {
      eventDrag: EventDrag;
    };
  };
}
export interface IDropEvent {
  data: {
    resourceId: number;
    event: IDrapEvent[];
    eventId: number;
    resource: {
      data: IFormattedEmployee;
      originalData: IFormattedEmployee;
    };
  };
}
export interface IDrapEvent {
  originalData: IFormattedEvent;
  data: IFormattedEvent;
  _startDate: string;
  _endDate: string;
}
