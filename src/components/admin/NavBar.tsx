import { AppBar, Hidden, IconButton, Toolbar, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

export function NavBar () {
  return <AppBar>
    <Toolbar>
      <Hidden smUp>
        <IconButton edge="start" sx={{ color: 'white' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Hidden>
      <Typography variant="h6" color="white" >
        Administrator Panel
      </Typography>
      <div style={{ flexGrow: 1 }} />
      <IconButton
        edge="end"
        aria-label="logout"
        sx={{ color: 'white' }}
        onClick={() => signOut(auth)}
      >
        <LogoutIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
}
