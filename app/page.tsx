import Header from '@/components/header';
import CalendarMonthPicker from '@/components/CalendarMonthPicker';
import { Article } from '@/features/article/schema';
import { buttonGhostSm } from '@/lib/styles';
import { query } from '@/utils/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type CalendarArticle = Pick<Article, 'id' | 'title' | 'date'>;

const TOKYO_TIME_ZONE = 'Asia/Tokyo';
const MIN_YEAR = 2023;
const MIN_MONTH = 1;

const pad2 = (value: number) => value.toString().padStart(2, '0');

const toMonthParam = (year: number, month: number) => `${year}-${pad2(month)}`;

const toDateString = (year: number, month: number, day: number) =>
  `${toMonthParam(year, month)}-${pad2(day)}`;

const getTodayParts = () => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TOKYO_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const partValue = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: partValue('year'),
    month: partValue('month'),
    day: partValue('day'),
  };
};

type CalendarSearchParams = {
  month?: string;
  year?: string;
};

const normalizeMonth = (
  year: number,
  month: number,
  fallback: { year: number; month: number },
) => {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    return fallback;
  }

  const selectedIndex = year * 12 + month;
  const minIndex = MIN_YEAR * 12 + MIN_MONTH;

  if (selectedIndex < minIndex) {
    return { year: MIN_YEAR, month: MIN_MONTH };
  }

  return { year, month };
};

const parseMonthParams = ({
  month: monthParam,
  year: yearParam,
}: CalendarSearchParams) => {
  const today = getTodayParts();
  const fallback = { year: today.year, month: today.month };

  if (yearParam && monthParam) {
    return normalizeMonth(Number(yearParam), Number(monthParam), fallback);
  }

  if (!monthParam) {
    return fallback;
  }

  const match = monthParam.match(/^(\d{4})-(\d{2})$/);
  if (!match) {
    return fallback;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);

  return normalizeMonth(year, month, fallback);
};

const shiftMonth = (year: number, month: number, diff: number) => {
  const date = new Date(Date.UTC(year, month - 1 + diff, 1));

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
  };
};

const fetchArticlesForMonth = async (year: number, month: number) => {
  const startDate = toDateString(year, month, 1);
  const nextMonth = shiftMonth(year, month, 1);
  const endDate = toDateString(nextMonth.year, nextMonth.month, 1);

  const res = await query(
    `
      SELECT id, title, date::date::text AS date
      FROM articles
      WHERE date >= $1 AND date < $2
      ORDER BY date ASC
    `,
    [startDate, endDate],
  );

  return res.rows as CalendarArticle[];
};

const buildCalendarDays = (year: number, month: number) => {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
};

const buildYearOptions = (todayYear: number) =>
  Array.from(
    { length: todayYear - MIN_YEAR + 1 },
    (_, index) => MIN_YEAR + index,
  );

const buildMonthOptions = () =>
  Array.from({ length: 12 }, (_, index) => index + 1);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<CalendarSearchParams>;
}) {
  const params = await searchParams;
  const { year, month } = parseMonthParams(params);
  const today = getTodayParts();
  const articles = await fetchArticlesForMonth(year, month);
  const articlesByDate = new Map(
    articles.map((article) => [article.date, article]),
  );
  const calendarDays = buildCalendarDays(year, month);
  const prevMonth = shiftMonth(year, month, -1);
  const nextMonth = shiftMonth(year, month, 1);
  const yearOptions = buildYearOptions(Math.max(today.year, year));
  const monthOptions = buildMonthOptions();

  return (
    <div>
      <Header />
      <main className='mx-auto grid w-full max-w-md gap-6 px-4 py-8 sm:px-6'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <h1 className='text-2xl font-bold text-slate-950'>
            {year}年{month}月
          </h1>
          <div className='flex items-center gap-2'>
            <Link
              href={`/?year=${prevMonth.year}&month=${pad2(prevMonth.month)}`}
              className={buttonGhostSm}
            >
              前月
            </Link>
            <Link href='/' className={buttonGhostSm}>
              今月
            </Link>
            <Link
              href={`/?year=${nextMonth.year}&month=${pad2(nextMonth.month)}`}
              className={buttonGhostSm}
            >
              翌月
            </Link>
            <CalendarMonthPicker
              year={year}
              month={month}
              yearOptions={yearOptions}
              monthOptions={monthOptions}
            />
          </div>
        </div>

        <section>
          <div className='grid grid-cols-7'>
            {calendarDays.map((day, index) => {
              const date = day ? toDateString(year, month, day) : null;
              const article = date ? articlesByDate.get(date) : null;
              const isToday =
                day === today.day &&
                month === today.month &&
                year === today.year;

              return (
                <div
                  key={`${day ?? 'blank'}-${index}`}
                  className='flex aspect-square items-center justify-center'
                >
                  {day ? (
                    article?.id ? (
                      <Link
                        href={`/articles/${article.id}`}
                        title={
                          article.title && date
                            ? `${date}\n${article.title}`
                            : undefined
                        }
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                          isToday
                            ? 'bg-slate-900 font-medium text-white hover:text-white'
                            : 'font-medium text-slate-900'
                        }`}
                      >
                        {day}
                      </Link>
                    ) : (
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                          isToday
                            ? 'bg-slate-900 font-medium text-white'
                            : 'text-slate-500'
                        }`}
                      >
                        {day}
                      </span>
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
