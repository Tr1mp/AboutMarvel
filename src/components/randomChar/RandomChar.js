import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../errorMessage/ErrorMessage";

const RandomChar = () => {
    const [char, setChar] = useState({});
    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(() => updateChar(), []);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded);
    }

    const onError = error ? <Error/> : null;
    const onLoading = loading ? <Spinner/> : null;
    const rndChar = !(error || loading || !char) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {onError}
            {onLoading}
            {rndChar}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {id, thambnail, name, description, homepage, wiki} = char;
    const imgStyle = (thambnail && thambnail.includes("image_not_available")) ? {objectFit: "unset"} : null;
    const nameStyle = (name && name.length > 20) ? {fontSize: "20px"} : null;
    const editedDescr = description && description.length > 199 ? `${description.substr(0, 199)}...` : description;
    return (
        <div className="randomchar__block">
            <img 
                src={thambnail} 
                alt="Random character" 
                className="randomchar__img" 
                style={imgStyle}
            />
            <div className="randomchar__info">
                <p 
                    className="randomchar__name" 
                    style={nameStyle}
                >{name}</p>
                <p className="randomchar__descr">
                    {editedDescr}
                </p>
                <div className="randomchar__btns">
                    <Link to={`/characters/${id}`} className="button button__main">
                        <div className="inner">HOMEPAGE</div>
                    </Link>
                    <a href={homepage} className="button button__secondary">
                        <div className="inner">marvel</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;