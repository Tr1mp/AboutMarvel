import img from "./errorMessage.gif";
const ErrorMessage = ({cusomStyle = null}) => {
    return (
        <div>
            <img 
                src={img} 
                alt="Error"  
                style={{display: "block", 
                    width: "350px", height: "200px", 
                    objectFit: "contain", margin: "30px auto 0 auto", ...cusomStyle}}/>
        </div>
    )
}

export default ErrorMessage;