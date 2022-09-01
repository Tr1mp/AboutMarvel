import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {

    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel.com is the source for Marvel comics, digital comics, and more featuring Iron Man, Spider-Man, Hulk, X-Men and all your favorite superheroes."
                />
                <title>Marvel information portal</title>
            </Helmet>"
            <ErrorMessage/>
            <p style={{fontWeight: "bold", fontSize: 26, textAlign: "center"}}>
                Sorry,  we haven't come up with the content for this page yet
            </p>
            <Link style={{display: "block", marginTop: 30, fontWeight: "bold", fontSize: 26, textAlign: "center", color: "#9F0013"}} to="/">Back to Main Page</Link>
        </div>
    )
}

export default Page404;