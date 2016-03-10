/**
 * Created by JFCS on 3/8/16.
 */

$(document).ready(function(){
   init();
   enable();
});

function init (){
fetchCats();
}

function enable(){
$('#add-cat-form').on('submit',processForm);
}


function processForm(event){
    event.preventDefault();

    var values = {};
    $.each($('#add-cat-form').serializeArray(), function(i,field){
        values[field.name] = field.value;
    });
    console.log(values);
    $('.newestCat').html(values.name);
    addCat(values);
    $('#add-cat-form').find('input[type=text]').val("");
}





function fetchCats(){
    $.ajax({
        type:'GET',
        url:'/cats',
        success: function(response) {
            console.log(response);
            postCats(response);
        }
    });
}

function addCat(cat){

    console.log(cat);
    $.ajax({
        type:'POST',
        url:'/add',
        data: cat,
        success: function(response) {
            console.log(response);
            fetchCats();
        }
    });
}


function postCats(cats){
   $('.allCats').empty();
    //console.log(cats);
    for (var i = 0; i<cats.length;i++){
        $('.allCats').append("<div></div>");
        var $el = $(".allCats").children().last();
        $el.append('<p>' + cats[i].name + '</p>');

    }
}