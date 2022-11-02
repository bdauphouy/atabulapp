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
  startOfToday,
} from 'date-fns'
import { fr } from 'date-fns/locale'
import { useState } from 'react'
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

const Calendar = ({ offers }) => {
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
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
    <div className="pt-16">
      <div className="md:divide-gray-200 md:grid md:grid-cols-2 md:divide-x">
        <div className="md:pr-14">
          <div className="flex items-center gap-6">
            <h2 className="text-gray-900 flex-auto font-semibold capitalize">
              {format(selectedDay, 'EEEE d MMMM yyyy', { locale: fr })}
            </h2>
            <button
              type="button"
              onClick={previousMonth}
              className="text-gray-400 hover:text-gray-500 -my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center rounded-full border-[1px] border-solid border-scarlet p-0.5"
            >
              <RiArrowLeftSLine size={16} className="text-scarlet" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="text-gray-400 hover:text-gray-500 -my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center rounded-full border-[1px] border-solid border-scarlet p-0.5"
            >
              <RiArrowRightSLine size={16} className="text-scarlet" />
            </button>
          </div>
          <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray">
            <span>L</span>
            <span>M</span>
            <span>M</span>
            <span>J</span>
            <span>V</span>
            <span>S</span>
            <span>D</span>
          </div>
          <div className="mt-2 grid grid-cols-7 text-sm">
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
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      'text-scarlet',
                    offers.some(offer =>
                      isSameDay(parseISO(offer.startDatetime), day),
                    ) && 'font-bold text-scarlet',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-900',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-400',
                    isEqual(day, selectedDay) && isToday(day) && 'bg-scarlet',
                    isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                    !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      'font-semibold',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                  )}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
                  </time>
                </button>

                <div className="mx-auto mt-1 h-1 w-1">
                  {offers.some(offer =>
                    isSameDay(parseISO(offer.startDatetime), day),
                  ) && <div className="h-1 w-1 rounded-full bg-scarlet"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
