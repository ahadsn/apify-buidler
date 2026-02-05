import { useState, useEffect } from "react";

export function useDeviceType() {
    const [device, setDevice] = useState("pc");

    useEffect(() => {
        if (typeof navigator === "undefined") return; 

        const ua = navigator.userAgent;

        const isTablet = /iPad|Tablet|PlayBook|Silk|Android(?!.*Mobile)/i.test(ua);

       
        const isPhone = /iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|Opera Mini|IEMobile/i.test(ua);

        if (isTablet) {
            setDevice("tablet");
        } else if (isPhone) {
            setDevice("phone");
        } else {
            setDevice("pc");
        }
    }, []);

    return device;
}
