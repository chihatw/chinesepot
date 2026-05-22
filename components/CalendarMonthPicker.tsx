'use client';

import { buttonGhostIcon, buttonGhostSm, inputStyle } from '@/lib/styles';
import { CalendarDays } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CalendarMonthPickerProps = {
  year: number;
  month: number;
  yearOptions: number[];
  monthOptions: number[];
};

const pad2 = (value: number) => value.toString().padStart(2, '0');

const CalendarMonthPicker = ({
  year,
  month,
  yearOptions,
  monthOptions,
}: CalendarMonthPickerProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className='relative'>
      <button
        type='button'
        className={buttonGhostIcon}
        title='年月を選ぶ'
        aria-label='年月を選ぶ'
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <CalendarDays className='h-5 w-5' />
      </button>
      {open ? (
        <form
          action='/'
          className='absolute right-0 z-10 mt-2 grid w-64 gap-3 rounded-md border border-slate-200 bg-white p-3 shadow-lg'
        >
          <div className='grid grid-cols-2 gap-2'>
            <label className='grid gap-1 text-sm font-medium text-slate-700'>
              年
              <select name='year' defaultValue={year} className={inputStyle}>
                {yearOptions.map((optionYear) => (
                  <option key={optionYear} value={optionYear}>
                    {optionYear}
                  </option>
                ))}
              </select>
            </label>
            <label className='grid gap-1 text-sm font-medium text-slate-700'>
              月
              <select name='month' defaultValue={pad2(month)} className={inputStyle}>
                {monthOptions.map((optionMonth) => (
                  <option key={optionMonth} value={pad2(optionMonth)}>
                    {optionMonth}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type='submit' className={buttonGhostSm}>
            表示
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default CalendarMonthPicker;
