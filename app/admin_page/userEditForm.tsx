import { Box, Button } from "@mui/material";
import { modalStyle } from "../style";
import { LoadingComp } from "../loadingComp";
import { useEffect, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { patchUser } from "../api";

export const UserEditForm = ({ user, close }: { user: any, close: any }) => {
  const [birth, setBirth] = useState<Dayjs>(dayjs());
  const [name, setName] = useState<string>("");
  const [isMarketing, setIsMarketing] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBirth(dayjs(user.birth));
      setIsMarketing(user.is_marketing);
    }
  }, [user])

  const handleSubmit = () => {
    const pData = {
      name: name,
      birth: birth,
      isMarketing: isMarketing,
    }

    if (pData.name !== "" && pData.birth !== null) {
      patchUser({ uid: user.uid, name: name, birth: dayjs(birth).format("YYYY-MM-DD"), isMarketing: isMarketing }).then((res) => {
        alert("수정되었습니다. 페이지가 새로고침됩니다.")
        window.location.reload();
        close();
      }).catch((err) => {
        alert("수정에 실패하였습니다. 반복되면 관리자에게 문의해주세요.")
      })
    } else {
      alert("모든 항목을 입력해주세요.")
    }
  }

  return (
    user ? (
      <Box sx={modalStyle}>
        <div className="flex flex-col">
          <div>이름</div>
          <input id="username" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <div>생년월일</div>
          <input type="date"
            value={
              birth.format("YYYY-MM-DD")
            }
            onChange={(e) => setBirth(
              dayjs(e.target.value)
            )} />
          <div>마케팅 수신 동의</div>
          <input type="checkbox" checked={isMarketing} onChange={() => setIsMarketing(!isMarketing)} />
          <button type="button" onClick={() => handleSubmit()}>확인</button>
        </div>
      </Box>
    ) : (
      <LoadingComp />
    )
  )
}