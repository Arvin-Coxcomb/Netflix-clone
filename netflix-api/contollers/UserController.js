const User = require("../models/Usermodel")

module.exports.addToLikedMovies = async (req, res) => {

    try{
        const {email, data} = req.body;
        const user = await User.findOne({email});
        
        if(user){
            const {likedMovies} = user;
            const movieAlreadyLiked = likedMovies.find(({id}) => id === data.id);
            if(!movieAlreadyLiked){
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data]
                    },
                    {new : true}
                );
            } else return res.json({msg : "Movie already add to the liked list"});
        } else await User.create({email, likedMovies : [data]});
        return res.json({msg : "Movie added successfully"});
    }
    catch(error){
        return res.json({msg : "Error adding movie"});
    }
}

module.exports.getLikedMovies = async(req, res) =>{
    try{
        const {email} = req.params;
        const user = await User.findOne({email});
        if(user){
           return res.json({msg: "Success", movies : user.likedMovies})
        }else return res.json({msg : "User with given email not found"});

    }catch(error){
        res.json({msg: "Error fetching movie"});
    }
}

module.exports.removeFromLikedMovies = async (req, res) =>{
    try{
        const {email,movieId} = req.body;
        const user = await User.findOne({email});
        if(user){
            const movies = user.likedMovies;
            const movieIndex = movies.findIndex(({id}) => id === movieId);

            if(!movieIndex){
                res.status(400).send({msg: "Movie not found"});
            }
            movies.splice(movieIndex,1);
            await User.findByIdAndUpdate(
                user._id,
                {
                likedMovies : movies,
                },
                {new: true}
                )
                return res.json({ msg: "Movie successfully removed.", movies });
        }
        else{
           return res.status(400).json({msg : "User with given mail not found"});
        }
    }
    catch(error){
       return res.json({msg: "Error in removing movie from the liked list"});
    }
}