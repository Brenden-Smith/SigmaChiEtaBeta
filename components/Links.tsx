import { Button, IconButton, Input, Paper, Stack, Typography } from '@mui/material';
import { animate, MotionValue, Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from "@mui/icons-material/Menu";
import { DeleteDialog } from './DeleteDialog';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AddLinkDialog } from './AddLinkDialog';
import EditIcon from '@mui/icons-material/Edit';

const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";

function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isActive = false;
    value.onChange((latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, "5px 5px 10px rgba(0,0,0,0.3)");
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}

function LinkItem({ item }: { 
  item: Record<string, string>
}) {

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const { title, url, id } = item;
  const controls = useDragControls();

  const [delDialog, openDelDialog] = useState(false);

  return (
    <Reorder.Item
      value={item}
      id={id}
      style={{ y, boxShadow, margin: "15px" }}
      dragControls={controls}
      dragListener={false}
    >
      <Paper
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
          width: "100%",
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
              <IconButton onClick={() => openDelDialog(true)}>
                <DeleteIcon />
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                onPointerDown={(e) => controls.start(e)}
                disableTouchRipple
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="body1">{url}</Typography>
            </Stack>
          </Stack>
          <Stack direction="column" justifyContent="center">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Reorder.Item>
  );
};

export function Links() {

  const [links, setLinks] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [addLink, setAddLink] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "links/index"),
      (snapshot) => {
        setLinks(snapshot.data()!.links);
        setData(snapshot.data()!.links);
      }
    )
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h5">Links</Typography>
        <Stack direction="row" spacing={2}>
          <AddLinkDialog open={addLink} setOpen={setAddLink} />
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => setAddLink(true)}
          >
            Add New Link
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", color: "white" }}
            disabled={JSON.stringify(links) === JSON.stringify(data)}
            onClick={() => {
              updateDoc(doc(db, "links/index"), { links: links });
            }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row"></Stack>
      <Reorder.Group
        axis="y"
        onReorder={setLinks}
        values={links}
        style={{
          listStyle: "none",
          overflowY: "scroll",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layoutScroll
      >
        {links.map((item: any) => (
          <LinkItem key={item.id} item={item} />
        ))}
      </Reorder.Group>
    </Stack>
  );
}