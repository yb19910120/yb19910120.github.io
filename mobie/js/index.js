$(function () {
    conCanvas()
    setTimeout(function () {


        //初始化坐标
        var last = {x:0}//上一次滑动的坐标
        var now = {x:1}//当次滑动的坐标

        //初始化四个方向变量
        var direction = {up:1,right:2,down:3,left:4};
        //初始化是否移动变量
        var ismaveing = false

        //向上滑动
        $('.page').swipeUp(function () {
            if(ismaveing){
                return
            }
            last.x = now.x
            if(last.x<5){

                now.x = last.x + 1
                pageMove(direction.up)
            }

        })
        $('.page').swipeDown(function () {
            if(ismaveing){
                return
            }
            last.x = now.x
            if(last.x>1){
                now.x = last.x - 1
                pageMove(direction.down)
            }
            if($('.page').index()==3){
                $(this).find('li').css('width','0')
                $(this).find('li').css('height','0')
            }

        })
        //控制音乐播放
        $('#music img').on('click',function () {

            if($('#a1')[0].paused){
                $('#a1')[0].play()
                $(this).addClass('musicRotate')
            }else {
                $('#a1')[0].pause()
                $(this).removeClass('musicRotate')
            }
        })
        //滑动的函数
        function pageMove(dir) {
            //初始化两个作用的页面
            var lastpage = '.page-'+last.x
            var nowpage = '.page-'+now.x
            //定义两个进出场的动画类
            var outclass= ''
            var inclass= ''
            switch(dir){
                case 1:
                    outclass = 'pt-page-moveToTop'
                    inclass = 'pt-page-moveFromBottom'
                    break
                case 2:
                    outclass = 'pt-page-moveToRight'
                    inclass = 'pt-page-moveFromLeft'
                    break
                case 3:
                    outclass = 'pt-page-moveToBottom'
                    inclass = 'pt-page-moveFromTop'
                    break
                case 4:
                    outclass = 'pt-page-moveToLeft'
                    inclass = 'pt-page-moveFromRight'
                    break
            }

            $(lastpage).addClass(outclass)
            $(nowpage).removeClass('hide')
            $(nowpage).addClass(inclass)
            ismaveing = true

            //动画执行完清除动画类
            setTimeout(function () {
                $(lastpage).removeClass(outclass)
                $(lastpage).addClass('hide')
                $(lastpage).find('img').addClass('hide')

                $(nowpage).removeClass(inclass)
                $(nowpage).find('img').removeClass('hide')
                ismaveing = false
            },600)
        }

    },300)
    function conCanvas() {
        var canvas = $('#canvas')[0]
        //设置canvas宽高

        canvas.width=($(document).width())
        canvas.height=($(document).height())

        if(canvas.getContext) {
            var ctx = canvas.getContext('2d')
            var img = new Image()
            img.src = 'img/a.png'

            img.onload = function () {
                draw()
            }

            function draw() {
                ctx.drawImage(img,0,0,canvas.width,canvas.height)
                canvas.addEventListener('touchstart',function (ev) {
                    ev = ev || event
                    var touch = ev.changedTouches[0]//得到第一个手指触摸事件
                    var x = touch.clientX - canvas.offsetLeft
                    var y = touch.clientY - canvas.offsetTop


                    ctx.globalCompositeOperation = 'destination-out'
                    ctx.lineWidth = 40
                    ctx.lineCap = 'round'
                    ctx.lineJoin = 'round'
                    ctx.beginPath()
                    ctx.moveTo(x,y)
                    ctx.lineTo(x+1,y+1)
                    ctx.stroke()
                    ctx.restore()
                })

                canvas.addEventListener('touchmove',function (ev) {
                    ev = ev || event
                    var touch = ev.changedTouches[0]//得到第一个手指触摸事件
                    var x = touch.clientX - canvas.offsetLeft
                    var y = touch.clientY - canvas.offsetTop

                    ctx.lineTo(x,y)
                    ctx.stroke()
                    ctx.restore()
                })

                canvas.addEventListener('touchend',function () {
                    var imgdata = ctx.getImageData(0,0,canvas.width,canvas.height)
                    var allpx = imgdata.width * imgdata.height
                    var flag = 0
                    for (var i=0;i<allpx;i++){
                        if (imgdata.data[4*i+3]===0){//计算画布上的透明像素
                            flag++
                        }
                    }
                    if (flag>allpx/2){
                        canvas.style.opacity = 0//布上的透明像素大于画布上的像素1/2时，使其全部透明
                    }
                })

                canvas.addEventListener('transitionend',function () {
                    this.remove()
                    $('.page .ul li').removeClass('hide')
                    $('#a1')[0].play()
                })
            }

        }
    }
})