'use client'

import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from 'react';
import { getUsers, postCreateEvent } from "../api";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { pushDiscord } from "../tools";
import { useRouter } from "next/navigation";

function getNextSaturdayDate() {
  const today = dayjs(); // 현재 날짜 가져오기
  const daysUntilSaturday = 6 - today.day(); // 토요일까지의 남은 일 수 계산 (0부터 시작하는 인덱스)

  // 만약 오늘이 토요일이라면 다음 주 토요일로 건너뛰기
  const daysToAdd = daysUntilSaturday <= 0 ? 7 : daysUntilSaturday;

  // 다음 토요일의 날짜 계산해서 반환
  const nextSaturday = today.add(daysToAdd, 'day');
  return nextSaturday;
}

export default function ScheduleGeneratorPage() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    getUsers().then((res) => {
      const managers = res.data.filter((user: any) => user.role === "manager" || user.role === "admin");
      setUsers(managers);
    })
  }, [])

  const [select, setSelect] = useState<any>("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!select) {
      alert("벙주를 선택해주세요.");
      return;
    } else {
      //오전 생성
      const marker = [
        {
          name: "오전",
          success: false,
          address: "",
        },
        {
          name: "오후1",
          success: false,
          address: "",
        },
        {
          name: "오후2",
          success: false,
          address: "",
        },
      ];
      const nextSaturday = getNextSaturdayDate();
      const formatSaturday = nextSaturday.format("YYYY-MM-DD");


      await postCreateEvent({
        title: `${nextSaturday.format("MM월 DD일")} 오전 번개`,
        location: "아지트",
        description: "선착순 모집이며, 참여가능한 시간에 모두 참석 눌러주세요!\n\n 상세시간은 정모 톡방이 파진 후 벙주가 다시 조사합니다. \n\n16인을 초과한 분들 부터는 대기 명단으로 들어가며, 톡방에 초대 되지 않으면 대기 인것이니 참고해주세요! \n\n*톡방은 보통 수요일 밤에 파집니다.",
        start_time: nextSaturday.hour(10).minute(0).second(0),
        end_time: nextSaturday.hour(14).minute(0).second(0),
        max_members_count: 24,
        uid: select,
      }).then((res) => {
        //successMarker에서 name이 "오전" 인것을 찾아서 sucecess를 true로 바꾸고 address에 res.data.id를 넣는다.
        const t = marker.find((m) => m.name === "오전");
        if (t) {
          t.success = true;
          t.address = res.data.id;
        }
      })

      await postCreateEvent({
        title: `${nextSaturday.format("MM월 DD일")} 오후1 번개`,
        location: "아지트",
        description: "선착순 모집이며, 참여가능한 시간에 모두 참석 눌러주세요!\n\n 상세시간은 정모 톡방이 파진 후 벙주가 다시 조사합니다. \n\n16인을 초과한 분들 부터는 대기 명단으로 들어가며, 톡방에 초대 되지 않으면 대기 인것이니 참고해주세요! \n\n*톡방은 보통 수요일 밤에 파집니다.",
        start_time: nextSaturday.hour(14).minute(0).second(0),
        end_time: nextSaturday.hour(19).minute(0).second(0),
        max_members_count: 24,
        uid: select,
      }).then((res) => {
        const t = marker.find((m) => m.name === "오후1");
        if (t) {
          t.success = true;
          t.address = res.data.id;
        }
      })

      await postCreateEvent({
        title: `${nextSaturday.format("MM월 DD일")} 오후2 번개`,
        location: "아지트",
        description: "선착순 모집이며, 참여가능한 시간에 모두 참석 눌러주세요!\n\n 상세시간은 정모 톡방이 파진 후 벙주가 다시 조사합니다. \n\n16인을 초과한 분들 부터는 대기 명단으로 들어가며, 톡방에 초대 되지 않으면 대기 인것이니 참고해주세요! \n\n*톡방은 보통 수요일 밤에 파집니다.",
        start_time: nextSaturday.hour(19).minute(0).second(0),
        end_time: nextSaturday.hour(23).minute(0).second(0),
        max_members_count: 24,
        uid: select,
      }).then((res) => {
        const t = marker.find((m) => m.name === "오후2");
        if (t) {
          t.success = true;
          t.address = res.data.id;
        }
      })

      Swal.fire({
        title: '생성 완료',
        html: `오전 번개 생성 : ${marker[0].success ? "성공" : "실패"} <br/> 오후1 번개 생성 : ${marker[1].success ? "성공" : "실패"} <br/> 오후2 번개 생성 : ${marker[2].success ? "성공" : "실패"}`,
        icon: 'success',
        confirmButtonText: '확인',
        willClose: () => {
          pushDiscord({
            text: `------------------------------\n이번주 정모가 열렸습니다!  \n장소: 아지트 \n벙주: ${users.find((user) => user.uid === select)?.name
              } \n설명: 선착순 모집이며, 참여가능한 시간에 모두 참석 눌러주세요!\n상세시간은 정모 톡방이 파진 후 벙주가 다시 조사합니다.\n16인을 초과한 분들 부터는 대기 명단으로 들어가며, 톡방에 초대 되지 않으면 대기 인것이니 참고해주세요!\n*톡방은 보통 수요일 밤에 파집니다.\n최대인원: 시간당 16명 \n바로가기 : https://www.gambodong.com/?pickDate=${formatSaturday}
            `,
          });
        }
      }).then((res) => {
        if (res.isConfirmed) {
          router.push(`/?pickDate=${formatSaturday}`);
        }
      })
    }
  }


  return (
    <div className="flex flex-col justify-center mt-[50px] max-w-[300px] mx-auto">
      <div className="flex flex-col space-y-2">
        <div>
          1. 생성하기 버튼 누르자마자 바로 다음 토요일 일자로 3개의 번개가 생성됩니다. 예약 기능은 없음.
        </div>
        <div>
          2. 10 ~ 14시, 14시 ~ 19시, 19시 ~ 23시로 나누어 올라갑니다.
        </div>
        <div>
          3. 디스코드 알림은 한 번만 갑니다. 각각의 번개를 수정할 때 디스코드 알림 체크를 풀고 수정해주세요.
        </div>
        <div>
          4. 10시 ~ 14시의 벙주를 못할거같으면, 번개가 만들어주지고 내용을 수정해주세요. 벙주는 수정이 불가능합니다.
        </div>
        <div>
          5. 대기인원 때문에 번개를 24인으로 만들어둘테니, 16인 초과 시 대기라고 생각해주세요.
        </div>
        <div>
          5. 번개 내용은 다음과 같습니다. &quot;선착순 모집이며, 참여가능한 시간에 모두 참석 눌러주세요! 상세시간은 정모 톡방이 파진 후 벙주가 다시 조사합니다. 16인을 초과한 분들 부터는 대기 명단으로 들어가며, 톡방에 초대 되지 않으면 대기 인것이니 참고해주세요! *톡방은 보통 수요일 밤에 파집니다.&quot;
        </div>
      </div>

      <FormControl className="mt-4">
        <Select
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user.uid} value={user.uid}>{user.name}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="secondary" className="mt-4" onClick={() => handleSubmit()}>
          생성하기
        </Button>
      </FormControl>
    </div>
  )
}


