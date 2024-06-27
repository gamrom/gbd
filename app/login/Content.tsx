"use client";

import { TextField } from "@mui/material";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useFormik } from "formik";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const Content = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/join");
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      pw: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      signInWithEmailAndPassword(auth, values.email, values.pw)
        .then((userCredential: any) => {
          window.location.href = "/join";
        })
        .catch((error: any) => {
          if (error.code === "auth/too-many-requests") {
            Swal.fire({
              icon: "error",
              title: "로그인에 실패하였습니다.",
              text: "시도가 너무 많습니다. 비밀번호를 재설정해주세요",
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "로그인에 실패하였습니다.",
              text: "아이디와 비밀번호를 확인해주세요.",
              showConfirmButton: true,
            });
          }

          setSubmitting(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col mx-auto mt-[100px] max-w-[360px]">
        <TextField
          InputLabelProps={{ shrink: true }}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="아이디"
          variant="outlined"
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          id="pw"
          name="pw"
          type="password"
          value={formik.values.pw}
          onChange={formik.handleChange}
          label="비밀번호"
          variant="outlined"
          className="mt-4"
        />
        <div
          onClick={() =>
            Swal.fire({
              icon: "success",
              title: "아이디를 잊으셨나요?",
              text: "아이디를 잊으셨다면, 회장에게 문의해주세요. 아이디는 이메일 형식입니다!",
              showConfirmButton: true,
            })
          }
          className="mt-4 ml-auto text-xs text-right cursor-pointer w-fit"
        >
          아이디를 잊으셨나요?
        </div>
        <Link
          href="/find_pw"
          className="text-xs ml-auto text-right mt-[2px] no-underline cursor-pointer text-black w-fit"
        >
          비밀번호를 잊으셨나요?
        </Link>
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          color="primary"
          size="lg"
          className="mt-4"
        >
          로그인
        </Button>
        <Link href="/register" className="w-full text-black no-underline">
          <Button size="lg" className="w-full mt-4 text-center">
            회원가입
          </Button>
        </Link>
        <div className="mx-auto mt-4 font-bold text-danger">
          회원가입 해주셔야만 감보동에 지원하실 수 있습니다.
        </div>
      </div>
    </form>
  );
};
