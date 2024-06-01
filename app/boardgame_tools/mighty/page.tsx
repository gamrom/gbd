"use client";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Slider from "@mui/material/Slider";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../../style";
import { useSessionStorage } from "react-use";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";

export default function MightyPage() {
  const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();

  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (currentUser.data.role === "guest") {
          Swal.fire({
            text: "부원만 이용할 수 있습니다. 감보동 가입 후 이용해주세요.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/");
            }
          });
        }
      } else {
        Swal.fire({
          text: "회원만 이용할 수 있습니다. 로그인 해주세요.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "로그인",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      }
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEditMode, setUserEditMode] = useState<boolean>(false);
  const [p1, setP1] = useSessionStorage("p1", "");
  const [p2, setP2] = useSessionStorage("p2", "");
  const [p3, setP3] = useSessionStorage("p3", "");
  const [p4, setP4] = useSessionStorage("p4", "");
  const [p5, setP5] = useSessionStorage("p5", "");

  const [allItem, setAllItem] = useSessionStorage<any>("allItem", []);
  const [nogiruda, setNogiruda] = useState<boolean>(false);

  const nameFormik = useFormik({
    initialValues: {
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
    },
    onSubmit: (values) => {
      setP1(values.p1);
      setP2(values.p2);
      setP3(values.p3);
      setP4(values.p4);
      setP5(values.p5);
      setUserEditMode(false);
    },
  });

  const calFormik = useFormik({
    initialValues: {
      king: "",
      friend: "",
      winPoint: 13,
      betPoint: 13,
    },
    validationSchema: Yup.object({
      king: Yup.string().required("주공을 선택해주세요"),
      friend: Yup.string().required("프렌드를 선택해주세요"),
    }),
    onSubmit: (values) => {
      let standardPoint = 0;
      let score = [
        { name: "p1", point: 0 },
        { name: "p2", point: 0 },
        { name: "p3", point: 0 },
        { name: "p4", point: 0 },
        { name: "p5", point: 0 },
      ];

      if (values.winPoint >= values.betPoint) {
        //여당승리
        standardPoint =
          Number(values.winPoint) -
          Number(values.betPoint) +
          2 * (Number(values.betPoint) - 13);
        if (values.winPoint === 20) {
          //런
          standardPoint *= 2;
        }

        if (nogiruda) {
          //노기루다
          standardPoint *= 2;
        }

        //25가지의 경우의 수
        if (values.king === "p1" && values.friend === "p1") {
          standardPoint *= 2;
          score[0].point = standardPoint * 2;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p1" && values.friend === "p2") {
          score[0].point = standardPoint * 2;
          score[1].point = standardPoint;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p1" && values.friend === "p3") {
          score[0].point = standardPoint * 2;
          score[1].point = -standardPoint;
          score[2].point = standardPoint;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p1" && values.friend === "p4") {
          score[0].point = standardPoint * 2;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint;
          score[3].point = standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p1" && values.friend === "p5") {
          score[0].point = standardPoint * 2;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p2" && values.friend === "p1") {
          score[0].point = standardPoint;
          score[1].point = standardPoint * 2;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p2" && values.friend === "p2") {
          standardPoint *= 2;
          score[0].point = -standardPoint;
          score[1].point = standardPoint * 2;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p2" && values.friend === "p3") {
          score[0].point = -standardPoint;
          score[1].point = standardPoint * 2;
          score[2].point = standardPoint;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p2" && values.friend === "p4") {
          score[0].point = -standardPoint;
          score[1].point = standardPoint * 2;
          score[2].point = -standardPoint;
          score[3].point = standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p2" && values.friend === "p5") {
          score[0].point = -standardPoint;
          score[1].point = standardPoint * 2;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p3" && values.friend === "p1") {
          score[0].point = standardPoint;
          score[1].point = -standardPoint;
          score[2].point = standardPoint * 2;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p3" && values.friend === "p2") {
          score[0].point = -standardPoint;
          score[1].point = standardPoint;
          score[2].point = standardPoint * 2;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p3" && values.friend === "p3") {
          standardPoint *= 2;
          score[0].point = -standardPoint;
          score[1].point = -standardPoint;
          score[2].point = standardPoint * 2;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p3" && values.friend === "p4") {
          score[0].point = -standardPoint;
          score[1].point = -standardPoint;
          score[2].point = standardPoint * 2;
          score[3].point = standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p3" && values.friend === "p5") {
          score[0].point = -standardPoint;
          score[1].point = -standardPoint;
          score[2].point = standardPoint * 2;
          score[3].point = -standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p4" && values.friend === "p1") {
          score[0].point = standardPoint;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint;
          score[3].point = standardPoint * 2;
          score[4].point = -standardPoint;
        } else if (values.king === "p4" && values.friend === "p2") {
          score[0].point = -standardPoint;
          score[1].point = standardPoint;
          score[2].point = -standardPoint;
          score[3].point = standardPoint * 2;
          score[4].point = -standardPoint;
        } else if (values.king === "p4" && values.friend === "p3") {
          score[0].point = -standardPoint;
          score[1].point = -standardPoint;
          score[2].point = standardPoint;
          score[3].point = standardPoint * 2;
          score[4].point = -standardPoint;
        } else if (values.king === "p4" && values.friend === "p4") {
          standardPoint *= 2;
          score[0].point = -standardPoint;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint;
          score[3].point = standardPoint * 2;
          score[4].point = -standardPoint;
        } else if (values.king === "p4" && values.friend === "p5") {
          score[0].point = -standardPoint;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint;
          score[3].point = standardPoint * 2;
          score[4].point = standardPoint;
        } else if (values.king === "p5" && values.friend === "p1") {
          score[0].point = standardPoint;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint;
          score[4].point = standardPoint * 2;
        } else if (values.king === "p5" && values.friend === "p2") {
          score[0].point = -standardPoint;
          score[1].point = standardPoint;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint;
          score[4].point = standardPoint * 2;
        } else if (values.king === "p5" && values.friend === "p3") {
          score[0].point = -standardPoint;
          score[1].point = -standardPoint;
          score[2].point = standardPoint;
          score[3].point = -standardPoint;
          score[4].point = standardPoint * 2;
        } else if (values.king === "p5" && values.friend === "p4") {
          score[0].point = -standardPoint;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint;
          score[3].point = standardPoint;
          score[4].point = standardPoint * 2;
        } else if (values.king === "p5" && values.friend === "p5") {
          standardPoint *= 2;
          score[0].point = -standardPoint;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint;
          score[4].point = standardPoint * 2;
        }
      } else {
        //야당승리
        standardPoint = Number(values.betPoint) - Number(values.winPoint);
        if (values.winPoint <= 10) {
          //백런
          standardPoint *= 2;
        }
        if (nogiruda) {
          //노기루다
          standardPoint *= 2;
        }
        //25가지의 경우의 수
        if (values.king === "p1" && values.friend === "p1") {
          standardPoint *= 2;
          score[0].point = -standardPoint * 2;
          score[1].point = standardPoint;
          score[2].point = standardPoint;
          score[3].point = standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p1" && values.friend === "p2") {
          score[0].point = -standardPoint * 2;
          score[1].point = -standardPoint;
          score[2].point = standardPoint;
          score[3].point = standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p1" && values.friend === "p3") {
          score[0].point = -standardPoint * 2;
          score[1].point = standardPoint;
          score[2].point = -standardPoint;
          score[3].point = standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p1" && values.friend === "p4") {
          score[0].point = -standardPoint * 2;
          score[1].point = standardPoint;
          score[2].point = standardPoint;
          score[3].point = -standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p1" && values.friend === "p5") {
          score[0].point = -standardPoint * 2;
          score[1].point = standardPoint;
          score[2].point = standardPoint;
          score[3].point = standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p2" && values.friend === "p1") {
          score[0].point = -standardPoint;
          score[1].point = -standardPoint * 2;
          score[2].point = standardPoint;
          score[3].point = standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p2" && values.friend === "p2") {
          standardPoint *= 2;
          score[0].point = standardPoint;
          score[1].point = -standardPoint * 2;
          score[2].point = standardPoint;
          score[3].point = standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p2" && values.friend === "p3") {
          score[0].point = standardPoint;
          score[1].point = -standardPoint * 2;
          score[2].point = -standardPoint;
          score[3].point = standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p2" && values.friend === "p4") {
          score[0].point = standardPoint;
          score[1].point = -standardPoint * 2;
          score[2].point = standardPoint;
          score[3].point = -standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p2" && values.friend === "p5") {
          score[0].point = standardPoint;
          score[1].point = -standardPoint * 2;
          score[2].point = standardPoint;
          score[3].point = standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p3" && values.friend === "p1") {
          score[0].point = -standardPoint;
          score[1].point = standardPoint;
          score[2].point = -standardPoint * 2;
          score[3].point = standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p3" && values.friend === "p2") {
          score[0].point = standardPoint;
          score[1].point = -standardPoint;
          score[2].point = -standardPoint * 2;
          score[3].point = standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p3" && values.friend === "p3") {
          standardPoint *= 2;
          score[0].point = standardPoint;
          score[1].point = standardPoint;
          score[2].point = -standardPoint * 2;
          score[3].point = standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p3" && values.friend === "p4") {
          score[0].point = standardPoint;
          score[1].point = standardPoint;
          score[2].point = -standardPoint * 2;
          score[3].point = -standardPoint;
          score[4].point = standardPoint;
        } else if (values.king === "p3" && values.friend === "p5") {
          score[0].point = standardPoint;
          score[1].point = standardPoint;
          score[2].point = -standardPoint * 2;
          score[3].point = standardPoint;
          score[4].point = -standardPoint;
        } else if (values.king === "p4" && values.friend === "p1") {
          score[0].point = -standardPoint;
          score[1].point = standardPoint;
          score[2].point = standardPoint;
          score[3].point = -standardPoint * 2;
          score[4].point = standardPoint;
        } else if (values.king === "p4" && values.friend === "p2") {
          score[0].point = standardPoint;
          score[1].point = -standardPoint;
          score[2].point = standardPoint;
          score[3].point = -standardPoint * 2;
          score[4].point = standardPoint;
        } else if (values.king === "p4" && values.friend === "p3") {
          score[0].point = standardPoint;
          score[1].point = standardPoint;
          score[2].point = -standardPoint;
          score[3].point = -standardPoint * 2;
          score[4].point = standardPoint;
        } else if (values.king === "p4" && values.friend === "p4") {
          standardPoint *= 2;
          score[0].point = standardPoint;
          score[1].point = standardPoint;
          score[2].point = standardPoint;
          score[3].point = -standardPoint * 2;
          score[4].point = standardPoint;
        } else if (values.king === "p4" && values.friend === "p5") {
          score[0].point = standardPoint;
          score[1].point = standardPoint;
          score[2].point = standardPoint;
          score[3].point = -standardPoint * 2;
          score[4].point = -standardPoint;
        } else if (values.king === "p5" && values.friend === "p1") {
          score[0].point = -standardPoint;
          score[1].point = standardPoint;
          score[2].point = standardPoint;
          score[3].point = standardPoint;
          score[4].point = -standardPoint * 2;
        } else if (values.king === "p5" && values.friend === "p2") {
          score[0].point = standardPoint;
          score[1].point = -standardPoint;
          score[2].point = standardPoint;
          score[3].point = standardPoint;
          score[4].point = -standardPoint * 2;
        } else if (values.king === "p5" && values.friend === "p3") {
          score[0].point = standardPoint;
          score[1].point = standardPoint;
          score[2].point = -standardPoint;
          score[3].point = standardPoint;
          score[4].point = -standardPoint * 2;
        } else if (values.king === "p5" && values.friend === "p4") {
          score[0].point = standardPoint;
          score[1].point = standardPoint;
          score[2].point = standardPoint;
          score[3].point = -standardPoint;
          score[4].point = -standardPoint * 2;
        } else if (values.king === "p5" && values.friend === "p5") {
          standardPoint *= 2;
          score[0].point = standardPoint;
          score[1].point = standardPoint;
          score[2].point = standardPoint;
          score[3].point = standardPoint;
          score[4].point = -standardPoint * 2;
        }
      }

      const prevItem = allItem;
      const newItem = [...prevItem, score];
      setAllItem(newItem);
    },
  });

  return (
    <div>
      <div className="flex flex-col mt-[50px]">
        * 창을 닫으면 모든 정보가 사라집니다
        <div className="flex justify-between mt-4">
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              Swal.fire({
                title: "정말로 초기화 하시겠습니까?",
                text: "초기화 하시면 모든 마이티데이터가 삭제됩니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "초기화",
                cancelButtonText: "취소",
              }).then((result) => {
                if (result.isConfirmed) {
                  setP1("");
                  setP2("");
                  setP3("");
                  setP4("");
                  setP5("");
                  setAllItem([]);
                  window.location.reload();
                }
              });
            }}
          >
            리셋
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => setIsModalOpen(true)}
          >
            계산법
          </Button>
        </div>
        <div className="grid grid-cols-6 gap-2 mt-4">
          <Box
            className="flex items-center justify-center"
            component="section"
            sx={{ border: "1px solid grey" }}
          >
            이름1
          </Box>
          <Box
            className="flex items-center justify-center"
            component="section"
            sx={{ border: "1px solid grey" }}
          >
            이름2
          </Box>
          <Box
            className="flex items-center justify-center"
            component="section"
            sx={{ border: "1px solid grey" }}
          >
            이름3
          </Box>
          <Box
            className="flex items-center justify-center"
            component="section"
            sx={{ border: "1px solid grey" }}
          >
            이름4
          </Box>
          <Box
            className="flex items-center justify-center"
            component="section"
            sx={{ border: "1px solid grey" }}
          >
            이름5
          </Box>
          <div className="flex items-center justify-center"></div>
        </div>
        {!userEditMode ? (
          <div className="grid grid-cols-6 gap-2">
            <Box
              className="flex items-center justify-center bg-[#d3d3d3]"
              component="section"
              sx={{ border: "1px dashed grey" }}
            >
              {p1}
            </Box>
            <Box
              className="flex items-center justify-center bg-[#d3d3d3]"
              component="section"
              sx={{ border: "1px dashed grey" }}
            >
              {p2}
            </Box>
            <Box
              className="flex items-center justify-center bg-[#d3d3d3]"
              component="section"
              sx={{ border: "1px dashed grey" }}
            >
              {p3}
            </Box>
            <Box
              className="flex items-center justify-center bg-[#d3d3d3]"
              component="section"
              sx={{ border: "1px dashed grey" }}
            >
              {p4}
            </Box>
            <Box
              className="flex items-center justify-center bg-[#d3d3d3]"
              component="section"
              sx={{ border: "1px dashed grey" }}
            >
              {p5}
            </Box>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={() => setUserEditMode(true)}
            >
              수정
            </Button>
          </div>
        ) : (
          <>
            <form
              onSubmit={nameFormik.handleSubmit}
              className="grid grid-cols-6 gap-2"
            >
              <input
                name="p1"
                value={nameFormik.values.p1}
                onChange={nameFormik.handleChange}
                type="text"
              />
              <input
                name="p2"
                value={nameFormik.values.p2}
                onChange={nameFormik.handleChange}
                type="text"
              />
              <input
                name="p3"
                value={nameFormik.values.p3}
                onChange={nameFormik.handleChange}
                type="text"
              />
              <input
                name="p4"
                value={nameFormik.values.p4}
                onChange={nameFormik.handleChange}
                type="text"
              />
              <input
                name="p5"
                value={nameFormik.values.p5}
                onChange={nameFormik.handleChange}
                type="text"
              />
              <Button type="submit" variant="outlined" color="primary">
                확인
              </Button>
            </form>
          </>
        )}
        {
          <div>
            <form onSubmit={calFormik.handleSubmit} className="mt-8">
              <div className="grid grid-cols-[1fr_5fr] gap-2">
                <Box
                  className="flex items-center justify-center text-xs"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  주공
                </Box>
                <ToggleButtonGroup
                  value={calFormik.values.king}
                  exclusive
                  onChange={(e: any) => {
                    calFormik.setFieldValue("king", e.target?.value);
                  }}
                  className="w-full"
                >
                  <ToggleButton value="p1" className="w-full" color="info">
                    {p1}
                  </ToggleButton>
                  <ToggleButton value="p2" className="w-full" color="info">
                    {p2}
                  </ToggleButton>
                  <ToggleButton value="p3" className="w-full" color="info">
                    {p3}
                  </ToggleButton>
                  <ToggleButton value="p4" className="w-full" color="info">
                    {p4}
                  </ToggleButton>
                  <ToggleButton value="p5" className="w-full" color="info">
                    {p5}
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              {calFormik.touched.king && calFormik.errors.king ? (
                <div className="text-red-500 text-sm">
                  {calFormik.errors.king}
                </div>
              ) : null}

              <div className="grid grid-cols-[1fr_5fr] gap-2 mt-2">
                <Box
                  className="flex items-center justify-center text-xs"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  프렌드
                </Box>
                <ToggleButtonGroup
                  value={calFormik.values.friend}
                  exclusive
                  onChange={(e: any) => {
                    calFormik.setFieldValue("friend", e.target?.value);
                  }}
                  className="w-full"
                >
                  <ToggleButton value="p1" className="w-full" color="info">
                    {p1}
                  </ToggleButton>
                  <ToggleButton value="p2" className="w-full" color="info">
                    {p2}
                  </ToggleButton>
                  <ToggleButton value="p3" className="w-full" color="info">
                    {p3}
                  </ToggleButton>
                  <ToggleButton value="p4" className="w-full" color="info">
                    {p4}
                  </ToggleButton>
                  <ToggleButton value="p5" className="w-full" color="info">
                    {p5}
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              {calFormik.touched.friend && calFormik.errors.friend ? (
                <div className="text-red-500 text-sm">
                  {calFormik.errors.friend}
                </div>
              ) : null}
              <div className="grid grid-cols-[1fr_5fr] gap-8 mt-2">
                <Box
                  className="flex items-center justify-center text-xs"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  건점수
                </Box>
                <Slider
                  name="betPoint"
                  onChange={(e: any) => {
                    calFormik.setFieldValue("betPoint", e.target?.value);
                  }}
                  defaultValue={13}
                  step={1}
                  valueLabelDisplay="auto"
                  min={13}
                  max={20}
                />
              </div>

              <div className="grid grid-cols-[1fr_5fr] gap-8 mt-2">
                <Box
                  className="flex items-center justify-center text-xs"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  이긴점수
                </Box>
                <Slider
                  name="winPoint"
                  onChange={(e: any) => {
                    calFormik.setFieldValue("winPoint", e.target?.value);
                  }}
                  defaultValue={13}
                  step={1}
                  valueLabelDisplay="auto"
                  min={0}
                  max={20}
                />
              </div>

              <ToggleButton
                color="info"
                value={nogiruda}
                name="nogidura"
                selected={nogiruda}
                onChange={() => setNogiruda(!nogiruda)}
                className="w-full mt-2"
              >
                노기루다
              </ToggleButton>

              <Button type="submit" variant="contained" className="w-full mt-2">
                확인
              </Button>
            </form>

            <div className="flex flex-col mt-8">
              <div className="grid grid-cols-7 w-full">
                <div className="flex items-center justify-center font-bold">
                  라운드
                </div>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {p1}
                </Box>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {p2}
                </Box>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {p3}
                </Box>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {p4}
                </Box>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {p5}
                </Box>
                <div></div>
              </div>

              <div className="my-2 grid grid-cols-7 w-full">
                <div className="flex items-center justify-center font-bold">
                  총합
                </div>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {allItem.length > 0 &&
                    allItem.reduce((acc: any, arr: any) => {
                      // Find the object corresponding to 'p1'
                      const p1Object = arr.find(
                        (obj: any) => obj.name === "p1"
                      );

                      // If 'p1' object is found, add its 'point' value to the accumulator
                      if (p1Object) {
                        acc += p1Object.point;
                      }

                      return acc;
                    }, 0)}
                </Box>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {allItem.length > 0 &&
                    allItem.reduce((acc: any, arr: any) => {
                      // Find the object corresponding to 'p2'
                      const p2Object = arr.find(
                        (obj: any) => obj.name === "p2"
                      );

                      // If 'p2' object is found, add its 'point' value to the accumulator
                      if (p2Object) {
                        acc += p2Object.point;
                      }

                      return acc;
                    }, 0)}
                </Box>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {allItem.length > 0 &&
                    allItem.reduce((acc: any, arr: any) => {
                      // Find the object corresponding to 'p3'
                      const p3Object = arr.find(
                        (obj: any) => obj.name === "p3"
                      );

                      // If 'p3' object is found, add its 'point' value to the accumulator
                      if (p3Object) {
                        acc += p3Object.point;
                      }

                      return acc;
                    }, 0)}
                </Box>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {allItem.length > 0 &&
                    allItem.reduce((acc: any, arr: any) => {
                      // Find the object corresponding to 'p4'
                      const p4Object = arr.find(
                        (obj: any) => obj.name === "p4"
                      );

                      // If 'p4' object is found, add its 'point' value to the accumulator
                      if (p4Object) {
                        acc += p4Object.point;
                      }

                      return acc;
                    }, 0)}
                </Box>
                <Box
                  className="flex items-center justify-center"
                  component="section"
                  sx={{ border: "1px solid grey" }}
                >
                  {allItem.length > 0 &&
                    allItem.reduce((acc: any, arr: any) => {
                      // Find the object corresponding to 'p5'
                      const p5Object = arr.find(
                        (obj: any) => obj.name === "p5"
                      );

                      // If 'p5' object is found, add its 'point' value to the accumulator
                      if (p5Object) {
                        acc += p5Object.point;
                      }

                      return acc;
                    }, 0)}
                </Box>
              </div>

              {allItem.length > 0 &&
                allItem.map((item: any, index: number) => {
                  return (
                    <div
                      key={`round_${index}`}
                      className="grid grid-cols-7 w-full"
                    >
                      <div className="flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <Box
                        className="flex items-center justify-center"
                        component="section"
                        sx={{ border: "1px solid grey" }}
                      >
                        {item.find((item: any) => item.name === "p1")["point"]}
                      </Box>
                      <Box
                        className="flex items-center justify-center"
                        component="section"
                        sx={{ border: "1px solid grey" }}
                      >
                        {item.find((item: any) => item.name === "p2")["point"]}
                      </Box>
                      <Box
                        className="flex items-center justify-center"
                        component="section"
                        sx={{ border: "1px solid grey" }}
                      >
                        {item.find((item: any) => item.name === "p3")["point"]}
                      </Box>
                      <Box
                        className="flex items-center justify-center"
                        component="section"
                        sx={{ border: "1px solid grey" }}
                      >
                        {item.find((item: any) => item.name === "p4")["point"]}
                      </Box>
                      <Box
                        className="flex items-center justify-center"
                        component="section"
                        sx={{ border: "1px solid grey" }}
                      >
                        {item.find((item: any) => item.name === "p5")["point"]}
                      </Box>
                      <button
                        type="button"
                        onClick={() => {
                          setAllItem(
                            allItem.filter(
                              (item: any, i: number) => i !== index
                            )
                          );
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        }
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            <div className="mb-2 font-bold">기준점수 계산법</div>
            <div>* 여당이 이겼을 때</div>
            <div>(이긴점수 - 건점수) + (건점수 - 13) * 2</div>
            <div>* 야당이 이겼을 때</div>
            <div>건점수 - 이긴점수</div>
            <div>노기루다, 노프렌드 시 각각 두 배</div>

            <Button color="error" onClick={() => setIsModalOpen(false)}>
              닫기
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
