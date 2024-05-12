import { formatDistanceToNow } from 'date-fns';
import { fetchLatestDeploymentTime } from '../services/server';

type Props = {};

const HowOldAmI = async (props: Props) => {
  const ready = await fetchLatestDeploymentTime();

  const birthday = new Date(ready);

  return (
    <div className='text-xs text-slate-400 text-center my-10'>
      {`since: ${formatDistanceToNow(birthday, { addSuffix: true })}`}
    </div>
  );
};

export default HowOldAmI;
