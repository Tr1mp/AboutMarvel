import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [charsEnded, setCharsEnded] = useState(false);

    const {loading, error, getAllCharacters, clearError} = useMarvelService();

    useEffect(() => {
        window.addEventListener('scroll', loadOnScroll);
        return () => window.removeEventListener('scroll', loadOnScroll);
    }, []);
    
    useEffect(() => {
        if (newItemLoading && !charsEnded) {
            onRequest();
        }
    }, [newItemLoading])

    const loadOnScroll = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) {
            setNewItemLoading(true);
        }
    }

    const onRequest = () => {
        clearError();
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList]);
        setOffset(offset + 9);
        setCharsEnded(newCharList.length < 9);
        setNewItemLoading(false);
    }

    const itemsRef = useRef([]);

    const activeItem = (id) => {
        itemsRef.current.forEach(item => item.classList.remove("char__item_selected"));
        itemsRef.current[id].classList.add("char__item_selected");
    }


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const imgStyle = item.thambnail && item.thambnail.includes("image_not_available") ? {objectFit: "unset"} : null;
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

    const loadMore = (  
        <button className="button button__main button__long"
                onClick={() => onRequest()}>
            <div className="inner">Load more</div>
        </button>
    )

    const charsEndedMessage = (
        <h2 className='message_end'> 
            Oops, we couldn't come up with more characters
        </h2>
    )

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const itemsLoading = loading ? <Spinner/>  : loadMore;
    const endMessage = charsEnded ? charsEndedMessage : itemsLoading

    return (
        <div className="char__list">
            {items}
            {errorMessage}
            {endMessage}
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;
