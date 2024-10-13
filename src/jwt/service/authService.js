
const queries = require("../../util/queries")
const db = require('../../config/db');

const getUserData = (async (req,res) =>{

    try{
        if(db.dbType === 1){
            // const result = await db.query(queries.getRootMaster);
            // console.log('Server time:', result);
            return null;
        }else if(db.dbType === 2){
            const {unm} = req.body;
            const result = await db.query(queries.getUserDetails, [unm])
             
             if (result.length > 0) {
                    return result;
               }
            if(result.length === 0){
                return null;
            }    
        }     
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:  "Error occureed in API Root Master"});
    }
});

module.exports={
    getUserData,
}

