import { useEffect, useState, useMemo} from "react";
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import SinglePageLayout from "./singlePageLayout/SinglePageLayout";
import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";
import SetContent from "../../utils/SetContent";

const SingleComicPage = ({dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, getCharacter, clearError, action, setAction} = useMarvelService();

    useEffect(()=> {
        onRequest();
        // eslint-disable-next-line
    }, [id])

    const onRequest = () => {
        clearError();
        const switcher = {
            'comics': () => getComic(id).then(onLoaded),
            'characters': () => getCharacter(id).then(onLoaded)
        }
        switcher[dataType]()
            .then(() => setAction('loaded'));
    }
    
    const onLoaded = (data) => {
        setData(data);
    }

    const element = useMemo(() => 
        SetContent(action, SinglePageLayout, data, dataType), 
        // eslint-disable-next-line
        [action]);

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={(data && data.description) || "Error 404: Not Found"}
                />
                <title>{`${(data && data.title) || (data && data.name) || "Error 404: Not Found"} | C${dataType.substr(1)} | Marvel`}</title>
            </Helmet>
            <AppBanner/>
            {element}
        </>
    )
}

export default SingleComicPage;