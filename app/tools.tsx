import axios from "axios";
import dayjs from "dayjs";

export const elapsedTime = (date: number): string => {
  const start = new Date(date);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) return '방금 전';

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  return `${start.toLocaleDateString()}`;
};

export const roleText = (role: string): string => {
  switch (role) {
    case 'admin':
      return '관리자';
    case 'manager':
      return '운영진';
    case 'member':
      return '회원';
    case 'guest':
      return '게스트';
    default:
      return '';
  }
}

export const pushDiscord = ({ text, isActivateWorkingHour = true }: { text: string, isActivateWorkingHour?: boolean }) => {
  function isWorkingHour() {
    if (!isActivateWorkingHour) return true;
    const now = dayjs().locale('ko'); // 현재 한국 시간 기준으로 가져오기
    const hour = now.hour();

    // 밤 10시부터 아침 9시 사이인지 여부 확인
    if (hour >= 22 || hour < 9) {
      return false;
    } else {
      return true;
    }
  }

  isWorkingHour() && process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL && axios.post(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    content: text
  })

}
