import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

dayjs.extend(relativeTime);

export default function SimpleLogLine({ log }) {

  const [useFromNow, setUseFromNow] = React.useState(true);

  const paddingAround = (s, len) => {
    const left = Math.floor((len - s.length) / 2);
    return s.padStart(s.length + left).padEnd(len);
  }

  const timestamp = (t) => {
    const date = dayjs(t);
    if (useFromNow) {
      return <div className='timestamp'>
        <span className='timestamp-text' onClick={() => setUseFromNow(false)}>
          {`[ ${paddingAround(date.fromNow(), 21)} ]`}
        </span>
      </div>
    } else {
      return <div className='timestamp'>
        <span className='timestamp-text' onClick={() => setUseFromNow(true)}>
          {`[ ${date.format('YY-MM-DD HH:mm:ss.SSS')} ]`}
        </span>
      </div>
    }
  }

  return (
    <div className={`log-line ${log.level}`}>
      {timestamp(log.timestamp)}
      <div className='app-id'>
        <span>
          {`[ ${paddingAround(log.details['app_id'], 11)} ]`}
        </span>
      </div>
      <div className='message'>
        <span>{log.message}</span>
      </div>
      <div className='details'>
        {Object.keys(log.details).filter(k => k != 'app_id').sort().map(k => {
          return <Tooltip title={k} key={k}>
            <Chip label={log.details[k]} size='small'></Chip>
          </Tooltip>
        })}
      </div>
    </div>
  );
}
