import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '60vh', md: '90vh' }
      }}
    >
      {/* overlay content */}
      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#333'
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)'
          }}
        >
          DogWithHair
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            textShadow: '1px 1px 4px rgba(0,0,0,0.6)'
          }}
        >
          Viral Korean DogWithHair
        </Typography>
      </Container>
    </Box>
  )
}