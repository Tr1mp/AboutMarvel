import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Page404 = lazy(() => import('../pages/Page404'));

const App = () => {
    
    return (
       <Router>
            <Helmet>
                <meta
                    name="description"
                    content="base-marvel.herokuapp.com is the non-official site of Marvel Entertainment! Browse official Marvel characters and comics."
                />
                <title>Marvel information portal</title>
            </Helmet>
            <div className="app">
                <AppHeader/>
                <main>
                   <Suspense fallback={<Spinner/>}>
                    <Routes>
                            <Route path="/" element={<Navigate to="/characters" replace/>}/>
                            <Route path="/characters" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/characters/:id" element={<SinglePage dataType='characters'/>}/>
                            <Route path="/comics/:id" element={<SinglePage dataType='comics'/>}/>
                            <Route path="*" element={<Page404/>}/>
                    </Routes>
                   </Suspense>
                </main>
            </div>
       </Router>
    )
}

export default App;