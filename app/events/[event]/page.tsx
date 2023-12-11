import { Button } from "@mui/material";

export default function Event({ params }: { params: { event: string } }) {
  const eventId: string = params.event;

  const sO = {
    "id": 547,
    "description": "아니한다. 경우와 의하여. 영장을 시설기준과 범죄를. 위하여 구성하지 시설기준과.",
    "end_time": "2023-10-02 21:59:59 +0900",
    "is_confirmed": true,
    "location": "Apt. 890 4170 잠실면, 남시, 경남 64962",
    "max_members_count": 9,
    "start_time": "2023-10-01 19:00:00 +0900",
    "title": "2023년 10월의 협동 보드게임 깜짝 번개"
  }

  return (
    <div className="flex flex-col px-4 mt-[50px]">
      <div className="flex justify-between">
        <span className="font-bold text-lg">{sO.title}</span>
        <Button size="small">복사하기</Button>
      </div>
      <div className="mt-4">📆 {sO.start_time} ~ {sO.end_time}</div>
      <div className="flex justify-between mt-4">
        📍 {sO.location}
      </div>
      <div>👑 벙주이름</div>
      <div className="mt-4">
        {sO.description}
      </div>

      <div className="mt-4 flex justify-between">
        <div className="flex">
          <Button variant="contained" color="error">삭제하기</Button>
          <Button variant="contained" color="success" className="ml-2">수정하기</Button>
        </div>
        <div className="flex items-center">
          {0 / 2}
          <Button variant="contained" color="info" className="ml-2">참가하기</Button>
        </div>
      </div>
    </div>
  )
}