const mongose=require("mongoose")

const postdata=new mongose.Schema({
   user: String,
})

const PostData= new mongose.model("postdata",postdata);
module.exports=PostData;