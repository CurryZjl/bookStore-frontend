import { PREFIX, getJson } from "./common"

export const posters = [
    {
        id: 0,
        name: 'poster1',
        posterPath: "../images/posters/poster1.jpg"
    },
    {
        id: 1,
        name: 'poster2',
        posterPath: "../images/posters/poster2.jpg"
    },
    {
        id: 2,
        name: 'poster3',
        posterPath: "../images/posters/poster3.jpg"
    }
]

export async function getPosterById(_id) {
    const url = `${PREFIX}/poster/${_id}`;
    let poster;
    try {
        poster = await getJson(url);
    } catch (e) {
        console.log(e);
        poster = null;
    }
    return poster;
}

export async function getPosters() {
    const url = `${PREFIX}/poster`;
    let posters;
    try {
        posters = await getJson(url);
    } catch (e) {
        console.log(e);
        posters = {
            total: 0,
            items: []
        };
    }
    return posters;
}