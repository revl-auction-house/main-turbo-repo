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
            <div className="relative mb-5 w-fit min-w-[268px] rounded-2xl border-2 border-[#605D96] overflow-hidden">
                <div className="absolute trasnis h-full bg-[#605D96]" style={{ width: `${timeProgress}%` }}></div>
                {text !== "Ended" ? (
                    <p className="flex relative z-10 m-4 text-center text-base font-medium text-heading">
                        Time left -
                        <div className="flex items-center">
                            <h4 className="w-[18px]">{timer[0] !== undefined ? timer[0] : '0'}</h4>
                            <h6>D</h6>
                        </div>
                        <div className="flex items-center pl-[8px]">
                            <h4 className="w-[18px]">{timer[1] !== undefined ? timer[1] : '0'}</h4>
                            <h6 className='ml-1'>H</h6>
                        </div>
                        <div className="flex items-center pl-[8px]">
                            <h4 className="w-[18px]">{timer[2] !== undefined ? timer[2] : '0'}</h4>
                            <h6 className='ml-1'>M</h6>
                        </div>
                        <div className="flex items-center pl-[8px]">
                            <h4 className="w-[18px]">{timer[3] !== undefined ? timer[3] : '0'}</h4>
                            <h6 className='ml-1'>S</h6>
                        </div>
                    </p>
                ) : (
                    <p className="relative z-10 m-4 text-base font-medium text-heading">
                        Time Ended
                    </p>
                )
                }
            </div>
        </>
    );
};

export default AuctionTimer;
