import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import placeholderImg from '../assets/hair.png'

const BASE_PROMPT =
  'A small white dog (chihuahua) with large, round black eyes and a comically intense facial expression is sitting behind a flat surface. The dog has a digitally edited, realistic human hairstyle with short, dark spiked hair. The background is plain and minimalistic, keeping focus on the character. Maintain the same facial expression and pose, only change the hairstyle. [Hairstyle]'

export default function ProfilePicture() {
  const [style, setStyle] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    if (!style.trim()) return
    setLoading(true)
    setImageUrl(null)
    try {
      const finalPrompt = BASE_PROMPT.replace('[Hairstyle]', style.trim())
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({ prompt: finalPrompt, n: 1, size: '256x256' }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      const url = data.data && data.data[0] ? data.data[0].url : null
      setImageUrl(url)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Generate Profile Picture
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
        Enter a hairstyle to apply to the chihuahua
      </Typography>
      <Button
        variant="contained"
        onClick={generateImage}
        disabled={loading}
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: '#333',
          color: '#fff',
          '&:hover': { bgcolor: '#000000' },
          mb: 2
        }}
      >
        Generate Image
      </Button>
      <TextField
        label="Hairstyle"
        variant="outlined"
        multiline
        rows={2}
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        sx={{ width: '100%', maxWidth: 360, mb: 2 }}
      />
      <Box sx={{ mt: 4, minHeight: 256 }}>
        {loading && <CircularProgress />}
        {!loading && !imageUrl && (
          <Box sx={{ position: 'relative', width: 256, height: 256, mx: 'auto' }}>
            <Image
              src={placeholderImg}
              alt="Profile placeholder"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        )}
        {imageUrl && (
          <Box sx={{ position: 'relative', width: 256, height: 256, mx: 'auto' }}>
            <Image src={imageUrl} alt="Profile" fill style={{ objectFit: 'cover' }} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
