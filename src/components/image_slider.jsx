import { useState } from "react";

function Poster({poster}) {
    return (
        <div className="poster z-30">
            {
                poster &&
                <img
                    src={poster.posterPath}
                    className="w-full h-full z-30"
                    alt={poster.name}
                />
            }
        </div>
    );
}



export default function ImageSlider({posters}) {
    const [index, setIndex] = useState(0);

    function right() {
        setIndex(i => (i + 1) % posters.length);
        //console.log(index, posters, posters[index]);
    }
    function left() {
        if (index > 0) {
            setIndex(i => i - 1);
        }
        else {
            setIndex(i => posters.length - 1)
        }
    }

    return (
        <>
            {posters &&
                <div
                    id="slider"
                    className="relative w-3/5 h-96 border-solid border-gray-950 items-center overflow-auto flex"
                >
                    <Poster poster = {posters[index]} />
                    <div className="left" onClick={left} />
                    <div className="right" onClick={right} />
                    {/* <Dots /> */}
                </div>
            }
        </>

    );
}