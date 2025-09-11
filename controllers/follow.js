// controllers/postController.js

import User from "../models/User.js";


// ✅ Like / Unlike Post
export const follwscont = async (req, res) => {




    try {
        const { userId, targetUserId } = req.body; // current user + target user
        console.log(userId, targetUserId)
        if (!userId || !targetUserId) {
            return res.status(400).json({ error: "Both user IDs required" });
        }

        // Add follower & following if not already
        await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: userId } });
        await User.findByIdAndUpdate(userId, { $addToSet: { following: targetUserId } });

        const targetUser = await User.findById(targetUserId).select("-password");
        res.json({ followers: targetUser.followers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};



// app.post("/unfollow", async (req, res) => {
//     const { userId, targetUserId } = req.body
//     try {
//         await User.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } })
//         await User.findByIdAndUpdate(userId, { $pull: { following: targetUserId } })
//         const targetUser = await User.findById(targetUserId)
//         res.json({ followers: targetUser.followers })
//     } catch (err) {
//         res.status(500).json({ error: err.message })
//     }
// })
