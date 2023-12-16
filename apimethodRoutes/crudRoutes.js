const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const { ObjectId } = mongoose.Types;
const userSchema = require("../models/Userschema");


router.get('/userlist', async (req, res) => {
    try {
        const userlist = await userSchema.find();
        res.status(200).json({message:"List Fetched SuccessFully",user:userlist});
    } catch (err) {
        res.status(404).json({message:"Error Occured",success: false, err: err.message});
    }
})
router.post('/newuser', async (req, res) => {
    let data = req.body;
    if (!data.name) res.status(404).json({ error: "Name not Found" });
    else if (!data.department) res.status(404).json({ error: "Department not Found" });
    else if (!data.position) res.status(404).json({ error: "Position not Found" });
    else if (!data.salary) res.status(404).json({ error: "Salary not Found" });
    else {
        const newuser = new userSchema(data);
        await newuser.save();
        res.status(201).json({message:"User Created Successfully",user:data});
    }
})

router.put('/updateOradd', async (req, res) => {
    const data = req.body;
  
    if (!data.name || !data.department || !data.position || !data.salary) {
      res.status(400).json({ message: "Fill all the Parameters" });
      return;
    }
  
    try {
      // Use findOneAndUpdate to find and update the document or insert a new one if not found
      const filter = { $or:[{name: data.name}]}  ;
      const update = { $set: { name:data.name,department: data.department,position: data.position,salary: data.salary} };
      const options = { upsert: true, returnDocument: 'after' };
  
      const userData = await userSchema.findOneAndUpdate(filter, update, options);
  
      res.status(200).json({ message: "Success", user: userData });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

router.put('/update/:id',async(req,res)=>{
  const id=req.params.id;
  const data=req.body;
  try {
    const updatedUser = await userSchema.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({message:"User Updated", user:updatedUser});
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/delete/:id',async(req,res)=>{
  const id=req.params.id;
  try{
    const deleteUser=await userSchema.deleteOne({_id:new ObjectId(id)});
    if(deleteUser.deletedCount===1) return res.status(200).json({ message: 'User deleted'});
    else return res.status(404).json({message:"User not Found"});
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Error"});
  }
})
module.exports = router;