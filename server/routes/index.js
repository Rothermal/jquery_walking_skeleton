/**
 * Created by JFCS on 3/8/16.
 */
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var router = express.Router();


mongoose.connect("mongodb://localhost/basic_walking_skeleton");


var Cat = mongoose.model('Cat', {name:String});

router.post('/add', function(request, response){
    console.log('hit / add cat');
    console.log('sent kitty in request', request.body);

    var kitty = new Cat({name: request.body.name});
    kitty.save(function(err){
        if(err) console.log('meows', err);
        response.send(kitty.toJSON());
    });
});

router.get('/cats', function(request, response){
    console.log('hit / cats');
    return Cat.find({}).exec(function(err, cats){
        if(err) throw new Error(err);
        //console.log(cats);
        response.send(cats);
    });
});

router.get('/',function(request,response){
    console.log('hit index route');
    response.sendFile(path.join(__dirname,'../public/views/index.html'));
});

module.exports = router;