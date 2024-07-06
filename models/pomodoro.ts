export type Pomodoro = {
  id: number
  duration: number
  start_time: string
  type: PomodoroTypeEnum
}
export enum PomodoroTypeEnum {
  Work = 1,
  Break = 2,
}
export const POMODORO_TYPE_MAP = new Map([
  [PomodoroTypeEnum.Work, '工作'],
  [PomodoroTypeEnum.Break, '休息'],
])
