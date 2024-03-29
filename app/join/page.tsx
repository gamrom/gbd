'use client';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useRemainJoinTime } from "../hooks/useRemainJoinTime";
import Link from "next/link";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const { canJoin, countdown } = useRemainJoinTime();

  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/join')
      } else {
        router.push("/login")
      }
    })
  }, [])


  return (
    <div>
      <Card className="mt-6 w-full">
        <CardHeader color="blue-gray" className="relative">
          <img
            src="/boardgaming.jpeg"
            alt="card-image"
            className="object-cover w-full h-full rounded-lg"
          />
        </CardHeader>
        {canJoin ? (<CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            아래 계좌로 입금하시면 지원 완료 됩니다!
          </Typography>
          <Typography variant="h6" color="blue-gray">
            카카오뱅크 3333-03-5130993 (예금주 : 김은식(감롬의보드게임동아리)) <br />
            45,000원 (3개월 활동)
          </Typography>
          <Typography variant="h6" color="blue-gray">
            <br />지원 전 회칙을 반드시 확인해주세요. <br />
          </Typography>
          <Typography variant="h6" color="blue-gray">
            * 가입승인은 매달 마지막날 ~ 다음달 1일에 이루어집니다. <br />
            * 가입 완료되신분들은 카톡방에 초대해드리고 있습니다. <br />
            * 아지트 포화 등의 이유로 가입에 제한이 있을 수 있습니다. <br />
            * 추가 문의사항은 인스타그램으로 부탁드립니다. <br />
            <Link href="https://www.instagram.com/gamrom.board.club/">인스타그램 바로가기</Link>
          </Typography>
        </CardBody>) : (
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              아직 지원기간이 아닙니다 😅
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              지원기간 까지 <br />
              {countdown}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              <br />
              회원가입하시면 지원기간에 문자드려요!
              <br />
              <Link href="/register">
                회원가입하기
              </Link>
            </Typography>
            <Typography variant="h6" color="blue-gray">
              * 매달 마지막 7일 동안 지원이 가능합니다. <br />
              * 회원가입 해주신 분들에게 매달 말 가입안내 문자드리고 있습니다. <br />
              * 추가 문의사항은 인스타그램으로 부탁드립니다. <br />
              <Link href="https://www.instagram.com/gamrom.board.club/">인스타그램 바로가기</Link>
            </Typography>
          </CardBody>
        )}
      </Card>
    </div >
  )
}
