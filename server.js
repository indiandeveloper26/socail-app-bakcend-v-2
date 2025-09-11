import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';   // ✅ import cors
import connectDB from './db.js'
import routerr from './routes/auth-route.js';
import postroute from './routes/postroutes.js';
import likeroute from './routes/like.js';
import Post from './models/post.js';
import commentrouter from './routes/comment.js';
import Comment from './models/commnet.js';
import useralldataroute from './routes/usergetalldata.js';
import User from './models/User.js';
import deltepostrote from './routes/deleteroute.js';
import postuserprofiles from './routes/postuserprofile.js'
import follwroute from './routes/follw.js';
// import path from 'path';



// import { notFound, errorHandler } from './middleware/errorHandler.js';


dotenv.config();
console.log('enc')

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
connectDB

// DB

// Middlewares
app.use(express.json())
// app.use(helmet());
app.use(cors());
// app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
// if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));


// Static for uploads
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


// Routes
app.use('/api', routerr);
app.use('/post', postroute);
app.use('/like', likeroute);
app.use('/cmt', commentrouter);
app.use('/useralldata', useralldataroute);
app.use('/delatepost', deltepostrote);
app.use('/postuserprofile', postuserprofiles);
app.use('/follw', follwroute);
app.use(cors());
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);
app.use("/uploads", express.static("uploads")); // ✅ uploaded images accessible


// Health
app.get('/api', (_, res) => res.json({ ok: true }));

app.get('/likeget', async (_, res) => {

  try {
    let data = await Post.findById({ _id: "68ac8b7bf27c6b8328dd8f89" })
    res.json(data)
  } catch (error) {
    console.log(error)
  }

});


app.get("/cmt", async (req, res) => {
  try {
    let data = await Comment.find()
    res.json(data)
  } catch (error) {

  }
})



app.get("/userget", async (req, res) => {

  try {
    let userdat = await Post.find()
    res.json(userdat)
  } catch (error) {

  }
})

// Error handlers
// app.use(notFound);
// app.use(errorHandler);



app.get("/apitest", (req, res) => {
  res.send("this is testapi")
})

app.get("/apitest", (req, res) => {
  res.send("this is api rpute")
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




















