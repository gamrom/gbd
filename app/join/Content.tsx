"use client";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   div,
//   Button,
// } from "@material-tailwind/react";
import {
  Card,
  CardBody,
  CardHeader,
  Link,
  Image,
  Button,
  CardFooter,
} from "@nextui-org/react";
import { useRemainJoinTime } from "../hooks/useRemainJoinTime";
// import Link from "next/link";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Content = () => {
  const { canJoin, countdown } = useRemainJoinTime();

  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/join");
      } else {
        router.push("/login");
      }
    });
  }, []);

  return canJoin ? (
    <Card>
      <CardBody className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Image
          alt="감보동게임중"
          className="object-cover"
          src="/boardgaming.jpeg"
        />
        <div className="flex flex-col">
          <div className="mb-2 text-lg font-bold">
            회비 납부하셔야 지원 완료 됩니다!
          </div>
          <div className="mb-2">
            지원 절차를 간소화하기위해, 회비납부와 지원을 함께 받고 있습니다 😀
          </div>
          <div className="mb-4">
            *불합격 되실 경우 가입하신 전화번호로 안내드리며, 납부회비는 모두
            돌려드립니다.
          </div>
          <div>
            카카오뱅크 3333-03-5130993 (예금주 : 김은식(감롬의보드게임동아리)){" "}
            <br />
            45,000원 (3개월 활동)
          </div>
          <div>
            <br />
            지원 전 회칙을 반드시 확인해주세요. <br />
          </div>

          <Link
            className="w-fit"
            href="https://gamromboard.notion.site/290766405fa14166bcd829f3afa8a9ba?pvs=4"
          >
            회칙 보러가기
          </Link>

          <div className="mt-4">
            * 결과발표 및 가입승인은 매달 1일에 이루어집니다. <br />
            * 가입 완료되신분들은 카톡방에 초대해드리고 있습니다. <br />
            * 추가 문의사항은 아래 전화번호로 부탁드립니다. <br />
            010-3660-9722 (회장 감롬) <br />
            <Link
              target="_blank"
              className="w-fit"
              href="https://www.instagram.com/gamrom.board.club/"
            >
              인스타그램에서 활동사진 보기
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  ) : (
    <Card>
      <CardBody>
        <div className="mb-2">아직 지원기간이 아닙니다 😅</div>
        <div className="mb-2">
          지원기간 까지 <br />
          {countdown}
        </div>
        <div className="mb-2">
          <br />
          회원가입하시면 지원기간에 문자드려요!
          <br />
          <Link href="/register">회원가입하기</Link>
        </div>
        <div>
          * 매달 마지막 14일 동안 지원이 가능합니다. <br />* 회원가입 해주신
          분들에게 매달 말 가입안내 문자드리고 있습니다. <br />
          * 추가 문의사항은 아래 전화번호로 부탁드립니다. <br />
          010-3660-9722 (회장 감롬)
        </div>

        <Link
          target="_blank"
          className="w-fit"
          href="https://www.instagram.com/gamrom.board.club/"
        >
          인스타그램에서 활동사진 보기
        </Link>
      </CardBody>
    </Card>
  );
};
