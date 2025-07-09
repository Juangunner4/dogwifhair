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
    <Box id="contract" sx={{ py: 6, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Contract Address
      </Typography>
      <Paper
        onClick={copy}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          p: 2,
          border: '2px solid #fff',    
          borderRadius: 2,
          bgcolor: '#333',               
          color: '#fff',                
          cursor: 'pointer',
          '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }
        }}
        elevation={0}
      >
        <Typography noWrap sx={{ fontSize: '1.25rem', mr: 1 }}>
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