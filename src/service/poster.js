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
        id : 2,
        name: 'poster3',
        posterPath: "../images/posters/poster3.jpg"
    }
]

export function getPosterById(_id) {
    let result = posters.filter(poster =>
        poster.id === _id);
    if (result[0] != null)
        return result[0];
    else
        return null;
}