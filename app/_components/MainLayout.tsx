import { MainNavbar } from "@/app/_components/Navbar";
import { fetcher } from "@/app/_utils/fetcher";
import { cookies, headers } from "next/headers";
// import { auth } from "../../firebase";
// import fbAdmin from "../../firebase_admin";

// import { checkToastObject } from "@/utils/checkToastObject";

const getCurrentUser = async () => {
  const res = await fetcher("/me", cookies());

  if (!res.ok) {
    return null;
  }

  return res.json();
};

export const MainLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentUser = await getCurrentUser();

  console.log(currentUser);

  // auth.onAuthStateChanged((user) => {
  //   console.log(user);
  // });
  // console.log(cookies().get("Authorization"));

  return (
    <>
      <MainNavbar currentUser={currentUser} />
      {children}
    </>
  );
};
