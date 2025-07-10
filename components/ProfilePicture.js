import React, { useState, useEffect } from 'react'
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
  const [error, setError] = useState(null)
  const [dailyCount, setDailyCount] = useState(0)
  const DAILY_LIMIT = 20

  useEffect(() => {
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem('ppDate')
    const storedCount = parseInt(localStorage.getItem('ppCount') || '0', 10)
    if (storedDate === today) {
      setDailyCount(storedCount)
    } else {
      localStorage.setItem('ppDate', today)
      localStorage.setItem('ppCount', '0')
      setDailyCount(0)
    }
  }, [])

  const generateImage = async () => {
    if (!style.trim()) return
    if (dailyCount >= DAILY_LIMIT) {
      setError(`Daily limit of ${DAILY_LIMIT} images reached.`)
      return
    }
    setError(null)
    setLoading(true)
    setImageUrl(null)
    try {
      const finalPrompt = BASE_PROMPT.replace('[Hairstyle]', style.trim())
      const imgResponse = await fetch(placeholderImg.src)
      const imgBlob = await imgResponse.blob()
      const formData = new FormData()
      formData.append('image', imgBlob, 'hair.png')
      formData.append('mask', imgBlob, 'hair-mask.png')
      formData.append('model', 'gpt-image-1')
      formData.append('prompt', finalPrompt)
      formData.append('n', '1')
      formData.append('size', '1024x1024')
      const res = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: formData
      })
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        const msg = errBody.error?.message || 'Failed to generate image.'
        setError(msg)
        setLoading(false)
        return
      }
      const data = await res.json()
      const b64 = data.data?.[0]?.b64_json
      const url = b64 ? `data:image/png;base64,${b64}` : null
      setImageUrl(url)
      // update daily count
      const newCount = dailyCount + 1
      setDailyCount(newCount)
      localStorage.setItem('ppCount', newCount.toString())
    } catch (err) {
      console.error(err)
      setError(err.message || 'An error occurred.')
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
        Enter a hairstyle
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 360, mx: 'auto', mb: 2 }}>
        <TextField
          label="Hairstyle"
          variant="outlined"
          multiline
          rows={2}
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          sx={{ width: '100%', mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={generateImage}
          disabled={loading}
          sx={{
            width: '100%',
            bgcolor: '#333',
            color: '#fff',
            '&:hover': { bgcolor: '#000000' },
          }}
        >
          Generate Image
        </Button>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
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
