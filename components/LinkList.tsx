import { IconButton, Input, Paper, Stack } from '@mui/material';
import { animate, MotionValue, Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from "@mui/icons-material/Menu";
import { DeleteDialog } from './DeleteDialog';
import { collection, doc, DocumentReference, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
        <Stack direction="row" spacing={2}>
          <Stack
            direction="column"
            justifyItems="center"
            sx={{ height: "100%" }}
          >
            <DeleteDialog open={delDialog} setOpen={openDelDialog} title={title} id={id} />
            <IconButton onClick={() => openDelDialog(true)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onPointerDown={(e) => controls.start(e)} disableTouchRipple>
              <MenuIcon />
            </IconButton>
          </Stack>

          <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
            <Input
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                width: "100%",
              }}
              value={title}
              fullWidth
            />
            <Input
              sx={{
                fontSize: "1rem",
                width: "100%",
              }}
              fullWidth
              value={url}
            />
          </Stack>
        </Stack>
      </Paper>
    </Reorder.Item>
  );
};

export function LinkList() {

  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "links/index"),
      (snapshot) => {
        const links: Array<any> = [];
        snapshot.data()?.links.forEach((link: any) => {
          links.push(link);
        })
        setLinks(links);
      }
    )
    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    updateDoc(doc(db, "links/index"), { links });
  }, [links]);

  return (
    <Reorder.Group axis="y" onReorder={setLinks} values={links}
    style={{
      listStyle: "none",
    }}>
      {links.map((item: any) => (
        <LinkItem key={item.id} item={item} />
      ))}
    </Reorder.Group>
  );
}