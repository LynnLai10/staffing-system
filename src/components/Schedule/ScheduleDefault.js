import React from 'react'
import PanelNav from '../PanelNav'
import ScheduleForm from './ScheduleForm'
const ScheduleDeafult = () => {
    return (
        <div>
            <PanelNav activeKey={'default'} /> 
            <ScheduleForm />
        </div>
    )
}

export default ScheduleDeafult