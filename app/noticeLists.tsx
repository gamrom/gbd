export const noticeLists: Array<{
  id: number;
  title: string;
  content: string;
  canAccess: boolean;
}> = [
    {
      id: 1,
      title: "아지트 관련 공지사항",
      content: "아지트 위치 : ~~~, 아지트 비밀번호 : ~~~",
      canAccess: false,
    },
    {
      id: 2,
      title: "신규 회원 모집 공지",
      content: "매달 말 5일간, 회비~~~",
      canAccess: true,
    }
  ]