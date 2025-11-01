import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

export default function Footer() {
  return (
    <AppBar
      position="static"
      component="footer"
      sx={{
        bgcolor: '#333',
        color: '#fff',
        px: 0,
        width: '100vw',
        left: 0,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 48, sm: 56 },
        }}
      />
    </AppBar>
  )
}
