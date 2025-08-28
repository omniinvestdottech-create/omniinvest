import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface CountdownTimerProps {
  endDate: Date;
  onExpire?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate, onExpire, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onExpire?.();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, onExpire]);

  return (
    <div className={`p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-xl ${className}`}>
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Zap className="h-6 w-6 text-red-400 animate-pulse" />
          <h3 className="text-xl font-bold text-red-400">⚡ FOUNDER'S PRICING ENDS IN:</h3>
        </div>
        <p className="text-red-300/80">Don't miss your chance to get lifetime access at 75% off!</p>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-black/30 rounded-lg border border-red-400/30">
          <div className="text-3xl font-bold text-white font-orbitron">{timeLeft.days}</div>
          <div className="text-sm text-red-400 font-medium">DAYS</div>
        </div>
        <div className="text-center p-4 bg-black/30 rounded-lg border border-red-400/30">
          <div className="text-3xl font-bold text-white font-orbitron">{timeLeft.hours}</div>
          <div className="text-sm text-red-400 font-medium">HOURS</div>
        </div>
        <div className="text-center p-4 bg-black/30 rounded-lg border border-red-400/30">
          <div className="text-3xl font-bold text-white font-orbitron">{timeLeft.minutes}</div>
          <div className="text-sm text-red-400 font-medium">MINS</div>
        </div>
        <div className="text-center p-4 bg-black/30 rounded-lg border border-red-400/30">
          <div className="text-3xl font-bold text-white font-orbitron animate-pulse">{timeLeft.seconds}</div>
          <div className="text-sm text-red-400 font-medium">SECS</div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-red-300/80 mb-4">
          After the timer expires, prices return to regular monthly billing
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="text-gray-400">Regular Price: $99/month</span>
          <span className="text-red-400">•</span>
          <span className="text-green-400 font-bold">Founder's Price: $299 lifetime</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;