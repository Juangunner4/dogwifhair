import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

export default function NavBar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        minHeight: { xs: 48, sm: 56 },
        justifyContent: 'center',
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 1.5, sm: 3 },
          justifyContent: 'center',
        }}
      >
        <Button
          component="a"
          href="/"
          color="inherit"
          sx={{
            fontSize: { xs: '0.75rem', sm: '1rem' },
            transition: 'background 0.2s, color 0.2s',
            '&:hover': {
              bgcolor: '#000',
              color: '#fff',
            },
          }}
        >
          Home
        </Button>
      </Toolbar>
    </AppBar>
  )
}
