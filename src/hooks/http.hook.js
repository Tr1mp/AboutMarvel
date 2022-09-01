import { useCallback, useState } from "react";

export const useHttp = () => {
    const [action, setAction] = useState('waiting');

    const request = useCallback(async (url, 
                    body = null,
                    method = 'GET', 
                    headers = {'Content-Type': 'application/json'}) => {

        setAction('loading');

        try {
            const response = await fetch(url, {method, body, headers});
        
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();

            return data;

        } catch(e) {
            setAction('error');
            throw e;
        }
    }, [])
    
    const clearError = useCallback(() => setAction('loading'), [])

    return {request, clearError, action, setAction}
}