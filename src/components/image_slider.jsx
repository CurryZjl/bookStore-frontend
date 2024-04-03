import { getPosterById, posters } from "../service/poster";
import { useState } from "react";

function Poster({ _id }) {
    let poster = getPosterById(_id)
    return (
        <div id={poster.id} className="poster z-30">
            <img
                src={poster.posterPath}
                className="w-full h-full z-30"
                alt={poster.name}
            />
        </div>
    );
}

function Dots() {
    return (
        <div className="dots">
            <div className="dot a1"></div>
            <div className="dot a2"></div>
            <div className="dot a3"></div>
        </div>
    );
}


export default function ImageSlider() {
    const [index, setIndex] = useState(0);
    const length = posters.length;


    function right() {
        setIndex(i => (i + 1) % length);
    }
    function left() {
        if (index > 0) {
            setIndex(i => i - 1);
        }
        else {
            setIndex(i => length - 1)
        }
    }

    return (
        <div
            id="slider"
            className="relative w-3/5 h-96 border-solid border-gray-950 items-center overflow-auto flex"
        >
            <Poster _id={index} />
            <div className="left" onClick={left} />
            <div className="right" onClick={right} />
            <Dots />
        </div>
    );
}