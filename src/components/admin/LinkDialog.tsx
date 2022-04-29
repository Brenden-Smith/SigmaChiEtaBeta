import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Formik } from 'formik'
import { db } from '../../firebase'

export function LinkDialog ({ open, setOpen, link, update }: { open: any; setOpen: any, link?: any, update?: Function }) {
  return (
    <Formik
      initialValues={{
        title: link?.title || '',
        url: link?.url || ''
      }}
      enableReinitialize
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        if (link && update) {
          update({
            title: values.title,
            url: values.url,
            id: link.id
          })
        } else {
          await updateDoc(doc(db, 'site/index'), {
            links: arrayUnion({ ...values, id: new Date() })
          })
        }
        setSubmitting(false)
        resetForm()
      }}
      onReset={() => setOpen(false)}
      validate={(values) => {
        const errors: any = {}
        if (!values.title) {
          errors.title = 'Required'
        }
        if (!values.url) {
          errors.url = 'Required'
        }
        if (values.url) {
          try {
            const url = new URL(values.url)
            if (!url.hostname) {
              errors.url = 'Invalid URL'
            }
          } catch (e) {
            errors.url = 'Invalid URL'
          }
        }
        return errors
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
            <Typography variant="h6">{link ? 'Edit Link' : 'Create New Link'}</Typography>
          </DialogTitle>
          <DialogContent sx={{ overflow: 'visible' }}>
            <Stack direction="column" spacing={2}>
              <TextField
                label="Name"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.title && touched.title)}
                helperText={touched.title ? errors.title as string : ''}
              />
              <TextField
                label="Link"
                name="url"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.url && touched.url)}
                helperText={touched.url ? errors.url as string : ''}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleReset()}>Cancel</Button>
            <Button onClick={() => handleSubmit()}>{link ? 'Confirm' : 'Create'}</Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  )
}
