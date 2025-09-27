import User from "../models/User.js";

const userprofilee = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).send("User not found");

    try {
        // Populate posts array
        let data = await User.findById(id)
            .populate({
                path: "posts",
                options: { sort: { createdAt: -1 } }, // latest posts first
            })
            .populate("followers", "name avatar") // optional: followers info
            .populate("following", "name avatar"); // optional: following info

        if (!data) return res.status(404).send("User not found");

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export default userprofilee;
