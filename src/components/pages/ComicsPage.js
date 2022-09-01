import { Helmet } from 'react-helmet';

import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Browse and purchase Marvel digital comics. Subscribe to Marvel Unlimited to access thousands of digital comics for one low price!"
                />
            <title>Marvel Comics | Marvel Comic Books | Marvel</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;