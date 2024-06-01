"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export const useRemainJoinTime = () => {
  const [canJoin, setCanJoin] = useState<boolean>(false);
  const [countdown, setCountdown] = useState("");
  useEffect(() => {
    const today = dayjs();
    const last7th = dayjs().endOf("month").subtract(14, "day");

    if (today.isBefore(last7th)) {
      setCanJoin(false);
      const timer = setInterval(() => {
        const remainingTime = last7th.diff(dayjs(), "second");

        if (remainingTime <= 0) {
          clearInterval(timer);
        } else {
          const days = Math.floor(remainingTime / (60 * 60 * 24));
          const hours = Math.floor(
            (remainingTime % (60 * 60 * 24)) / (60 * 60)
          );
          const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
          const seconds = remainingTime % 60;

          setCountdown(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanJoin(true);
    }
  }, []);

  return { countdown, canJoin };
};
