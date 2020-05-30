import React from "react";
import PanelNav from "../PanelNav";
import { Toggle } from "rsuite";
import ScheduleForm from "./ScheduleForm";
const ScheduleNext = () => {
  return (
    <div>
      <PanelNav activeKey={"next"} />
      <Toggle onChange={() => console.log("Toggle Changed.")} className="toggle"/> Use default
      setting
      <ScheduleForm isDefault={false}/>
    </div>
  );
};

export default ScheduleNext;
