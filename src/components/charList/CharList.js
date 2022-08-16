import { Component } from 'react';

import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    marvelService = new MarvelService();

    state = {
        charList: [],
        loading: true,
        error: false,
        offset: this.marvelService._baseCharOffset,
        newItemLoading: false,
        charsEnded: false
    }

    componentDidMount() {
        this.onRequest();
        window.addEventListener('scroll', this.updateCharByScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateCharByScroll);
    }

    updateCharByScroll = () => {
        const {newItemLoading, charsEnded} = this.state;
        const pageEnded = (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 50);
        if (pageEnded && !newItemLoading && !charsEnded) {
            this.onRequest();
            
        }
    }

    onRequest = () => {
        this.setState({newItemLoading: true})
        this.marvelService.getAllCharacters(this.state.offset)
            .then(this.onCharListLoaded)
            .catch(this.onCharListError)
    }

    onCharListLoaded = (newCharList) => {
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            error: false,
            offset: offset + 9,
            newItemLoading: false,
            charsEnded: newCharList.length < 9,
        }))
    }

    onCharListError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    renderItems(arr) {
        const items = arr.map(item => {
            const imgStyle = item.thambnail.includes("image_not_available") ? {objectFit: "unset"} : null;
            return (
                <li 
                    key={item.id} 
                    className="char__item"
                    onClick={() => this.props.onCharSelected(item.id)}>
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

    render() {
        const {charList, loading, error, newItemLoading, charsEnded} = this.state;
        
        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const loadingMessage = loading ? <Spinner/> : null;
        const itemsLoading = (newItemLoading) ? <Spinner/> : null;
        const charsEndedMessage = charsEnded ? <h2 
                                                style={{
                                                    padding: "40px 185px", 
                                                    fontWeight: "bold", 
                                                    fontSize: 22, 
                                                    lineHeight: "28px"}}> 
                                                    Oops, we are out of characters
                                                    </h2> : null
        

        return (
            <div className="char__list">
                {items}
                {errorMessage}
                {loadingMessage}
                {itemsLoading}
                {charsEndedMessage}
            </div>
        )
    }
}

export default CharList;
