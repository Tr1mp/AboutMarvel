import { useState, useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";
import SetContent from "../../utils/SetContent";

const RandomChar = () => {
    const [char, setChar] = useState({});
    const {clearError, getCharacter, action, setAction} = useMarvelService();

    useEffect(() => updateChar(), 
        // eslint-disable-next-line
        []);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setAction("loaded"));
    }

    const element = useMemo(() => SetContent(action, View, char),
        // eslint-disable-next-line
        [action])
    return (
        <div className="randomchar">
            {element}
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

const View = ({data}) => {
    const {id, thambnail, name, description, homepage} = data;
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