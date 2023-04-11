'use client';

import './globals.css';
import Nav from './nav';
import React from 'react';
import "@fontsource/roboto-mono";

export default function RootLayout({ children }) {
  const [page, setPage] = React.useState('apps');
  return (
    <html lang="en">
      <body>
        <div className='app'>
          <div className='nav'>
            <Nav page={page} setPage={setPage}/>
          </div>
          <div className='content'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
