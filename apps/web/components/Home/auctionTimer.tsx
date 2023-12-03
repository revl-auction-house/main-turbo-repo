import { useCountdown } from '@/hooks/useCountdown';
import React from 'react';

interface AuctionTimerProps {
    start: number;
    end: number;
}

const AuctionTimer: React.FC<AuctionTimerProps> = ({ start, end }) => {
    const { timer, text } = useCountdown({ start, end });
    let timeStamp = timer[4] ? timer[4] : 0
    let totalTime = (end - start)
    const timeProgress = Math.round(((totalTime - timeStamp) / totalTime) * 100);
    return (
        <>
            <div className="cast_timerDiv">
                <div className="relative mb-5 w-fit rounded-2xl border-2 border-[#605D96] overflow-hidden">
                    <div className="absolute  h-full bg-[#605D96] " style={{ width: `${timeProgress}%` }}></div>
                    {text !== "Ended" ? (
                        <p className="relative z-10 m-4 text-base font-medium text-heading">
                            Time left - {timer[0] ? `${timer[0]} D` : "0 D"} : {timer[1] ? `${timer[1]} H` : "0 H"} : {timer[2] ? `${timer[2]} M` : "0 M"}: {timer[3] ? `${timer[3]} S` : "0 S"}
                        </p>
                    ) : (
                        <p className="relative z-10 m-4 text-base font-medium text-heading">
                           Time Ended
                        </p>
                    )
                    }
                </div>
            </div>
        </>
    );
};

export default AuctionTimer;
