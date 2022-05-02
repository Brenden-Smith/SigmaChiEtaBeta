import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { logEvent } from 'firebase/analytics'
import { analytics } from '../../firebase'
import { IconButton, Stack } from '@mui/material'
import 'react'

export const SocialLinks = ({ socials }: { socials: any}) => {
  // Render component

  const color = '#FFD141'

  return (
    <Stack direction="row">
      <IconButton
        size="large"
        href={socials.instagram}
        target="_blank"
        sx={{ color: color }}
        onClick={() =>
          logEvent(analytics, 'link', {
            title: 'Instagram',
            url: socials.instagram
          })
        }
      >
        <InstagramIcon fontSize="large" />
      </IconButton>
      <IconButton
        size="large"
        href={socials.facebook}
        target="_blank"
        sx={{ color: color }}
        onClick={() =>
          logEvent(analytics, 'link', {
            title: 'Facebook',
            url: socials.facebook
          })
        }
      >
        <FacebookIcon fontSize="large" />
      </IconButton>
      <IconButton
        size="large"
        href={socials.twitter}
        target="_blank"
        sx={{ color: color }}
        onClick={() =>
          logEvent(analytics, 'link', {
            title: 'Twitter',
            url: socials.twitter
          })
        }
      >
        <TwitterIcon fontSize="large" />
      </IconButton>
    </Stack>
  )
}
