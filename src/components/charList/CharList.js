import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const marvelService = new MarvelService();

    const [charList, setCharList] = useState([]);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(marvelService._baseCharOffset);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [charsEnded, setCharsEnded] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', updateCharByScroll);
        return () => window.removeEventListener('scroll', updateCharByScroll);
    }, []);
    
    useEffect(() => {
        if (newItemLoading && !charsEnded) {
            onRequest();
        }
    }, [newItemLoading])

    const updateCharByScroll = () => {
        const pageEnded = (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 50);
        if (pageEnded) {
            setNewItemLoading(true);
        }
    }

    const onRequest = () => {
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onCharListError)
    }

    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList]);
        setError(false);
        setOffset(offset => offset + 9);
        setNewItemLoading(false);
        setCharsEnded(newCharList.length < 9);
    }

    const onCharListError = () => {
        setError(true);
        setNewItemLoading(true);
    }

    const itemsRef = useRef([]);

    const activeItem = (id) => {
        itemsRef.current.forEach(item => item.classList.remove("char__item_selected"));
        itemsRef.current[id].classList.add("char__item_selected");
    }


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const imgStyle = item.thambnail.includes("image_not_available") ? {objectFit: "unset"} : null;
            return (
                <li 
                    ref={el => itemsRef.current[i] = el}
                    key={item.id} 
                    className="char__item"
                    onClick={() => {
                        props.onCharSelected(item.id)
                        activeItem(i);    
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id)
                            activeItem(i);
                        }
                            
                    }}
                    tabIndex="0">
                        <img src={item.thambnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const btnLoad = (  
        <button className="button button__main button__long"
                onClick={() => updateCharByScroll()}>
            <div className="inner">Load more</div>
        </button>
    )

    const charsEndedMessage = (
        <h2 className='char__end_Message'> 
            Oops, we are out of characters
        </h2>
    )
                    
    

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const itemsLoading = (newItemLoading) ? <Spinner/>  : btnLoad;
    const printCharsEndedMessage = charsEnded ? charsEndedMessage : null
    

    return (
        <div className="char__list">
            {items}
            {errorMessage}
            {itemsLoading}
            {printCharsEndedMessage}
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;
