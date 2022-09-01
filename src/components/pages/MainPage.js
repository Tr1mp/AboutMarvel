import {useState} from 'react';
import {Helmet} from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedCharId, setCharId] = useState(null);
   
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="base-marvel.herokuapp.com is the non-official site of Marvel Entertainment! Browse official Marvel characters and comics."
                />
                <title>Marvel Characters, Super Heroes, & Villains List | Marvel</title>
            </Helmet>
            <ErrorBoundary> 
                    <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={(id) => setCharId(id)}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedCharId}/>
                </ErrorBoundary>
            </div>
            <img src={decoration} alt="vision" className="bg-decoration"/>
        </>
    )
}

export default MainPage;