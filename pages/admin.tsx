import { ThemeProvider } from "@emotion/react";
import {
  Button,
  CircularProgress,
  createTheme,
  Grid,
  Hidden,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { auth } from "../firebase";
import { Links, NavBar, SocialMedia } from "../components/admin";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { ChangePhoto } from "../components/admin/ChangePhoto";

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
    },
  },
});

function Login() {
  return (
    <div className={styles.main} style={{ justifyContent: "center" }}>
      <Paper
        className={styles.container}
        sx={{
          height: 315,
          width: 350,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            await signInWithEmailAndPassword(auth, values.email, values.password);
            setSubmitting(false);
            resetForm();
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) =>
            !isSubmitting ? (
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6">Administrator Login</Typography>
                <TextField
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={touched.password && errors.password}
                  type="password"
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ color: "white" }}
                  onClick={() => handleSubmit()}
                >
                  Login
                </Button>
              </Stack>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            )
          }
        </Formik>
      </Paper>
    </div>
  );
}

function Page() {
  return (
    <div className={styles.main}>
      <NavBar />
      <Hidden smDown>
        <Grid container wrap="nowrap">
          <Grid item xs={12} md={4}>
            <Grid item component={Paper} sx={{ margin: 2, padding: 2 }}>
              <ChangePhoto />
            </Grid>
            <Grid item component={Paper} sx={{ margin: 2, padding: 2 }}>
              <SocialMedia />
            </Grid>
            <Grid item component={Paper} sx={{ margin: 2, padding: 2 }}>
              <Links />
            </Grid>
          </Grid>
          <Grid
            item
            component={Paper}
            xs={12}
            md={8}
            sx={{ margin: 2, padding: 2 }}
          >
            <Typography variant="h5">Analytics</Typography>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid container>
          <Grid item component={Paper} sx={{ margin: 2, padding: 2 }} xs={12}>
            <ChangePhoto />
          </Grid>
          <Grid item component={Paper} sx={{ margin: 2, padding: 2 }} xs={12}>
            <SocialMedia />
          </Grid>
          <Grid item component={Paper} sx={{ margin: 2, padding: 2 }} xs={12}>
            <Links />
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
}

const Admin: NextPage = () => {
  const [user, setUser] = useState<null | Boolean>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(true);
      else setUser(false);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      { user === false ? <Login />
      : user === true ? <Page />
      : <div className={styles.main} style={{ justifyContent: "center" }}>
          <CircularProgress />
        </div>
      }
    </ThemeProvider>
  );
};

export default Admin;
