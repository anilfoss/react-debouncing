import { useEffect, useState } from "react";

const useDebounce = (searchText, delay = 1000) => {
    const [debounceText, setDebounceText] = useState(searchText);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceText(searchText);
        }, delay);

        return () => clearTimeout(timer);
    }, [searchText, delay]);

    return debounceText;
};

export default useDebounce;
