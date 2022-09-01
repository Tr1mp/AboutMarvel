import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import LoadMoreBtn from "../../utils/LoadMoreBtn";
import EndedMessage from "../../utils/EndedMessage";

import "./comicsList.scss";

const setContent = (action, func, item) => {
    const findProcess = {
        'loading': <Spinner/>,
        'loaded': <LoadMoreBtn func={func}/>,
        'error': <ErrorMessage/>,
        'end': <EndedMessage item={item}/>
    }
    return findProcess[action];
}


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {getAllComics, clearError, action, setAction} = useMarvelService();

    useEffect(() => {
        onRequest();
        window.addEventListener("scroll", loadOnScroll);
        return () => window.removeEventListener("scroll", loadOnScroll);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!comicsEnded && newItemLoading) {
            onRequest()
        }
        // eslint-disable-next-line
    }, [newItemLoading]);

    const loadOnScroll = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) {
            setNewItemLoading(true);
        }
    }

    const onRequest = (e = null) => {
        if (e) {
            e.preventDefault();
        }
        clearError();
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(end => end ? setAction('and') : setAction('loaded'));
    }

    const onComicsLoaded = (newComicsList) => {
        setNewItemLoading(false);
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setComicsEnded(newComicsList.length < 8);
        setOffset(offset => !(newComicsList.length < 8) ? offset + 8 : offset);
        return newComicsList.length < 8
    }

    function renderComics(arr) {
        const items = arr.map((item, i) => {
            const imgStyle = item.thambnail && item.thambnail.includes("image_not_available") ? {objectFit: "unset"} : null;
            const editedPrice = item.price && item.price.includes("$") ? item.price : "Not available";
            const editedTitle = item.title.length > 34 ? `${item.title.substr(0, 34)}...` : item.title;
            return (
                <li 
                    key={i}
                    className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thambnail} 
                            alt={item.title} 
                            style={imgStyle}
                            className="comics__item_img"/>
                        <div className="comics__item_name">{editedTitle}</div>
                        <div className="comics__item_price">{editedPrice}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = useMemo(() => renderComics(comicsList),
        // eslint-disable-next-line
        [comicsList]);
    const element = useMemo(() => setContent(action, onRequest, 'comics'),
        // eslint-disable-next-line
        [action]);
    return (
        <div className="comics__list">
            {items}
            {element}
        </div>
    )
}

export default ComicsList;