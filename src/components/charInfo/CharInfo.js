import { useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SetContent from '../../utils/SetContent';
import SearchChar from "../searchChar/SearchChar";
import useMarvelService from "../../services/MarvelService";


import "./charInfo.scss";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {getCharacter, clearError, action, setAction} = useMarvelService();
    
    useEffect(() => updateChar(), 
        // eslint-disable-next-line
        [props])

    const updateChar = () => {
        const {charId} = props
        if (!props.charId){
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setAction('loaded'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const element = useMemo(() => SetContent(action, View, char),
        // eslint-disable-next-line
        [action]);

    return (
        <div className="char__wrapper">
            <div className="char__info">
                {element}
            </div>
            <SearchChar/>
        </div>
    )    
}

const View = ({data}) => {
    const {id, name, thambnail, description, homepage, comicsList} = data;
    const imgStyle = (thambnail && thambnail.includes("image_not_available")) ? {objectFit: "unset"} : null;
    const noComics = (<li key={"00"}
                            className="char__comics_item" style={{padding: '0 10px'}}>
                            Sorry, this character haven't comics. We are already creating story.
                        </li>);
    
    return (
        <>
            <div className="char__basics">
                <img src={thambnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info_name">{name}</div>
                    <div className="char__btns">
                        <Link to={`/characters/${id}`} className="button button__main">
                            <div className="inner">homepage</div>
                        </Link>
                        <a href={homepage} className="button button__secondary">
                            <div className="inner">marvel</div>
                        </a>
                    </div>     
                </div>
            </div>
            <div className="char__descr">
                   {description}
            </div>
            <div className="char__comics">
                    Comics:
                </div>
                <ul className="char__comics_list">
                    {comicsList.length > 0 ? null : noComics}
                    {
                    comicsList.map((item, i)=> {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return(
                            <li 
                                key={i}
                                className="char__comics_item">
                                    <Link to={`/comics/${item.resourceURI.substr(43)}`}>{item.name}</Link>
                            </li>
                        )
                    })}
                    
                </ul>
        </>
    )
}



CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;