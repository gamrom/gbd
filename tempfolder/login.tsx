// import { useFormik } from "formik";
// import { useState, useEffect } from "react";
// import { NextPage } from "next";
// import { useRouter } from "next/router";
// import * as yup from "yup";
// import Link from "next/link";
// import ReactLoading from "react-loading";
// import Image from "next/image";

// import {
//   browserLocalPersistence,
//   browserSessionPersistence,
//   setPersistence,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { auth } from "@/config/firebase";
// import { Alert } from "@/components/Alert";
// import { getUser, getActiveDivision } from "@/utils/api";

// import { useRecoilState } from "recoil";
// import { userDivisionState, userState } from "@/atoms/userAtom";
// import canSeePw from "@/assets/can_see_pw.svg";
// import cantSeePw from "@/assets/cant_see_pw.svg";
// import alertNotCheck from "@/assets/alert_not_check.svg";
// import checkOkSquare from "@/assets/check_ok_square.svg";

// const LoginPage: NextPage = () => {
//   const [loading, setIsLoading] = useState<boolean>(false);
//   const router = useRouter();
//   const [isError, setIsError] = useState<boolean>(false);
//   const [errorText, setErrorText] = useState<string>("");
//   const [isPwVisible, setIsPwVisible] = useState<boolean>(false);

//   const [userDivision, setUserDivision] = useRecoilState(userDivisionState);
//   const [user, setUser] = useRecoilState(userState);

//   const channel_url = process.env.NEXT_PUBLIC_CHANNELTALK_URL;

//   useEffect(() => {
//     (async () => {
//       const user: any = await new Promise((resolve, reject) => {
//         auth.onAuthStateChanged((user) => {
//           resolve(user);
//         }, reject);
//       });

//       if (user) {
//         getActiveDivision().then((division: any) => {
//           router.push(`/`);
//         });
//       }
//     })();

//     setUser({});
//     setUserDivision(undefined);
//   }, []);

//   const validationSchema = yup.object({
//     email: yup
//       .string()
//       .email("이메일 형식에 맞지 않습니다.")
//       .required("아이디를 입력해주세요."),
//     password: yup.string().required("비밀번호를 입력해주세요."),
//   });

//   const signInFormik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       setIsLoading(true);
//       let persistence;
//       if (isAuthLogin) {
//         persistence = browserLocalPersistence;
//       } else {
//         persistence = browserSessionPersistence;
//       }

//       setPersistence(auth, persistence).then(() => {
//         signInWithEmailAndPassword(auth, values.email, values.password)
//           .then((userCredential: any) => {
//             if (!!router.query.from) {
//               router.push(router.query.from as string, undefined, {
//                 shallow: true,
//               });
//               setIsError(false);
//             } else {
//               getUser()
//                 .then((res) => {
//                   getActiveDivision().then((r: any) => {
//                     setUserDivision(r.data);
//                     if (router.query.from) {
//                       router.push(router.query.from as string, undefined, {
//                         shallow: true,
//                       });
//                     } else {
//                       router.push(`/`);
//                     }
//                     setIsLoading(false);
//                   });
//                 })
//                 .catch(() => {
//                   setIsLoading(false);
//                   setIsError(true);
//                   setErrorText(
//                     "정보를 불러올 수 없습니다. 관리자에게 문의해주세요."
//                   );
//                 });

//               setIsError(false);
//             }
//           })
//           .catch((error) => {
//             setIsLoading(false);
//             setIsError(true);
//             if (error.code === "auth/too-many-requests") {
//               setErrorText(
//                 `시도가 너무 많습니다. 비밀번호를 재설정해주시거나 잠시 후 시도해주세요.`
//               );
//             } else {
//               setErrorText("아이디 또는 비밀번호가 일치하지 않습니다.");
//             }
//           });
//       });
//     },
//   });

//   const [isAuthLogin, setIsAuthLogin] = useState<boolean>(false);

//   return (
//     <div>
//       <div className="fixed top-[50%] left-[50%] mx-auto min-w-[360px] max-w-[650px] translate-x-[-50%] translate-y-[-60%] px-4 text-[15px]">
//         <div className="flex items-center justify-center font-[Montserrat] text-[28px] font-bold">
//           D.Nav
//         </div>

//         <form
//           onSubmit={signInFormik.handleSubmit}
//           className="mt-[35px] flex flex-col"
//         >
//           <input
//             type="email"
//             name="email"
//             value={signInFormik.values.email}
//             onChange={signInFormik.handleChange}
//             className={`h-[52px] w-full rounded-[10px] border border-[#DDDDDD] px-5 font-[500] focus:outline-[1px] ${
//               signInFormik?.errors?.email && signInFormik?.touched?.email
//                 ? "focus:outline-[#FF0000]"
//                 : "focus:outline-black"
//             }`}
//             placeholder="아이디"
//           />

//           {signInFormik?.errors?.email && signInFormik?.touched?.email && (
//             <div className="mt-[5px] ml-1 text-xs text-[#FF0000]">
//               {signInFormik?.errors?.email}
//             </div>
//           )}

//           <div className="relative mt-[5px]">
//             <input
//               type={isPwVisible ? "text" : "password"}
//               name="password"
//               value={signInFormik.values.password}
//               onChange={signInFormik.handleChange}
//               className={`h-[52px] w-full rounded-[10px] border border-[#DDDDDD] px-5 font-[500] focus:outline-[1px] ${
//                 signInFormik?.errors?.password &&
//                 signInFormik?.touched?.password
//                   ? "focus:outline-[#FF0000]"
//                   : "focus:outline-black"
//               }`}
//               placeholder="비밀번호"
//             />
//             <Image
//               src={isPwVisible ? canSeePw : cantSeePw}
//               alt="비밀번호숨김"
//               className="absolute right-[15px] top-[14px] cursor-pointer"
//               onClick={() => setIsPwVisible(!isPwVisible)}
//             />
//           </div>

//           {signInFormik?.errors?.password &&
//             signInFormik?.touched?.password && (
//               <div className="mt-[5px] ml-1 text-xs text-[#FF0000]">
//                 {signInFormik?.errors?.password}
//               </div>
//             )}

//           <button
//             type="button"
//             className="mt-[10px] flex items-center"
//             onClick={() => setIsAuthLogin(!isAuthLogin)}
//           >
//             {isAuthLogin ? (
//               <Image
//                 src={checkOkSquare}
//                 alt="자동로그인"
//                 className="mr-2 h-[18px] w-[18px]"
//                 width={18}
//                 height={18}
//               />
//             ) : (
//               <div className="mr-2 h-[18px] w-[18px] rounded-[3px] border border-[#DDDDDD]"></div>
//             )}
//             <div
//               className={`text-sm font-[500] ${
//                 isAuthLogin ? "text-black" : "text-[#B2B2B2]"
//               }`}
//             >
//               로그인 유지하기
//             </div>
//           </button>

//           <button
//             type="submit"
//             className={`mt-5 flex h-[52px] items-center justify-center rounded-[10px] font-bold ${
//               !!signInFormik.values.email && !!signInFormik.values.password
//                 ? "bg-black text-white"
//                 : "bg-[#DDDDDD]"
//             } `}
//             disabled={
//               loading ||
//               (!!signInFormik.values.email && !!signInFormik.values.password)
//                 ? false
//                 : true
//             }
//           >
//             {loading ? "로그인 중..." : "로그인"}
//           </button>

//           <div className="mt-5 flex items-center justify-center text-sm font-[500] text-[#999999]">
//             <Link href="/register" className="text-center">
//               회원가입
//             </Link>

//             <div className="mx-[15px] h-[9.5px] border-r-[1.5px] border-r-[#DDDDDD]"></div>

//             <Link href="/find_email">아이디/비밀번호 찾기</Link>
//           </div>
//         </form>

//         {loading && (
//           <div className="fixed top-[50%] left-[50%] flex h-screen w-screen translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-black bg-opacity-30">
//             <ReactLoading type="bubbles" color="black" />
//           </div>
//         )}

//         <Alert
//           isOpen={isError}
//           icon={alertNotCheck}
//           iconClassName="w-[56px] h-[56px]"
//           text={errorText}
//           confirmButtonText="확인"
//           confirmButtonClassName="bg-black items-center flex justify-center items-center font-bold text-[15px] w-full text-white h-[48px] rounded-[10px]"
//           handleConfirm={() => setIsError(false)}
//         />
//       </div>

//       <Link
//         href={
//           channel_url || "https://smallbigclass.channel.io/support-bots/64520"
//         }
//         className="translate-y-%] fixed bottom-[38px] left-[50%] mx-auto min-w-[360px] max-w-[650px] translate-x-[-50%] translate-x-[-50%] px-4 text-center text-[15px] text-[#B2B2B2]"
//       >
//         고객센터 문의하기
//       </Link>
//     </div>
//   );
// };

// export default LoginPage;
