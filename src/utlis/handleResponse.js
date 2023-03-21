exports.success= function({req, res, dataResponse,message, status}){
    res.status(status || 200).json({
        body:dataResponse,
        message:message
    });
};

exports.error=({res, errorMessage, status, detailsError})=>{

    console.error("response error", detailsError)//internal use message
    res.status(status || 500).send({
        error:errorMessage
    });
}