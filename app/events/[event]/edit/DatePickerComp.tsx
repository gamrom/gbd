import { DateTimePicker } from "@mui/x-date-pickers";

export const DatePickerComp = ({ timeState, setTimeState }: {
  timeState: any,
  setTimeState: any,
}) => {
  return <>
    <DateTimePicker label="시작 시간" value={timeState.startTime} onChange={(newValue) =>
      setTimeState({ ...timeState, startTime: newValue })
    } />
    <DateTimePicker label="종료 시간" value={timeState.endTime} onChange={(newValue) =>
      setTimeState({ ...timeState, endTime: newValue })
    } />
  </>
}