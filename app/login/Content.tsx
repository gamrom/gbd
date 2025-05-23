"use client";

import { TextField } from "@mui/material";
import { Button, Checkbox } from "@nextui-org/react";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useFormik } from "formik";
import React from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getMe } from "../api";

export const Content = () => {
  const router = useRouter();
  
  const [autoLoginChecked, setAutoLoginChecked] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      pw: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      auth.setPersistence(
        autoLoginChecked ? browserLocalPersistence : browserSessionPersistence
      );
      signInWithEmailAndPassword(auth, values.email, values.pw)
        .then((userCredential: any) => {
          
         getMe().then((res) => {
          res.data.role === "guest" ? router.push("/join") : router.push("/events");
         })
          
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
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="flex flex-col mx-auto mt-[100px] max-w-[360px]">
        <TextField
          InputLabelProps={{ shrink: true }}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="아이디"
          variant="outlined"
          autoComplete="off"
          inputProps={{ autoComplete: 'new-email' }}
          placeholder="아이디는 이메일형식입니다"
        />
        <div className="mt-4"></div>
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
          autoComplete="off"
          inputProps={{ autoComplete: 'new-password' }}
          placeholder="비밀번호를 입력해주세요"
        />
        <div className="flex items-center justify-between">
          <Checkbox
            isSelected={autoLoginChecked}
            onChange={(e) => setAutoLoginChecked(e.target.checked)}
            color="primary"
          >
            자동 로그인
          </Checkbox>
          <div className="flex flex-col">
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
          </div>
        </div>
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
