import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleComicPage.scss";



const SingleComicPage = () => {
    const {comicId} = useParams();

    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(()=> {
        onRequest();
    }, [comicId])

    const onRequest = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded);
    }
    
    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingMessage = loading ? <Spinner/> : null;
    const content = !(error || loading || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {loadingMessage}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, thambnail, description, language, pageCount, price} = comic;

    return (
        <div className="single__comics">
            <img src={thambnail} alt={title}/>
            <div className="single__info">
                <h2 className="single__title">{title}</h2>
                <p className="single__descr">{description}</p>
                <p className="single__descr">{pageCount}</p>
                <p className="single__descr">Language: {language}</p>
                <div className="single__price">{price}</div>
            </div>
            <Link to="/comics" className="single__btn">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;