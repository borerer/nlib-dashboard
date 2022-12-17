import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import NotesIcon from '@mui/icons-material/Notes';
import FolderIcon from '@mui/icons-material/Folder';
import './Navigation.css';
import { ReactNode } from 'react';
import React from 'react';

function Navigation() {
  const [selected, setSelected] = React.useState('Chat');

  const handleClick = (text: string) => {
    setSelected(text);
  }

  const naviItem = (icon: ReactNode, text: string) => {
    return <ListItem>
      <ListItemButton 
        selected={selected === text}
        onClick={(e) => handleClick(text)}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  }

  return (
    <div className="navi">
      <List>
        {naviItem(<ChatIcon/>, 'Chat')}
        {naviItem(<StorageIcon/>, 'KV')}
        {naviItem(<NotesIcon/>, 'Logs')}
        {naviItem(<FolderIcon/>, 'Files')}
        {naviItem(<SettingsIcon/>, 'Settings')}
      </List>
    </div>
  );
}

export default Navigation;