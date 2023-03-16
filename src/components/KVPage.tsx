import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './KVPage.css';
import api from '../api/api';
import KV from '../models/KV';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

dayjs.extend(relativeTime);

function KVPage() {
  const [kvList, setKVList] = React.useState<KV[]>([]);
  const [isEditing, setIsEditing] = React.useState<number>(-1);
  const [copySuccess, setCopySuccess] = React.useState<number>(-1);
  const [newKey, setNewKey] = React.useState('');
  const [newValue, setNewValue] = React.useState('');

  const updateKVList = async () => {
    const res = await api.getKVList();
    setKVList(res);
    setIsEditing(-1);
    setCopySuccess(-1);
  }

  useEffect(() => {
    updateKVList();
  }, [setKVList]);

  const valueCellDisplay = (kv: KV, index: number) => {
    const icon = copySuccess === index ? <CheckIcon></CheckIcon> : <ContentCopyIcon onClick={async () => {
        setIsEditing(-1);
        try {
            await navigator.clipboard.writeText(kv.value);
        } catch(e) {
            return;
        }
        toast(`copied value for ${kv.key}`);
        setCopySuccess(index);
    }}></ContentCopyIcon>;
    return <div className='value-display'>
        <span onClick={() => {
            setIsEditing(index);
        }}>{kv.value}</span>
        {icon}
    </div>;
  }

  const valueCellEditing = (kv: KV, index: number) => {
    return <TextField fullWidth size={'small'} value={kv.value} focused onChange={e => {
        const newList = [...kvList];
        newList[index].value = e.target.value;
        setKVList(newList);
    }}></TextField>
  }

  const onSaveClicked = (kv: KV, index: number) => {
    return async () => {
        setIsEditing(-1);
        try {
            await api.saveKV(kv);
        } catch(e) {
            toast(`save ${kv.key} failed`);
            return;
        }
        toast(`save ${kv.key} success`);
        await updateKVList();
    }
  }

  const onAddClicked = async () => {
    setIsEditing(-1);
    try {
        await api.saveKV(new KV(newKey, newValue, 0));
    } catch(e) {
        toast(`save ${newKey} failed`);
        return;
    }
    toast(`save ${newKey} success`);
    await updateKVList();
    setNewKey('');
    setNewValue('');
  }

  return (
    <div className="kv">
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Updated</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {kvList.map((kv: KV, index: number) => {
                        const date = dayjs(kv.updated);
                        const valueCell = isEditing === index ? valueCellEditing(kv, index) : valueCellDisplay(kv, index);
                        return (<TableRow key={kv.key}>
                            <TableCell>{kv.key}</TableCell>
                            <TableCell>{valueCell}</TableCell>
                            <TableCell>{date.fromNow()}</TableCell>
                            <TableCell>
                                <SaveIcon onClick={onSaveClicked(kv, index)}></SaveIcon>
                            </TableCell>
                        </TableRow>)
                    })}
                    <TableRow key='row-add'>
                        <TableCell>
                            <TextField value={newKey} onChange={(e) => {setNewKey(e.target.value)}}></TextField>
                        </TableCell>
                        <TableCell>
                            <TextField value={newValue} onChange={(e) => {setNewValue(e.target.value)}}></TextField>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            <SaveIcon onClick={onAddClicked}></SaveIcon>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}

export default KVPage;