import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function NavBar() {
  const scrollToHero = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleBuy = () => {
    window.open(
      'https://app.uniswap.org/#/swap?outputCurrency=0x6yHXzbneQ…bonk',
      '_blank'
    )
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        backdropFilter: 'blur(4px)'
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          $HAIR
        </Typography>
        <Button color="inherit" onClick={scrollToHero}>
          Home
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleBuy}
          sx={{ ml: 1, borderColor: '#fff' }}
        >
          Buy $HAIR
        </Button>
      </Toolbar>
    </AppBar>
  )
}