import User from "../models/User.js"

// ✅ Like / Unlike Post
const follwercountt = async (req, res) => {




    try {
        const { userid } = req.body; // user jiske following chahiye

        if (!userid) return res.status(400).json({ error: "User ID required" });

        const user = await User.findById(userid).populate("following", "name avatar");

        if (!user) return res.status(404).json({ error: "User not found" });

        // user.following array me populate ke wajah se { _id, name, avatar } milega
        res.json({ following: user.following });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }

};


export default follwercountt