import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ConnectButton } from '@rainbow-me/rainbowkit';




export default function NavBar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };




  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            =
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        color="primary"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => openInNewTab('https://github.com/mkeresty/pepethereum')}><img style={{width:'30px', marginRight: '5px'}} src={'os.svg'}/>Opensea</MenuItem>
        <MenuItem onClick={() => openInNewTab('https://github.com/mkeresty/pepethereum')}><img style={{width:'30px', marginRight: '5px'}} src={'github.svg'} />Github</MenuItem>
        <MenuItem onClick={() => openInNewTab('https://twitter.com/m_keresty')}><img style={{width:'30px', marginRight: '5px'}} src={'twitter.svg'} />Twitter</MenuItem>
      </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h1 className="comic">pepethereum</h1>
          </Typography>
          <ConnectButton />
        </Toolbar>
      </AppBar>
    </Box>

  );
}
//https://twitter.com/m_keresty?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor