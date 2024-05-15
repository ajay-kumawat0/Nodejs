const user = require('../models/user');

module.exports.user = async (req, res) => {
    try {
        let data = await user.findOne({ email: req.body.email })
        if(data){
            return res.status(200).json({msg : 'User already registerd', status : 0});
        } else{
            req.body.password = await bcrypt.hash(req.body.password, 10)
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

module.exports.login = async(req,res)=>{
    try {
        let userData = await user.findOne({email : req.body.email});
        if(userData){
            if(await bcrypt.compare(req.body.password, userData.password)){
                let token = await jwt.sign({userData }, 'USER', {expiresIn : '1h'});
                return res.status(200).json({ msg: 'User login successfully', status: 1, Login : userData , Token : token});
            }
            else{
                return res.status(400).json({ msg: 'Incorrect password', status: 0 });
            }
        }
        else{
            return res.status(400).json({ msg: 'Invalid email', status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Something wrong', status: 0 });
    }
}

module.exports.getUser = async(req,res)=>{
    try {
        let userData = await user.find({});
        if(userData){
            return res.status(200).json({msg : 'Record are here', status : 1, UserData : userData});
        }
        else{
            return res.status(200).json({msg : 'Record not found', status : 0});
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({msg : 'Something wrong', status : 0});
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        let data = await user.findById(req.params.id)
        if (data) {
            let updateData = await user.findByIdAndUpdate(req.params.id, req.body);
            console.log(updateData);
            if (updateData) {
                let updated = await user.findById(req.params.id);
                console.log(updated);
                return res.status(200).json({ msg: 'Record updated successfully', status: 0 , updated : updated});
            }
            else {
                return res.status(200).json({ msg: 'Record not update', status: 0 });
            }
        }
        else {
            return res.status(200).json({ msg: 'Record not found', status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ msg: 'Something wrong', status: 0 });
    }
}

module.exports.deleteUser = async(req,res)=>{
    try {
        let data = await user.findById(req.params.id)
        if(data){
            let deleteData = await user.findByIdAndDelete(req.params.id)
            if(deleteData){
                return res.status(200).json({ msg: 'Record delete successfully', status: 1, Delete : data });
            }
            else{
                return res.status(200).json({ msg: 'Record not delete', status: 0 });
            }
        }
        else{
            return res.status(200).json({ msg: 'Record not found', status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ msg: 'Something wrong', status: 0 });
    }
}