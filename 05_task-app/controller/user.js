const user = require('../models/user');

module.exports.user = async (req, res) => {
    try {
        let data = await user.findOne({ email: req.body.email })
        if(data){
            return res.status(200).json({msg : 'User already registerd', status : 0});
        } else{
            let userData = await user.create(req.body);
            if(userData){
                return res.status(200).json({msg : `User register successfully`, status : 1, UserData : userData});
            }
            else{
                return res.status(200).json({msg : `You can't registered..! Something wrong`, status : 0});
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({msg : 'Something wrong', status : 0});
    }
}