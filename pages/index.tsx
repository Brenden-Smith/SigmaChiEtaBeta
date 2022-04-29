import "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { createTheme, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Links, Photo, ShareIcon, SocialLinks } from "../components/main";

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
  return (
    <>
      <Head>
        <title>Sigma Chi Long Beach</title>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/day6akr.css"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <div className={styles.main}>
          <Stack direction="column" spacing={2}>
            <Stack direction="column" className={styles.container} spacing={1}>
              <Photo />
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Sigma Chi Long Beach
              </Typography>
              <SocialLinks />
            </Stack>
            <Links />
          </Stack>
          <ShareIcon />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Home;
