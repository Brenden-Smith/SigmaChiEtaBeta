import { Button, Stack } from "@mui/material";
import { logEvent } from "firebase/analytics";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { analytics, db } from "../../firebase";

export const Links = () => {

  // Listen for link changes
  const [links, setLinks] = useState<any>([]);
  useEffect(() => {
    getDoc(doc(db, "links/index")).then((snap) => {
      setLinks(snap.data()!.links);
    });
  }, []);

  // Render components
  return (
    <Stack direction="column" spacing={2}>
      {links.map((item: any, index: any) => {
        return (
          <Button
            variant="contained"
            key={index}
            sx={{
              width: "90vw",
              maxWidth: 350,
              height: 50,
              color: "white",
            }}
            href={item.url}
            target="_blank"
            onClick={() =>
              logEvent(analytics, "link", {
                title: item.title,
                url: item.url,
              })
            }
          >
            {item.title}
          </Button>
        );
      })}
    </Stack>
  );
};
