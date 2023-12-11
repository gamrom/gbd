import { Button } from "@mui/material"
import Link from "next/link"

export default function WaitApprove() {
  return (
    <div className="flex flex-col">
      <div>승인 대기중입니다.</div>
      <div>회비 입금자에 한해 매월 1일 중 신규회원 승인 해드리고 있습니다.</div>
      <div>문의사항은 감보동 인스타 @gamrom_board_club 으로 연락주세요. 😆</div>
      <Link href="/">
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
        >메인으로 가기</Button>
      </Link>
    </div>
  )
}