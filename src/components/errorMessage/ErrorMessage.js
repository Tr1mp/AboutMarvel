import img from "./errorMessage.gif";
const ErrorMessage = () => {
    return (
        <div>
            <img 
                src={img} 
                alt="Error"  
                style={{display: "block", 
                    width: "350px", height: "200px", 
                    objectFit: "contain", margin: "0 auto", marginTop: "30px"}}/>
        </div>
        
    )
    
}

export default ErrorMessage;