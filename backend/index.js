const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: "selvazvin@gmail.com",
    pass: "xnxg lkrx pmwp oihh",
  },
});



app.post("/sendemail", function (req, res) {
    var msg = req.body.msg; 
    var emailList = req.body.emailList;
    new Promise(async function(resolve,reject){
        try
    {
        for(i=0;i<emailList.length;i++)
            {
               await transporter.sendMail(
                    {
                      from: "selvazvin@gmail.com",
                      to: emailList[i],
                      subject: "A message from bulk mail",
                      text: msg
                    }
                  )
                  console.log("Email sent to:"+emailList[i])
            }
            resolve("Success")
    }
    catch(error)
    {
        reject("Failed")
    }
    })
    .then(function()
{
    res.send(true)
})
.catch(function()
{
    res.send(false)
})
    
  });
  
app.listen(5000,function()
{
    console.log("Server Started...")
})

