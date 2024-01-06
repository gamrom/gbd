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
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useGetCurrentUser } from './hooks/useGetCurrentUser';
import { roleText } from './tools';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';



export const Header = () => {
  const router = useRouter();
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();

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
            <ListItem>
              <Button variant="contained" color="secondary">
                <Link href="/login" className="w-full no-underline text-white">
                  로그인 후 지원하기
                </Link>
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            <ListItemButton onClick={() => {
              Swal.fire({
                title: '로그아웃 하시겠습니까?',
                showCancelButton: true,
                confirmButtonText: `로그아웃`,
                cancelButtonText: `취소`,
              }).then((result) => {
                if (result.isConfirmed) {
                  signOut();
                }
              }).finally(() => {
                location.reload();
              })
            }}>
              <ListItemText>
                로그아웃
              </ListItemText>
            </ListItemButton>

            <Divider flexItem />
            <ListItemText className="px-4">
              이름 : {currentUser && currentUser.data.name}
            </ListItemText>
            <ListItemText className="px-4">
              등급 : {currentUser && roleText(currentUser.data.role)}
            </ListItemText>

          </>
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

        <a href="https://gamromboard.notion.site/290766405fa14166bcd829f3afa8a9ba?pvs=4" target="_blank" className="text-black no-underline">
          <ListItemButton>
            <ListItemText>
              회칙 보러가기
            </ListItemText>
          </ListItemButton>
        </a>


        <a href="https://gamromboard.notion.site/a4261df53fc54fc5a403d6a0d8e408e5?pvs=74" target="_blank" className="text-black no-underline">
          <ListItemButton>
            <ListItemText>
              보유 보드게임
            </ListItemText>
          </ListItemButton>
        </a>

        <Divider flexItem />

        {
          !isLoading && (currentUser && ((currentUser.data.role === "admin") || (currentUser.data.role === "manager")) && (
            <Link href="/admin_page" className="no-underline text-black">
              <ListItemButton>
                <ListItemText>
                  회원 관리
                </ListItemText>
              </ListItemButton>
            </Link>
          ))
        }

        <Link href="/schedule_generator" className="no-underline text-black">
          <ListItemButton>
            <ListItemText>
              정모 생성기
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


      <div key={"right"} className="flex items-center justify-center">
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