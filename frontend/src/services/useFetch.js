import { useState, useRef, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
            try {
                // fetch data from input url
                const response = await fetch(baseUrl + url);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    throw response;
                }
            } catch (e) {
                setError(e);
            } finally {
                // Done loading
                setLoading(false);
            }
        }
        init();
    }, [url]);

    return { data, error, loading };
}
