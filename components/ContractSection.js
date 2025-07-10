import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const CONTRACT_ADDRESS = '6yHXzbneXqSYJsXYryA5ovyeHDG3WZcBSdupurE8bonk'

export default function ContractSection() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  return (
    <Box id="contract" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 }, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        Contract Address
      </Typography>
      <Paper
        onClick={copy}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',            // center content
          p: { xs: 1.5, sm: 2 },
          borderRadius: 2,
          bgcolor: '#333',
          color: '#fff',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          width: { xs: '100%', sm: 'auto' },       // full width on mobile
          '&:hover': {
            boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
            transform: 'scale(1.05)',
          },
        }}
        elevation={0}
      >
        <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, mr: 1, wordBreak: 'break-all' }}>
          {CONTRACT_ADDRESS}
        </Typography>
        <ContentCopyIcon fontSize="small" />
      </Paper>

      {copied && (
        <Typography sx={{ mt: 1, color: '#333', fontWeight: 'bold' }}>
          Copied!
        </Typography>
      )}
    </Box>
  )
}