import { Facebook, Instagram } from "@mui/icons-material";
import Twitter from "@mui/icons-material/Twitter";
import { Button, Input, Stack, Typography } from "@mui/material";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function Object({value, setValue}: {
  value: any,
  setValue: any
}) {

  return (
    <Input
      sx={{
        fontSize: "1rem",
        width: "100%",
      }}
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
      }}
    />
  );
}

export function SocialMedia() {

  const [data, setData] = useState<any>({});

  // Listen for changes in the database
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "socials/index"),
      (snapshot) => {
        setData(snapshot.data()!.socials);
      }
    );
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      <Formik
        initialValues={{
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
        }}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          updateDoc(doc(db, "socials/index"), {
            socials: {
              facebook: values.facebook,
              instagram: values.instagram,
              twitter: values.twitter,
            },
          });
          setSubmitting(false);
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.facebook) {
            errors.facebook = "Required";
          }
          if (values.facebook) {
            try {
              const url = new URL(values.facebook);
              if (!url.hostname) {
                errors.facebook = "Invalid URL";
              }
            } catch (e) {
              errors.facebook = "Invalid URL";
            }
          }
          if (!values.twitter) {
            errors.twitter = "Required";
          }
          if (values.twitter) {
            try {
              const url = new URL(values.twitter);
              if (!url.hostname) {
                errors.twitter = "Invalid URL";
              }
            } catch (e) {
              errors.twitter = "Invalid URL";
            }
          }
          if (!values.instagram) {
            errors.instagram = "Required";
          }
          if (values.instagram) {
            try {
              const url = new URL(values.instagram);
              if (!url.hostname) {
                errors.instagram = "Invalid URL";
              }
            } catch (e) {
              errors.instagram = "Invalid URL";
            }
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
          handleReset,
          isSubmitting,
        }) => (
          <>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Typography variant="h5">Social Media</Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: "green", color: "white" }}
                disabled={
                  JSON.stringify(values) === JSON.stringify(data) ||
                  !isSubmitting
                }
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </Stack>
            <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Facebook/>
                <Object
                  value={values.facebook}
                  setValue={(value: string) => {
                    handleChange({ target: { name: "facebook", value } });
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Instagram/>
                <Object
                  value={values.instagram}
                  setValue={(value: string) => {
                    handleChange({ target: { name: "instagram", value } });
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Twitter/>
                <Object
                  value={values.twitter}
                  setValue={(value: string) => {
                    handleChange({ target: { name: "twitter", value } });
                  }}
                />
              </Stack>
            </Stack>
          </>
        )}
      </Formik>
    </Stack>
  );
}