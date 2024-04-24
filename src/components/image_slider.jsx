import { getPosterById, getPosters } from "../service/poster";
import { useState, useEffect } from "react";

function Poster({ _id }) {
    const [poster, setPoster] = useState(null);

    const getPoster = async () => {
        let pPoster = await getPosterById(_id);
        setPoster(pPoster);
    }

    useEffect(() => {
        getPoster();
    })


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
    const [posters, setPosters] = useState([]);

    const searchPosters = async () => {
        let pPosters = await getPosters();
        setPosters(pPosters);
    }

    useEffect(() => {
        searchPosters();
    },[])
    function right() {
        setIndex(i => (i + 1) % posters.length);
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
                    <Poster _id={index} />
                    <div className="left" onClick={left} />
                    <div className="right" onClick={right} />
                    <Dots />
                </div>
            }
        </>

    );
}