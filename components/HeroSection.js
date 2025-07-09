import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        px: { xs: 2, sm: 4 },                   // horizontal padding
        width: '100%',
        height: { xs: '50vh', sm: '60vh', md: '90vh' },
        overflow: 'hidden',
      }}
    >
      {/* overlay content */}
      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#333',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          DogWithHair
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mt: 1,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          Viral Korean DogWithHair
        </Typography>
      </Container>
    </Box>
  )
}