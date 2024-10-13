
const queries = require("../util/queries")
const db = require('../config/db');
const repo = require("../repo/repositoryLayer");


const getTabledata = (async (req,res) =>{

    try{
        const result = await repo.getTabledata(req, res);
        if(result){
            res.status(200).json({
            resultStatus: "S",
            resultCode: 200,
            resultMessage: "Process Successfull",
            resultContent: result
            });
              }else {
                res.status(500).json({
                  resultStatus: "F",
                  resultCode: 500,
                  resultMessage: "Internal server error",
                  resultContent: []
                });
              } 
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: "Error occureed in db test connection"});
    }
});

module.exports={
    getTabledata,
}

