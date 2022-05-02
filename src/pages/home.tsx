import { useContext } from 'react'
import './styles.css'
import { Avatar, CircularProgress, createTheme, Stack, Typography } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { Links, ShareIcon, SocialLinks } from '../components/main'
import { DataContext } from '../context'

const theme = createTheme({
  typography: {
    fontFamily: ['rift-soft', 'geller-headline'].join(','),
    button: {
      fontFamily: 'geller-headline',
      fontWeight: 300,
      fontSize: '1.2rem',
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: '#00A3E0'
    },
    secondary: {
      main: '#FEC141'
    }
  }
})

const Home = () => {
  const data: any = useContext(DataContext)

  return (
    <ThemeProvider theme={theme}>
      {data
        ? (
        <div className="main">
          <div className="content">
            <Stack direction="column" spacing={2}>
              <Stack direction="column" className="container" spacing={1}>
                <Avatar sx={{ height: 100, width: 100 }} src={data.photo} />
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  Sigma Chi Long Beach
                </Typography>
                <SocialLinks socials={data.socials} />
              </Stack>
              <Links links={data.links} />
            </Stack>
            <ShareIcon />
          </div>
        </div>
          )
        : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <CircularProgress />
        </div>
          )}
    </ThemeProvider>
  )
}

export default Home
