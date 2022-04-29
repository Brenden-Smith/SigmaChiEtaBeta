import { Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import { animate, MotionValue, Reorder, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import { DeleteDialog } from './DeleteDialog'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import EditIcon from '@mui/icons-material/Edit'
import { LinkDialog } from './LinkDialog'

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)'

function useRaisedShadow (value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow)

  useEffect(() => {
    let isActive = false
    value.onChange((latest) => {
      const wasActive = isActive
      if (latest !== 0) {
        isActive = true
        if (isActive !== wasActive) {
          animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.3)')
        }
      } else {
        isActive = false
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow)
        }
      }
    })
  }, [value, boxShadow])

  return boxShadow
}

function LinkItem ({ item, update }: {
  item: Record<string, string>
  update: Function
}) {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const { title, url, id } = item

  const [delDialog, openDelDialog] = useState(false)
  const [editDialog, openEditDialog] = useState(false)

  return (
    <Reorder.Item
      value={item}
      id={id}
      style={{ y, boxShadow, margin: '15px' }}
    >
      <Paper
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column">
            <Stack direction="row" spacing={1} alignItems="center">
              <DeleteDialog
                open={delDialog}
                setOpen={openDelDialog}
                item={item}
              />
              <LinkDialog
                open={editDialog}
                setOpen={openEditDialog}
                link={item}
                update={update}
              />
              <IconButton onClick={() => openDelDialog(true)}>
                <DeleteIcon />
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {title}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                disableTouchRipple
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="body1">{url}</Typography>
            </Stack>
          </Stack>
          <Stack direction="column" justifyContent="center">
            <IconButton onClick={() => openEditDialog(true)}>
              <EditIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Reorder.Item>
  )
};

export function Links ({ links }: { links: any }) {
  const [addLink, setAddLink] = useState(false)

  function updateLink (item: any) {
    const newLinks = [...links]
    const index = newLinks.findIndex((link) => link.id === item.id)
    newLinks[index] = item
    updateDoc(doc(db, 'site/index'), { links: newLinks })
  }

  return (
    <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h5">Links</Typography>
        <Stack direction="row" spacing={2}>
          <LinkDialog open={addLink} setOpen={setAddLink} />
          <Button
            variant="contained"
            sx={{ color: 'white' }}
            onClick={() => setAddLink(true)}
          >
            Add New Link
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row"></Stack>
      <Reorder.Group
        axis="y"
        onReorder={(newLinks) => {
          updateDoc(doc(db, 'site/index'), { links: newLinks })
        }}
        values={links}
        style={{
          listStyle: 'none',
          overflow: 'hidden'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {links.map((item: any) => (
          <LinkItem key={item.id} item={item} update={updateLink}/>
        ))}
      </Reorder.Group>
    </Stack>
  )
}
