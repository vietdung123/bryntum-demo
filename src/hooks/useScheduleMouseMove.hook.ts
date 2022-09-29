import { useRef } from 'react';
import {
  EventModel,
  Model,
  ResourceTimeRangeStore,
  Scheduler,
} from '@bryntum/scheduler';
import moment from 'moment';


import { IFormattedEmployee } from '../models/worker.model';
import { IFormattedEvent } from '../models/event.model';
import { IFormattedEventBrytum } from '../models/bryntum.model';

interface IScheduleMouseMove {
  tickStartDate: Date;
  tickEndDate: Date;
  resourceRecord: {
    id: number;
    originalData: IFormattedEmployee;
  };
  source: any;
  event: MouseEvent;
}
const HEIGHT_EVENT = 71;

export const useScheduleMouseMove = () => {
  const myRange = useRef<Model>();
  const isDragging = useRef(false);
  const eventDragRef = useRef<IFormattedEvent>();
  const diffRef = useRef(0);

  const mouseMovelisteners = (instance: Scheduler) => ({
    eventDragStart: (e: IFormattedEventBrytum<Event, IFormattedEvent>) => {
      const hoverDate = instance?.getDateFromDomEvent(e.event);
      const diff = moment
        .duration(
          moment(hoverDate?.toISOString()).diff(
            moment(
              e?.context.eventRecords[0].originalData?.startDate as string,
            ),
          ),
        )
        .asHours();

      eventDragRef.current = e?.context.eventRecords[0].originalData;
      isDragging.current = true;
      instance.scrollable.overflowY = 'hidden';
      diffRef.current = Math.floor(diff / 24);
    },
    eventDragReset: () => {
      isDragging.current = false;
      instance.scrollable.overflowY = 'auto';
      eventDragRef.current = undefined;
      diffRef.current = 0;
    },
    eventMouseOver: ({ event, source }: IScheduleMouseMove) => {
      source.trigger('scheduleMouseOut', { event });
    },
    scheduleMouseMove: ({
      tickStartDate,
      tickEndDate,
      resourceRecord,
      event,
      source,
    }: IScheduleMouseMove) => {
      
      const cls = isDragging.current
        ? 'b-celladd-dragging-hover'
        : 'b-celladd-hover';
      
      if (!instance) return;
      const resourceTimeRangeStore =
        instance?.resourceTimeRangeStore as ResourceTimeRangeStore;
        console.log({ resourceTimeRangeStore });
        
      if (!resourceTimeRangeStore) return;
      if (
        !resourceRecord?.originalData?.employeeId &&
        resourceTimeRangeStore.first
      ) {
        (resourceTimeRangeStore.first as EventModel).cls = 'd-none';
        return;
      }
      if (!resourceTimeRangeStore.first) {
        myRange.current = resourceTimeRangeStore.add({
          resourceId: resourceRecord.id,
          startDate: tickStartDate,
          endDate: tickEndDate,
          name: '',
          cls,
        })[0];
        
      } else {
        if (
          (resourceTimeRangeStore.first as EventModel).startDate !==
          tickStartDate
        ) {
          const hoverDate = instance?.getDateFromDomEvent(event);
          
          if (isDragging.current && eventDragRef.current) {
            const durEndDateTimeRange =
              (eventDragRef.current?.duration as number) - diffRef.current;
            (resourceTimeRangeStore.first as EventModel).setStartEndDate(
              new Date(
                moment(hoverDate)
                  .subtract(diffRef.current || 0, 'days')
                  .startOf('day')
                  .utc()
                  .format(),
              ),
              new Date(
                moment(hoverDate)
                  .startOf('day')
                  .add(durEndDateTimeRange || 1, 'days')
                  .utc()
                  .format(),
              ),
            );
          } else {
            (resourceTimeRangeStore.first as EventModel).setStartEndDate(
              new Date(moment(hoverDate).startOf('day').utc().format()),
              new Date(
                moment(hoverDate).startOf('day').add(1, 'days').utc().format(),
              ),
            );
          }
          (resourceTimeRangeStore.first as EventModel).cls = cls;
        }
        if (
          (resourceTimeRangeStore.first as EventModel).resourceId !==
          resourceRecord.id
        ) {
          (resourceTimeRangeStore.first as EventModel).resourceId =
            resourceRecord.id;
          (resourceTimeRangeStore.first as EventModel).cls = cls;
        }
      }
      const dataId = resourceRecord?.originalData?.id?.toString() || '';
      const [, node1] = document.querySelectorAll(`div[data-id="${dataId}"]`);
      
      if (!node1) return;
      setTimeout(() => {
        const { top } = node1.getBoundingClientRect();
        if (event.y - top < 0) {
          source.trigger('scheduleMouseOut', { event });
          return;
        }
        const rowIndex = Math.floor((event.y - top) / HEIGHT_EVENT);
        (
          resourceTimeRangeStore.first as EventModel
        ).style = `height: ${HEIGHT_EVENT}px; margin-top: ${rowIndex * HEIGHT_EVENT
        }px;`;
        
      }, 16);
    },
    scheduleMouseOut: ({ event }: any) => {
      const resourceTimeRangeStore =
        instance?.resourceTimeRangeStore as ResourceTimeRangeStore;
      if (resourceTimeRangeStore?.first) {
        (resourceTimeRangeStore.first as EventModel).cls = 'd-none';
      }

      if (!event?.relatedTarget?.closest('.b-grid-cell')) {
        if (resourceTimeRangeStore?.first) {
          (resourceTimeRangeStore.first as EventModel).cls = 'd-none';
        }
      }
    },
    paint: ({ source }: any) => {
      source.timeAxisSubGridElement.addEventListener(
        'mouseleave',
        (e: MouseEvent) => {
          source.trigger('scheduleMouseOut', { event: e });
        },
      );
    },
  });
  return { mouseMovelisteners };
};
