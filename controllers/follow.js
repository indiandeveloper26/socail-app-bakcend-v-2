// // controllers/postController.js

// import User from "../models/User.js";


// // ✅ Like / Unlike Post
// export const follwscont = async (req, res) => {




//     try {
//         const { userId, targetUserId } = req.body; // current user + target user
//         console.log(userId, targetUserId)
//         if (!userId || !targetUserId) {
//             return res.status(400).json({ error: "Both user IDs required" });
//         }

//         // Add follower & following if not already
//         await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: userId } });
//         await User.findByIdAndUpdate(userId, { $addToSet: { following: targetUserId } });

//         const targetUser = await User.findById(targetUserId).select("-password");
//         res.json({ followers: targetUser.followers });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Server error" });
//     }
// };
















import User from "../models/User.js";

// ✅ Follow / Unfollow Controller
const toggleFollow = async (req, res) => {
    try {
        const { userId, targetUserId } = req.body; // current user + target user
        if (!userId || !targetUserId) {
            return res.status(400).json({ error: "Both user IDs required" });
        }

        const targetUser = await User.findById(targetUserId);
        const currentUser = await User.findById(userId);

        if (!targetUser || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        let action = "";

        if (targetUser.followers.includes(userId)) {
            // ✅ Already following → Unfollow
            targetUser.followers = targetUser.followers.filter(id => id !== userId);
            currentUser.following = currentUser.following.filter(id => id !== targetUserId);
            action = "unfollow";
        } else {
            // ✅ Not following → Follow
            targetUser.followers.push(userId);
            currentUser.following.push(targetUserId);
            action = "follow";
        }

        await targetUser.save();
        await currentUser.save();

        res.json({
            action,
            followers: targetUser.followers,
            following: currentUser.following
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};


export default toggleFollow