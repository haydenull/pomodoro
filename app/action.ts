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
    // start_time 与 date 天相等的数据
    .filter('start_time', 'gte', start)
    .filter('start_time', 'lte', end)
    .order('start_time', { ascending: false })

  if (!data) return []

  return data
}
