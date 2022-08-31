import { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../pages";
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
// const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Page404 = lazy(() => import('../pages/Page404'));



const App = () => {
    
    return (
       <Router>
            <div className="app">
                <AppHeader/>
                <main>
                   <Suspense fallback={<Spinner/>}>
                    <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/characters/:id" element={<SinglePage Component={SingleComicLayout} dataType='characters'/>}/>
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comics'/>}/>
                            <Route path="*" element={<Page404/>}/>
                    </Routes>
                   </Suspense>
                </main>
            </div>
       </Router>
    )
}

export default App;