/**
 * Application
 */
import {
  Fragment,
  FunctionComponent,
  useRef,
  useMemo,
  useEffect,
} from "react";
import {
  BryntumScheduler,
} from "@bryntum/scheduler-react";
import { Scheduler } from "@bryntum/scheduler";
import { schedulerConfig } from "./AppConfig";
import "./App.scss";
import { WORKERS } from "./constants/worker";
import { EVENTS } from "./constants/event";
import { ASSIGNMENTS } from "./constants/assignment";

const App: FunctionComponent = () => {
  const schedulerRef = useRef<BryntumScheduler>(null);
  const schedulerInstance = () => schedulerRef.current?.instance as Scheduler;
  useEffect(() => {
    schedulerInstance().resourceStore.add(WORKERS);
    schedulerInstance().eventStore.add(EVENTS);
    schedulerInstance().assignmentStore.add(ASSIGNMENTS);
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
  return (
    <Fragment>
      <BryntumScheduler
        ref={schedulerRef}
        startDate={new Date("2022/08/01")}
        {...schedulerConfig}
        columns={columns}
        rowReorderFeature={rowReorderFeature}
      />
    </Fragment>
  );
};

export default App;
