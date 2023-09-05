const mongose=require("mongoose")

const table=new mongose.Schema({
   user: String,
})

const UserDetails= new mongose.model("UserDetails",table);
module.exports=UserDetails;