import Head from 'next/head'
import Box from '@mui/material/Box'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>DogWithHair</title>
      </Head>
      <NavBar />
      <Box
        component="main"
        sx={{
          pt: { xs: 8, sm: 10 },
          minHeight: '100vh',
        }}
      />
      <Footer />
    </>
  )
}
