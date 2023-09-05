const expres=require("express");
const bodyParser = require('body-parser');
const fs=require("fs")
const app=expres();
app.use(expres.json());
const cors=require("cors")
const PORT=3001;
app.use(cors())
require("../connection/connect")
const UserDetails=require("../Schema/intities")
const postdata=require("../schema/PostForm")
const Comments=require("../schema/Comments")


app.use(bodyParser.json());

app.post('/post', (req, res) => {
  const data= new UserDetails({
    user:req.body.user,
 })
data.save().then((savedData)=>{ res.json(savedData)}).catch((err)=>{console.log(err)});  
});


app.post('/postdata', (req, res) => {
  const datas= new postdata({
    user:req.body.user,
 })
datas.save().then((savedDatas)=>{ res.json(savedDatas)}).catch((err)=>{console.log(err)});  
});


app.post('/comments', (req, res) => {
  const datas= new Comments({
    Postid:req.body.Postid,
    userid:req.body.userid,
    comments:req.body.Comments,
 })
 datas.save().then((savedDatas)=>{ res.json(savedDatas)}).catch((err)=>{console.log(err)});  
});


app.get('/postdata', async (req, res) => {
  try {
    const allPostData = await postdata.find(); // Retrieve all postdata documents

    res.json(allPostData); // Send the data as JSON in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/comments/:userid', async (req, res) => {
  const userid = req.params.userid;
  try {
    const comments = await Comments.find({ userid });
    res.json(comments);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})