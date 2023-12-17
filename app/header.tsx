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
import Modal from '@mui/material/Modal';
import { modalStyle } from './style';
import dayjs from 'dayjs';



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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [canJoin, setCanJoin] = useState<boolean>(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const today = dayjs();
    const last7th = dayjs().endOf('month').subtract(6, 'day');
    const endOfCurrentMonth = dayjs().endOf('month');

    if (today.isBefore(endOfCurrentMonth)) {
      setCanJoin(false);
      const timer = setInterval(() => {
        const remainingTime = last7th.diff(dayjs(), 'second');

        if (remainingTime <= 0) {
          clearInterval(timer);
        } else {
          const days = Math.floor(remainingTime / (60 * 60 * 24));
          const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
          const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
          const seconds = remainingTime % 60;

          setCountdown(`남은 시간은 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanJoin(true);
    }
  }, []);

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


      <div key={"right"} className="flex items-center justify-center">
        <Button onClick={() => setIsModalOpen(true)} variant="contained" size="small" color="secondary" className="mr-4">
          감보동 지원하기
        </Button>
        <MenuIcon onClick={toggleDrawer("right", true)} className="cursor-pointer" />
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            {canJoin && (
              <div className="flex flex-col">
                <div>지원 전 회칙을 반드시 확인해주세요.</div>
                <a href="https://gamromboard.notion.site/290766405fa14166bcd829f3afa8a9ba?pvs=4" target="_blank" className="text-black no-underline">회칙 보러가기</a>
                <div>지원 후 3개월동안 활동하게 됩니다.</div>
                <div>가입 승인은 매달 마지막날 ~ 다음달 1일 중 처리됩니다.</div>
                <div>가입 완료되신분들은 카톡방에 초대해드리고 있습니다.</div>
                <div>아지트 포화 등의 이유로 가입에 제한이 있을 수 있습니다.</div>
                <div>추가 문의사항은 인스타그램으로 부탁드립니다.</div>
              </div>
            )}

            {!canJoin && (
              <div className="flex flex-col">
                <div>지원 기간이 아닙니다.</div>
                <div>매달 마지막 7일 동안 지원이 가능합니다.</div>
                {countdown && <div>지원 가능까지 {countdown} 남았습니다.</div>}
              </div>
            )}

            <Button color="error" onClick={() => setIsModalOpen(false)}>닫기</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}