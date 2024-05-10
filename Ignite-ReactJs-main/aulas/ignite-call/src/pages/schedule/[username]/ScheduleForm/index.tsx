import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export function ScheduleFrom() {
  const [selectedDateTime, setSelectdDateTime] = useState<Date | null>()

  function handleClearSelectedDateTime() {
    setSelectdDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        onCancelConfirmation={handleClearSelectedDateTime}
        schedulingDate={selectedDateTime}
      />
    )
  }

  return <CalendarStep onSelectedDateTime={setSelectdDateTime} />
}
