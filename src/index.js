import '../css/index.css'
import './index.html'
const $ = require('jquery');
require('select2');
require('select2/dist/css/select2.min.css');
const iziToast = require('izitoast');
require('izitoast/dist/css/iziToast.min.css');
require('bootstrap/dist/css/bootstrap.min.css');
//泡泡按钮
let animateButton = function(e) {
    e.preventDefault();
    // e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function(){
        e.target.classList.remove('animate');
    },700);
};

let classname = document.getElementsByClassName("login_button");

for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', animateButton, false);
}
//登录切换注册
$('.login_registered_p1').click(function () {
    $("#loginContent").css('display','none')
    $("#registered").css('display','block')
});
//注册切换登录
$('.login_registered_p').click(function () {
    $("#registered").css('display','none')
    $("#loginContent").css('display','block')

});
$('.login_input').focus(function () {
    $(this).siblings('label').animate({top:'10px',left:'7.5%',fontSize:'10px'})
});
$('.login_input').blur(function () {
    $(this).siblings('label').animate({top:'35px',left:'8.5%',fontSize:'15px'})
});
$('.login_label').click(function () {
    $(this).siblings('input').focus()
});