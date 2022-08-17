import { useEffect, useRef, useState } from "react";

export interface TimerProps {
  agentStatus: string;
}

export const Timer = ({ agentStatus }: TimerProps) => {
  const [count, setCount] = useState(0);
  const timerIdRef = useRef<NodeJS.Timeout | null | number>(null);
  const hour: number = Math.floor(count / 3600);
  const minute: number = Math.floor((count - hour * 3600) / 60);
  const seconds: number = count - (hour * 3600 + minute * 60);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerIdRef.current as NodeJS.Timeout);
  }, [agentStatus]);

  const startTimer = () => {
    setCount(0);
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current as NodeJS.Timeout);
    }
    timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
  };

  return (
    <>
      {hour < 10 ? `${"0"}${hour}` : hour}:
      {minute < 10 ? `${"0"}${minute}` : minute}:
      {seconds < 10 ? `${"0"}${seconds}` : seconds}
    </>
  );
};
