import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { logEvent } from "firebase/analytics";
import { analytics, db } from "../../firebase";
import { IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export const SocialLinks = () => {

  const [socials, setSocials] = useState<any>([]);

  useEffect(() => {
    getDoc(doc(db, "socials/index")).then((snap) => {
      setSocials(snap.data()!.socials);
    });
  }, [socials]);

  // Render component
  return (
    <Stack direction="row">
      <IconButton
        size="large"
        href={socials.instagram}
        target="_blank"
        sx={{ color: "black" }}
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
        sx={{ color: "black" }}
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
        sx={{ color: "black" }}
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
