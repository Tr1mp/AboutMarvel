import {useState} from 'react';


import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';


import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedCharId, setCharId] = useState(null);
   

    return (
        <>
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