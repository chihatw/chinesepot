import { formatDistanceToNow } from 'date-fns';
import { BIRTH_DAY } from '../constants';

type Props = {};

const HowOldAmI = (props: Props) => {
  const birthday = new Date(BIRTH_DAY * 1000);
  formatDistanceToNow(birthday);
  return (
    <div className='text-xs text-slate-400 text-center my-20'>
      {`since: ${formatDistanceToNow(birthday, { addSuffix: true })}`}
    </div>
  );
};

export default HowOldAmI;
