// ensure NavBar height doesn’t overlap on mobile
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function NavBar() {
  const scrollToHero = () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  const handleBuy = () => window.open('https://jup.ag/tokens/6yHXzbneXqSYJsXYryA5ovyeHDG3WZcBSdupurE8bonk', '_blank')

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
      <Toolbar sx={{ px: { xs: 1.5, sm: 3 } }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          $HAIR
        </Typography>
        <Button
          color="inherit"
          sx={{
            fontSize: { xs: '0.75rem', sm: '1rem' },
            transition: 'background 0.2s, color 0.2s',
            '&:hover': {
              bgcolor: '#333',
              color: '#fff',
              backgroundColor: '#000',
            },
          }}
          onClick={scrollToHero}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleBuy}
          sx={{
            ml: 1,
            borderColor: '#fff',
            fontSize: { xs: '0.75rem', sm: '1rem' },
            transition: 'background 0.2s, color 0.2s',
            '&:hover': {
              bgcolor: '#000',
              color: '#fff',
              borderColor: '#fff',
            },
          }}
        >
          Buy $HAIR
        </Button>
      </Toolbar>
    </AppBar>
  )
}