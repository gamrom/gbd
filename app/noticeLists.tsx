export const noticeLists: Array<{
  id: number;
  title: string;
  content: string;
  canAccess: boolean;
}> = [
    {
      id: 1,
      title: "아지트 이용공지",
      content: "아지트 위치 : 봉천동 1665-5 308-1호\n아지트 사용 후 책상 정리 및 쓰레기 정리 부탁드려요!",
      canAccess: false,
    },
    {
      id: 3,
      title: "아지트 비밀번호",
      content: "아지트 비밀번호는 999999 입니다.",
      canAccess: false,
    },
    {
      id: 4,
      title: "공간외부대여 문의",
      content: "공간외부대여 문의는 감롬에게 문의주세요. \n동아리 활동에 지장이 가지 않는 선에서 대여하고 있습니다.",
      canAccess: true,
    },
    {
      id: 5,
      title: "웹사이트 이용공지",
      content: "현재 이 웹사이트는 오픈베타 상태로, 자잘한 버그가 굉장히 많습니다. 버그 발견시 바로바로 회장에게 문의주세요. \n디자이너분도 구하고 있습니다🥹 \n동명이인들의 이유로 본인이름뒤에 숫자가 붙을 수도 있습니다.",
      canAccess: true,
    },
    {
      id: 6,
      title: "문의사항",
      content: "문의사항은 인스타그램 : @gamrom_board_club 으로 주세요. \n또는 회장에게 연락주세요.",
      canAccess: true,
    }
  ]