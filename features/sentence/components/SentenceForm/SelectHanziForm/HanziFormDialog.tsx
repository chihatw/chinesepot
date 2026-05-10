'use client';

import { buttonGhostSm } from '@/lib/styles';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import HanziForm from '../../../../hanzi/components/HanziForm';

const HanziFormDialog = ({
  form,
  articleId,
}: {
  form: string;
  articleId: number;
}) => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        type='button'
        className={`${buttonGhostSm} flex items-center gap-1 text-red-600 hover:text-red-600`}
        onClick={() => setOpen(true)}
      >
        <div className='text-xs'>新規登録</div>
        <Plus size={14} />
      </button>
      {open ? (
        <div
          className='fixed inset-0 z-50 grid place-items-center bg-black/60 p-4'
          role='presentation'
          onClick={closeDialog}
        >
          <div
            role='dialog'
            aria-modal='true'
            className='relative grid w-full max-w-lg gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg'
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type='button'
              className='absolute right-4 top-4 rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400'
              onClick={closeDialog}
              aria-label='Close'
            >
              x
            </button>
            <HanziForm
              form={form}
              articleId={articleId}
              closeDialog={closeDialog}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HanziFormDialog;
