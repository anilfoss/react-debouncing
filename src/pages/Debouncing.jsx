import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const Debouncing = () => {
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);

    const debounceText = useDebounce(searchText, 1000);

    const fetchData = async () => {
        const res = await fetch(
            `https://dummyjson.com/posts/search?q=${debounceText}&limit=5&select=title,body`
        );
        const data = await res.json();
        setData(data.posts);
    };

    useEffect(() => {
        fetchData();
    }, [debounceText]);

    return (
        <>
            <input
                type="text"
                placeholder="search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <small>
                e.g. search with keywords like pink, love, candy, discipline,
                secrets etc.
            </small>

            {data?.length === 0 ? (
                <h4>No result found. Search with other keyword.</h4>
            ) : (
                <>
                    {data?.map((item, index) => {
                        return (
                            <div key={index} className="search-item">
                                <>
                                    <h4>{item.title}</h4>
                                    <p>{item.body}</p>
                                </>
                            </div>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default Debouncing;
