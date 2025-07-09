import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Footer() {
  return (
    <AppBar
      position="static"
      component="footer"
      sx={{
        bgcolor: '#333',
        color: '#fff',
        px: 0
      }}
    >
      <Toolbar
        sx={{
          flexDirection: 'column',
          py: { xs: 1, sm: 2 },
          textAlign: 'center',
          width: '100%'
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          ©2025 DogWithHair. All rights reserved.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            fontSize: { xs: '0.7rem', sm: '0.875rem' }
          }}
        >
          Disclaimer: $HAIR is a memecoin and has no utility. Don’t risk money you are afraid of losing. The price may go up or down. We are not responsible for the token’s price.
        </Typography>
      </Toolbar>
    </AppBar>
  )
}