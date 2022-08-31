import { Link } from "react-router-dom";

import "./singleComicLayout.scss";

const SingleComicLayout = ({data, link}) => {
    const {title, thambnail, description, language, pageCount, price, name} = data;
    const imgStyle = thambnail.includes("image_not_available.jpg") ? {objectFit: "unset"} : null
    return (
        <div className="single__comics">
            <img 
                src={thambnail} 
                alt={title || name}
                style={imgStyle}/>
            <div className="single__info">
                <h2 className="single__title">{title || name}</h2>
                <p className="single__descr">{description}</p>
                <p className="single__descr">{pageCount}</p>
                <p className="single__descr">{language}</p>
                <div className="single__price">{price}</div>
            </div>
            <Link to={`/${link}`} className="single__btn">Back to all</Link>
        </div>
    )
}

export default SingleComicLayout;