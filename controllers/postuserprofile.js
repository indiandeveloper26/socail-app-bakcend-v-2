import User from "../models/User.js";


const postuserprofilee = async (req, res) => {

    try {
        const { id } = req.body;

        if (!id)
            return res.status(400).json({ error: "User ID required" });

        let userdata = await User.findById(id).populate({
            path: "posts",              // posts array ko populate karo

        })
        res.json(userdata)

    } catch (error) {

    }

    // Find user and populate posts array


};

export default postuserprofilee;
