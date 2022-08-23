import {useState} from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedCharId, setCharId] = useState(null);
    
    return (
        <div className="app">
            <AppHeader/>
            <main>
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
            </main>
        </div>
    )
}

export default App;