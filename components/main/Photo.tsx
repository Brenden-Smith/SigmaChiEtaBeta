import { Avatar } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export const Photo = () => {
  const [photo, setPhoto] = useState<string | undefined>("");

  // Listen to changes in the database
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "site/index"), (snapshot) => {
      setPhoto(snapshot.data()?.photo);
    });
    return () => unsub();
  }, []);

  return (
    <Avatar sx={{ height: 100, width: 100 }} src={photo}/>
  );
};