import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

dayjs.extend(isBetween)

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  // iOS Shortcut 无法编码 + 号，searchParams 会将得到的 + 号转为空格，这里将空格还原为+
  const rawCurrentTime = searchParams.get('currentTime')?.replace(/\s/g, '+')
  if (!rawCurrentTime) {
    return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 })
  }

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('pomodoros')
      .select('start_time, duration, type')
      .order('start_time', { ascending: false })
      .limit(1)

    if (error) throw new Error(error.message)

    const latestPomodoro = data[0]
    const latestStartTime = dayjs(latestPomodoro.start_time)
    const latestEndTime = latestStartTime && dayjs(latestStartTime).add(latestPomodoro.duration, 'seconds')
    const currentTime = dayjs(decodeURIComponent(rawCurrentTime))
    const isInProgress = currentTime.isBetween(latestStartTime, latestEndTime, 'seconds', '[]')

    return NextResponse.json({
      success: true,
      message: 'check pomodoro success',
      data: {
        isInPomodoro: isInProgress,
        latestPomodoro,
        currentTime: currentTime.toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 })
  }
}
