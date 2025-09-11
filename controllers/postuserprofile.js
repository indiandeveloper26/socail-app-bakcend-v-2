import User from "../models/User.js";


const postuserprofilee = async (req, res) => {

    try {
        const { id } = req.body;

        console.log('userid', id)

        if (!id)
            return res.status(400).json({ error: "User ID required" });

        let userdata = await User.findById(id).populate({
            path: "posts",              // posts array ko populate karo

        })

        res.json(userdata)


        console.log(userdata)

    } catch (error) {
        console.log('errror', error)
    }

    // Find user and populate posts array


};

export default postuserprofilee;









// import User from "../models/User.js";





// const postuserprofilee = async (req, res) => {




//     try {
//         let { id } = req.body
//         console.log(id)
//         let uderdata = await User.findById(id)


//         res.json(uderdata)

//         console.log(uderdata)

//     } catch (error) {

//     }


//     // try {
//     //     const { id } = req.body;
//     //     console.log("➡️ userid from body:", id);

//     //     if (!id) return res.status(400).json({ error: "User ID required" });

//     //     // Direct check without populate
//     //     const rawUser = await User.findById(id);
//     //     console.log("➡️ Raw user from DB:", rawUser);

//     //     if (!rawUser) {
//     //         return res.status(404).json({ error: "User not found in DB" });
//     //     }

//     //     // Populate posts if user exists
//     //     const userdata = await User.findById(id).populate("posts");
//     //     res.json(userdata);

//     // } catch (error) {
//     //     console.error("❌ Error in postuserprofile:", error);
//     //     res.status(500).json({ error: "Server error" });
//     // }
// };



// export default postuserprofilee;