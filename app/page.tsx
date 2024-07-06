import dayjs from 'dayjs'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { PomodoroTypeEnum, POMODORO_TYPE_MAP } from '@/models/pomodoro'

import { getPomodoros } from './action'

export default async function Index() {
  const today = dayjs()
  const pomodoros = await getPomodoros(today.toISOString())

  return (
    <div>
      <h1 className="my-4 text-3xl">{today.format('YYYY-MM-DD')}</h1>
      <Table>
        <TableCaption className="mb-8">
          Work Count: {pomodoros.filter(({ type }) => type === PomodoroTypeEnum.Work).length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Duration (mins)</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pomodoros.map((pomodoro) => (
            <TableRow key={pomodoro.id}>
              <TableCell className="font-medium">{pomodoro.id}</TableCell>
              <TableCell>{dayjs(pomodoro.start_time).format('HH:mm')}</TableCell>
              <TableCell>{dayjs(pomodoro.start_time).add(pomodoro.duration, 'seconds').format('HH:mm')}</TableCell>
              <TableCell>{Math.ceil(pomodoro.duration / 60)}</TableCell>
              <TableCell className="text-right">
                <div
                  className={cn('rounded px-1.5 py-0.5 text-sm', {
                    'bg-orange-500': pomodoro.type === PomodoroTypeEnum.Work,
                    'bg-green-500': pomodoro.type === PomodoroTypeEnum.Break,
                  })}
                >
                  {POMODORO_TYPE_MAP.get(pomodoro.type)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
