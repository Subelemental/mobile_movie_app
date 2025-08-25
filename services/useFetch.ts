import { useState, useEffect } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch]);

    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;


