import {useState, useEffect} from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Avatar, CircularProgress, createTheme, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Links, ShareIcon, SocialLinks } from "../components/main";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const theme = createTheme({
  typography: {
    fontFamily: ["rift-soft", "geller-headline"].join(","),
    button: {
      fontFamily: "geller-headline",
      fontWeight: 300,
      fontSize: "1.2rem",
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#00A3E0",
    },
    secondary: {
      main: "#FEC141",
    },
  },
});

const Home: NextPage = () => {

  const [links, setLinks] = useState([]);
  const [socials, setSocials] = useState([]);
  const [photo, setPhoto] = useState('');

  async function initialize() {
    const links = await getDoc(doc(db, "links/index")).then(
      (snap) => snap.data()!.links
    );
    const socials = await getDoc(doc(db, "socials/index")).then(
      (snap) => snap.data()!.socials
    );
    const photo = await getDoc(doc(db, "site/index")).then(
      (snap) => snap.data()!.photo
    );
    setLinks(links);
    setSocials(socials);
    setPhoto(photo);
  }
  useEffect(() => {
    initialize();
  })
  return (
    <>
      <Head>
        <title>Sigma Chi Long Beach</title>
        <link rel="stylesheet" href="https://use.typekit.net/day6akr.css" />
      </Head>
      <ThemeProvider theme={theme}>
        {links && socials && photo ? (
          <div className={styles.main}>
            <Stack direction="column" spacing={2}>
              <Stack direction="column" className={styles.container} spacing={1}>
                <Avatar sx={{ height: 100, width: 100 }} src={photo} />
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Sigma Chi Long Beach
                </Typography>
                <SocialLinks socials={socials} />
              </Stack>
              <Links links={links}/>
            </Stack>
            <ShareIcon />
          </div>
        ) : (
          <div 
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress/>
          </div>
        )}
      </ThemeProvider>
    </>
  );
};

export default Home;
