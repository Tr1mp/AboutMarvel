import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'


import SinglePageLayout from "./singlePageLayout/SinglePageLayout";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SingleComicPage = ({dataType}) => {
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
    const result = !(error || loading || !data) ? <SinglePageLayout data={data} link={dataType}/> : null;
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={data && data.description}
                />
                <title>{`${(data && data.title) || (data && data.name)} | C${dataType.substr(1)} | Marvel`}</title>
            </Helmet>
            <AppBanner/>
            {result}
            {loadingMessage}
            {errorMessage}
        </>
    )
}

export default SingleComicPage;