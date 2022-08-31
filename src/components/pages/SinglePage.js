import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const SingleComicPage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(()=> {
        onRequest();
    }, [id])

    const onRequest = () => {
        clearError();
        const switcher = {
            'comics': () => getComic(id).then(onLoaded),
            'characters': () => getCharacter(id).then(onLoaded)
        }
        switcher[dataType]();
    }
    
    const onLoaded = (data) => {
        setData(data);
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingMessage = loading ? <Spinner/> : null;
    const result = !(error || loading || !data) ? <Component data={data} link={dataType}/> : null;
    return (
        <>
            {result}
            {loadingMessage}
            {errorMessage}
        </>
    )
}


export default SingleComicPage;