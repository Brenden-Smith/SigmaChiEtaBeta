import { Avatar, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { db, storage } from '../../firebase'

/**
 * Component that allows changes to the photo on the main page
 */
export function ChangePhoto ({ photo }: { photo: string }) {
  const [uploading, setUploading] = useState(false)

  // Handle the photo change
  async function changePhoto (file: File | undefined) {
    console.log('Changing photo')
    setUploading(true)
    if (file) {
      const photoRef = ref(storage, `photos.${file.type}`)
      await uploadBytes(photoRef, file).then(async () => {
        const url = await getDownloadURL(photoRef)
        await updateDoc(doc(db, 'site/index'), { photo: url })
      })
    }
    setUploading(false)
  }

  // Render component
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ width: '100%' }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: '100%' }}
        justifyContent="space-between"
      >
      <Typography variant="h5">Photo</Typography>
      <input
          style={{ display: 'none' }}
          id="upload"
          type="file"
          onChange={(e) => {
            changePhoto(e.target.files![0])
          }}
          accept="image/*"
        />
        <label htmlFor="upload">
          <Button component="span" variant="contained" sx={{ color: 'white' }}>
            Change Photo
          </Button>
        </label>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar src={uploading ? undefined : photo} sx={{ height: 100, width: 100 }}>
          <CircularProgress sx={{ color: 'white' }}/>
        </Avatar>
      </Stack>
    </Stack>
  )
}
