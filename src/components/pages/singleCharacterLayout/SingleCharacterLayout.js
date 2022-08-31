import { Link } from "react-router-dom";

import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({data}) => {
    const {name, thambnail, description} = data;
    const imgStyle = thambnail.includes("image_not_available.jpg") ? {objectFit: "unset"} : null
    return (
        <div className="single__char">
            <img 
                src={thambnail} 
                alt={name} 
                style={imgStyle}/>
            <div className="single__info">
                <h2 className="single__name">{name}</h2>
                <p className="single__descr">{description}</p>
            </div>
            <Link to="/comics" className="single__btn">Back to all</Link>
        </div>
    )
}
export default SingleCharacterLayout;