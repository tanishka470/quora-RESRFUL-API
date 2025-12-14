import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port=8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    { username: "abc", 
      content: "This is the content of the first post." 
    },
    { username: "def",
      content: "This is the content of the second post." 
    },
    { username: "ghi",
      content: "This is the content of the third post." 
    }
];





app.get('/',(req,res)=>{
    console.log('Request received at root');
    res.render("index.ejs", { posts: posts });
});

app.get('/posts',(req,res)=>{
    console.log('Request received');
    res.render("index.ejs", { posts: posts });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});