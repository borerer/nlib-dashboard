'use client';

import React, { useEffect } from 'react';
import './styles.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

dayjs.extend(relativeTime);
axios.defaults.baseURL = 'https://nlib.home.iloahz.com';

const levelToColorMap = {
  'debug': 'default',
  'info': 'info',
  'warn': 'warning',
  'error': 'error',
}

export default function Logs() {

  const [logs, setLogs] = React.useState([]);
  const [useFromNow, setUseFromNow] = React.useState(true);

  const getLogs = async (limit, skip) => {
    const res = await axios.get('/api/app/logs/get', {params: {n: limit, skip: skip}});
    return res.data;
  }

  const updateLogs = async () => {
    const res = await getLogs(50, 0);
    setLogs(res);
  }

  useEffect(() => {
    updateLogs();
  }, [setLogs]);

  const levelToColor = (level) => {
    if (levelToColorMap[level] != null) {
      return levelToColorMap[level];
    }
    return 'default';
  }

  const paddingAround = (s, len) => {
    const left = Math.floor((len - s.length) / 2);
    return s.padStart(s.length + left).padEnd(len);
  }

  const timestamp = (t) => {
    const date = dayjs(t);
    if (useFromNow) {
      return <div className='timestamp' onClick={() => setUseFromNow(false)}>
        <span>
          {`[ ${paddingAround(date.fromNow(), 21)} ]`}
        </span>
      </div>
    } else {
      return <div className='timestamp' onClick={() => setUseFromNow(true)}>
        <span>
          {`[ ${date.format('YY-MM-DD HH:mm:ss.SSS')} ]`}
        </span>
      </div>
    }
  }

  return (
    <div className='logs'>
        {logs.map(log => {
            return <div className={`log-line ${log.level}`}>
              {timestamp(log.timestamp)}
              <div className='app-id'>
                <span>
                  {`[ ${paddingAround(log.details['app_id'], 11)} ]`}
                </span>
                {/* <Chip label={log.details['app_id']} size='small'></Chip> */}
              </div>
              {/* <div className='level'>
                <Chip label={log.level} size='small' color={levelToColor(log.level)}></Chip>
              </div> */}
              <div className='message'>
                <span>{log.message}</span>
              </div>
              <div className='details'>
                {Object.keys(log.details).filter(k => k != 'app_id').sort().map(k => {
                  return <Tooltip title={k}>
                    <Chip label={log.details[k]} size='small'></Chip>
                  </Tooltip>
                })}
              </div>
            </div>
        })}
    </div>
  );
}
