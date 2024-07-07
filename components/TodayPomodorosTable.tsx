'use client'

import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useEffect, useState } from 'react'

import { getPomodoros } from '@/app/action'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { PomodoroTypeEnum, POMODORO_TYPE_MAP, type Pomodoro } from '@/models/pomodoro'

dayjs.extend(isBetween)

const today = dayjs()
export default function TodayPomodorosTable() {
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([])
  useEffect(() => {
    getPomodoros(today.toISOString()).then(setPomodoros)
  }, [])

  return (
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
        {pomodoros.map((pomodoro) => {
          const end = dayjs(pomodoro.start_time).add(pomodoro.duration, 'seconds')
          return (
            <TableRow
              key={pomodoro.id}
              className={cn({
                'bg-orange-100': today.isBetween(pomodoro.start_time, end, 'minute', '[]'),
              })}
            >
              <TableCell className="font-medium">{pomodoro.id}</TableCell>
              <TableCell>{dayjs(pomodoro.start_time).format('HH:mm')}</TableCell>
              <TableCell className="text-zinc-400">{end.format('HH:mm')}</TableCell>
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
          )
        })}
      </TableBody>
    </Table>
  )
}
