import { useEffect, useState } from 'react';

interface timeStampProps {
    start: number;
    end: number;
}

const useCountdown = ({ start, end }: timeStampProps) => {
    const [countDown, setCountDown] = useState<number>(0); // Initialize with 0 or initial countdown value
    const [text, setText] = useState<string>(''); // Initialize with an empty string or initial text value

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            if (start > currentTime) {
                setCountDown(start - currentTime);
                setText("Start in");
            } else if (end > currentTime) {
                setCountDown(end - currentTime);
                setText("Ends in");
            } else {
                setText('Ended');
                clearInterval(interval); // Clear interval when the countdown ends
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [start, end]);

    const timer = getReturnValues(countDown);

    return { timer, text };
};

const getReturnValues = (timeStamp: number) => {
    // calculate time left
    const days = Math.floor(timeStamp / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeStamp % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeStamp % (1000 * 60)) / 1000);     
    return [days, hours, minutes, seconds, timeStamp];
};

export { useCountdown };
