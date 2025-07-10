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
  const [error, setError] = useState(null)

  const generateImage = async () => {
    if (!style.trim()) return
    setError(null)
    setLoading(true)
    setImageUrl(null)
    try {
      // Prepare prompt and reference image for edit
      const finalPrompt = BASE_PROMPT.replace('[Hairstyle]', style.trim())
      // Fetch the reference image blob
      const imgResponse = await fetch(placeholderImg.src)
      const imgBlob = await imgResponse.blob()
      // Build multipart form data for image edits endpoint
      const formData = new FormData()
      formData.append('image', imgBlob, 'hair.png')
      formData.append('mask', imgBlob, 'hair-mask.png')
      // specify model for edits
      formData.append('model', 'gpt-image-1')
      formData.append('prompt', finalPrompt)
      formData.append('n', '1')
      formData.append('size', '1024x1024') // use supported size for gpt-image-1
      // gpt-image-1 returns base64-encoded images by default
      const res = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: formData,
      })
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        const msg = errBody.error?.message || 'Failed to generate image.'
        setError(msg)
        setLoading(false)
        return
      }
      const data = await res.json()
      // build data URL from base64 JSON
      const b64 = data.data?.[0]?.b64_json
      const url = b64 ? `data:image/png;base64,${b64}` : null
      setImageUrl(url)
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
