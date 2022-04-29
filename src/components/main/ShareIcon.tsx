import { Fab } from '@mui/material'
import { useEffect, useState } from 'react'
import IosShareSharpIcon from '@mui/icons-material/IosShareSharp'

export const ShareIcon = () => {
  const [canShare, setCanShare] = useState(false)
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator.share !== 'undefined'
    ) {
      setCanShare(true)
    }
  }, [])
  return canShare
    ? (
    <Fab
      sx={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        backgroundColor: 'white',
        color: 'black'
      }}
      onClick={async () => {
        await navigator
          .share({
            title: 'Sigma Chi Long Beach',
            text: 'Check out this website!',
            url: 'https://sigmachietabeta.com'
          })
          .catch(() => {})
      }}
    >
      <IosShareSharpIcon />
    </Fab>
      )
    : null
}
