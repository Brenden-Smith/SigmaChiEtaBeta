import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { AddLinkDialog } from "./AddLinkDialog";
import { LinkList } from "./LinkList";

export function Links() {

  const [addLink, setAddLink] = useState(false);

  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
      <Typography variant="h5">Links</Typography>
      <Stack direction="row">
        <AddLinkDialog open={addLink} setOpen={setAddLink} />
        <Button
          variant="contained"
          sx={{ color: "white" }}
          onClick={() => setAddLink(true)}
        >
          Add New Link
        </Button>
      </Stack>
      <LinkList />
    </Stack>
  );
}