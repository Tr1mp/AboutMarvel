import { Component } from "react";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({char,
            loading: false})
    }

    onCharError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    componentDidMount() {
        this.updateChar();
    }
    
    onChooseRandomChar = () => {
        this.setState({
            loading: true,
            error: false
        })
        this.updateChar();
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onCharError)
    }

    render() {  
        const {char, loading, error} = this.state;
        const onError = error ? <Error/> : null;
        const onLoading = loading ? <Spinner/> : null;
        const rndChar = !(error || loading) ? <View char={char}/> : null;
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
                    <button className="button button__main" onClick={this.onChooseRandomChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {thambnail, name, description, homepage, wiki} = char;
    const imgStyle = thambnail.includes("image_not_available") ? {objectFit: "unset"} : null;
    const nameStyle = (name.length > 20) ? {fontSize: "20px"} : null;
    return (
        <div className="randomchar__block">
            <img src={thambnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name" style={nameStyle}>{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">HOMEPAGE</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;