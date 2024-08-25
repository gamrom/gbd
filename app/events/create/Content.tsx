"use client";
import { Box, TextField, Checkbox } from "@mui/material";
import { Button } from "@nextui-org/react";
import { getActiveUsers, postCreateEvent } from "../../api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGetCurrentUser } from "@/app/hooks/useGetCurrentUser";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import FormControlLabel from "@mui/material/FormControlLabel";
import { pushDiscord } from "@/app/tools";

export const Content = () => {
  const pickDate: any = useSearchParams().get("pickDate");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();

  const [activeUsers, setActiveUsers] = useState<any>([]);

  useEffect(() => {
    getActiveUsers().then((res) => {
      const s = res.data.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
      setActiveUsers(s);
    });
  }, []);

  const [formState, setFormState] = useState<any>({
    title: "",
    location: "아지트",
    description: "",
    start_time: "",
    end_time: "",
    max_members_count: 4,
    uid: "",
    owner_name: "",
  });

  useEffect(() => {
    if (
      currentUser &&
      (currentUser.data.role !== "manager" || currentUser.data.role !== "admin")
    ) {
      setFormState({
        ...formState,
        uid: currentUser.data.uid,
      });
    }
  }, [currentUser]);

  const [timeState, setTimeState] = useState<any>({});
  useEffect(() => {
    if (pickDate) {
      setTimeState({
        startTime: dayjs(pickDate),
        endTime: dayjs(pickDate),
      });
    }
  }, [pickDate]);

  const [isPushAlarm, setIsPushAlarm] = useState<boolean>(true);

  const handleSubmit = () => {
    if ((timeState.startTime || timeState.endTime) == null) {
      alert("시간을 입력해주세요.");
      return;
    } else if (timeState.startTime.isAfter(timeState.endTime)) {
      alert("시작시간이 종료시간보다 늦습니다.");
      return;
    } else if (timeState.startTime.isSame(timeState.endTime)) {
      alert("시작시간과 종료시간이 같습니다.");
      return;
    } else if (timeState.endTime.isBefore(timeState.startTime)) {
      alert("시작시간이 현재시간보다 빠릅니다.");
      return;
    } else if (formState.title == "") alert("제목을 입력해주세요.");
    else if (formState.location == "") {
      alert("장소를 입력해주세요.");
    } else if (formState.description == "") {
      alert("설명을 입력해주세요.");
    } else if (formState.max_members_count == "") {
      alert("최대인원을 입력해주세요.");
    } else if (formState.max_members_count < 1) {
      alert("최대인원은 1명 이상이어야 합니다.");
    } else {
      postCreateEvent({
        title: formState.title,
        location: formState.location,
        description: formState.description,
        start_time: timeState.startTime,
        end_time: timeState.endTime,
        max_members_count: formState.max_members_count,
        uid: formState.uid,
      })
        .then((res) => {
          setIsSubmitting(true);
          if (isPushAlarm) {
            pushDiscord({
              text: `------------------------------\n새로운 번개가 생성되었습니다. \n제목: ${res.data.title} \n장소: ${res.data.location} \n벙주: ${res.data.owner_name} \n설명: ${res.data.description} \n시작시간: ${dayjs(
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
            title: "일정이 생성되었습니다.",
            confirmButtonText: "확인",
          }).then(() => {
            location.href = `/events/${res.data.id}`;
          });
        })
        .catch((error) => {
          alert("일정 생성에 실패했습니다.");
        });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">일정 생성</div>
      <TextField
        name="title"
        value={formState.title}
        onChange={(e) =>
          setFormState({
            ...formState,
            title: e.target.value,
          })
        }
        autoComplete="off"
        label="일정 제목"
        variant="outlined"
      />
      <TextField
        name="location"
        value={formState.location}
        onChange={(e) => {
          setFormState({
            ...formState,
            location: e.target.value,
          });
        }}
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
                name="uid"
                value={formState.uid}
                label="벙주"
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    uid: e.target.value,
                  });
                }}
              >
                {activeUsers
                  .sort(
                    //name
                    (a: any, b: any) => a.name.localeCompare(b.name)
                  )
                  .map((user: any) => {
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
            defaultValue={currentUser.data.name}
            autoComplete="off"
            label="벙주/호스트"
            variant="outlined"
          />
        ))}
      <TextField
        name="description"
        value={formState.description}
        onChange={(e) => {
          setFormState({
            ...formState,
            description: e.target.value,
          });
        }}
        autoComplete="off"
        label="일정 내용"
        variant="outlined"
        multiline
        placeholder="번개 상세한 설명을 적어주세요."
      />

      <DateTimePicker
        label="시작 시간"
        value={timeState.startTime}
        onChange={(newValue) =>
          setTimeState({ ...timeState, startTime: newValue })
        }
      />
      <DateTimePicker
        label="종료 시간"
        value={timeState.endTime}
        onChange={(newValue) =>
          setTimeState({ ...timeState, endTime: newValue })
        }
      />

      <TextField
        label="모집 인원 (벙주/호스트 포함)"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={formState.max_members_count}
        onChange={(e) => {
          setFormState({
            ...formState,
            max_members_count: e.target.value,
          });
        }}
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
        disabled={isSubmitting}
        color="success"
        className="text-white"
        size="lg"
        onClick={() => handleSubmit()}
      >
        완료하기
      </Button>
    </div>
  );
};
