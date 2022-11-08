var express = require('express');
var router = express.Router();
var messagebird=require('messagebird')('SgjjkZPOy4q8QiJxvqLrVmn48')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/step-2',function(req,res,next){
 console.log(req.body.number)
  let number=req.body.number;
  messagebird.verify.create(number,{
    template:"Your verification code is %token"
  },function(error,responce){
    if(error){
      console.log(error)
      res.send(error)
    }
    else{
      console.log(responce);
      res.render('otp',{
        id:responce.id
      })

    }

  });
});
router.post('/step3',function(req,res,next){
  let id=req.body.id;
  let token=req.body.token;
  messagebird.verify.verify(id,token,function(error,responce){
    if(error){
      res.send(error)
    }
    else{
      res.render('success')
    }
  });

});






module.exports = router;
