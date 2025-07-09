import Head from 'next/head'
import Box from '@mui/material/Box'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import ProfilePicture from '../components/ProfilePicture'
import ContractSection from '../components/ContractSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>DogWithHair</title>
      </Head>
      <NavBar />
      {/* offset for fixed AppBar */}
      <Box id="hero" sx={{ pt: { xs: 8, sm: 10 } }}>
        <HeroSection />
      </Box>
      <ContractSection />
  <ProfilePicture />
      <Footer />
    </>
  )}