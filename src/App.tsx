/**
 * Application
 */
//@ts-ignore
import {
  Fragment,
  FunctionComponent,
  useRef,
  useMemo,
  useEffect,
  useState,
} from "react";
import { BryntumScheduler } from "@bryntum/scheduler-react";
import { Scheduler } from "@bryntum/scheduler";
import { schedulerConfig } from "./AppConfig";
import "./App.scss";
import { WORKERS } from "./constants/worker";
import { EVENTS } from "./constants/event";
import { ASSIGNMENTS } from "./constants/assignment";
import { useScheduleMouseMove } from "./hooks/useScheduleMouseMove.hook";
import moment from "moment";
import {
  getRoundDay,
  isSameMonth,
} from "./utils/date";

const App: FunctionComponent = () => {
  const schedulerRef = useRef<BryntumScheduler>(null);
  const [initial, setInitial] = useState(0);
  const monthScheduler = new Date("2022/08/01");
  const schedulerInstance = () => schedulerRef.current?.instance as Scheduler;
  const { mouseMovelisteners } = useScheduleMouseMove();
  useEffect(() => {
    schedulerInstance().resourceStore.add(WORKERS);
    schedulerInstance().eventStore.add(EVENTS);
    schedulerInstance().assignmentStore.add(ASSIGNMENTS);
    setInitial(new Date().getTime());
  }, []);

  const columns = useMemo(
    () => [
      {
        type: "tree",
        field: "name",
        editor: false,
        sortable: false,
        htmlEncode: false,
        width: 200,
      },
    ],
    []
  );

  const dropable = useRef(true);

  const rowReorderFeature = useMemo(
    () => ({
      showGrip: false,
      listeners: {
        gridRowDrag: ({ context }: any) => {
          dropable.current = true;
          const destination: any = context?.insertBefore?.originalData;
          const source = context?.records[0]?.originalData;
          if (!context?.insertBefore) {
            if (
              (context?.parent?.originalData?.isDepartment &&
                context?.parent?.originalData?.id === source?.divisionId) ||
              (source?.locationId &&
                context?.parent?.originalData?.isLocation &&
                source?.locationId === context?.parent?.originalData?.id)
            ) {
              dropable.current = true;
            } else {
              dropable.current = false;
            }
            return;
          }
          if (
            source?.isLocation ||
            source?.locationId !== destination?.locationId ||
            (source?.isDepartment && !destination?.isDepartment) ||
            source?.divisionId !== destination?.divisionId ||
            (source?.employeeId && !destination?.employeeId)
          ) {
            dropable.current = false;
          }
        },
        gridRowBeforeDragStart: ({ context }: any) => {
          return !context?.records[0]?.originalData?.isLocation;
        },
        gridRowBeforeDropFinalize: () => {
          schedulerInstance()?.refreshRows();
          schedulerInstance()?.selectRows([]);
          return dropable.current;
        },
      },
    }),
    []
  );

  const onEventDragStart = (event: any) => {
    const { source } = event;
    source.features.eventDrag.tip.hide();
  };

  const onEventDrop = async (event: any) => {
    const dragResource = event?.context?.eventRecord?.data;
    const newResource = event.assignmentRecords;
    const dropDate = schedulerInstance()?.getDateFromDomEvent(event?.event);
    const dropResourceId = event?.context?.newResource?.data?.employeeId;
    const newStartHour = moment(dragResource.wrapStartDate).format("HH:mm");
    const dropEvents = event?.context?.eventRecords;

    const workerIds: number[] = [];
    for (const val of dropEvents) {
      schedulerInstance()?.eventStore?.remove(Number(val?.data?.id));
      const dragShift = val.data;
      const newResourceId = newResource.filter(
        (elm: any) => elm.data.eventId === dragShift.id
      );
      const result = newResource.every(
        (elm: any) => elm.data.resource.data.employeeId
      );

      const checkDropDate = dropEvents.every((elm: any) =>
        isSameMonth(
          moment(elm._startDate).format("YYYY-MM-DD"),
          moment(monthScheduler).format("YYYY-MM-DD")
        )
      );

      const resDuration = moment(dragShift?.wrapEndDate).diff(
        moment(dragShift?.wrapStartDate),
        "milliseconds"
      );
      const newEventStart = moment(
        moment(getRoundDay(val._startDate)).format("YYYY-MM-DD ") + newStartHour
      )
        .utc()
        .format();

      let payload: any;
      if (result && checkDropDate && newResourceId && val._startDate) {
        payload = {
          employee_id: Number(newResourceId[0].data.resource.data.employeeId),
          event_type: dragShift.event_type,
          event_subtype: dragShift.event_subtype || null,
          event_start: moment(
            moment(getRoundDay(val._startDate)).format("YYYY-MM-DD ") +
              newStartHour
          )
            .utc()
            .format(),
          event_stop: moment(newEventStart)
            .add(resDuration, "milliseconds")
            .utc()
            .format(),
          pauses:
            dragShift.pauses?.map((br: any) => {
              return {
                pause_start: moment(
                  moment(getRoundDay(val._startDate)).format(
                    "YYYY-MM-DD " + moment(br.pause_start).format("HH:mm")
                  )
                )
                  .utc()
                  .format(),
                pause_end: moment(
                  moment(getRoundDay(val._startDate)).format(
                    "YYYY-MM-DD " + moment(br.pause_end).format("HH:mm")
                  )
                )
                  .utc()
                  .format(),
              };
            }) || [],
          action: "drag",
          published: false,
        } as any;
      } else {
        payload = {
          employee_id: Number(dragShift.employee_id),
          event_type: dragShift.event_type,
          event_subtype: dragShift.event_subtype || "",
          event_start: dragShift?.wrapStartDate,
          event_stop: dragShift?.wrapEndDate,
          pauses:
            dragShift.pauses?.map((br: any) => {
              return {
                pause_start: moment(
                  moment(getRoundDay(val._startDate)).format(
                    "YYYY-MM-DD " + moment(br.pause_start).format("HH:mm")
                  )
                )
                  .utc()
                  .format(),
                pause_end: moment(
                  moment(getRoundDay(val._startDate)).format(
                    "YYYY-MM-DD " + moment(br.pause_end).format("HH:mm")
                  )
                )
                  .utc()
                  .format(),
              };
            }) || [],
          action: "drag",
        } as any;
      }
      const employeeIds = [
        ...event.context.eventRecords.map((e: any) => e.data.employee_id),
        dropResourceId && dropDate
          ? Number(newResourceId[0].data.resource.data.employeeId)
          : Number(dragShift.employee_id),
      ];
      workerIds.push(...employeeIds);
    }
    event.context.valid = false;
  };

  const listeners = useMemo(
    () => ({
      ...mouseMovelisteners(schedulerRef?.current?.instance as Scheduler),
    }),
    [mouseMovelisteners]
  );

  return (
    <Fragment>
      <BryntumScheduler
        ref={schedulerRef}
        startDate={new Date("2022/08/01")}
        listeners={listeners}
        {...schedulerConfig}
        columns={columns}
        rowReorderFeature={rowReorderFeature}
        onEventDragStart={onEventDragStart}
        onAfterEventDrop={onEventDrop}
      />
    </Fragment>
  );
};

export default App;
