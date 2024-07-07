'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { getRecentPomodoros } from '@/app/action'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { Pomodoro } from '@/models/pomodoro'

const chartConfig = {
  pomodoroCount: {
    label: 'Pomodoro Count',
    color: '#2463eb',
  },
} satisfies ChartConfig

const today = dayjs()
const Latest7DaysPomodorosBarChart = () => {
  const [data, setData] = useState<Record<string, Pomodoro[]>>({})

  const chartData = Object.entries(data).map(([key, value]) => {
    return {
      date: key,
      pomodoroCount: value.length,
    }
  })

  useEffect(() => {
    getRecentPomodoros(today.toISOString()).then(setData)
  }, [])

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(5)}
        />
        <YAxis
          dataKey="pomodoroCount"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(5)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="pomodoroCount" fill="#2463eb" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default Latest7DaysPomodorosBarChart
