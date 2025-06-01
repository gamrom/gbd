"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { auth } from "../../firebase";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  Image,
} from "@nextui-org/react";

const menuItemsAll = [
  {
    name: "번개일정",
    href: "/events",
  },
  {
    name: "공지사항",
    href: "/notices",
  },
  {
    name: "보드게임 도구",
    href: "/boardgame_tools",
  },
  {
    name: "회칙",
    href: "https://gamromboard.notion.site/290766405fa14166bcd829f3afa8a9ba",
  },
];

const menuItemsStrict = [
  {
    name: "번개일정",
    href: "/events",
  },
  {
    name: "공지사항",
    href: "/notices",
  },
  {
    name: "보드게임 도구",
    href: "/boardgame_tools",
  },
  {
    name: "회칙",
    href: "https://gamromboard.notion.site/290766405fa14166bcd829f3afa8a9ba",
  },
  {
    name: "회원 관리",
    href: "/admin_page",
  },
  // {
  //   name: "정모 생성기",
  //   href: "/schedule_generator",
  // },
];

export const MainNavbar = () => {
  const [menuState, setMenuState] = useState<any>(menuItemsAll);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] =
    useState<boolean>(false);

  const signOut = () => {
    auth.signOut().then(() => {
      setIsLogoutConfirmOpen(false);
      window.location.reload();
    });
  };

  useEffect(() => {
    if (currentUser) {
      if (
        currentUser.data.role === "admin" ||
        currentUser.data.role === "manager"
      ) {
        //use reduce to set all items in menuItems to accessAll: true

        setMenuState(menuItemsStrict);
      }
    }
  }, [currentUser]);

  return (
    <>
      <Navbar
        disableAnimation
        isBordered
        onMenuOpenChange={setIsMenuOpen}
        isBlurred={false}
      >
        {/* 모바일 토글메뉴 */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="pr-3 sm:hidden" justify="center">
          <NavbarBrand>
            <Link href="/" className="font-bold text-inherit">
              <Image src="/logo.png" width={50} />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarBrand>
            <Link href="/" className="font-bold text-inherit">
              <Image src="/logo.png" width={50} />
            </Link>
          </NavbarBrand>

          {menuState.map((item: any, index: number) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color="foreground"
                href={item.href}
                size="sm"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarContent>

        {!currentUser && (
          <NavbarContent justify="end">
            <NavbarItem>
              <Link href="/login">
                <Button color="default">로그인</Button>
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}

        {currentUser && (
          <NavbarContent justify="end" className="hidden sm:flex">
            <NavbarItem>
              <Button
                onClick={() => setIsLogoutConfirmOpen(true)}
                color="warning"
              >
                로그아웃
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}

        {/* 모바일 메뉴 */}
        <NavbarMenu>
          {menuState.map((item: any, index: number) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          {currentUser && (
            <NavbarMenuItem>
              <Button
                onClick={() => setIsLogoutConfirmOpen(true)}
                color="warning"
              >
                로그아웃
              </Button>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>

      <Modal
        isOpen={isLogoutConfirmOpen}
        onOpenChange={setIsLogoutConfirmOpen}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <div className="text-center font-[600] text-lg font-[Kodchasan] px-[34px] mt-[37px]">
                정말 로그아웃 하시겠어요?
              </div>

              <div className="flex w-full gap-4 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#F5F5F5] text-[17px] font-[600] text-black w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={signOut}
                  className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
                >
                  확인
                </button>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
