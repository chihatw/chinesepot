import { Hanzi_latest_sentence_count } from '@/features/hanzi/schema';
import HanziFormDialog from './HanziFormDialog';
import RadioGroupHanziMonitor from './RadioGroupHanziMonitor';

const SelectHanziForm = ({
  form,
  offset,
  hanzis,
  articleId,
  selectedHanzi,
  handleChangeSelect,
}: {
  form: string;
  offset: number;
  hanzis: Hanzi_latest_sentence_count[];
  articleId: number;
  selectedHanzi: string;
  handleChangeSelect: (value: string, offset: number) => void;
}) => {
  return (
    <div className='rounded-lg border border-slate-200 bg-white/30 pt-4 shadow-xs'>
      <div className='-mb-4 -ml-2 p-6 pt-0'>
        <div className='grid grid-cols-[auto_1fr] items-center gap-4'>
          <div className='relative -top-1'>{form}</div>
          <div className='space-y-2'>
            <div className='grid gap-2'>
              {hanzis
                .sort((a, b) => b.count! - a.count!)
                .map((hanzi, index) => (
                  <RadioGroupHanziMonitor
                    hanzi={hanzi}
                    key={index}
                    name={`hanzi-${offset}`}
                    selectedHanzi={selectedHanzi}
                    onChange={(value) => handleChangeSelect(value, offset)}
                  />
                ))}
            </div>
            <HanziFormDialog form={form} articleId={articleId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectHanziForm;
