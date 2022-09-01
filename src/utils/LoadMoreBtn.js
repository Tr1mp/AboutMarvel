const LoadMoreBtn = ({func}) => {
    return(
        <button className="button button__main button__long"
                onClick={() => func()}>
            <div className="inner">Load more</div>
        </button>
    )
} 
    


export default LoadMoreBtn;