'use client';

import './globals.css';
import Nav from './nav';
import React from 'react';

export default function RootLayout({ children }) {
  const [page, setPage] = React.useState('apps');
  return (
    <html lang="en">
      <body>
        <section>
          <Nav page={page} setPage={setPage}/>
          {children}
        </section>
      </body>
    </html>
  )
}
