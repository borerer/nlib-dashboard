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
import Link from 'next/link';

const pages = [
  {
    id: 'apps',
    href: '/apps',
    title: 'Apps',
    icon: <AppsIcon/>
  },
  {
    id: 'logs',
    href: '/logs',
    title: 'Logs',
    icon: <NotesIcon/>
  },
  {
    id: 'kv',
    href: '/kv',
    title: 'KV',
    icon: <GrainIcon/>
  },
  {
    id: 'settings',
    href: '/settings',
    title: 'Settings',
    icon: <SettingsIcon/>
  }
];

export default function Nav({page, setPage}) {

  const naviItem = (item) => {
    return <Link href={item.href} key={item.id}>
      <ListItem>
        <ListItemButton
          selected={page === item.id}
          onClick={() => setPage(item.id)}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  }

  return (
    <div className="nav">
      <List>
        {pages.map(naviItem)}
      </List>
    </div>
  );
}
