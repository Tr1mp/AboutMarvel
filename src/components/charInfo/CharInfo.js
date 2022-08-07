import "./charInfo.scss";
import thor from '../../resources/img/thor.jpeg';

function CharInfo() {
    return (
        <div className="char__info">
            <div className="char__basics">
                <img src={thor} alt="thor"/>
                <div>
                    <div className="char__info_name">Thor</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>     
                </div>
            </div>
            <div className="char__descr">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta nemo animi saepe repellat optio nostrum veniam, error repellendus voluptatibus consectetur libero iure voluptate eaque harum dolore quae quis omnis.
            </div>
            <div className="char__comics">
                Comics:
            </div>
            <ul className="char__comics_list">
                <li className="char__comics_item">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li className="char__comics_item">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li className="char__comics_item">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li className="char__comics_item">
                    Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className="char__comics_item">
                    Lorem ipsum dolor sit.
                </li>
                <li className="char__comics_item">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li className="char__comics_item">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li className="char__comics_item">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li className="char__comics_item">
                    Lorem ipsum dolor sit amet consectetur.
                </li>
                <li className="char__comics_item">
                    Lorem ipsum dolor sit.
                </li>
            </ul>
        </div>
    )
}

export default CharInfo;