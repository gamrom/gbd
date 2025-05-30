"use client";
import { TextField, ToggleButtonGroup, ToggleButton } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import swal from "sweetalert2";
import { postSignUp } from "../api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const funnelsArray = [
  "지인",
  "인스타그램",
  "에브리타임",
  "캠퍼스픽",
  "당근마켓",
  "보드게임 커뮤니티",
  "소모임",
  "기타",
];

export const Content = () => {
  const [isRegisterProceeding, setIsRegisterProceeding] =
    useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/join");
      }
    });
  }, []);

  const [funnels, setFunnels] = useState<string>("");
  const [confirmRule, setConfirmRule] = useState<boolean>(false);
  const [confirmMarketing, setConfirmMarketing] = useState<boolean>(true);

  const [birth, setBirth] = useState<Date | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      pw: "",
      pwConfirm: "",
      name: "",
      phone: "",
      gender: "",
      funnels: "",
      confirmRule: false,
      confirmMarketing: true,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("이메일 형식이 아닙니다.")
        .required("필수 입력사항입니다."),
      pw: Yup.string()
        .min(8, "비밀번호는 최소 8자 이상입니다.")
        .required("필수 입력사항입니다."),
      pwConfirm: Yup.string()
        .oneOf([Yup.ref("pw"), undefined], "비밀번호가 일치하지 않습니다.")
        .required("필수 입력사항입니다."),
      name: Yup.string().required("필수 입력사항입니다."),
      phone: Yup.string()
        .required("필수 입력사항입니다.")
        .matches(/^[0-9]+$/, "숫자만 사용해주세요.")
        .min(11, "11자리의 숫자만 입력해주세요.")
        .max(11, "11자리의 숫자만 입력해주세요."),
      gender: Yup.string().required("필수 입력사항입니다."),
      funnels: Yup.string().required("필수 입력사항입니다."),
      confirmRule: Yup.boolean()
        .oneOf([true], "필수 동의사항입니다.")
        .required("필수 동의사항입니다."),
    }),
    onSubmit: (values) => {
      const today = dayjs();
      const minBirth = today.subtract(36, "year");
      const maxBirth = today.subtract(20, "year");
      if (
        birth === null ||
        birth < minBirth.toDate() ||
        birth > maxBirth.toDate()
      ) {
        swal.fire({
          title: "생년월일을 다시 확인해주세요.",
          text: "만 20세 ~ 만 35세 사이만 가입 가능합니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
        setBirth(null);
      } else {
        setIsRegisterProceeding(true);
        createUserWithEmailAndPassword(auth, values.email, values.pw)
          .then((authUser) => {
            postSignUp({
              email: values.email,
              name: values.name,
              gender: values.gender,
              phone: values.phone,
              referrer_path: values.funnels,
              uid: authUser.user.uid,
              birth: dayjs(birth).locale("ko").format("YYYY-MM-DD"),
              confirmMarketing: values.confirmMarketing,
            }).then((res) => {
              signInWithEmailAndPassword(auth, values.email, values.pw)
                .then((userCredential: any) => {
                  router.push("/join");
                })
                .catch((error: any) => {
                  swal.fire({
                    title: "회원가입 성공 && 로그인 실패",
                    text: "다시 로그인 해주세요. 계속 반복되면 감롬에게 문의주세요.",
                    icon: "error",
                    confirmButtonText: "확인",
                    willClose: () => {
                      router.push("/login");
                    },
                  });
                });
            });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              swal.fire({
                title: "회원가입 실패",
                text: "이미 존재하는 아이디입니다.",
                icon: "error",
                confirmButtonText: "확인",
                willClose: () => {
                  setIsRegisterProceeding(false);
                },
              });
            } else {
              swal.fire({
                title: "회원가입 실패",
                text: "다시 시도해주세요. 계속 반복되면 감롬에게 문의주세요.",
                icon: "error",
                confirmButtonText: "확인",
                willClose: () => {
                  setIsRegisterProceeding(false);
                },
              });
            }
          });
      }
    },
  });

  const [gender, setGender] = useState<string | null>();
  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string | null
  ) => {
    setGender(newGender);
    formik.setFieldValue("gender", newGender);
  };

  const handleFunnel = (event: SelectChangeEvent) => {
    // setFunnels(event.target.value as string);
    setFunnels(event.target.value as string);
    formik.setFieldValue("funnels", event.target.value as string);
  };

  const handleConfirmRule = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmRule(event.target.checked as boolean);
    formik.setFieldValue("confirmRule", event.target.checked);
  };

  const handleConfirmMarketing = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmMarketing(event.target.checked as boolean);
    formik.setFieldValue("confirmMarketing", event.target.checked);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 flex flex-col mx-auto max-w-[360px]"
      autoComplete="off"
    >
      <TextField
        InputLabelProps={{ shrink: true }}
        autoComplete="off"
        onChange={formik.handleChange}
        value={formik.values.email}
        size="small"
        id="email"
        label="이메일(아이디)"
        variant="outlined"
        inputProps={{ autoComplete: 'new-email' }}
      />
      <div className="text-xs text-[#999999]">
        이메일을 이용하여 비밀번호를 찾을 수 있으니, 실제 존재하는 메일을
        사용해주세요.
      </div>
      {formik.touched.email && formik.errors.email ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">
          {formik.errors.email}
        </div>
      ) : null}
      <TextField
        InputLabelProps={{ shrink: true }}
        autoComplete="off"
        onChange={formik.handleChange}
        value={formik.values.pw}
        size="small"
        id="pw"
        label="비밀번호"
        variant="outlined"
        type="password"
        placeholder="최소 8자 이상"
        inputProps={{ autoComplete: 'new-password' }}
      />
      {formik.touched.pw && formik.errors.pw ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">
          {formik.errors.pw}
        </div>
      ) : null}
      <TextField
        InputLabelProps={{ shrink: true }}
        autoComplete="off"
        onChange={formik.handleChange}
        value={formik.values.pwConfirm}
        size="small"
        id="pwConfirm"
        label="비밀번호 확인"
        variant="outlined"
        type="password"
        inputProps={{ autoComplete: 'new-password' }}
      />
      {formik.touched.pwConfirm && formik.errors.pwConfirm ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">
          {formik.errors.pwConfirm}
        </div>
      ) : null}
      <TextField
        InputLabelProps={{ shrink: true }}
        autoComplete="off"
        onChange={formik.handleChange}
        value={formik.values.name}
        size="small"
        id="name"
        label="이름"
        variant="outlined"
        placeholder="본명을 입력해주세요."
        inputProps={{ autoComplete: 'new-name' }}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">
          {formik.errors.name}
        </div>
      ) : null}
      <ToggleButtonGroup
        className="w-full"
        value={gender}
        exclusive
        onChange={handleGender}
        color="primary"
      >
        <ToggleButton className="w-full" value="male">
          남자
        </ToggleButton>
        <ToggleButton className="w-full" value="female">
          여자
        </ToggleButton>
      </ToggleButtonGroup>
      {formik.touched.gender && formik.errors.gender ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">
          {formik.errors.gender}
        </div>
      ) : null}
      <DatePicker
        value={birth}
        onChange={(newValue) => {
          //만약 birth가 오늘을 기준으로 만 20 ~ 만 35세 사이가 아니라면
          //회원가입 불가
          const today = dayjs();
          const minBirth = today.subtract(35, "year");
          const maxBirth = today.subtract(20, "year");
          if (
            newValue === null ||
            newValue < minBirth.toDate() ||
            newValue > maxBirth.toDate()
          ) {
            swal.fire({
              title: "회원가입 실패",
              text: "만 20세 ~ 만 35세 사이만 가입 가능합니다.",
              icon: "error",
              confirmButtonText: "확인",
            });
            setBirth(null);
          } else {
            setBirth(newValue);
          }
        }}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        autoComplete="off"
        onChange={formik.handleChange}
        value={formik.values.phone}
        size="small"
        id="phone"
        label="휴대폰 번호"
        variant="outlined"
        placeholder="숫자만 입력해주세요 ex)00011116666"
        inputProps={{ autoComplete: 'new-phone' }}
      />
      {formik.touched.phone && formik.errors.phone ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">
          {formik.errors.phone}
        </div>
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
              <MenuItem key={index} value={funnel}>
                {funnel}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {formik.touched.funnels && formik.errors.funnels ? (
        <div className="!mt-[2px] text-[#FF0000] text-xs">
          {formik.errors.funnels}
        </div>
      ) : null}

      <div className="flex flex-col">
        <FormControlLabel
          required
          control={<Checkbox onChange={handleConfirmRule} />}
          label="회칙 및 유의사항을 읽었습니다."
        />
        <Link
          href="https://gamromboard.notion.site/290766405fa14166bcd829f3afa8a9ba"
          target="_blank"
        >
          회칙 확인
        </Link>
      </div>

      <div className="flex flex-col mt-2">
        <FormControlLabel
          control={
            <Checkbox
              checked={confirmMarketing}
              onChange={handleConfirmMarketing}
            />
          }
          label="지원관련 문자받기"
        />
      </div>

      <Button
        color="primary"
        className="text-white"
        size="lg"
        type="submit"
        disabled={isRegisterProceeding}
      >
        회원가입 완료하기
      </Button>
    </form>
  );
};
