
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
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {!isLogin ? (
          <>
            <Link href="/register" className="no-underline text-black">
              <ListItem key="회원가입" disablePadding>
                <ListItemButton>
                  <ListItemText primary="회원가입" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/login" className="no-underline text-black">
              <ListItemButton>
                <ListItemText>
                  로그인
                </ListItemText>
              </ListItemButton>
            </Link>
          </>
        ) : (
          <ListItemButton onClick={() => signOut()}>
            <ListItemText>
              로그아웃
            </ListItemText>
          </ListItemButton>
        )}

        <Divider flexItem />

        <Link href="/mighty" className="no-underline text-black">
          <ListItemButton>
            <ListItemText>
              마이티 계산기
            </ListItemText>
          </ListItemButton>
        </Link>

        <a href="https://www.instagram.com/gamrom.board.club" target="_blank" className="text-black no-underline">
          <ListItemButton>
            <ListItemText>
              인스타그램 가기
            </ListItemText>
          </ListItemButton>
        </a>

        <Divider flexItem />

        <Link href="/admin_page" className="no-underline text-black">
          <ListItemButton>
            <ListItemText>
              회원 관리
            </ListItemText>
          </ListItemButton>
        </Link>
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
      </div>


      <div key={"right"}>
        <MenuIcon onClick={toggleDrawer("right", true)} className="cursor-pointer" />
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