import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        textAlign: 'center',
        bgcolor: '#333',
        color: '#fff'
      }}
    >
      <Typography variant="body2" color="inherit">
        ©2025 DogWithHair. All rights reserved.
      </Typography>
      <Typography
        variant="body2"
        color="inherit"
        sx={{ mt: 1, maxWidth: 600, mx: 'auto', px: 2 }}
      >
        Disclaimer: $HAIR is a memecoin and has no utility. Don’t risk money you are
        afraid of losing. The price may go up or down. We are not responsible for the
        token’s price.
      </Typography>
    </Box>
  )
}