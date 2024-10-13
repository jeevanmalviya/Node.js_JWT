
const queries = require("../util/queries")
const db = require('../config/db');

const getTabledata = (async (req,res) =>{

    try{
        if(db.dbType === 1){
            const result = await db.query(queries.getRootMaster);
            console.log('Server time:', result);
            return result;
        }else if(db.dbType === 2){
            const result = await db.query(queries.getStudentDetails);
            return result ;
        }     
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:  "Error occureed in API Root Master"});
    }
});

module.exports={
    getTabledata
}

