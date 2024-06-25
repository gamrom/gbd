import { MainNavbar } from "@/app/_components/Navbar";
import { fetcher } from "@/app/_utils/fetcher";
import { cookies } from "next/headers";

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
  return (
    <>
      <MainNavbar currentUser={currentUser} />
      {children}
    </>
  );
};
