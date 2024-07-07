'use client'

import dayjs from 'dayjs'

const today = dayjs()
const TodatHead = () => {
  return <h1 className="my-4 text-3xl">{today.format('YYYY-MM-DD')}</h1>
}

export default TodatHead
