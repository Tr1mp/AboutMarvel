import "./singleComics.scss";
import xMen from '../../resources/img/x-men.png';

const SingleComics = () => {
    return (
        <div className="single__comics">
            <img src={xMen} alt="X-Men"/>
            <div className="single__info">
                <h2 className="single__title">X-MAN: Lorem ipsum dolor sit amet</h2>
                <p className="single__descr">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, hic molestias? Inventore voluptatem alias aut ea dolorum magni ex fuga suscipit, assumenda expedita? Necessitatibus earum reiciendis, a assumenda debitis optio asperiores voluptate consequatur inventore! Necessitatibus illum perspiciatis veritatis cum aliquid? Soluta iusto harum consectetur velit in a sapiente dolorum! Repudiandae, voluptates soluta nemo deserunt facilis hic neque ad eius placeat ut incidunt, aliquid quod quisquam culpa dolores necessitatibus! Ut quae nihil nisi sit et quidem recusandae. Deserunt quidem quasi quia natus doloremque eos quam totam veniam. Asperiores enim iusto labore nihil doloremque molestiae ad, est fugiat officiis cumque atque in?</p>
                <p className="single__descr">144 pages</p>
                <p className="single__descr">Language: en-us</p>
                <div className="single__price">$9.90</div>
            </div>
            <a href="#" className="single__btn">Back to all</a>
        </div>
    )
}

export default SingleComics;