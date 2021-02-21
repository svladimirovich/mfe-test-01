import { mount } from 'marketing/Marketing';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function MarketingApp() {

    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({ pathname }) => {
                const { pathname: currentPathname } = history.location;
                if (pathname !== currentPathname) {
                    history.push(pathname);
                }
            },
            initialPath: history.location.pathname,
        });
        history.listen(onParentNavigate);
    }, []);

    return (
        <div ref={ref} />
    );
    
}