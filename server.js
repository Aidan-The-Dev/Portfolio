const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const fs = require("fs-extra");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("public"));


app.use(session({

    secret: process.env.SESSION_SECRET,

    resave:false,

    saveUninitialized:false

}));


// Admin login

app.post("/api/login",(req,res)=>{

    const {password}=req.body;


    if(password === process.env.ADMIN_PASSWORD){

        req.session.admin=true;

        return res.json({
            success:true
        });

    }


    res.json({
        success:false
    });

});


// Admin check

app.get("/api/admin-check",(req,res)=>{

    res.json({

        authenticated:
        req.session.admin === true

    });

});



// Protect admin page

app.get("/admin",(req,res)=>{


    if(!req.session.admin){

        return res.sendFile(
            __dirname + "/public/login.html"
        );

    }


    res.sendFile(
        __dirname + "/public/admin.html"
    );


});



app.listen(
process.env.PORT,
()=>{

console.log(
`Server running on port ${process.env.PORT}`
);

});

const PROJECT_FILE =
path.join(__dirname,"data/projects.json");


// Get projects

app.get("/api/projects",(req,res)=>{


    const data =
    fs.readJsonSync(PROJECT_FILE);


    res.json(data);


});



// Update projects

app.post("/api/projects",(req,res)=>{


    if(!req.session.admin){

        return res.status(403).json({

            error:"Unauthorized"

        });

    }


    fs.writeJsonSync(
        PROJECT_FILE,
        req.body,
        {
            spaces:2
        }
    );


    res.json({

        success:true

    });


});