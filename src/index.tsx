import React, { ElementType, useCallback, useEffect, useState } from 'react';
import useKonami from 'react-use-konami';

type KonamiComponentProps = {
    code?: string[],
    resetOnSuccess: boolean,
};

const withKonami = (
    WrappedComponent: ElementType,
): React.FC<KonamiComponentProps> => ({ code, resetOnSuccess = false, ...props }) => {
    const [ konamiSuccess, setSuccess ] = useState(false);
    const handler = useCallback(() => {
        setSuccess(true);
    }, [konamiSuccess]);

    useEffect(() => {
        if (konamiSuccess && resetOnSuccess) { setSuccess(false); }
    }, [konamiSuccess, resetOnSuccess]);

    useKonami(handler, code && { code });

    return (<WrappedComponent {...props} konamiSuccess={konamiSuccess} />);
};

export default withKonami;
