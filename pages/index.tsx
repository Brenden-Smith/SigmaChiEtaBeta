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
import { db, useAnalytics } from '../firebase'
import { Analytics, logEvent } from "firebase/analytics";

const theme = createTheme({
  typography: {
    fontFamily: [
      "rift-soft",
      "geller-headline"
    ].join(","),
    button: {
      fontFamily: "geller-headline",
      fontWeight: 300,
      fontSize: "1.2rem",
      textTransform: "none",
    }
  },
  palette: {
    primary: {
      main: "#00A3E0",
    },
    secondary: {
      main: "#FEC141",
    }
  },
});

/**
 * Helper function to log events to analytics
 */
function logAnalyticsEvent(analytics: Analytics, title: string, url: string) {
  if (analytics)
    logEvent(analytics, "link", {
      title: title,
      url: url,
    });
}

/**
 * Profile photo component
 */
const ProfilePhoto = () => {
  return (
    <Avatar
      sx={{ height: 100, width: 100 }}
    >
      <Image src={require("../assets/img/profile.jpg")} style={{ height: 100, width: 100 }} alt="logo"/>
    </Avatar>
  );
}

const Links = ({items, analytics}: {
  items: any,
  analytics: Analytics
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
          onClick={() => logAnalyticsEvent(analytics, item.title, item.url)}
        >
          {item.title}
        </Button>
      );
    })}
  </Stack>
}


const SocialLinks = ({items, analytics}: {
  items: any,
  analytics: Analytics,
}) => {
  const icon = {height: 35, width: 35};

  return (
    <Stack direction="row">
      <IconButton
        size="large"
        href={items.instagram}
        target="_blank"
        color="secondary"
        onClick={() => logAnalyticsEvent(analytics, "Instagram", items.instagram)}
      >
        <InstagramIcon fontSize="large" />
      </IconButton>
      <IconButton
        size="large"
        href={items.facebook}
        target="_blank"
        color="secondary"
        onClick={() => logAnalyticsEvent(analytics, "Facebook", items.facebook)}
      >
        <FacebookIcon fontSize="large" />
      </IconButton>
      <IconButton
        size="large"
        href={items.twitter}
        target="_blank"
        color="secondary"
        onClick={() => logAnalyticsEvent(analytics, "Twitter", items.twitter)}
      >
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

  const analytics = useAnalytics();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "links/index"), (snapshot) => {
      setLinks(snapshot.data()!.links);
      setSocials(snapshot.data()!.socials);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <>
    <Head>
      <title>Sigma Chi Long Beach</title>
      <link rel="stylesheet" href="https://use.typekit.net/day6akr.css"></link>    </Head>
    <ThemeProvider theme={theme}>
      {analytics ? 
        <div className={styles.main}>
          <Stack direction="column" spacing={2}>
            <Stack direction="column" className={styles.container} spacing={1}>
              <ProfilePhoto />
              <Typography variant="h4" sx={{fontWeight: "bold"}}>Sigma Chi Long Beach</Typography>
              <SocialLinks items={socials} analytics={analytics}/>
            </Stack>
            <Links items={links} analytics={analytics}/>
          </Stack>
          <ShareIcon/>
        </div>
        : null
      }
    </ThemeProvider>
  </>
}

export default Home
