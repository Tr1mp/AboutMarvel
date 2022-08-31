import "./spinner.scss";

const Spinner = ({customStyle = null}) => {
    return (
        <div>
            <div className="loadingio-spinner-ellipsis-obk7z8sqeob" style={customStyle}>
                <div className="ldio-crr9gnhcw4b">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner;