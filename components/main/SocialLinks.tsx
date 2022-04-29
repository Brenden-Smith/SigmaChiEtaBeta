import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { logEvent } from "firebase/analytics";
import { analytics, db } from "../../firebase";
import { IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

export const SocialLinks = () => {

  const [socials, setSocials] = useState<any>([]);

  // Listen for social link changes
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "socials/index"), (snapshot) => {
      setSocials(snapshot.data()!.socials);
    });
    return () => {
      unsubscribe();
    };
  }, [socials]);

  // Render component
  return (
    <Stack direction="row">
      <IconButton
        size="large"
        href={socials.instagram}
        target="_blank"
        color="secondary"
        onClick={() =>
          logEvent(analytics, "link", {
            title: "Instagram",
            url: socials.instagram,
          })
        }
      >
        <InstagramIcon fontSize="large" />
      </IconButton>
      <IconButton
        size="large"
        href={socials.facebook}
        target="_blank"
        color="secondary"
        onClick={() =>
          logEvent(analytics, "link", {
            title: "Facebook",
            url: socials.facebook,
          })
        }
      >
        <FacebookIcon fontSize="large" />
      </IconButton>
      <IconButton
        size="large"
        href={socials.twitter}
        target="_blank"
        color="secondary"
        onClick={() =>
          logEvent(analytics, "link", {
            title: "Twitter",
            url: socials.twitter,
          })
        }
      >
        <TwitterIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
};
