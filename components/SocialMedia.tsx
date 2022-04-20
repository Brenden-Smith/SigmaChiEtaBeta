import { Input, Stack, Typography } from "@mui/material";

export function SocialMedia() {
  return (
    <>
      <Typography variant="h5">Social Media</Typography>
      <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
          <Typography variant="body1">Facebook</Typography>
          <Typography variant="body1">Instagram</Typography>
          <Typography variant="body1">Twitter</Typography>
        </Stack>
        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
          <Input
            sx={{
              fontSize: "1rem",
              width: "100%",
            }}
            value="https://www.facebook.com/your-page-name"
          />
          <Input
            sx={{
              fontSize: "1rem",
              width: "100",
            }}
            value="https://www.instagram.com/your-page-name"
          />
          <Input
            sx={{
              fontSize: "1rem",
              width: "100",
            }}
            value="https://www.twitter.com/your-page-name"
          />
        </Stack>
      </Stack>
    </>
  );
}