import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import LoadMoreBtn from '../../utils/LoadMoreBtn'
import EndedMessage from '../../utils/EndedMessage';

import './charList.scss';


const setContent = (action, func, item) => {
    const findProcess = {
        'loading': <Spinner/>,
        'loaded': <LoadMoreBtn func={func}/>,
        'error': <ErrorMessage/>,
        'end': <EndedMessage item={item}/>
    }
    return findProcess[action];
}

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [charsEnded, setCharsEnded] = useState(false);

    const {getAllCharacters, clearError, action, setAction} = useMarvelService();

    useEffect(() => {
        onRequest();
        window.addEventListener('scroll', loadOnScroll);
        return () => window.removeEventListener('scroll', loadOnScroll);
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        if (newItemLoading && !charsEnded) {
            onRequest();
        }
        // eslint-disable-next-line
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
            .then(end => end ? setAction('end') : setAction('loaded'));
    }

    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList]);
        setOffset(offset + 9);
        setCharsEnded(newCharList.length < 9);
        setNewItemLoading(false);
        return newCharList.length < 9;
    }

    const itemsRef = useRef([]);

    const activeItem = (id) => {
        itemsRef.current.forEach(item => item.classList.remove("char__item_selected"));
        itemsRef.current[id].classList.add("char__item_selected");
    }


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const imgStyle = item.thambnail && item.thambnail.includes("image_not_available") ?
                {objectFit: "unset"} : null;
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

    const items = useMemo(() => renderItems(charList), 
        // eslint-disable-next-line
        [charList]);
    const element = useMemo(() => setContent(action, onRequest, 'characters'),
        // eslint-disable-next-line
        [action]);

    return (
        <div className="char__list">
            {items}
            {element}
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;
