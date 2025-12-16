import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

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
    { id:uuidv4(),
      username: "abc", 
      content: "This is the content of the first post." 
    },
    { id:uuidv4(),
      username: "def",
      content: "This is the content of the second post." 
    },
    { id:uuidv4(),
      username: "ghi",
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

app.get('/posts/new',(req,res)=>{
    
    res.render("new.ejs", { posts: posts });
});
app.post('/posts',(req,res)=>{
  console.log('POST /posts received', req.body);
  let {username, content} = req.body;
  let newid=uuidv4();
  posts.push({ username: username, content: content, id: newid });
  res.redirect('/posts');
});
app.get('/posts/:id',(req,res)=>{
   let {id} = req.params;
   let post=posts.find((post) => post.id === id);
   console.log(post);
   res.render("show.ejs",{post});
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});