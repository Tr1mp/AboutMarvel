import { Component } from 'react';

import './charList.scss';
import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onCharListError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
            error: false,
        })
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
        const {charList, loading, error} = this.state;
        
        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const loadingMessage = loading ? <Spinner/> : null;
        
        return (
            <div className="char__list">
                {items}
                {errorMessage}
                {loadingMessage}
                <button className="button button__main button__long">
                    <div className="inner">Load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
