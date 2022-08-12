

const _url = 'https://gateway.marvel.com:443/v1/public/characters';

class MarvelService {
    
    getResource = async (url) => {
        const res = await fetch(url);
    
        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${_url}?limit=9&offset=210&apikey=${process.env.REACT_APP_API_KEY}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${_url}/${id}?apikey=${process.env.REACT_APP_API_KEY}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.substr(0, 199)}...` : "Sorry, we don't know description for this character",
            thambnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comicsList: char.comics.items
        }
    }
}


// const postData = async (url, data) => {
//     const res = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: data
//     });

//     return await res.json();
// };


// export {postData};
// export {getResource};

export default MarvelService;