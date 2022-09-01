import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SearchChar from "../searchChar/SearchChar";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();
    
    useEffect(() => updateChar(), [props])

    const updateChar = () => {
        const {charId} = props
        if (!props.charId){
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = error || loading || char ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingMessage = loading ? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={char}/> : null;
    

    return (
        <div className="char__wrapper">
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {loadingMessage}
                {content}
            </div>
            <SearchChar/>
        </div>
        
    )    

}

const View = ({char}) => {
    const {id, name, thambnail, description, homepage, comicsList} = char;
    const imgStyle = (thambnail && thambnail.includes("image_not_available")) ? {objectFit: "unset"} : null;
    const noComics = (<li key={"00"}
                            className="char__comics_item">
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
                        console.log(item.resourceURI.match(/\/\d*/));
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