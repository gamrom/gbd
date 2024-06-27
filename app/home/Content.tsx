"use client";
import {
  Link,
  Card,
  CardBody,
  Button,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
// import Image from "next/image";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const IntroduceCard = ({
  title,
  sub_title,
  content,
  img,
}: {
  title: string;
  sub_title: string;
  content: string;
  img?: any;
}) => {
  return (
    <Card className="w-full py-4 h-fit">
      <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
        <h4 className="font-bold text-large">{title}</h4>
        <p className="font-bold uppercase text-tiny">{sub_title}</p>
        <small className="mt-2 leading-5 text-default-500">{content}</small>
      </CardHeader>

      {img && <CardBody className="py-2 overflow-visible">{img}</CardBody>}
    </Card>
  );
};

export const Content = () => {
  return (
    <div>
      <div
        className="relative min-h-screen w-full bg-[url('/main_image.jpeg')] bg-cover bg-center bg-no-repeat px-4"
        style={{ maxWidth: "-webkit-fill-available" }}
      >
        <div className="absolute inset-0 w-full h-full bg-cover bg-gray-900/75" />
        <div className="grid min-h-screen px-8">
          <div className="container relative z-10 grid mx-auto my-auto text-center place-items-center">
            <div className="gradient-text font-bold flex-col flex items-center justify-center gap-2 text-white text-[24px] lg:text-[40px]">
              <div>#서울대입구 </div>
              <div>#보드게임 동아리</div>
              <div>#보드게임 뉴비/러버 모집 중</div>
            </div>
            <Link href="/join" className="mt-4">
              <Button
                variant="shadow"
                size="lg"
                color="default"
                className="text-black bg-white"
              >
                지원하기
              </Button>
            </Link>
            <div className="text-[#f8e9d1] mt-12">
              인스타그램에서 활동사진 보기
            </div>
            <div className="flex gap-8">
              <a
                href="https://www.instagram.com/gamrom.board.club"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="75px"
                  height="75px"
                >
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8ma"
                    cx="19.38"
                    cy="42.035"
                    r="44.899"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fd5" />
                    <stop offset=".328" stopColor="#ff543f" />
                    <stop offset=".348" stopColor="#fc5245" />
                    <stop offset=".504" stopColor="#e64771" />
                    <stop offset=".643" stopColor="#d53e91" />
                    <stop offset=".761" stopColor="#cc39a4" />
                    <stop offset=".841" stopColor="#c837ab" />
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8ma)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  />
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8mb"
                    cx="11.786"
                    cy="5.54"
                    r="29.813"
                    gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#4168c9" />
                    <stop offset=".999" stopColor="#4168c9" stopOpacity="0" />
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8mb)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  />
                  <path
                    fill="#fff"
                    d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                  />
                  <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
                  <path
                    fill="#fff"
                    d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                  />
                </svg>
              </a>
            </div>

            <ArrowCircleDownIcon
              onClick={() => {
                const section2 = document.getElementById("section2");
                section2?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white w-[45px] h-[56px] mt-4 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <section className="px-4 py-12 scroll-smooth" id="section2">
        <div className="max-w-screen-md mx-auto leading-8">
          <Card>
            <CardBody>
              #감롬의보드게임동아리 #서울대입구역도보6분아지트
              #대학생직장인동아리
            </CardBody>
          </Card>
          <Card className="my-12 font-normal">
            <CardHeader className="font-bold text-secondary">
              동아리 연혁
            </CardHeader>
            <Divider />
            <CardBody className="text-primary">
              - 1기 : 2019.11. 모집 <br />
              - 2기 : 2020~2021년 모집 <br />
              <span className="italic">코로나19로 오픈톡방 운영</span> <br />
              - 3기 : 2021.12. 모집 <br />
              - 4기 : 2022.06. 모집 <br />
              - 5기 : 2023.01 모집 <br />
              - 6기 : 2023.04 모집 <br />
              - 7기 : 2023.07 모집 <br /> <br />
              8기 ~ 매달 모집 중
            </CardBody>
          </Card>

          <Image
            width={768}
            height={500}
            src="/image/image1_1.jpeg"
            alt="post"
            className="mb-4 h-[28rem] w-full rounded-xl object-cover"
          />

          <Card className="mt-8 mb-6 leading-10 text-secondary">
            <CardHeader className="font-bold">아지트를 소개합니다!</CardHeader>
            <Divider />
            <CardBody>
              1. 400종 이상 다양한 장르의 보드게임
              <br />
              2. 영화 상영회, 보드게임 중계 등이 가능한 75인치 TV
              <br />
              3. 글룸헤이븐, 광기의 저택 등 APP 연동 보드게임 플레이를 위한
              태블릿
              <br />
              4. 16인 이상 여유롭게 앉을 수 있는 쾌적한 공간과 인테리어
              <br />
            </CardBody>
          </Card>

          <Image
            width={768}
            height={500}
            src="/image/image1_3.jpeg"
            alt="post"
            className="mb-4 h-[28rem] w-full rounded-xl object-cover"
          />

          <Card className="mt-8 mb-6 text-secondary">
            <CardHeader className="font-bold">
              이런 분이라면? 감보동 지원을 꼭 추천합니다!
            </CardHeader>
            <Divider />
            <CardBody>
              1. 보드게임을 좋아하시는 분 <br />
              2. 새로운 사람들과 동아리 형태로 보드게임을 하고 싶으신 분<br />
              3. 최신 보드게임 소식을 쉽게 전하고 이야기 나누고 싶으신 분<br />
              4. 너무 타이트한 정모/번개 출석 관리가 부담스러우신 분<br />
              + 가끔 시간 나면 들린다는 가벼운 마음가짐으로 동아리 활동을 하고
              싶으신 분 역시 환영입니다!
              <br />
            </CardBody>
          </Card>

          <Image
            width={768}
            height={500}
            src="/image/image1_2.jpeg"
            alt="post"
            className="mb-4 h-[28rem] w-full rounded-xl object-cover"
          />

          <section className="flex flex-col items-center w-full max-w-full py-20 mx-auto">
            <Card>
              <CardBody className="font-bold">이런 활동들을 해요</CardBody>
            </Card>
            <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-3">
              <div className="flex flex-col gap-4">
                <IntroduceCard
                  title="정모"
                  sub_title="매주 토요일"
                  content="정모 매주 토요일마다 운영진이 책임지고 가는 정모가 열립니다. 보드게임 뉴비에서 고인물까지 모두 재밌고 편안하게 보드게임해요!"
                />
                <IntroduceCard
                  title="지니어스 대회"
                  sub_title="예전에 더 지니어스 시리즈를 너무 재밌게 봤었는데, 그곳에서 나온 게임 중 하나인 중간 달리기를 실제로 해볼 수 있어서 너무 좋았습니다!"
                  content="지니어스 대회에 참가한 감보동 3기 회원의 후기입니다."
                  img={
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src="/image/image2_1.jpg"
                      width={768}
                      height={768}
                    />
                  }
                />
                <IntroduceCard
                  title="MT 및 여행"
                  sub_title="보드게임 동아리 MT 및 여행"
                  content="보드게임 동아리 MT 및 여행을 진행합니다."
                  img={
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src="/image/image3_6.png"
                      width={768}
                      height={768}
                    />
                  }
                />
              </div>
              <div className="flex flex-col gap-4">
                <IntroduceCard
                  title="보드게임 행사 참여"
                  sub_title="보드게임페스타, 보드게임콘 등"
                  content="보드게임페스타에 이어 보드게임콘에 참여한 감보동. 이번에는 텅장을 만들지 않고 가겠다고 다짐했지만... 수많은 유로게임과 할인게임의 유혹에 결국 모두 지고 말았습니다... 얼티밋레일로드는 무슨게임인지도 모르고 줄이 길어서 충동구매해버리고... 다른 회원분들도 케메트, 후루요니 등 비싼 게임을 잔뜩 구매해버렸네요. 아지트에 돌아와 몇시간이나 정리. 너무나 보람찬 보드게임 하루 였답니다! 너무 재밌어!"
                  img={
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src="/image/image2_3.jpeg"
                      width={768}
                      height={768}
                    />
                  }
                />
                <IntroduceCard
                  title="보드게임 대회"
                  sub_title="티츄 등 각종 보드게임 대회 개최"
                  content="지니어스 대회, 티츄 대회 등 각종 보드게임 대회를 개최합니다."
                  img={
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src="/image/image3_5.png"
                      width={270}
                    />
                  }
                />
              </div>
              <div className="flex flex-col gap-4">
                <IntroduceCard
                  title="각종 테마파티"
                  sub_title="할로윈, 크리스마스 등"
                  content="지난 호스트의 한마디 : 파티에 적극적으로 참여해준 감보동 멤버들 그리고 지인분들에게 기억에 남는 할로윈이 되었으면 좋겠네요 🎃"
                  img={
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src="/image/image2_2.jpeg"
                      width={270}
                    />
                  }
                />

                <IntroduceCard
                  title="레저 활동"
                  sub_title="스키, 인라인, 소풍 등의 레저 활동"
                  content="보드게임 이외에도 스키, 인라인, 소풍 등의 레저 활동 (및 보드게임은 기본!)"
                  img={
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src="/image/image2_4.png"
                      width={768}
                      height={768}
                    />
                  }
                />
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
