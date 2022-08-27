import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./comicsList.scss";

import useMarvelService from "../../services/MarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";




const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {loading, error, getAllComics, clearError} = useMarvelService();



    useEffect(() => {
        onRequest()
        window.addEventListener("scroll", loadOnScroll);
        return () => window.removeEventListener("scroll", loadOnScroll);
    }, [])

    useEffect(() => {
        if (!comicsEnded && newItemLoading) {
            onRequest()
        }
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
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (newComicsList) => {
        setNewItemLoading(false);
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setComicsEnded(newComicsList.length < 8);
        setOffset(offset => !(newComicsList.length < 8) ? offset + 8 : offset);

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

    const loadMore = (
        <a href="#" 
            onClick={onRequest} 
            className="button button__main button__long">
                <div className="inner">Load More</div>
        </a>
    )

    const comicsEndedMessage = (
        <h2 className="message_end">
            Oops, we couldn't come up with more comics
        </h2>
    )

    const items = renderComics(comicsList);

    
    const errorMessage = error ? <ErrorMessage/> : null;
    const itemsLoading = loading ? <Spinner/> : loadMore;
    const endMessage = comicsEnded ? comicsEndedMessage : itemsLoading;
    return (
        <div className="comics__list">
            {items}
            {errorMessage}
            {endMessage}
        </div>
    )
}

export default ComicsList;