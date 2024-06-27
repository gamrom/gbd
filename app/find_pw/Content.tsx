"use client";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import { TextField } from "@mui/material";

import { Button } from "@nextui-org/react";

import Swal from "sweetalert2";

export const Content = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "비밀번호 재설정 메일을 전송했습니다.",
            showConfirmButton: true,
            willClose: () => {
              location.href = "/login";
            },
          });
        })
        .catch((error) => {
          //아이디 틀렸을 경우 체크해야함
          alert(
            "문제가 발송해 이메일 발송에 실패했습니다. 관리자에게 문의해주세요."
          );
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col mx-auto mt-[100px] max-w-[360px]">
        <TextField
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="이메일"
          variant="outlined"
        />
        <Button type="submit" className="mt-4">
          비밀번호 재설정
        </Button>
      </div>
    </form>
  );
};
