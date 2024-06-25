import { Typography } from "@material-tailwind/react";
import { Card, CardBody } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { Content } from "./home/Content";
import { MainNavbar } from "./_components/Navbar";
import { MainLayout } from "./_components/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <Content />
    </MainLayout>
  );
}
