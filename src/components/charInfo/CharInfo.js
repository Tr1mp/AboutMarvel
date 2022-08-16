import { Component } from "react";

import "./charInfo.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props
        if (!charId){
            return;
        }   
        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onCharError)
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false,
        })
    }

    onCharError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;
        
        const skeleton = error || loading || char ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const loadingMessage = loading ? <Spinner/> : null;
        const content = !(error || loading || !char) ? <View char={char}/> : null;
        

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {loadingMessage}
                {content}
            </div>
        )    
    }
}

const View = ({char}) => {
    const {name, thambnail, description, homepage, wiki, comicsList} = char;
    const imgStyle = thambnail.includes("image_not_available") ? {objectFit: "unset"} : null;
    const noComics = (  <li key={"00"}
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
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
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
                                    <a href={item.resourceURI}>{item.name}</a>
                            </li>
                        )
                    })}
                    
                </ul>
        </>
    )
}

export default CharInfo;