import '../css/index.css'
import './index.html'
const $ = require('jquery');
require('jquery.cookie');
require('select2');
require('select2/dist/css/select2.min.css');
const iziToast = require('izitoast');
require('izitoast/dist/css/iziToast.min.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/js/dist/modal')
const Typed = require('typed.js');
$(document).ready(function () {
    $('#bottom_right_corner_img_click').click(function () {
        console.log('dsf')
    });

     let token = $.cookie('token');
     if (token){
         $.ajax({
             url:'http://192.168.100.15:8080/testToken',
             type:'post',
             data:{
                 token:token
             },

             success:function (respond) {
                 if (respond.message === '成功'){
                     console.log(respond);
                     $('#login_button_loading').css('display','none');
                     $('#login_button_text').css('display','block');
                     $('#login').css('display','none')
                     $('#login_model_username').css('display','block')
                     $('#avatar').attr('src',respond.data.avatar)
                 } else {
                     $.removeCookie('token');
                     iziToast.error({
                         title: respond.message
                     });
                 }
             },
             error:function (respond) {
                 iziToast.error({
                     title: '网络连接失败'
                 })
             }
         })
     }

    let prettyLog = 'sadfsadf我范德萨分';

    new Typed('#typed', {
        strings: ['My strings are: <i>strings</i> with', 'My strings are: <strong>HTML</strong>', 'My strings are: Chars &times; &copy;'],
        typeSpeed: 0,
        backSpeed: 0,
        smartBackspace: true, // this is a default
        loop: true,
        cursorChar: ''
    })

    // 退出登录
    $('#login_out').click(function () {
        $.removeCookie('token')
        location.reload();
    });

    //点击显示登录框
    $('#login').click(function () {
        if ($('#loginContent').css('display') === 'none'){
            $('#loginContent').css('display','block');
        }else {
            $('#loginContent').css('display','none');
        }
    });
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

//获取焦点
    $('.login_input').focus(function () {
        $(this).siblings('label').animate({top:'10px',left:'7.5%',fontSize:'10px'})
    });
//失去焦点
    $('.login_input').blur(function () {
        if ($(this).val() === ''){
            $(this).siblings('label').animate({top:'35px',left:'8.5%',fontSize:'15px'})
        }
    });
    $('.login_label').click(function () {
        $(this).siblings('input').focus()
    });
//输入框监听
    $('#registered_usernameInput').bind('input propertychange',function () {
//用户名恢复
        $('#registered_username_label').css('color','gray');
        $('#registered_username_label').text('请编写您的用户号');
    });
//密码恢复
    $('#registered_password_input').bind('input propertychange',function () {
        $('#registered_password_label').css('color','gray');
        $('#registered_password_label').text('请输入您的密码');
    });
//邮箱恢复
    $('#registered_email_input').bind('input propertychange',function () {
        $('#registered_email_label').css('color','gray');
        $('#registered_email_label').text('请输入您的邮箱');
    });
//再次输入密码恢复
    $('#registered_password_again_input').bind('input propertychange',function () {
        $('#registered_password_again_label').css('color','gray');
        $('#registered_password_again_label').text('请再次输入您的密码');
    });
//登录用户名恢复
    $('#login_input').bind('input propertychange',function () {
        $('#login_username_label').css('color','gray');
        $('#login_username_label').text('输入您的邮箱/用户名');
    });
//登录密码恢复
    $('#login_password_input').bind('input propertychange',function () {
        $('#login_password_label').css('color','gray');
        $('#login_password_label').text('输入您的密码');
    });
//登录用户名判断
    $('#id_login_button').click(function () {
        let isLoginPass = true;
        let loginUsername = $('#login_input').val();
        let loginUsernameReg = new RegExp(/^[0-9a-zA-Z_\-@]{4,12}$/);
        if (loginUsernameReg.test(loginUsername)){
            console.log('登录用户名匹配')
        }else {
            $('#login_username_label').css('color','red');
            $('#login_username_label').text('用户名格式不正确 只能输入4-12位字母 数字 -_@');
            console.log('登录用户名不匹配');
            isLoginPass = false;
        }
//登录密码判断
        let loginPassword = $('#login_password_input').val();
        let loginPasswordReg = new RegExp(/^[0-9a-zA-Z~!@#$%^&*()_+|}{?><,./';:=\[\]\\`-]{6,18}$/);
        if (loginPasswordReg.test(loginPassword)){
            console.log('登录密码匹配')
        }else {
            $('#login_password_label').css('color','red');
            $('#login_password_label').text('用户名或密码不正确');
            console.log('登陆密码不匹配');
            isLoginPass = false;
        }
//登录总判断
        if (isLoginPass){
            $("#login_button_loading").css('display','inline-block');
            $("#login_button_text").css('display','none');
            $.ajax({
                url:'http://192.168.100.15:8080/login',
                type:'post',
                data:{
                    username: loginUsername,
                    password: loginPassword
                },
                success:function (respond) {
                    if (respond.message === '成功'){
                        // console.log(respond);
                        // location.reload();
                        $.cookie('token',respond.data)
                        $("#login_button_loading").css('display','none');
                        $("#login_button_text").css('display','block');
                        iziToast.success({
                            title:'登录成功',
                            // message:''
                        })
                    }else {
                        iziToast.error({
                            title: respond.message
                        })
                    }
                },
                error:function (respond) {
                    $("#login_button_loading").css('display','none');
                    $("#login_button_text").css('display','block');
                    iziToast.error({
                        title: '网络异常请稍后重试'
                    })
                }
            })
        }
    });


//注册判断
//用户名判断
    $('#registered_button').click(function () {
        let isPass = true;
        let username = $('#registered_usernameInput').val();
        let usernameReg = new RegExp(/^[0-9a-zA-Z_\-@]{4,12}$/);
        if (usernameReg.test(username)) {
            console.log('用户名匹配');
        } else {
            //用户名格式不正确 只能输入字母 数组 -_@
            $('#registered_username_label').css('color','red');
            $('#registered_username_label').text('用户名编码格式不正确 只能输入4-12位字母 数字 -_@');
            console.log('用户名不匹配');
            isPass = false;
        }

        //密码判断
        let password = $('#registered_password_input').val();
        let passwordReg = new RegExp(/^[0-9a-zA-Z~!@#$%^&*()_+|}{?><,./';:=\[\]\\`-]{6,18}$/);
        if (passwordReg.test(password)) {
            console.log('密码匹配');
            let rePassword = $('#registered_password_again_input').val();
            if (password !== rePassword){
                $('#registered_password_again_label').css('color','red')
                $('#registered_password_again_label').text('密码输入不一致');
                isPass = false;
            }
        } else {
            //用户名格式不正确 只能输入字母 数组 -_@
            $('#registered_password_label').css('color','red');
            $('#registered_password_label').text('请输入6-18位数字字母英文字符');
            console.log('密码不匹配');
            isPass = false;
        }

        //邮箱判断
        let email = $('#registered_email_input').val();
        let emailReg = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (emailReg.test(email)) {
            console.log('邮箱匹配');
        } else {
            //用户名格式不正确 只能输入字母 数组 -_@
            $('#registered_email_label').css('color','red');
            $('#registered_email_label').text('请输入正确的邮箱格式');
            console.log('邮箱不匹配');
            isPass = false;
        }
//注册总请求
        if (isPass){
            $("#registered_button").attr('disabled',true);
            $("#registered_button_loading").css('display','inline-block');
            $("#registered_button_text").css('display','none');
            $.ajax({
                url:'http://192.168.100.15:8080/user/register',
                type:'post',
                data: {
                    username: username,
                    password: password,
                    email: email
                },
                success: function (respond) {
                    $("#registered_button").attr('disabled',false);
                    $("#registered_button_loading").css('display','none');
                    $("#registered_button_text").css('display','block');
                    if (respond.message ==='成功') {
                        iziToast.success({
                            title:'注册成功'
                        })
                    }else {
                        iziToast.error({
                            title: respond.message
                        })
                    }
                },
                error:function (respond) {
                    $("#registered_button_loading").css('display','none');
                    $("#registered_button_text").css('display','block');
                    $("#registered_button").attr('disabled',false);
                    iziToast.error({
                        title: '网络异常稍后重试'
                    })
                }
            });
        }
    });
    $(".heardText").children('li').children('span').hover(function () {
        $(this).siblings('p').fadeIn(80)
    },function () {
        $(this).siblings('p').fadeOut(80)
    });
    $('#login_model_username').hover(function () {
        $(this).children('ul').fadeIn(80)
    },function () {
        $(this).children('ul').fadeOut(80)
    });
    $('#user_menu').children('li').hover(function () {
        $(this).children('span').css('color','cornflowerblue')
    },function () {
        $(this).children('span').css('color','black')
    })
});