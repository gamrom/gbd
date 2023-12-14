'use client'
import { Button } from "@mui/material";
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import Box from '@mui/system/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import { modalStyle } from "../style";


export default function MightyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEditMode, setUserEditMode] = useState<boolean>(false);

  const nameFormik = useFormik({
    initialValues: {
      p1: (typeof window !== 'undefined') ? (sessionStorage.getItem('p1') || '') : '',
      p2: (typeof window !== 'undefined') ? (sessionStorage.getItem('p2') || '') : '',
      p3: (typeof window !== 'undefined') ? (sessionStorage.getItem('p3') || '') : '',
      p4: (typeof window !== 'undefined') ? (sessionStorage.getItem('p4') || '') : '',
      p5: (typeof window !== 'undefined') ? (sessionStorage.getItem('p5') || '') : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      sessionStorage.setItem('p1', values.p1);
      sessionStorage.setItem('p2', values.p2);
      sessionStorage.setItem('p3', values.p3);
      sessionStorage.setItem('p4', values.p4);
      sessionStorage.setItem('p5', values.p5);
      setUserEditMode(false);
    }
  })

  const [nogiruda, setNogiruda] = useState<boolean>(false);

  const calFormik = useFormik({
    initialValues: {
      king: sessionStorage.getItem('king') || '',
      friend: sessionStorage.getItem('friend') || '',
      winPoint: sessionStorage.getItem('winPoint') || '13',
      betPoint: sessionStorage.getItem('betPoint') || '13',
      noGiruda: sessionStorage.getItem('noGiruda') || false,
    },
    validationSchema: Yup.object({
      king: Yup.string().required('주공을 선택해주세요'),
      friend: Yup.string().required('프렌드를 선택해주세요'),
    }),
    onSubmit: (values) => {
      let standardPoint = 0;
      let score = [{ name: "p1", point: 0 }, { name: "p2", point: 0 }, { name: "p3", point: 0 }, { name: "p4", point: 0 }, { name: "p5", point: 0 }]

      if (values.winPoint >= values.betPoint) {
        //여당승리
        standardPoint = Number(values.winPoint) - Number(values.betPoint) + 2 * (Number(values.betPoint) - 13)
        if (values.noGiruda) {
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
        standardPoint = Number(values.betPoint) - Number(values.winPoint)
        if (values.noGiruda) {
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


      const allItem = sessionStorage.getItem('allItem');
      if (allItem) {
        const allItemJson = JSON.parse(allItem);
        allItemJson.push(score);
        sessionStorage.setItem('allItem', JSON.stringify(allItemJson));
      } else {
        sessionStorage.setItem('allItem', JSON.stringify([score]));
      }

      window.location.reload();

    }
  })


  return (
    <div>
      <div className="flex flex-col mt-[50px]">
        <div className="flex justify-between">
          <Button variant="contained" color="error" onClick={() => {
            Swal.fire({
              title: '정말로 초기화 하시겠습니까?',
              text: "초기화 하시면 모든 마이티데이터가 삭제됩니다.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: '초기화',
              cancelButtonText: '취소'
            }).then((result) => {
              if (result.isConfirmed) {
                sessionStorage.removeItem('p1');
                sessionStorage.removeItem('p2');
                sessionStorage.removeItem('p3');
                sessionStorage.removeItem('p4');
                sessionStorage.removeItem('p5');
                sessionStorage.removeItem('allItem');
                window.location.reload();
              }
            })
          }}>리셋</Button>
          <Button variant="contained" color="info" onClick={() => setIsModalOpen(true)}>계산법</Button>
        </div>

        <div className="grid grid-cols-6 gap-2 mt-4">
          <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>이름1</Box>
          <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>이름2</Box>
          <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>이름3</Box>
          <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>이름4</Box>
          <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>이름5</Box>
          <div className="flex items-center justify-center"></div>
        </div>

        {!userEditMode ? (
          <div className="grid grid-cols-6 gap-2">
            <Box className="flex items-center justify-center" component="section" sx={{ border: '1px dashed grey' }}>{sessionStorage.getItem('p1')}</Box>
            <Box className="flex items-center justify-center" component="section" sx={{ border: '1px dashed grey' }}>{sessionStorage.getItem('p2')}</Box>
            <Box className="flex items-center justify-center" component="section" sx={{ border: '1px dashed grey' }}>{sessionStorage.getItem('p3')}</Box>
            <Box className="flex items-center justify-center" component="section" sx={{ border: '1px dashed grey' }}>{sessionStorage.getItem('p4')}</Box>
            <Box className="flex items-center justify-center" component="section" sx={{ border: '1px dashed grey' }}>{sessionStorage.getItem('p5')}</Box>
            <Button type="button" variant="outlined" color="primary" onClick={() => setUserEditMode(true)}>수정</Button>
          </div>
        ) : (
          <>
            <form onSubmit={nameFormik.handleSubmit} className="grid grid-cols-6 gap-2">
              <input name="p1" value={nameFormik.values.p1} onChange={nameFormik.handleChange} type="text" />
              <input name="p2" value={nameFormik.values.p2} onChange={nameFormik.handleChange} type="text" />
              <input name="p3" value={nameFormik.values.p3} onChange={nameFormik.handleChange} type="text" />
              <input name="p4" value={nameFormik.values.p4} onChange={nameFormik.handleChange} type="text" />
              <input name="p5" value={nameFormik.values.p5} onChange={nameFormik.handleChange} type="text" />
              <Button type="submit" variant="outlined" color="primary">확인</Button>
            </form>
          </>
        )
        }

        {
          (sessionStorage.getItem('p1') && sessionStorage.getItem('p2') && sessionStorage.getItem('p3') && sessionStorage.getItem('p4') && sessionStorage.getItem('p5')) ? (
            <div>
              <form onSubmit={calFormik.handleSubmit} className="mt-8">
                <div className="grid grid-cols-[1fr_5fr] gap-2">
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>주공</Box>
                  <ToggleButtonGroup
                    value={calFormik.values.king}
                    exclusive
                    onChange={(e: any) => {
                      calFormik.setFieldValue('king', e.target?.value)
                    }}
                    className="w-full"
                  >
                    <ToggleButton value="p1" className="w-full" color="info">
                      {sessionStorage.getItem('p1')}
                    </ToggleButton>
                    <ToggleButton value="p2" className="w-full" color="info">
                      {sessionStorage.getItem('p2')}
                    </ToggleButton>
                    <ToggleButton value="p3" className="w-full" color="info">
                      {sessionStorage.getItem('p3')}
                    </ToggleButton>
                    <ToggleButton value="p4" className="w-full" color="info">
                      {sessionStorage.getItem('p4')}
                    </ToggleButton>
                    <ToggleButton value="p5" className="w-full" color="info">
                      {sessionStorage.getItem('p5')}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                {
                  calFormik.touched.king && calFormik.errors.king ? (
                    <div className="text-red-500 text-sm">{calFormik.errors.king}</div>
                  ) : null
                }

                <div className="grid grid-cols-[1fr_5fr] gap-2 mt-2">
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>프렌드</Box>
                  <ToggleButtonGroup
                    value={calFormik.values.friend}
                    exclusive
                    onChange={(e: any) => {
                      calFormik.setFieldValue('friend', e.target?.value)
                    }}
                    className="w-full"
                  >
                    <ToggleButton value="p1" className="w-full" color="info">
                      {sessionStorage.getItem('p1')}
                    </ToggleButton>
                    <ToggleButton value="p2" className="w-full" color="info">
                      {sessionStorage.getItem('p2')}
                    </ToggleButton>
                    <ToggleButton value="p3" className="w-full" color="info">
                      {sessionStorage.getItem('p3')}
                    </ToggleButton>
                    <ToggleButton value="p4" className="w-full" color="info">
                      {sessionStorage.getItem('p4')}
                    </ToggleButton>
                    <ToggleButton value="p5" className="w-full" color="info">
                      {sessionStorage.getItem('p5')}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                {
                  calFormik.touched.friend && calFormik.errors.friend ? (
                    <div className="text-red-500 text-sm">{calFormik.errors.friend}</div>
                  ) : null
                }
                <div className="grid grid-cols-[1fr_5fr] gap-8 mt-2">
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>건점수</Box>
                  <Slider
                    name="betPoint"
                    onChange={(e: any) => {
                      calFormik.setFieldValue('betPoint', e.target?.value)
                    }}
                    defaultValue={13}
                    step={1}
                    valueLabelDisplay="auto"
                    min={13}
                    max={20}
                  />
                </div>

                <div className="grid grid-cols-[1fr_5fr] gap-8 mt-2">
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>이긴점수</Box>
                  <Slider
                    name="winPoint"
                    onChange={(e: any) => {
                      calFormik.setFieldValue('winPoint', e.target?.value)
                    }}
                    defaultValue={13}
                    step={1}
                    valueLabelDisplay="auto"
                    min={0}
                    max={20}
                  />
                </div>

                <ToggleButton color="info" value={nogiruda} name="nogidura" selected={nogiruda} onChange={() => setNogiruda(!nogiruda)} className="w-full mt-2">
                  노기루다
                </ToggleButton>

                <Button type="submit" variant="contained" className="w-full mt-2">확인</Button>
              </form>

              <div className="flex flex-col mt-8">
                <div className="grid grid-cols-7 w-full">
                  <div className="flex items-center justify-center font-bold">라운드</div>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{sessionStorage.getItem("p1")}</Box>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{sessionStorage.getItem("p2")}</Box>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{sessionStorage.getItem("p3")}</Box>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{sessionStorage.getItem("p4")}</Box>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{sessionStorage.getItem("p5")}</Box>
                  <div></div>
                </div>

                <div className="my-2 grid grid-cols-7 w-full">
                  <div className="flex items-center justify-center font-bold">총합</div>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>
                    {sessionStorage.getItem('allItem') && JSON.parse(sessionStorage.getItem('allItem') || '').reduce((acc: number, cur: any) => {
                      return acc + cur.find((item: any) => item.name === "p1")["point"];
                    }, 0)}
                  </Box>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>
                    {sessionStorage.getItem('allItem') && JSON.parse(sessionStorage.getItem('allItem') || '').reduce((acc: number, cur: any) => {
                      return acc + cur.find((item: any) => item.name === "p2")["point"];
                    }, 0)}
                  </Box>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>
                    {sessionStorage.getItem('allItem') && JSON.parse(sessionStorage.getItem('allItem') || '').reduce((acc: number, cur: any) => {
                      return acc + cur.find((item: any) => item.name === "p3")["point"];
                    }, 0)}
                  </Box>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>
                    {sessionStorage.getItem('allItem') && JSON.parse(sessionStorage.getItem('allItem') || '').reduce((acc: number, cur: any) => {
                      return acc + cur.find((item: any) => item.name === "p4")["point"];
                    }, 0)}
                  </Box>
                  <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>
                    {sessionStorage.getItem('allItem') && JSON.parse(sessionStorage.getItem('allItem') || '').reduce((acc: number, cur: any) => {
                      return acc + cur.find((item: any) => item.name === "p5")["point"];
                    }, 0)}
                  </Box>
                </div>

                {sessionStorage.getItem('allItem') && JSON.parse(sessionStorage.getItem('allItem') || '').map((item: any, index: number) => {
                  return (
                    <div key={`round_${index}`} className="grid grid-cols-7 w-full">
                      <div className="flex items-center justify-center font-bold">{index + 1}</div>
                      <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{item.find((item: any) => item.name === "p1")["point"]}</Box>
                      <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{item.find((item: any) => item.name === "p2")["point"]}</Box>
                      <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{item.find((item: any) => item.name === "p3")["point"]}</Box>
                      <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{item.find((item: any) => item.name === "p4")["point"]}</Box>
                      <Box className="flex items-center justify-center" component="section" sx={{ border: '1px solid grey' }}>{item.find((item: any) => item.name === "p5")["point"]}</Box>
                      <button type="button" onClick={() => {
                        const allItem = JSON.parse(sessionStorage.getItem('allItem') || '');
                        allItem.splice(index, 1);
                        sessionStorage.setItem('allItem', JSON.stringify(allItem));
                        window.location.reload();
                      }}>삭제</button>
                    </div>
                  )
                })}

              </div>
            </div>
          ) : (
            <div className="mt-4 items-center justify-center">수정 버튼을 눌러 이름을 모두 입력해주세요.</div>
          )
        }


      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            <div className="mb-2 font-bold">기준점수 계산법</div>
            <div>
              * 여당이 이겼을 때
            </div>
            <div>
              (이긴점수 - 건점수) + (건점수 - 13) * 2
            </div>
            <div>
              * 야당이 이겼을 때
            </div>
            <div>
              건점수 - 이긴점수
            </div>
            <div>
              노기루다, 노프렌드 시 각각 두 배
            </div>

            <Button color="error" onClick={() => setIsModalOpen(false)}>닫기</Button>
          </div>
        </Box>
      </Modal>
    </div>

  )
}