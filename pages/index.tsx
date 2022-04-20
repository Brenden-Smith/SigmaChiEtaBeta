import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Avatar, Button, createTheme, Fab, IconButton, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { ThemeProvider } from '@emotion/react'
import IosShareSharpIcon from "@mui/icons-material/IosShareSharp";
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#00A3E0",

    }
  }
});

/**
 * Profile photo component
 */
const ProfilePhoto = () => {
  return (
    <Avatar
      sx={{ height: 100, width: 100 }}
    >
      <Image src={require("../assets/img/profile.jpg")} style={{ height: 100, width: 100 }} />
    </Avatar>
  );
}

const Links = ({items}: {
  items: any,
}) => {
  return <Stack direction="column" spacing={2}>
    {items.map((item: any, index: any) => {
      return (
        <Button 
          variant="contained" 
          key={index}
          sx={{
            width: "90vw",
            maxWidth: 350,
            height: 50,
            color: "white"
          }}
          href={item.url}
          target="_blank"
        >
          <Typography>
            {item.title}
          </Typography>
        </Button>
      );
    })}
  </Stack>
}


const SocialLinks = ({items}: {
  items: any
}) => {
  const icon = {height: 35, width: 35};

  return (
    <Stack direction="row">
      <IconButton size="large" href={items.instagram} target="_blank">
        <InstagramIcon fontSize="large" />
      </IconButton>
      <IconButton size="large" href={items.facebook} target="_blank">
        <FacebookIcon fontSize="large" />
      </IconButton>
      <IconButton size="large" href={items.twitter} target="_blank">
        <TwitterIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
}

const ShareIcon = () => {
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.navigator.share !== "undefined") {
      setCanShare(true);
    }
  }, []);
  return (
    canShare ? (
      <Fab
        sx={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          backgroundColor: "white",
          color: "black",
        }}
        onClick={async () => {
          await navigator.share({
            title: "Sigma Chi Long Beach",
            text: "Check out this website!",
            url: "https://sigmachietabeta.com",
          }).catch(() => {});
        }}
      >
        <IosShareSharpIcon />
      </Fab>
    ) : null
  );
};


const Home: NextPage = () => {

  const [links, setLinks] = useState<any>([]);
  const [socials, setSocials] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "links/index"), (snapshot) => {
      setLinks(snapshot.data()!.links);
      setSocials(snapshot.data()!.socials);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.main}>
        <Stack direction="column" spacing={2}>
          <Stack direction="column" className={styles.container} spacing={1}>
            <ProfilePhoto />
            <Typography variant="h5">Sigma Chi Long Beach</Typography>
            <SocialLinks items={socials}/>
          </Stack>
          <Links items={links}/>
        </Stack>
        <ShareIcon/>
      </div>
    </ThemeProvider>
  );
}

export default Home
