import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'


export default function Gallery() {
  const [images, setImages] = useState([])
  // load gallery images from localStorage and include static assets
  useEffect(() => {
    const loadImages = () => {
      const stored = JSON.parse(localStorage.getItem('galleryImages') || '[]')
      setImages([...stored])
    }
    loadImages()
    window.addEventListener('gallery.update', loadImages)
    return () => window.removeEventListener('gallery.update', loadImages)
  }, [])
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Gallery
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',        // prevent wrapping for horizontal scroll
          overflowX: 'auto',
          gap: 2,
          py: 1,
          px: 1,
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {images.map((src, index) => (
          <Box
            key={typeof src === 'string' ? src : src.src}
            sx={{
              position: 'relative',
              flex: '0 0 auto',
              width: { xs: '120px', sm: '150px' },  // fixed thumbnail width
              height: { xs: '120px', sm: '150px' }, // fixed thumbnail height
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
