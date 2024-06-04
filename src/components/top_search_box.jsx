import React, {useState} from "react";

export default function TopSearchBox() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if(searchTerm !== '')
        window.location.href =  `/home?pageSize=8&pageIndex=0&query=${searchTerm}`;
        else
        window.location.href =  '/home?pageSize=8&pageIndex=0'
    }

    return (
        <div className="bg-gray-100 px-8 py-4 flex justify-between mt-3 mb-2 mx-4 w-full">
            <div className="flex w-full">
                <input
                    type="text"
                    placeholder="搜索书本名"
                    className="px-2 py-1 border border-gray-300 rounded w-full"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-sm w-20"
                        onClick={handleSearch}
                    >
                    <i className="ri-search-line text-white ">搜索</i>
                </button>
            </div>
        </div>
    );
}