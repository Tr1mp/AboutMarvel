import React, {Component} from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
// import GG"../../process.env";
// import Skeleton from "../skeleton/Skeleton";
// import AppBanner from "../appBanner/AppBanner";
// import ComicsList from '../comicsList/ComicsList';
// import SingleComics from '../singleComics/SingleComics';
import decoration from '../../resources/img/vision.png';


// import MarvelService from "../../services/MarvelService";
// const marvelService = new MarvelService();
// marvelService.getAllCharacters().then(res => res.data.results.forEach(char => console.log(char.id)));
// marvelService.getCharacter(1011027).then(res => console.log(res.data.results[0].name));

class App extends Component {
    state = {
        selectedCharId: null,
    }

    onCharSelected = (id) => {
        this.setState({
            selectedCharId: id,
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected}/>
                        <CharInfo charId={this.state.selectedCharId}/>
                    </div>
                    <img src={decoration} alt="vision" className="bg-decoration"/>
                </main>
            </div>
        )
    }
}

export default App;