import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Formik } from "formik";
import { db } from "../firebase";

export function AddLinkDialog({open, setOpen}: {
  open: any,
  setOpen: any,
}) {

  return (
    <Formik
      initialValues={{
        title: "",
        url: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        await updateDoc(doc(db, "links/index"), { links: arrayUnion({...values, id: new Date()})});
        setSubmitting(false);
        resetForm();
      }}
      onReset={() => setOpen(false)}
      validate={(values) => {
        const errors: any = {};
        if (!values.title) {
          errors.title = "Required";
        }
        if (!values.url) {
          errors.url = "Required";
        }
        if (values.url) {
          const url = new URL(values.url);
          if (!url.hostname) {
            errors.url = "Invalid URL";
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
        handleReset
      }) => (
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          <Typography variant="h6">Create New Link</Typography>
        </DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <TextField 
              label="Name" 
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.title && touched.title)}
              helperText={errors.title && touched.title && errors.title}
            />
            <TextField 
              label="Link"
              name="url"
              value={values.url}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.url && touched.url)}
              helperText={errors.url && touched.url && errors.url} 
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleReset()}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Create</Button>
        </DialogActions>
      </Dialog>
    )}
    </Formik>
  );
}