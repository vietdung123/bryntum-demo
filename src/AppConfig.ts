/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { EventModel } from '@bryntum/scheduler';
import { BryntumSchedulerProps } from '@bryntum/scheduler-react';

const schedulerConfig: BryntumSchedulerProps = {
  rowHeight: 70,
  barMargin: 0,
  viewPreset: {
    shiftIncrement: 1,
    shiftUnit: 'month',
    base: 'day',
    headers: [
      {
        unit: 'month',
        dateFormat: 'DD.MM.YYYY',
        align: 'center',
      },
      {
        unit: 'day',
        dateFormat: 'ddd',
      },
      {
        unit: 'day',
        dateFormat: 'D',
      },
    ],
  },

  timeRangesFeature: {
    narrowThreshold: 10,
  },

  features: {
    eventEdit: {
      disabled: true,
    },
    nonWorkingTime: {
      highlightWeekends: true,
    },
    timeRanges: true,
    cellMenu: false,
    tree: true,
    scheduleTooltip: false,
    eventTooltip: false,
    dependencies: {
      disabled: true,
    },
    resourceTimeRanges: {
      disabled: false,
    },
    scheduleMenu: false,
    eventDrag: {
      constrainDragToTimeline: false,
    },
    eventDragCreate: false,
    eventDragSelect: false,
  },
  createEventOnDblClick: false,
  eventEditFeature: false,
  focusOnToFront: false,
  eventDragCreateFeature: false,
  eventCopyPasteFeature: false,
  scheduleMenuFeature: false,
  preserveFocusOnDatasetChange: false,
  selectedEvents: [],
  scrollable: true,
  zoomOnMouseWheel: false,
  allowOverlap: true,
  forceFit: false,
  useInitialAnimation: false,
  enableEventAnimations: false,
  autoAdjustTimeAxis: false,
  enableRecurringEvents: false,
  timeAxisHeaderMenuFeature: false,
  zoomOnTimeAxisDoubleClick: false,
  eventSelectionDisabled: false,
  multiEventSelect: true,
  selectionMode: {
    multiSelect: true,
    row: true,
  },
};

export const defaultEventEntities: Partial<EventModel> = {
  draggable: true,
  resizable: false,
  duration: 1,
  durationUnit: 'day',
};


export { schedulerConfig };
