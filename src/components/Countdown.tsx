import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const targetDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).getTime();
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 py-8">
      <TimeUnit value={timeLeft.days} label="Дней" />
      <span className="text-2xl md:text-4xl font-heading font-bold text-muted-foreground">:</span>
      <TimeUnit value={timeLeft.hours} label="Часов" />
      <span className="text-2xl md:text-4xl font-heading font-bold text-muted-foreground">:</span>
      <TimeUnit value={timeLeft.minutes} label="Минут" />
      <span className="text-2xl md:text-4xl font-heading font-bold text-muted-foreground">:</span>
      <TimeUnit value={timeLeft.seconds} label="Секунд" />
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-secondary rounded-lg p-3 md:p-6 min-w-[60px] md:min-w-[100px]">
      <span className="text-2xl md:text-5xl font-heading font-bold tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
      {label}
    </span>
  </div>
);

export default Countdown;