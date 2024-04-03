export default function TopSearchBox() {
    return (
        <div className="bg-gray-100 px-8 py-4 flex justify-between mt-3 mb-2 mx-4 w-full">
            <div className="flex w-full">
                <input
                    type="text"
                    placeholder="搜索书本名"
                    className="px-2 py-1 border border-gray-300 rounded w-full"
                />
                <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-sm w-20">
                    <i className="ri-search-line text-white ">搜索</i>
                </button>
            </div>
        </div>
    );
}