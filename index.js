import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port=8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(methodOverride('_method'));


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

// Edit form
app.get('/posts/:id/edit',(req,res)=>{
  let { id } = req.params;
  let post = posts.find(p => p.id === id);
  if(!post){
    return res.status(404).send('Post not found');
  }
  res.render('edit.ejs', { post });
});

// Update (PUT/PATCH)
app.patch('/posts/:id',(req,res)=>{
  let { id } = req.params;
  let { username, content } = req.body;
  let idx = posts.findIndex(p => p.id === id);
  if(idx === -1){
    return res.status(404).send('Post not found');
  }
  if (username !== undefined) posts[idx].username = username;
  if (content !== undefined) posts[idx].content = content;
  res.redirect('/posts/' + id);
});

// Destroy (DELETE)
app.delete('/posts/:id',(req,res)=>{
  let { id } = req.params;
  let before = posts.length;
  posts = posts.filter(p => p.id !== id);
  if(posts.length === before){
    return res.status(404).send('Post not found');
  }
  res.redirect('/posts');
});
app.patch('/posts/:id',(req,res)=>{
  let {id} = req.params;
  let newcontent = req.body.content;
  let post=posts.find((post) => post.id === id);
  post.content=newcontent;
  console.log(post);
  res.send("Update post");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});