const EndedMessage = ({item})=> {
    return (
        <h2 className='message_end'> 
            {`Oops, we couldn't come up with more ${item}`}
        </h2>
    )
}

export default EndedMessage;