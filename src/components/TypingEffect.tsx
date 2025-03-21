import { useEffect, useRef } from 'react';
import Typed from 'react-typed';

const TypingEffect = () => {
    const typedRef = useRef(null);

    useEffect(() => {
        if (typedRef.current) {
            typedRef.current.el = document.querySelector('.typed-element');
        }
    }, []);

    return (
        <div className="typed-element text-black-500">
            <Typed
                strings={[ "Easy Scheduling...",
                    "Real-time Updates...",
                    "Resource Tracking...",
                    "Automated Reports..."]}
                typeSpeed={70}
                backSpeed={60}
                loop
                ref={typedRef}
            />
        </div>
    );
};

export default TypingEffect;
