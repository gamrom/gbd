"use client";

import React from "react";
import { useEffect, useState } from "react";
// import { useGetCurrentUser } from "./hooks/useGetCurrentUser";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
// import { auth } from "../firebase";
// import { auth } from "../../firebase";
// import Link from "next/link";
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
} from "@nextui-org/react";
import { AlertModal } from "./Modal";

const menuItems = [
  {
    name: "번개일정",
    href: "/events",
    accessAll: true,
    targetBlank: false,
  },
  {
    name: "공지사항",
    href: "/notices",
    accessAll: true,
    targetBlank: false,
  },
  {
    name: "보드게임 도구",
    href: "/boardgame_tools",
    accessAll: true,
    targetBlank: false,
  },
  {
    name: "회칙",
    href: "https://gamromboard.notion.site/290766405fa14166bcd829f3afa8a9ba?pvs=4",
    accessAll: true,
    targetBlank: true,
  },
  // {
  //   name: "보유 보드게임",
  //   href: "https://gamromboard.notion.site/a4261df53fc54fc5a403d6a0d8e408e5?pvs=74",
  //   accessAll: true,
  //   targetBlank: true,
  // },
  {
    name: "회원 관리",
    href: "/admin_page",
    accessAll: false,
    targetBlank: false,
  },
  {
    name: "정모 생성기",
    href: "/schedule_generator",
    accessAll: false,
    targetBlank: false,
  },
];

// function NavItemDiv({ children }: { children: React.ReactNode }) {
//   return (
//     <li>
//       <Typography
//         variant="paragraph"
//         className="flex items-center gap-2 font-medium no-underline"
//       >
//         {children}
//       </Typography>
//     </li>
//   );
// }

// const NavItem = ({
//   name,
//   href,
//   targetBlank,
// }: {
//   name: string;
//   href: string;
//   targetBlank: boolean;
// }) => {
//   return (
//     <NavItemDiv>
//       <a
//         className="no-underline text-black"
//         href={href}
//         target={targetBlank ? "_blank" : ""}
//       >
//         {name}
//       </a>
//     </NavItemDiv>
//   );
// };

export const MainNavbar = ({ currentUser }: any) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] =
    useState<boolean>(false);

  // const { data, isLoading } = useGetCurrentUser();
  // console.log(data);

  // const signOut = () => {
  //   auth.signOut().then(() => {
  //     setIsLogoutConfirmOpen(false);
  //   });
  // };

  // const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();

  // const [open, setOpen] = React.useState(false);
  // const [isScrolling, setIsScrolling] = React.useState(false);
  // function handleOpen() {
  //   setOpen((cur) => !cur);
  // }

  // React.useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth >= 960 && setOpen(false)
  //   );
  // }, []);

  // React.useEffect(() => {
  //   function handleScroll() {
  //     if (window.scrollY > 0) {
  //       setIsScrolling(true);
  //     } else {
  //       setIsScrolling(false);
  //     }
  //   }

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const [canSee, setCanSee] = useState<boolean>(false);
  // useEffect(() => {
  //   if (!isLoading && currentUser) {
  //     if (
  //       currentUser.data.role === "admin" ||
  //       currentUser.data.role === "manager"
  //     ) {
  //       setCanSee(true);
  //     }
  //   }
  // }, [isLoading, currentUser]);

  // return (
  //   <nav
  //     className="fixed top-0 z-50 border-0 px-4 bg-white w-full py-4"
  //     style={{ maxWidth: "-webkit-fill-available" }}
  //   >
  //     <div className="container flex items-center justify-between mx-auto">
  //       <Typography
  //         as="a"
  //         href="/"
  //         className="text-lg font-bold flex items-center gap-2 no-underline"
  //         color={isScrolling ? "blue-gray" : "blue-gray"}
  //       >
  //         <Image src={onlylogo} alt="logo" width={40} height={40} />
  //         감롬의 보드게임 동아리
  //       </Typography>
  //       <ul className={`hidden items-center gap-6 lg:flex text-gray-900`}>
  //         {NAV_MENU.map((item, index) => {
  //           if (item.accessAll) {
  //             return (
  //               <NavItem
  //                 key={`name_${index}`}
  //                 name={item.name}
  //                 href={item.href}
  //                 targetBlank={item.targetBlank}
  //               />
  //             );
  //           } else {
  //             if (canSee) {
  //               return (
  //                 <NavItem
  //                   key={`name_${index}`}
  //                   name={item.name}
  //                   href={item.href}
  //                   targetBlank={item.targetBlank}
  //                 />
  //               );
  //             }
  //           }
  //         })}
  //       </ul>
  //       <MenuIcon
  //         onClick={handleOpen}
  //         className="cursor-pointer h-8 w-8 text-black"
  //       />
  //     </div>
  //     <Collapse open={open}>
  //       <div className="container mx-auto bg-white rounded-lg py-4 px-6 mt-3 border-t border-gray-200">
  //         <ul className="flex flex-col gap-4">
  //           {NAV_MENU.map((item, index) => {
  //             if (item.accessAll) {
  //               return (
  //                 <NavItem
  //                   key={`name_${index}`}
  //                   name={item.name}
  //                   href={item.href}
  //                   targetBlank={item.targetBlank}
  //                 />
  //               );
  //             } else {
  //               if (canSee) {
  //                 return (
  //                   <NavItem
  //                     key={`name_${index}`}
  //                     name={item.name}
  //                     href={item.href}
  //                     targetBlank={item.targetBlank}
  //                   />
  //                 );
  //               }
  //             }
  //           })}
  //         </ul>
  //         <div className="mt-6 flex items-center gap-2">
  // {!isLoading &&
  //   (!currentUser ? (
  //     <div className="items-center gap-2 lg:flex">
  //       <Link
  //         href="/login"
  //         className="no-underline text-white cursor-pointer"
  //         onClick={() => setOpen(false)}
  //       >
  //         <Button
  //           variant="gradient"
  //           color="blue"
  //           className="border-none cursor-pointer"
  //         >
  //           로그인 후 지원하기
  //         </Button>
  //       </Link>
  //     </div>
  //   ) : (
  //     <div className="items-center gap-2 lg:flex">
  //       <Button
  //         onClick={() => {
  //           Swal.fire({
  //             title: "로그아웃 하시겠습니까?",
  //             showCancelButton: true,
  //             confirmButtonText: `로그아웃`,
  //             cancelButtonText: `취소`,
  //           })
  //             .then((result) => {
  //               if (result.isConfirmed) {
  //                 signOut();
  //               }
  //             })
  //             .finally(() => {
  //               location.reload();
  //             });
  //         }}
  //         variant="filled"
  //         color="red"
  //         className="border-none cursor-pointer"
  //       >
  //         로그아웃
  //       </Button>
  //     </div>
  //   ))}
  //         </div>
  //       </div>
  //     </Collapse>
  //   </nav>
  // );

  return (
    <>
      <Navbar
        disableAnimation
        isBordered
        shouldHideOnScroll
        onMenuOpenChange={setIsMenuOpen}
        isBlurred={false}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <p className="font-bold text-inherit">감롬의 보드게임 동아리</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <p className="font-bold text-inherit">감롬의 보드게임 동아리</p>
          </NavbarBrand>

          {menuItems.map((item, index) => (
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

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">로그인</Link>
          </NavbarItem>
          <NavbarItem>
            {!currentUser ? (
              <div className="items-center gap-2 lg:flex">
                <Link href="/login">
                  <Button color="default">로그인</Button>
                </Link>
              </div>
            ) : (
              <div className="items-center gap-2 lg:flex">
                <Button
                  onClick={() => setIsLogoutConfirmOpen(true)}
                  color="warning"
                >
                  로그아웃
                </Button>
              </div>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
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
        </NavbarMenu>
      </Navbar>

      {/* <AlertModal
        isOpen={isLogoutConfirmOpen}
        onOpenChange={setIsLogoutConfirmOpen}
        // onConfirm={signOut}
        bodyText="로그아웃 하시겠습니까?"
      /> */}
    </>
  );
};
