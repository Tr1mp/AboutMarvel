import React, { Component }  from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
// import Skeleton from "../skeleton/Skeleton";
// import AppBanner from "../appBanner/AppBanner";
// import ComicsList from '../comicsList/ComicsList';
// import SingleComics from '../singleComics/SingleComics';

import decoration from '../../resources/img/vision.png';

const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                {/* <AppBanner/> */}
                {/* <SingleComics/> */}
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img src={decoration} alt="vision" className="bg-decoration"/>
            </main>
        </div>
    )
}

export default App;