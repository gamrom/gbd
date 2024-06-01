"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

export default function BoardgameToolsPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="w-full">
        <CardBody className="mb-auto">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            마이티 계산기
          </Typography>
          <Typography>
            쉽게 사용 가능한 마이티 계산기입니다. 점수 계산식은 들어가면 오른쪽
            상단에 있습니다.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link
            href="/boardgame_tools/mighty"
            className="text-white decoration-none no-underline"
          >
            <Button className="cursor-pointer">바로가기</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardBody className="mb-auto">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            스트림스
          </Typography>
          <Typography>
            큰 모니터로 다 같이 스트림스를 하고 싶을 때 사용해보세요!
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link
            href="/boardgame_tools/streams"
            className="text-white decoration-none no-underline"
          >
            <Button className="cursor-pointer">바로가기</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
