import { Button, Stack } from '@mui/material'
import { logEvent } from 'firebase/analytics'
import 'react'
import { analytics } from '../../firebase'

export const Links = ({ links }: { links: any }) => {
  // Render components
  return (
    <Stack direction="column" spacing={2}>
      {links.map((item: any, index: any) => {
        return (
          <Button
            variant="contained"
            key={index}
            sx={{
              width: '90vw',
              maxWidth: 350,
              height: 50,
              color: 'white'
            }}
            href={item.url}
            target="_blank"
            onClick={() =>
              logEvent(analytics, 'link', {
                title: item.title,
                url: item.url
              })
            }
          >
            {item.title}
          </Button>
        )
      })}
    </Stack>
  )
}
