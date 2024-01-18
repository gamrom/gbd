'use client';

import { Card, Typography, Button, Chip } from "@material-tailwind/react";
import { useEffect } from "react";
import { useSessionStorage } from "react-use";
import _ from "lodash";
import { pbkdf2 } from "crypto";


const TABLE_HEAD1 = ["1칸", "2칸", "3칸", "4칸", "5칸", "6칸", "7칸", "8칸", "9칸", "10칸"];
const TABLE_HEAD2 = ["11칸", "12칸", "13칸", "14칸", "15칸", "16칸", "17칸", "18칸", "19칸", "20칸"]

const TABLE_ROWS1 = [
  {
    score: "0"
  },
  {
    score: "1",
  },
  {
    score: "3",
  },
  {
    score: "5",
  },
  {
    score: "7",
  },
  {
    score: "9",
  },
  {
    score: "11",
  },
  {
    score: "15",
  },
  {
    score: "20",
  },
  {
    score: "25",
  },
];

const TABLE_ROWS2 = [
  {
    score: "30"
  },
  {
    score: "35",
  },
  {
    score: "40",
  },
  {
    score: "50",
  },
  {
    score: "60",
  },
  {
    score: "70",
  },
  {
    score: "85",
  },
  {
    score: "100",
  },
  {
    score: "150",
  },
  {
    score: "300",
  },
];

type PickNum = {
  id: number;
  num: string;
  remain: boolean;
}

const DEFAULT_PICK_NUMS: PickNum[] = [
  {
    id: 1,
    num: "1",
    remain: true,
  },
  {
    id: 2,
    num: "2",
    remain: true,
  },
  {
    id: 3,
    num: "3",
    remain: true,
  },
  {
    id: 4,
    num: "4",
    remain: true,
  },
  {
    id: 5,
    num: "5",
    remain: true,
  },
  {
    id: 6,
    num: "6",
    remain: true,
  },
  {
    id: 7,
    num: "7",
    remain: true,
  },
  {
    id: 8,
    num: "8",
    remain: true,
  },
  {
    id: 9,
    num: "9",
    remain: true,
  },
  {
    id: 10,
    num: "10",
    remain: true,
  },
  {
    id: 11,
    num: "11",
    remain: true,
  },
  {
    id: 12,
    num: "11",
    remain: true,
  },
  {
    id: 13,
    num: "12",
    remain: true,
  },
  {
    id: 14,
    num: "12",
    remain: true,
  },
  {
    id: 15,
    num: "13",
    remain: true,
  },
  {
    id: 16,
    num: "13",
    remain: true,
  },
  {
    id: 17,
    num: "14",
    remain: true,
  },
  {
    id: 18,
    num: "14",
    remain: true,
  },
  {
    id: 19,
    num: "15",
    remain: true,
  },
  {
    id: 20,
    num: "15",
    remain: true,
  },
  {
    id: 21,
    num: "16",
    remain: true,
  },
  {
    id: 22,
    num: "16",
    remain: true,
  },
  {
    id: 23,
    num: "17",
    remain: true,
  },
  {
    id: 24,
    num: "17",
    remain: true,
  },
  {
    id: 25,
    num: "18",
    remain: true,
  },
  {
    id: 26,
    num: "18",
    remain: true,
  },
  {
    id: 27,
    num: "19",
    remain: true,
  },
  {
    id: 28,
    num: "19",
    remain: true,
  },
  {
    id: 29,
    num: "20",
    remain: true,
  },
  {
    id: 30,
    num: "21",
    remain: true,
  },
  {
    id: 31,
    num: "22",
    remain: true,
  },
  {
    id: 32,
    num: "23",
    remain: true,
  },
  {
    id: 33,
    num: "24",
    remain: true,
  },
  {
    id: 34,
    num: "25",
    remain: true,
  },
  {
    id: 35,
    num: "26",
    remain: true,
  },
  {
    id: 36,
    num: "27",
    remain: true,
  },
  {
    id: 37,
    num: "28",
    remain: true,
  },
  {
    id: 38,
    num: "29",
    remain: true,
  },
  {
    id: 39,
    num: "30",
    remain: true,
  },
  {
    id: 40,
    num: "★",
    remain: true,
  },
]

export default function StreamsPage() {
  const [leftNums, setLeftNums] = useSessionStorage<PickNum[]>("leftNum", DEFAULT_PICK_NUMS);
  const [pickNums, setPickNums] = useSessionStorage<String[]>("pickNum", []);
  const onClickPick = () => {
    if (pickNums.length < 40) {
      const p1 = _.filter(leftNums, (num: PickNum) => num.remain)
      const p2 = _.sample(p1);
      p2 && setPickNums([...pickNums, p2.num])
      setLeftNums(
        _.map(leftNums, (num: PickNum) => {
          if (num.id === p2?.id) {
            return {
              ...num,
              remain: false,
            }
          }
          return num;
        })
      );
    } else {
      alert("더 이상 뽑을 수 없습니다");
    }
  }

  return (
    <div className="flex flex-col">
      <span className="mb-4 text-[24px] font-bold">스트림스 뽑기 시뮬레이터</span>
      <span className="mb-4">* 창을 닫으면 모든 정보가 사라집니다</span>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD1.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS1.map(({ score }, index) => (
              <td key={`score_${score}_${index}`} className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal text-center">
                  {score}
                </Typography>
              </td>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="h-full w-full overflow-scroll mt-2">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD2.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS2.map(({ score }, index) => (
              <td key={`score_${score}_${index}`} className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal text-center">
                  {score}
                </Typography>
              </td>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="mx-auto gap-4 flex justify-center">
        <Button className="w-[100px] my-4" onClick={onClickPick}>뽑기</Button>
        <Button variant="outlined" className="w-[100px] my-4" onClick={
          () => {
            if (window.confirm("삭제하시겠습니까?")) {
              setLeftNums(DEFAULT_PICK_NUMS);
              setPickNums([]);
            }
          }
        }>리셋</Button>
      </div>

      <div className="mx-auto text-[50px] font-bold mt-4 mb-2">{_.last(pickNums)}</div>
      <div className="mx-auto mb-4 grid grid-cols-10 gap-2">
        {_.reverse(_.initial(pickNums)).map((num, index) => {
          return (
            <span className="text-center" key={`numpick_${index}`}>{num}</span>
          )
        })}
      </div>

      <div className="grid grid-cols-5 lg:grid-cols-10 gap-2">
        {leftNums.map((num: PickNum, index: number) => {
          return (
            <Chip
              key={`num_${num.id}_${index}`}
              variant={num.remain ? "filled" : "ghost"}
              value={num.num}
              className="text-center"
            />
          )
        })}
      </div>
    </div>
  )
}

