import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import heroImg from '../assets/hair.jpg'

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        px: { xs: 2, sm: 4 },                   // horizontal padding
        width: '100%',
        height: { xs: '150px', sm: '180px', md: '220px' },
        overflow: 'hidden',
      }}
    >
      <Image 
        src={heroImg} 
        alt="Hero" 
        fill 
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        quality={95}
        priority
      />
      {/* Dark overlay for better text contrast */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />
      {/* overlay content */}
      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            textShadow: '3px 3px 10px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)',
            color: '#fff',
            mb: 0.5,
          }}
        >
          DogWithHair
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mt: 1,
            fontSize: { xs: '1rem', sm: '1.25rem' },
            textShadow: '2px 2px 8px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.7)',
            color: '#fff',
            fontWeight: 500,
          }}
        >
          Viral Korean DogWithHair
        </Typography>
      </Container>
    </Box>
  )
}