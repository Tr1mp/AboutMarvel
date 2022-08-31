import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const _urlChar = 'https://gateway.marvel.com:443/v1/public/characters';
    const _baseCharOffset = 210;
    const _urlComics = 'https://gateway.marvel.com:443/v1/public/comics';
    const _baseComicsOffset = 0;
    const {loading, request, error, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseCharOffset, name = '') => {
        const res = !name ? await request(`${_urlChar}?limit=9&offset=${offset}&apikey=${process.env.REACT_APP_API_KEY}`) : 
        await request(`${_urlChar}?nameStartsWith=${name}&apikey=${process.env.REACT_APP_API_KEY}`);;
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_urlChar}/${id}?apikey=${process.env.REACT_APP_API_KEY}`) 
        return _transformCharacter(res.data.results[0]);
    }
    // console.log(typeof(5))
    // const getCharacterByName = async (name) => {
    //     const res = await request(`${_urlChar}?name=${name}?=apikey=${process.env.REACT_APP_API_KEY}`);
    //     return _transformCharacter(res.data.results[0]);
    // }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description : "Sorry, we have not come up with a description for this character yet",
            thambnail: `${char.thumbnail.path}`.includes("4c002e0305708") ? 
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' :
                `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comicsList: char.comics.items
        }
    }

    const getAllComics = async (offset = _baseComicsOffset) => {
        const res = await request(`${_urlComics}?orderBy=-focDate&limit=8&offset=${offset}&apikey=${process.env.REACT_APP_API_KEY}`);
        return res.data.results.map(_transformComic);
    }

    const getComic = async (id) => {
        const res = await request(`${_urlComics}/${id}?apikey=${process.env.REACT_APP_API_KEY}`);
        return _transformComic(res.data.results[0]);
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description ? comic.description : "Sorry, we have not come up with a description for this comic yet",
            thambnail: `${comic.thumbnail.path}`.includes("4c002e0305708") ? 
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' :
                `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            pageCount: comic.pageCount ? `pages: ${comic.pageCount}` : "Sorry, we have not written a single page yet",
            language: `Language: ${comic.textObjects.language}` || 'Language: en-us',
            price: comic.prices[0].price ? `$${comic.prices[0].price}` : "Sorry, we did not come up with a price tag for a priceless copy",
        }
    }


    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic};
}

export default useMarvelService;