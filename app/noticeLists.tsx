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
      id: 2,
      title: "신규 회원 모집 공지",
      content: "매달 마지막 주, 7일간 모집합니다. \n이때에 회원가입 및 회비 입금 가능합니다! \n기간을 놓치면 다음달을 노려주세요 :)",
      canAccess: true,
    },
    {
      id: 3,
      title: "아지트 비밀번호",
      content: "아지트 비밀번호는 999999 입니다.",
      canAccess: false,
    }
  ]