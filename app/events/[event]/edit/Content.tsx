"use client";
import { Box, TextField, Checkbox } from "@mui/material";
import { Button } from "@nextui-org/react";
import { getActiveUsers, patchEvent, getEvent } from "../../../api";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import Link from "next/link";
import Select from "@mui/material/Select";
import { LoadingComp } from "@/app/_components/LoadingComp";
import { DatePickerComp } from "./DatePickerComp";
import { useGetCurrentUser } from "@/app/hooks/useGetCurrentUser";
import FormControlLabel from "@mui/material/FormControlLabel";
import { pushDiscord } from "@/app/tools";

export const Content = ({ params }: { params: { event: string } }) => {
  const [event, setEvent] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: currentUser } = useGetCurrentUser();
  const [isPushAlarm, setIsPushAlarm] = useState<boolean>(true);
  const [activeUsers, setActiveUsers] = useState<any>([]);
  const [timeState, setTimeState] = useState<any>({});

  useEffect(() => {
    getEvent({ event_id: params.event }).then((res) => {
      setEvent({
        current_members_count: res.data.current_members_count,
        description: res.data.description,
        end_time: dayjs(res.data.end_time.replace(/-/g, "/")),
        event_id: res.data.event_id,
        location: res.data.location,
        max_members_count: res.data.max_members_count,
        owner_name: res.data.owner_name,
        owner_uid: res.data.owner_uid,
        start_time: dayjs(res.data.start_time.replace(/-/g, "/")),
        title: res.data.title,
      });
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getActiveUsers().then((res: any) => {
      setActiveUsers(res.data);
    });
  }, []);

  useEffect(() => {
    if (event.start_time && event.end_time) {
      setTimeState({
        startTime: event.start_time,
        endTime: event.end_time,
      });
    }
  }, [event]);

  const handleSubmit = () => {
    if (event.start_time.isAfter(event.end_time)) {
      alert("시작시간이 종료시간보다 늦습니다.");
      return;
    } else if (event.start_time.isSame(event.end_time)) {
      alert("시작시간과 종료시간이 같습니다.");
      return;
    } else if (event.end_time.isBefore(event.start_time)) {
      alert("시작시간이 현재시간보다 빠릅니다.");
      return;
    } else if (
      event.title === "" ||
      event.location === "" ||
      event.uid === ""
    ) {
      alert("빈값이 있습니다.");
      return;
    } else if (event.max_members_count < 1) {
      alert("본인도 포함한 인원을 입력해주세요.");
      return;
    } else {
      patchEvent({
        title: event.title,
        location: event.location,
        description: event.description,
        start_time: timeState.startTime,
        end_time: timeState.endTime,
        max_members_count: event.max_members_count,
        uid: event.owner_id,
        event_id: params.event,
      })
        .then((res: any) => {
          if (isPushAlarm) {
            pushDiscord({
              text: `------------------------------\n번개가 수정되었습니다. \n제목: ${res.data.title} \n장소: ${res.data.location} \n벙주: ${res.data.owner_name} \n설명: ${res.data.description} \n시작시간: ${dayjs(
                res.data.start_time
              ).format("YY-MM-DD HH:mm")} \n종료시간: ${dayjs(
                res.data.end_time
              ).format(
                "YY-MM-DD HH:mm"
              )}  \n최대인원: ${res.data.max_members_count} \n바로가기 : https://www.gambodong.com/events/${res.data.id}
            `,
            });
          }
          Swal.fire({
            icon: "success",
            title: "수정 완료",
            text: "일정이 수정되었습니다.",
            confirmButtonText: "확인",
          }).then(() => {
            // location.href = `/events/${params.event}`;
          });
        })
        .catch((error) => {
          alert("일정 수정에 실패했습니다.");
        });
    }
  };

  useEffect(() => {
    if (
      currentUser &&
      (currentUser.data.role !== "manager" || currentUser.data.role !== "admin")
    ) {
      setEvent({
        ...event,
        uid: currentUser.data.uid,
      });
    }
  }, [currentUser]);

  return !isLoading && timeState && activeUsers && currentUser && event ? (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">일정 수정</div>
      <TextField
        InputLabelProps={{ shrink: true }}
        name="title"
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
        autoComplete="off"
        label="일정 제목"
        variant="outlined"
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        name="location"
        value={event.location}
        onChange={(e) => setEvent({ ...event, location: e.target.value })}
        autoComplete="off"
        label="일정 장소"
        variant="outlined"
      />

      {currentUser &&
        (currentUser.data.role === "admin" ||
        currentUser.data.role === "manager" ? (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>벙주</InputLabel>

              <Select
                name="owner_uid"
                value={event.owner_uid}
                label="벙주"
                onChange={(e) => {
                  setEvent({
                    ...event,
                    owner_uid: e.target.value,
                  });
                }}
              >
                {activeUsers.map((user: any) => {
                  return (
                    <MenuItem key={user.uid} value={user.uid}>
                      {user.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <TextField
            disabled
            defaultValue={event.owner_name}
            autoComplete="off"
            label="벙주/호스트"
            variant="outlined"
          />
        ))}

      <TextField
        InputLabelProps={{ shrink: true }}
        name="description"
        value={event.description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
        autoComplete="off"
        label="일정 내용"
        variant="outlined"
        multiline
        placeholder="번개 상세한 설명을 적어주세요."
      />

      {timeState.startTime && timeState.endTime && (
        <DatePickerComp timeState={timeState} setTimeState={setTimeState} />
      )}

      <TextField
        label="모집 인원 (벙주/호스트 포함)"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={event.max_members_count}
        onChange={(e) =>
          setEvent({ ...event, max_members_count: e.target.value })
        }
        name="max_members_count"
      />

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={true}
            onChange={(e) => {
              setIsPushAlarm(e.target.checked);
            }}
          />
        }
        label="디스코드에 번개 생성 알림을 보냅니다."
      />

      <span className="text-xs !mt-0">
        밤10시에서 오전9시 사이에는 체크를 하여도 알림이 가지 않습니다.
      </span>

      <Button
        type="button"
        className="text-white"
        onClick={() => handleSubmit()}
        color="success"
      >
        수정 완료
      </Button>
      <Button color="danger">
        <Link
          href={`/events/${params.event}`}
          className="flex items-center justify-center w-full text-black no-underline"
        >
          취소
        </Link>
      </Button>
    </div>
  ) : (
    <LoadingComp />
  );
};
