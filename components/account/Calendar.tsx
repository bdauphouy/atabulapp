import { CalendarOffer } from '@/lib/types'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
} from 'date-fns'
import { fr } from 'date-fns/locale'
import { Dispatch, SetStateAction, useState } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]

type CalendarProps = {
  selectedDay: Date
  setSelectedDay: Dispatch<SetStateAction<Date>>
  offers: CalendarOffer[]
}

const Calendar = ({ selectedDay, setSelectedDay, offers }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    format(selectedDay, 'MMM-yyyy'),
  )
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  return (
    <div>
      <header className="flex items-center justify-between gap-6">
        <h2 className="text-base font-bold capitalize text-black lg:text-lg">
          {format(selectedDay, 'EEEE d MMMM yyyy', { locale: fr })}
        </h2>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={previousMonth}
            className="rounded-full border-[1px] border-solid border-scarlet p-0.5 hover:text-gray"
          >
            <RiArrowLeftSLine size={16} className="text-scarlet" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="rounded-full border-[1px] border-solid border-scarlet p-0.5"
          >
            <RiArrowRightSLine size={16} className="text-scarlet" />
          </button>
        </div>
      </header>
      <div className="mt-8 grid grid-cols-7 text-center text-sm font-bold text-gray">
        <span>L</span>
        <span>M</span>
        <span>M</span>
        <span>J</span>
        <span>V</span>
        <span>S</span>
        <span>D</span>
      </div>
      <div className="mt-4 grid grid-cols-7 text-base">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={classNames(
              dayIdx === 0 && colStartClasses[getDay(day) - 1],
              'py-1.5',
            )}
          >
            <button
              type="button"
              onClick={() => setSelectedDay(day)}
              className={classNames(
                isEqual(day, selectedDay) && 'bg-scarlet text-white',
                !isEqual(day, selectedDay) && isToday(day) && 'text-scarlet',
                offers.some(offer => isSameDay(parseISO(offer.date), day))
                  ? 'font-bold text-scarlet'
                  : !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-black',
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  'text-black',
                isEqual(day, selectedDay) && isToday(day) && 'bg-scarlet',
                (isEqual(day, selectedDay) || isToday(day)) && 'font-bold',
                'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
              )}
            >
              <time dateTime={format(day, 'yyyy-MM-dd')}>
                {format(day, 'd')}
              </time>
            </button>
            <div className="mx-auto mt-1 h-1 w-1">
              {offers.some(offer => isSameDay(parseISO(offer.date), day)) && (
                <div className="-mt-1 h-1 w-1 rounded-full bg-scarlet"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
