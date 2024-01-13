'use client';

import { IconButton, Typography } from "@material-tailwind/react";
import { useRemainJoinTime } from "./hooks/useRemainJoinTime";
import { Button, Card, CardBody } from "@material-tailwind/react";
import Image from "next/image";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from "./style";
import { useState } from 'react';
import { useGetCurrentUser } from "./hooks/useGetCurrentUser";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { countdown, canJoin } = useRemainJoinTime();
  const [isSpecialModalOpen, setIsSpecialModalOpen] = useState<boolean>(false);
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const router = useRouter();

  return (
    <div>
      <div className="relative min-h-screen w-full bg-[url('/image/image-4.jpeg')] bg-cover bg-no-repeat px-4" style={{ maxWidth: "-webkit-fill-available" }}>
        <div className="absolute inset-0 h-full w-full bg-gray-900/75 bg-cover" />
        <div className="grid min-h-screen px-8">
          <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
            <Typography variant="h1" color="white">
              {
                canJoin ?
                  (
                    !isLoading && (currentUser ? (
                      <Button size="lg" color="amber" className="border-none cursor-hover" onClick={() => setIsSpecialModalOpen(true)}>
                        신규지원/연장하기
                      </Button>
                    ) : (
                      //회원가입 후 지원하기 버튼
                      <Button size="lg" color="amber" className="border-none cursor-hover" onClick={() => router.push('/login')}>
                        로그인 후 지원하기
                      </Button>
                    ))
                  ) : (
                    <span>
                      다음 모집까지 <br />
                      {countdown}
                    </span>
                  )
              }
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mt-4 mb-12 w-full md:max-w-full lg:max-w-3xl"
            >
              <span>
                서울대 입구역 도보 6분 아지트
                <br />
                감롬의 보드게임 동아리
              </span>
            </Typography>
            <Typography
              variant="paragraph"
              color="white"
              className="mt-1 mb-2 font-medium uppercase"
            >
              인스타그램 팔로우하고 신규 소식 받기
            </Typography>
            <div className="gap-8 flex">
              <a
                href="https://www.instagram.com/gamrom.board.club"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="75px" height="75px"><radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fd5" /><stop offset=".328" stopColor="#ff543f" /><stop offset=".348" stopColor="#fc5245" /><stop offset=".504" stopColor="#e64771" /><stop offset=".643" stopColor="#d53e91" /><stop offset=".761" stopColor="#cc39a4" /><stop offset=".841" stopColor="#c837ab" /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z" /><radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4168c9" /><stop offset=".999" stopColor="#4168c9" stopOpacity="0" /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z" /><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z" /><circle cx="31.5" cy="16.5" r="1.5" fill="#fff" /><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="mx-auto max-w-screen-md">
          <Typography color="blue" variant="h6">
            #감롬의보드게임동아리 #서울대입구역도보6분아지트 #대학생직장인동아리
          </Typography>
          <Typography className="my-12 font-normal !text-gray-500">
            동아리 연혁 <br />
            - 1기 : 2019.11. 모집 <br />
            - 2기 : 2020~2021년 모집 <br />
            <span className="italic">코로나19로 오픈톡방 운영</span> <br />
            - 3기 : 2021.12. 모집 <br />
            - 4기 : 2022.06. 모집 <br />
            - 5기 : 2023.01 모집 <br />
            - 6기 : 2023.04 모집 <br />
            - 7기 : 2023.07 모집 <br />
            8기 ~ 매달 모집 중
          </Typography>

          <Image
            width={768}
            height={500}
            src="/image/image1_1.jpeg"
            alt="post"
            className="mb-4 h-[28rem] w-full rounded-xl object-cover"
          />

          <Typography variant="h2" color="blue-gray" className="mt-8 mb-6">
            아지트에 대해서...
          </Typography>

          <Typography className="my-10 font-normal !text-gray-500">
            1. 보드게임 400여개<br />
            2. 글룸헤이븐등을 위한 75인치 TV<br />
            3. 광기의 저택등을 위한 태블릿<br />
            4. 16인 이상 여유롭게 앉을 수 있는 공간<br />
          </Typography>

          <Image
            width={768}
            height={500}
            src="/image/image1_3.jpeg"
            alt="post"
            className="mb-4 h-[28rem] w-full rounded-xl object-cover"
          />

          <Typography variant="h2" color="blue-gray" className="mt-8 mb-6">
            본 동아리의 취지에 맞는 분들
          </Typography>

          <Typography className="my-10 font-normal !text-gray-500">
            1. 보드게임을 좋아하시는 분 <br />
            2. 새로운 분들과 동아리 형태로 보드게임을 하고 싶으신 분<br />
            3. 보드게임 소식을 간간히 듣고 싶으신 분<br />
            4. 유령회원은 하고 싶은데 정말 가끔은 모임에 나가고 싶으신 분<br />
            5. 언젠가 한 번은 온다는 마음가짐<br />
          </Typography>

          <Image
            width={768}
            height={500}
            src="/image/image1_2.jpeg"
            alt="post"
            className="mb-4 h-[28rem] w-full rounded-xl object-cover"
          />

          <section className="w-full max-w-full mx-auto flex flex-col items-center py-20">
            <Typography variant="h3" className="text-center" color="blue-gray">
              이런 활동들을 해요
            </Typography>
            <div className="mt-10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:border-r px-3 border-blue-gray-100">
                <div className="!border-b  border-blue-gray-100 mb-5">
                  <Card shadow={false} className="p-0">
                    <CardBody className="p-0 pb-5">
                      <Typography
                        variant="h3"
                        className="leading-[45px] mb-4 !text-gray-900 "
                      >
                        정모
                      </Typography>
                      <Typography className="text-normal mb-4 !text-base text-blue-gray-500 ">
                        매주 토요일마다 운영진이 책임지고 가는 정모가 열립니다. 보드게임 뉴비에서 고인물까지 모두 재밌고 편안하게 보드게임해요!
                      </Typography>
                    </CardBody>
                  </Card>
                </div>
                <div className="!border-b md:border-none border-blue-gray-100 mb-5">
                  <Card shadow={false} className="p-0">
                    <CardBody className="p-0 pb-5">
                      <div className="w-full mb-4 h-[211px]">
                        <Image
                          width={768}
                          height={768}
                          src="/image/image2_1.jpg"
                          className="w-full h-full rounded-lg object-cover"
                          alt="지니어스대회"
                        />
                      </div>
                      <Typography
                        variant="h3"
                        className="leading-[45px] mb-4 !text-gray-900 "
                      >
                        지니어스 대회
                      </Typography>
                      <Typography className="text-normal mb-4 !text-base text-blue-gray-500 ">
                        예전에 더 지니어스 시리즈를 너무 재밌게 봤었는데, 그곳에서 나온 게임 중 하나인 중간 달리기를 실제로 해볼 수 있어서 너무 좋았습니다!
                      </Typography>
                      <div className="flex items-center gap-3">
                        <div className="">
                          <Image
                            width={256}
                            height={256}
                            src="/image/Memoji-03.png"
                            className="w-12 object-cover h-12 rounded-lg"
                            alt="photo"
                          />
                        </div>
                        <div>
                          <Typography className="!font-bold !text-sm text-gray-900">
                            지니어스 참가자
                          </Typography>
                          <Typography className="!font-normal !text-xs text-gray-500">
                            감보동 3기
                          </Typography>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div className="!border-b md:border-none border-blue-gray-100 mb-5">
                  <Card shadow={false} className="p-0">
                    <CardBody className="p-0 pb-5">
                      <div className="w-full mb-4 h-[149px]">
                        <Image
                          width={768}
                          height={768}
                          src="/image/image3_6.png"
                          className="w-10/12 object-cover h-full rounded-lg"
                          alt="대회"
                        />
                      </div>
                      <Typography
                        variant="h3"
                        className="leading-[45px] mb-6 !text-gray-900"
                      >
                        MT 및 여행
                      </Typography>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div>
                <div className="!border-b md:border-none border-blue-gray-100 mb-5">
                  <Card
                    shadow={false}
                    className="pb-5 p-0 !border-b md:border-none border-blue-gray-100"
                  >
                    <CardBody className="p-0 ">
                      <div className="w-full mb-4 h-[211px] ">
                        <Image
                          width={768}
                          height={768}
                          src="/image/image2_3.jpeg"
                          className="w-full h-full rounded-lg object-cover"
                          alt="할로윈"
                        />
                      </div>
                      <Typography variant="h3" className="leading-[45px] mb-4 !text-gray-900">
                        보드게임 행사 참여

                      </Typography>
                      <Typography className="font-normal mb-4 !text-base text-gray-500 ">
                        보드게임페스타에 이어 보드게임콘에 참여한 감보동. 이번에는 텅장을 만들지 않고 가겠다고 다짐했지만... 수많은 유로게임과 할인게임의 유혹에 결국 모두 지고 말았습니다... 얼티밋레일로드는 무슨게임인지도 모르고 줄이 길어서 충동구매해버리고... 다른 회원분들도 케메트, 후루요니 등 비싼 게임을 잔뜩 구매해버렸네요. 아지트에 돌아와 몇시간이나 정리. 너무나 보람찬 보드게임 하루 였답니다! 너무 재밌어!
                      </Typography>
                      <div className="flex items-center gap-3">
                        <div className="">
                          <Image
                            width={256}
                            height={256}
                            src="/image/Memoji-05.png"
                            className="w-12 h-12 rounded-lg object-cover"
                            alt="photo"
                          />
                        </div>
                        <div>
                          <Typography className="!font-bold !text-sm text-gray-900">
                            할로윈 파티 참가자
                          </Typography>
                          <Typography className="!font-normal !text-xs text-gray-500 ">
                            감보동 4기
                          </Typography>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="!border-b md:border-none border-blue-gray-100 mb-5">
                  <Card shadow={false} className="p-0">
                    <CardBody className="p-0 pb-5">
                      <div className="w-full mb-4 h-[149px]">
                        <Image
                          width={768}
                          height={768}
                          src="/image/image3_5.png"
                          className="w-10/12 object-cover h-full rounded-lg w-full"
                          alt="대회"
                        />
                      </div>
                      <Typography
                        variant="h3"
                        className="leading-[45px] mb-6 !text-gray-900"
                      >
                        보드게임 대회
                      </Typography>
                      <Typography className="!font-bold !text-sm text-gray-700">
                        티츄 등 각종 보드게임 대회 개최
                      </Typography>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="md:border-l px-3 border-blue-gray-100">
                <div className="!border-b  border-blue-gray-100 mb-6">
                  <Card shadow={false} className="p-0">
                    <CardBody className="p-0 pb-5">
                      <div className="w-full mb-4 h-[149px] ">
                        <Image
                          width={768}
                          height={768}
                          src="/image/image2_2.jpeg"
                          className="w-10/12 w-full object-cover h-full rounded-lg"
                          alt="보드게임콘"
                        />
                      </div>
                      <Typography
                        variant="h3"
                        className="leading-[45px] mb-6 !text-gray-900"
                      >
                        기념일 파티
                      </Typography>
                      <Typography className="!font-bold !text-sm text-gray-700">
                        파티에 적극적으로 참여해준 감보동 멤버들 그리고 지인분들에게 기억에 남는 할로윈이 되었으면 좋겠네요🎃
                      </Typography>
                    </CardBody>
                  </Card>
                </div>

                <Card shadow={false} className="p-0">
                  <CardBody className="p-0 pb-5">
                    <div className="w-full mb-4 h-[149px]">
                      <Image
                        width={768}
                        height={768}
                        src="/image/image2_4.png"
                        className="w-10/12 w-full object-cover h-full rounded-lg"
                        alt="인라인"
                      />
                    </div>
                    <Typography
                      variant="h3"
                      className="leading-[45px] mb-6 !text-gray-900"
                    >
                      레저 활동
                    </Typography>
                    <Typography className="!font-bold !text-sm text-gray-700">
                      보드게임 이외에도 스키, 인라인, 소풍 등의 레저 활동 (및 보드게임은 기본!)
                    </Typography>
                  </CardBody>
                </Card>

              </div>
            </div>
          </section>
        </div>
      </section>

      <Modal
        open={isSpecialModalOpen}
        onClose={() => setIsSpecialModalOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            {canJoin && (
              <div className="flex flex-col">
                <div className="text-center font-bold mb-2 text-lg">지원가능 기간입니다.</div>
                <div>지원 전 회칙을 반드시 확인해주세요.</div>
                <a href="https://gamromboard.notion.site/290766405fa14166bcd829f3afa8a9ba?pvs=4" target="_blank">회칙 보러가기</a>
                <div>지원 후 3개월동안 활동하게 됩니다.</div>
                <div className="font-bold mt-2 text-lg">지원 방법</div>
                <div>다음 계좌로 회비 45000원 입금해주시면 지원 완료됩니다.</div>
                <div>김은식 카카오뱅크 3333-03-5130993</div>
                <div className="mt-2">가입 승인은 매달 마지막날 ~ 다음달 1일 중 처리됩니다.</div>
                <div>가입 완료되신분들은 카톡방에 초대해드리고 있습니다.</div>
                <div>아지트 포화 등의 이유로 가입에 제한이 있을 수 있습니다.</div>
                <div>추가 문의사항은 인스타그램으로 부탁드립니다.</div>
              </div>
            )}

            {!canJoin && (
              <div className="flex flex-col items-center justify-center">
                <div className="font-bold text-lg mb-2">지원 기간이 아닙니다.</div>
                <div>매달 마지막 7일 동안 지원이 가능합니다.</div>
                {countdown && <div className="flex items-center justify-center">지원 가능까지 남은시간 : {countdown}</div>}
              </div>
            )}

            <Button color="red" className="border-none" onClick={() => setIsSpecialModalOpen(false)}>닫기</Button>
          </div>
        </Box>
      </Modal>
    </div >
  )
}