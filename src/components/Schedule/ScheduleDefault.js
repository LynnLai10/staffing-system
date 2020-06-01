import React from "react";
import PanelNav from "../PanelNav";
import ScheduleForm from "./ScheduleForm";
const ScheduleDeafult = () => {
  return (
    <div>
      <PanelNav activeKey={"default"} />
      <ScheduleForm isDefault />
    </div>
  );
};

export default ScheduleDeafult;
