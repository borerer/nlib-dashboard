'use client';

import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import './LogPage.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import Chip from '@mui/material/Chip';
import axios from 'axios';

dayjs.extend(relativeTime);
axios.defaults.baseURL = 'https://nlib.home.iloahz.com';

export default function Logs() {

  const [logs, setLogs] = React.useState([]);


  const getLogs = async () => {
    const res = await axios.get('/api/app/logs/get');
    return res.data;
  }

  const updateLogs = async () => {
    const res = await getLogs(50, 0);
    setLogs(res);
  }

  useEffect(() => {
    updateLogs();
  }, [setLogs]);

  return (
    <div className="logs">
        {logs.map(log => {
            const date = dayjs(log.timestamp);
            return <div>
              <Chip label={log.details['app_id']}></Chip>
              <Chip label={date.fromNow()}></Chip>
              <span>{log.message}</span>
            </div>
        })}
    </div>
  );
}
