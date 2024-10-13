const getRootMaster = 'SELECT * FROM VKT_TASK_US.tbl_Root_Master';
const getStudentDetails = 'SELECT * FROM student';
const getUserDetails = 'SELECT * FROM users WHERE unm = ?'

module.exports ={
    getRootMaster,
    getStudentDetails,
    getUserDetails
}