import { useEffect, useState, useRef } from "react";

export function useTypewriter(text: string, speed: number = 30) {

    console.log("UseTypewriter");
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const idx = useRef(0);
    const displayTextRef = useRef("");
    useEffect(() => {
      setTimeout(() => {
        const typingInterval = setInterval(() => {
            if (idx.current < text.length) {
            displayTextRef.current += text.charAt(idx.current);
            setDisplayText(() => displayTextRef.current);
            idx.current += 1;
            } else {
            clearInterval(typingInterval);
            }
        }, speed);
        return () => {
            setDisplayText("");
            clearInterval(typingInterval);
        };
        }, 2000);
    }, [text, speed]);
    return displayText;
}