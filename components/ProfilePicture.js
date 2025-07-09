import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export default function ProfilePicture() {
  const [style, setStyle] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!style.trim()) return;
    setLoading(true);
    setImageUrl(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: style }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setImageUrl(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Generate Profile Picture
      </Typography>
      <TextField
        label="Hairstyle"
        variant="outlined"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        sx={{ width: '100%', maxWidth: 360 }}
      />
      <Button
        variant="contained"
        onClick={generateImage}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Generate
      </Button>
      <Box sx={{ mt: 4, minHeight: 256 }}>
        {loading && <CircularProgress />}
        {imageUrl && (
          <Box sx={{ position: 'relative', width: 256, height: 256, mx: 'auto' }}>
            <Image src={imageUrl} alt="Profile" fill style={{ objectFit: 'cover' }} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
