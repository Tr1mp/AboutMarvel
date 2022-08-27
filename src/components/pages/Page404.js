import { Link } from "react-router-dom";

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {

    return (
        <div>
            <ErrorMessage/>
            <p style={{fontWeight: "bold", fontSize: 26, textAlign: "center"}}>
                Sorry,  we haven't come up with the content for this page yet
            </p>
            <Link style={{display: "block", marginTop: 30, fontWeight: "bold", fontSize: 26, textAlign: "center", color: "#9F0013"}} to="/">Back to Main Page</Link>
        </div>
    )
    
    
}

export default Page404;