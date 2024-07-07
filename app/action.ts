'use server'

import dayjs from 'dayjs'

import { createClient } from '@/lib/supabase/server'
import { Pomodoro } from '@/models/pomodoro'

// 获取某一天的番茄钟
export const getPomodoros = async (date: string): Promise<Pomodoro[]> => {
  const supabase = createClient()

  const start = dayjs(date).startOf('day').toISOString()
  const end = dayjs(date).endOf('day').toISOString()

  const { data, error } = await supabase
    .from('pomodoros')
    .select('*')
    .filter('start_time', 'gte', start)
    .filter('start_time', 'lte', end)
    .order('start_time', { ascending: false })

  if (!data) return []

  return data
}

// 获取最近七天番茄钟
export const getRecentPomodoros = async (date: string): Promise<Record<string, Pomodoro[]>> => {
  const supabase = createClient()

  const start = dayjs(date).subtract(7, 'day').startOf('day').toISOString()
  const end = dayjs(date).endOf('day').toISOString()

  const { data, error } = await supabase
    .from('pomodoros')
    .select('*')
    .filter('start_time', 'gte', start)
    .filter('start_time', 'lte', end)
    .eq('type', 1)
  if (!data) return {}
  // 按天为 key 组合成 map
  return data.reduce(
    (acc, cur) => {
      const date = dayjs(cur.start_time).format('YYYY-MM-DD')
      acc[date] = [...(acc[date] || []), cur]
      return acc
    },
    {} as Record<string, Pomodoro[]>,
  )
}
