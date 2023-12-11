'use client'
import { TextField, ToggleButtonGroup, ToggleButton, Button } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react"
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from "next/link"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import swal from 'sweetalert2';


const funnelsArray = [
  "지인",
  "인스타그램",
  "에브리타임",
  "캠퍼스픽",
  "당근마켓",
  "보드게임 커뮤니티",
  "기타",
]

export default function Register() {
  const [isRegisterProceeding, setIsRegisterProceeding] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/')
      }
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      pw: '',
      pwConfirm: '',
      name: '',
      phone: '',
      gender: '',
      funnels: '',
      confirmRule: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('이메일 형식이 아닙니다.').required('필수 입력사항입니다.'),
      pw: Yup.string().min(8, '비밀번호는 최소 8자 이상입니다.').required('필수 입력사항입니다.'),
      pwConfirm: Yup.string().oneOf([Yup.ref('pw'), undefined], '비밀번호가 일치하지 않습니다.').required('필수 입력사항입니다.'),
      name: Yup.string().required('필수 입력사항입니다.'),
      phone: Yup.string()
        .required("필수 입력사항입니다.")
        .matches(/^[0-9]+$/, "숫자만 사용해주세요.")
        .min(11, '11자리의 숫자만 입력해주세요.')
        .max(11, '11자리의 숫자만 입력해주세요.'),
      gender: Yup.string().required('필수 입력사항입니다.'),
      funnels: Yup.string().required('필수 입력사항입니다.'),
      confirmRule: Yup.boolean().oneOf([true], '필수 동의사항입니다.').required('필수 동의사항입니다.'),
    }),
    onSubmit: (values) => {
      setIsRegisterProceeding(true);

      //회원가입

      console.log(values.email)
      console.log(values.pw)
      console.log(values.pwConfirm)
      console.log(values.name)
      console.log(values.phone)
      console.log(values.gender);
      console.log(values.funnels);


      createUserWithEmailAndPassword(auth, values.email, values.pw).then((authUser) => {
        console.log("success");
        console.log(authUser);

        signInWithEmailAndPassword(auth, values.email, values.pw)
          .then((userCredential: any) => {
            //승인대기중 페이지로 이동 
            router.push('/waitApprove');
          })
          .catch((error: any) => {
            swal.fire({
              title: '회원가입 성공 && 로그인 실패',
              text: '다시 로그인 해주세요. 계속 반복되면 감롬에게 문의주세요.',
              icon: 'error',
              confirmButtonText: '확인',
              willClose: () => {
                router.push('/login');
              }
            })
          });
      }).catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          swal.fire({
            title: '회원가입 실패',
            text: '이미 존재하는 아이디입니다.',
            icon: 'error',
            confirmButtonText: '확인',
            willClose: () => {
              setIsRegisterProceeding(false);
            }
          })
        } else {
          swal.fire({
            title: '회원가입 실패',
            text: '다시 시도해주세요. 계속 반복되면 감롬에게 문의주세요.',
            icon: 'error',
            confirmButtonText: '확인',
            willClose: () => {
              setIsRegisterProceeding(false);
            }
          })
        }
      })
    },
  })

  const [funnels, setFunnels] = useState<string>('');
  const [confirmRule, setConfirmRule] = useState<boolean>(false);

  const [gender, setGender] = useState<string | null>('left');
  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string | null,
  ) => {
    setGender(newGender);
    formik.setFieldValue("gender", newGender);
  };

  const handleFunnel = (event: SelectChangeEvent) => {
    // setFunnels(event.target.value as string);
    setFunnels(event.target.value as string);
    formik.setFieldValue("funnels", event.target.value as string);
    console.log(event.target.value as string)
  };

  const handleConfirmRule = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmRule(event.target.checked as boolean);
    formik.setFieldValue("confirmRule", event.target.checked);
    console.log(event.target.checked)
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 flex flex-col mx-auto mt-[100px] max-w-[360px]">
      <TextField autoComplete='off' onChange={formik.handleChange} value={formik.values.email} size="small" id="email" label="이메일(아이디)" variant="outlined" />
      {formik.touched.email && formik.errors.email ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">{formik.errors.email}</div>
      ) : null}
      <TextField autoComplete='off' onChange={formik.handleChange} value={formik.values.pw} size="small" id="pw" label="비밀번호" variant="outlined" type="password" placeholder="최소 8자 이상" />
      {formik.touched.pw && formik.errors.pw ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">{formik.errors.pw}</div>
      ) : null}
      <TextField autoComplete='off' onChange={formik.handleChange} value={formik.values.pwConfirm} size="small" id="pwConfirm" label="비밀번호 확인" variant="outlined" type="password" />
      {formik.touched.pwConfirm && formik.errors.pwConfirm ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">{formik.errors.pwConfirm}</div>
      ) : null}
      <TextField autoComplete='off' onChange={formik.handleChange} value={formik.values.name} size="small" id="name" label="이름" variant="outlined" placeholder="본명을 입력해주세요." />
      {formik.touched.name && formik.errors.name ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">{formik.errors.name}</div>
      ) : null}
      <ToggleButtonGroup
        className="w-full"
        value={gender}
        exclusive
        onChange={handleGender}
        color="primary"
      >
        <ToggleButton className="w-full" value="man">
          남자
        </ToggleButton>
        <ToggleButton className="w-full" value="woman">
          여자
        </ToggleButton>
      </ToggleButtonGroup>
      {formik.touched.gender && formik.errors.gender ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">{formik.errors.gender}</div>
      ) : null}
      {/* 생년월일 */}
      <TextField autoComplete='off' onChange={formik.handleChange} value={formik.values.phone} size="small" id="phone" label="휴대폰 번호" variant="outlined" placeholder="숫자만 입력해주세요 ex)00011116666" />
      {formik.touched.phone && formik.errors.phone ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">{formik.errors.phone}</div>
      ) : null}

      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">유입경로</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={funnels}
          label="유입경로"
          onChange={handleFunnel}
        >
          {funnelsArray.map((funnel, index) => {
            return (
              <MenuItem key={index} value={funnel}>{funnel}</MenuItem>
            )
          })}
        </Select>
      </FormControl>

      {formik.touched.funnels && formik.errors.funnels ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">{formik.errors.funnels}</div>
      ) : null}

      <div className="flex flex-col">
        <FormControlLabel required control={<Checkbox onChange={handleConfirmRule} />} label="회칙 및 유의사항을 읽었습니다." />
        <Link href="#" target="_blank">회칙 확인</Link>
      </div>

      <Button variant="contained" type="submit" disabled={isRegisterProceeding}>회원가입 완료하기</Button>
    </form>
  )
}
