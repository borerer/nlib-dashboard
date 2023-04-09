'use client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import NotesIcon from '@mui/icons-material/Notes';
import GrainIcon from '@mui/icons-material/Grain';
import React from 'react';

export default function Home() {

  const [page, setPage] = React.useState('Logs');

  const naviItem = (icon, title) => {
    return <ListItem>
      <ListItemButton
        selected={page === title}
        onClick={() => setPage(title)}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  }

  const contentPage = () => {
    if (page === 'Apps') {

    } else if (page === 'Logs') {

    }
    return <div>{page} not implemented yet</div>
  }

  return (
    <main>
      <div className="navi">
        <List>
          {naviItem(<AppsIcon/>, 'Apps')}
          {naviItem(<NotesIcon/>, 'Logs')}
          {naviItem(<GrainIcon/>, 'KV')}
          {naviItem(<SettingsIcon/>, 'Settings')}
        </List>
      </div>
      <div>
        {contentPage()}
      </div>
    </main>
  );
}
