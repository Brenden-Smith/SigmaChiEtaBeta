import { Avatar } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export const Photo = () => {
  const [photo, setPhoto] = useState<string | undefined>("");

  // Listen to changes in the database
  useEffect(() => {
    getDoc(doc(db, "site/index")).then((snap) => {
      setPhoto(snap.data()?.photo);
    });
  }, []);

  return (
    <Avatar sx={{ height: 100, width: 100 }} src={photo}/>
  );
};