
import Button from '@mui/material/Button';
import { Instagram } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';



export const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: any) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
       <div>회원가입</div>
      </List>
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <div>
          리스트1
        </div>
      </List>
    </Box>
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    })
  }, [])

  const signOut = () => {
    auth.signOut().then(() => {
      setIsLogin(false);
    })
  }

  return (
    <div className="mx-auto flex items-center justify-between text-center w-full">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="logo" width={40} height={40} />
        </Link>

        <a href="https://www.instagram.com/gamrom.board.club" target="_blank">
          <Button variant='outlined' className="ml-4">활동 사진 <Instagram sx={{ fontSize: 16 }} color="secondary" /></Button>
        </a>

        <Link href="/mighty">
          <Button variant='contained' className="ml-4">마이티계산기</Button>
        </Link>
      </div>

      <div className="flex space-x-2">
        {!isLogin ? (
          <>
            <Link href="/register">
              <Button variant="text">회원가입</Button>
            </Link>
            <Link href="/login">
              <Button variant="contained">로그인</Button>
            </Link>
          </>
        ) : (
          <Button variant="text" type="button" onClick={() => signOut()}>로그아웃</Button>
        )}
      </div>


      <div key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>{"right"}</Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </div>

    </div>
  )
}