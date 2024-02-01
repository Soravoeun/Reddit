import User from "../models/userModel"

export const inscription = async (req, res) => {
    try {
        const newUser = new User();
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.save();
        console.log("je suis connecté");
        res.json(newUser);
    } catch (error) {
        res.status(404);
        console.error({message: error.message})
    }
}

export const login = async (req, res) => { 
    // const { email, password } = req.body;
    try {
        const user = await User.findOne({email: req.body.email});
        console.log("où suis ?")
        res.json({ message: "Vous êtes connecté" })
    } catch (error) {
        res.status(404);
        console.error({ message: error.message });
    }
}