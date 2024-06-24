import React, { useRef, useState, useCallback, useMemo } from "react";
import moment from "moment";
import { Box, Switch, Typography } from "@mui/material";
import {
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  EventRenderedArgs,
  PopupOpenEventArgs,
  RenderCellEventArgs,
  ViewsDirective,
  ViewDirective,
  Inject,
  Day,
  Week,
  Month,
  Year,
  TimelineViews,
  Resize,
  DragAndDrop,
  Agenda,
  ResourceDetails,
} from "@syncfusion/ej2-react-schedule";
import { createElement, Internationalization } from "@syncfusion/ej2-base";
import { DropDownList } from "@syncfusion/ej2-dropdowns";

import logo from "./logo.svg";
import "./App.scss";

function App() {
  let scheduleObj = useRef<ScheduleComponent>(null);
  const [weekController, setWeekController] = useState(true);

  function getColor(value: ResourceDetails): string {
    if (value.resourceData.type === "Client") {
      return "#dafbeb";
    } else {
      return "#f1ecff";
    }
  }

  function resourceHeaderTemplate(props: any): JSX.Element {
    return (
      <div className="template-wrap">
        <div
          className="person-name meetingPersonBox"
          style={{
            background: getColor(props),
          }}
        >
          {/* <img src={getResourceImage(props)} height={30} width={30} /> */}
          <span>getResourceName(props)</span>
        </div>
      </div>
    );
  }

  let instance = useMemo(() => {
    return new Internationalization();
  }, []);

  const getDateHeaderText = useCallback(
    (value: any) => {
      return instance.formatDate(value, { skeleton: "Ed" });
    },
    [instance]
  );
  const dateHeaderTemplate = (props: any) => {
    return (
      <div>
        <div>{getDateHeaderText(props.date)}</div>
      </div>
    );
  };

  return (
    <>
      <div className="schedule-control-section">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography sx={{ padding: "0 10px", justifyContent: "start" }}>
            Pending Schedules
          </Typography>
          <Typography sx={{ padding: "0 10px", fontWeight: "bold" }}>
            Show Weekend
          </Typography>
          <Switch
            sx={{
              "--Switch-thumbSize": "28px",
            }}
            checked={weekController}
            onChange={() => setWeekController(!weekController)}
          />
        </Box>
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              cssClass="block-events"
              ref={scheduleObj}
              width="100%"
              height="650px"
              rowAutoHeight={true}
              // workDays={weekController ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]}
              showWeekend={weekController}
              // workHours={{ highlight: true, start: "06:00", end: "21:00" }}
              //timezone="UTC"
              currentView="TimelineDay"
              resourceHeaderTemplate={resourceHeaderTemplate}
              eventSettings={{
                dataSource: [], //[...eventData],
                fields: {
                  id: "Id",
                  subject: { title: "Summary", name: "Subject" },
                  isAllDay: { name: "IsAllDay" },
                  location: { title: "Location", name: "Location" },
                  endTimezone: { name: "TimeZone" },
                  startTimezone: { name: "TimeZone" },
                  description: { title: "Description", name: "Description" },
                  startTime: { title: "From", name: "StartTime" },
                  endTime: { title: "To", name: "EndTime" },
                },
              }}
              group={{
                resources: ["CalendarList"],
              }}
              dateHeaderTemplate={dateHeaderTemplate}
            >
              <ResourcesDirective>
                <ResourceDirective
                  field="id"
                  title="Provider"
                  name="CalendarList"
                  allowMultiple={true}
                  dataSource={[]}
                  textField="name"
                  idField="id"
                  groupIDField="GroupId"
                  colorField="color"
                  workDaysField="workDays"
                  startHourField="startHour"
                  endHourField="endHour"
                ></ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective
                  option="TimelineDay"
                  startHour="06:00"
                  endHour="21:00"
                  timeScale={{ interval: 30, slotCount: 2 }}
                />
                <ViewDirective
                  option="Day"
                  startHour="06:00"
                  endHour="21:00"
                  timeScale={{ interval: 30, slotCount: 2 }}
                />
                <ViewDirective
                  option="Week"
                  startHour="06:00"
                  endHour="21:00"
                  timeScale={{ interval: 30, slotCount: 2 }}
                />
                <ViewDirective
                  option="Month"
                  startHour="06:00"
                  endHour="21:00"
                />
                <ViewDirective
                  option="Year"
                  startHour="06:00"
                  endHour="21:00"
                />
                <ViewDirective
                  option="Agenda"
                  startHour="06:00"
                  endHour="21:00"
                />
              </ViewsDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  Month,
                  Year,
                  TimelineViews,
                  Resize,
                  DragAndDrop,
                  Agenda,
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
