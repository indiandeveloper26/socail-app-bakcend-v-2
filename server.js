import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';   // ✅ import cors
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
import connectDB from "./db.js"
import follwercount from './routes/follwercount.js';
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
app.use(cors({ origin: "*" }));
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
app.use('/userprofile', useralldataroute)
app.use('/delatepost', deltepostrote);
app.use('/postuserprofile', postuserprofiles);
app.use('/toggleFollow', follwroute);
app.use('/follwercount', follwercount);
app.use(cors());
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);
app.use("/uploads", express.static("uploads")); // ✅ uploaded images accessible


// Health
app.get('/api', (req, res) => {
  res.json({ "data": "v-4" })
})

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



app.post("/userget", async (req, res) => {

  let { id } = req.body

  try {
    let userdat = await User.findById(id)
    res.json(userdat)
  } catch (error) {

  }
})


















app.get("/postapi", async (req, res) => {

  try {
    let data = await Post.find()
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

// Error handlers
// app.use(notFound);
// app.use(errorHandler);



app.get("/apitest", async (req, res) => {
  res.send("this is testapi")
})

app.get("/userapi", async (req, res) => {

  try {
    let data = await User.find()
    res.json({ 'userdata': data })
  } catch (error) {

  }

})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




















