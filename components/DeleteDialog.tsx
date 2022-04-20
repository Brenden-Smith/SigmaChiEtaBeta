import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { doc, deleteDoc, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export function DeleteDialog({open, setOpen, title, id}: {
  open: any,
  setOpen: any,
  title: string,
  id: string,
}) {
  return (
    <Dialog open={open}>
      <DialogTitle>
        <Typography variant="h6">
          Are you sure you want to delete {title}?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          This action cannot be reversed.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button sx={{color: "red"}} onClick={async () => {
          updateDoc(doc(db, "links/index"), { links: arrayRemove(id)});
          setOpen(false);
        }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}