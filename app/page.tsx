import Latest7DaysPomodorosBarChart from '@/components/Latest7DaysPomodorosBarChart'
import TodatHead from '@/components/TodatHead'
import TodayPomodorosTable from '@/components/TodayPomodorosTable'

export default function Index() {
  return (
    <div>
      <TodatHead />
      <Latest7DaysPomodorosBarChart />
      <TodayPomodorosTable />
    </div>
  )
}
