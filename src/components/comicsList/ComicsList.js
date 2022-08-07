import "./comicsList.scss";

import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="Ultimate War" className="comics__item_img"/>
                        <div className="comics__item_name">Lorem ipsum dolor sit amet.</div>
                        <div className="comics__item_price">$9.99 </div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="X-men" className="comics__item_img"/>
                        <div className="comics__item_name">Lorem ipsum dolor sit amet.</div>
                        <div className="comics__item_price">$9.90</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="Ultimate War" className="comics__item_img"/>
                        <div className="comics__item_name">Lorem ipsum dolor sit amet.</div>
                        <div className="comics__item_price">
                            $9.99
                        </div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="Ultimate War" className="comics__item_img"/>
                        <div className="comics__item_name">Lorem ipsum dolor sit amet.</div>
                        <div className="comics__item_price">
                            $9.99
                        </div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="Ultimate War" className="comics__item_img"/>
                        <div className="comics__item_name">Lorem ipsum dolor sit amet.</div>
                        <div className="comics__item_price">
                            $9.99
                        </div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="Ultimate War" className="comics__item_img"/>
                        <div className="comics__item_name">Lorem ipsum dolor sit amet.</div>
                        <div className="comics__item_price">
                            $9.99
                        </div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="Ultimate War" className="comics__item_img"/>
                        <div className="comics__item_name">Lorem ipsum dolor sit amet.</div>
                        <div className="comics__item_price">
                            $9.99
                        </div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="Ultimate War" className="comics__item_img"/>
                        <div className="comics__item_name">Lorem ipsum dolor sit amet.</div>
                        <div className="comics__item_price">
                            $9.99
                        </div>
                    </a>
                </li>
            </ul>
            <a href="#" className="button button__main button__long">
                <div className="inner">Load More</div>
            </a>
        </div>
    )
}

export default ComicsList;