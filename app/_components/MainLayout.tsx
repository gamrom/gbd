import { MainNavbar } from "@/app/_components/Navbar";
import { MainFooter } from "@/app/_components/Footer";
// import { fetcher } from "@/app/_utils/fetcher";
// import { cookies } from "next/headers";
// import { auth } from "../../firebase";

// import { checkToastObject } from "@/utils/checkToastObject";

const getCurrentUser = async () => {
  //  try {
  //     const user: any = await new Promise((resolve, reject) => {
  //       auth.onAuthStateChanged((user) => {
  //         resolve(user);
  //       }, reject);
  //     });
  //     if (user) {
  //       const token = await user?.getIdToken();
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //   } catch {
  //     delete config.headers.Authorization;
  //   } finally {
  //     return config;
  //   }
  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     return user;
  //   }
  // });
  // const res = await fetcher("/me", cookies());
};

export const MainLayout = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  // const currentUser = await getCurrentUser();
  // console.log(currentUser);
  return (
    <>
      {/* <MainNavbar currentUser={currentUser} /> */}
      <MainNavbar />
      <div className="flex flex-col justify-between min-h-screen">
        <div className="w-full">
          <div className={style}>{children}</div>
        </div>
        <MainFooter />
      </div>
    </>
  );
};
