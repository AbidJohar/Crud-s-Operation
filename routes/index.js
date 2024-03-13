var express = require('express');
var router = express.Router();
var userModel = require('./users');

router.get('/index',async function(req, res,) {
  const user = await userModel.find({ })
  res.render('index', {users:user});
});
router.get('/registor', function(req,res){
 res.render('registor');
})
router.get('/', function(req,res){
 res.render('splash');
})
router.get('/delete/:id',async function(req,res){
  const {id} = req.params;
  const deleteUser = await userModel.findByIdAndDelete(
    {_id:id},
  );
  //to check user is deleted or not
  console.log("deleted user:"+id)
  res.redirect("/index");
});
router.get('/edit/:id',async function(req,res){
  const {id} = req.params;
  const user = await userModel.findById({_id:id});

  if(user == null){
    res.redirect("/index");
  }
  else{
    res.render("edit", {user:user})
  }
})
 
router.post("/registor", async function(req,res){

const newuser =  new userModel({
  username: req.body.name,
  email:req.body.email,
  contact: req.body.contact
});
await newuser.save();
res.redirect('/index');
 

})
router.post("/update/:id", async function(req, res) {
   
      const { id } = req.params;

      // Destructuring the username, email, and contact fields from the request body
      const { username, email, contact } = req.body;

      // Finding the user by id and updating its fields
      const updateUser = await userModel.findByIdAndUpdate(
          // The first parameter is the id of the user to be updated
          { _id: id },
          // The second parameter contains the updated fields
          { username, email, contact },
          // The third parameter { new: true } ensures that the updated user is returned
          { new: true }
      );
      console.log(updateUser._id);
      res.redirect("/index");
 
});
 


module.exports = router;
