import "./skeleton.scss";

const Skeleton = () => {
    return (
        <>
            <p className="char__select">Please select a chararcter to see information</p>
            <div className="skeleton">
                <div className="pulse skeleton__header">
                    <div className="skeleton__circle"></div>
                    <div className="skeleton__small"></div>
                </div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
            </div>
        </>
    )
}

export default Skeleton;