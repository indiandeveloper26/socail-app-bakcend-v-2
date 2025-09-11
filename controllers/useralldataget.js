// // 
// // controllers/postController.js

import User from "../models/User.js";

// import User from "../models/User.js";

// const useralldata = async (req, res) => {
//     const { id } = req.body;
//     console.log("User ID:", id);

//     if (!id) {
//         return res.status(400).json({ message: "❌ User ID not found" });
//     }

//     try {
//         let allUserData = await User.findById(id)
//             .populate({
//                 path: "posts", // User schema me jo posts ka reference hai
//                 populate: [
//                     { path: "user", select: "name avatar email" }, // Post ka user info
//                     { path: "comments.user", select: "name avatar" }, // Comment ka user info
//                 ],
//             });

//         if (!allUserData) {
//             return res.status(404).json({ message: "❌ User not found" });
//         }

//         res.json({ data: allUserData });
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         res.status(500).json({ message: "⚠️ Server error" });
//     }
// };

// export default useralldata;














const useralldata = async (req, res) => {
    const { id } = req.body;

    console.log('iddd', id)

    if (!id) {
        return res.status(400).json({ message: "id not found" });
    }

    try {
        let allusedat = await User.findById(id).populate("posts"); // ✅ ab kaam karega
        res.json({ data: allusedat });

        console.log(allusedat)
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export default useralldata