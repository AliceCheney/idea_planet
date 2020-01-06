import '../css/index.css'
import './index.html'
const $ = require('jquery');
require('jquery.cookie');
require('select2');
require('select2/dist/css/select2.min.css');
const iziToast = require('izitoast');
require('izitoast/dist/css/iziToast.min.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/js/dist/modal');
const Typed = require('typed.js');
let num = 1;
let size = 50;
let loading = false;
$(document).ready(function () {
    getIdeas();
    $(window).scroll(function () {
       let scrollTop = $(this).scrollTop();
       let height = $(document).height();
       let windowHeight = $(this).height();
       if (Math.ceil(scrollTop) + windowHeight === height && !loading){
           getIdeas();
       }
    });
    function getIdeas(){
        loading = true;
        $.ajax({
            url:'http://cshujie.com:6332/idea/getIdeas' ,
            type:'get',
            data:{
                size:size,
                num:num
            },
            success:function (respond) {
                if (respond.data.length === 0){
                    loading = true;
                    iziToast.info({
                        title: '已经没有更多了'
                    });
                    return;
                }
                num += 1;
                for ( let i = 0;i <respond.data.length;i++){
                    if (!respond.data[i].userId){
                        respond.data[i].nikeName = '游客';
                        respond.data[i].avatar = 'data:image/png;base64,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'
                    }
                    let time = i+1;
                    let color;
                    let random = Math.ceil(Math.random()*5);
                    switch (random) {
                        case 1:color= '#ededed';break;
                        case 2:color = 'darkolivegreen';break;
                        case 3:color = '#9faced';break;
                        case 4:color = '#9bed8c';break;
                        case 5:color = '#edacac';break;
                    }
                    let value = '<div class="frame" style="width: 90%;border-radius: 5px;background-color: '+color+';margin: 5% 5%;box-shadow:\n' +
                        '            -6px -6px 8px -4px rgba(250,254,118,0.75),\n' +
                        '            6px -6px 8px -4px rgba(254,159,50,0.75),\n' +
                        '            6px 6px 8px -4px rgba(255,255,0,0.75),\n' +
                        '            6px 6px 8px -4px rgba(0,0,255,2.75); ">\n' +
                        '                <div style="margin: 0;padding: 2%;" class="row">\n' +
                        '                    <img src="'+ respond.data[i].avatar +'" style="border-radius: 50px;height: 50px">\n' +
                        '                    <div>\n' +
                        '                        <p style="color: cornflowerblue;font-weight: bold;margin: 0" >@'+respond.data[i].nikeName+'</p>\n' +
                        '                        <p style="color: grey;font-size: 12px;margin: 0;text-align: center">'+ respond.data[i].createDateStr +'</p>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <hr style="margin: 0">\n' +
                        '                <p style="padding: 3%; word-break: break-all;font-size: 14px;">\n' +
                        respond.data[i].content +
                        '                </p>\n' +
                        '            </div>';
                    switch (time%4) {
                        case 1:$('#idea_row1').append(value);break;
                        case 2:$('#idea_row2').append(value);break;
                        case 3:$('#idea_row3').append(value);break;
                        case 0:$('#idea_row4').append(value);break;
                    }
                }
                loading = false;
            },
            error:function (respond_error) {
                loading = false;
                iziToast.error({
                    title: '网络连接失败'
                });
            }
        });
    }
    $('#bottom_right_corner_img_click').click(function () {
        console.log('dsf')
    });
    $("#send_idea").click(function () {
        $('#send_idea').prop('disabled',true);
        $.ajax({
            url:'http://cshujie.com:6332/idea/sendIdea',
            type:'post',
            beforeSend: function (XMLHttpRequest) {
                let token = $.cookie('token');
                if (token){
                    XMLHttpRequest.setRequestHeader("token", token);
                }
            },
            data:{
                content:$('#idea_content').val()
            },
            success:function (respond) {
                if(respond.message.indexOf('成功') !== -1){
                    iziToast.success({
                        title: '发送成功'
                    });
                    // $('#myModal').modal('hide');
                    // $('#idea_content').val('');
                    // $('#idea_content_count').text('0')
                    location.reload();
                }else {
                    iziToast.error({
                        title: respond.message
                    })
                }
                $('#send_idea').prop('disabled',false);
            },
            error:function (respond_error) {
                iziToast.error({
                    title: '网络连接失败'
                });
                $('#send_idea').prop('disabled',false);
            }
        })
    });
    $("#idea_content").on("input propertychange", function() {
        $('#idea_content_count').text($('#idea_content').val().length)
        if ($('#idea_content').val().length>100){
            $('#idea_content_count_p').css('color','red')
        }else {
            $('#idea_content_count_p').css('color','gray')
        }
    });

    let token = $.cookie('token');
     if (token){
         $.ajax({
             url:'http://cshujie.com:8776/testToken',
             type:'post',
             data:{
                 token:token
             },
             success:function (respond) {
                 if (respond.message === '成功'){
                     console.log(respond);
                     $('#login_button_loading').css('display','none');
                     $('#login_button_text').css('display','block');
                     $('#login').css('display','none');
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
        strings: ['想法星球: 发送你的想法', '想法星球: <strong>分享给别人</strong>', '想法星球: 获得别人慷慨的想法'],
        typeSpeed: 10,
        backSpeed: 10,
        smartBackspace: true, // this is a default
        loop: true,
        cursorChar: ''
    })

    // 退出登录
    $('#login_out').click(function () {
        $.removeCookie('token')
        location.reload();
    });
    //关闭登录框
    $('#login_close').click(function () {
        $('#loginContent').css('display','none');
    });
    //关闭注册框
    $('#reg_close').click(function () {
        $('#registered').css('display','none');
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
                url:'http://cshujie.com:8776/login',
                type:'post',
                data:{
                    username: loginUsername,
                    password: loginPassword
                },
                success:function (respond) {
                    if (respond.message === '成功'){
                        // console.log(respond);
                        location.reload();
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
                        });
                        $("#login_button_loading").css('display','none');
                        $("#login_button_text").css('display','block');
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
                url:'http://cshujie.com:8776/user/register',
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