(function () {
    var $li = $('.nav_list > li')
    var $firstli = $('.nav_list > li:first')
    var $arrow = $('.arrow:first')
    var $allup = $('.up')
    var $firstup = $('.up:first')
     var index1= 0//记录当前在第几屏
    var timer = 0
    var timer3D = 0
    var contentid = document.getElementById('content')
    var prevP=0//上一屏
     haed()
    content()

    picBoom()
    bubble()
    musicContorl()
    loadingAn()
     //开机动画功能
    function loadingAn() {
        var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png']
        var flag = 0
        for (var i=0;i<arr.length;i++){
            var img = new Image()
            img.src = 'img/'+arr[i]
            img.onload = function () {
                flag++
                $('.line')[0].style.width = flag/arr.length*100+'%'
            }
        }
        $('.line')[0].addEventListener('transitionend',function () {
            if(flag==arr.length){
                $('#mask div').css('height','0px')
                this.style.display = 'none'
            }
        })
        $('#mask div')[0].addEventListener('transitionend',function () {
            $("#mask")[0].remove()
            $('audio')[0].play()
            home3d()
        })
    }
     //背景音乐控制
     function musicContorl() {
         $('.music:first').click(function () {
             if($('audio')[0].paused){
                 $('audio')[0].play()
                 this.style.background = "url(img/musicon.gif) no-repeat"
             }else {
                 $('audio')[0].pause()
                this.style.background = "url(img/musicoff.gif) no-repeat"
             }
         })
     }
    //出入场动画
    var arr = [
        {
            inAn:function () {
                $('.home1')[0].style.transform = "translateY(0px)"
                $('.home2')[0].style.transform = "translateY(0px)"
                $('.home1')[0].style.opacity = 1
                $('.home2')[0].style.opacity = 1
            },
            outAn:function () {
              $('.home1')[0].style.transform = "translateY(-400px)"
              $('.home2')[0].style.transform = "translateY(100px)"
                $('.home1')[0].style.opacity = 0
                $('.home2')[0].style.opacity = 0
            }
        },
        {
            inAn:function () {
                $('.plane1')[0].style.transform = "translate(0px,-0px)";
                $('.plane2')[0].style.transform = "translate(0px,0px)";
                $('.plane3')[0].style.transform = "translate(0px,0px)";
            },
            outAn:function () {
                $('.plane1')[0].style.transform = "translate(-200px,-200px)";
                $('.plane2')[0].style.transform = "translate(-200px,200px)";
                $('.plane3')[0].style.transform = "translate(200px,-200px)";
            }
        },
        {
            inAn:function () {
                $('.pencel1')[0].style.transform = "translateY(0px)";
                $('.pencel2')[0].style.transform = "translateY(0px)";
                $('.pencel3')[0].style.transform = "translateY(0px)";
            },
            outAn:function () {
                $('.pencel1')[0].style.transform = "translateY(-100px)";
                $('.pencel2')[0].style.transform = "translateY(100px)";
                $('.pencel3')[0].style.transform = "translateY(100px)";
            }
        },
        {
            inAn:function () {
                $('.about3 > .item')[0].style.transform = "rotate(0deg)";
                $('.about3 > .item')[1].style.transform = "rotate(0deg)";
            },
            outAn:function () {
                $('.about3 > .item')[0].style.transform = "rotate(45deg)";
                $('.about3 > .item')[1].style.transform = "rotate(-45deg)";
            }
        },
        {
            inAn:function () {
                $('.team1')[0].style.transform = "translateX(0px)";
                $('.team2')[0].style.transform = "translateX(0px)";
            },
            outAn:function () {
                $('.team1')[0].style.transform = "translateX(-200px)";
                $('.team2')[0].style.transform = "translateX(200px)";
            }
        }
    ]
    for (var i=0;i<arr.length;i++){
        arr[i].outAn()
    }
    setTimeout(function(){
        arr[0].inAn();
    },2000)

    //第五屏气泡功能
    function bubble() {
        var canvas = ''
        var timer1=0
        var timer2=0
        $('.team3 > ul > li').mouseenter(function () {
                   for(var i = 0;i<$('.team3 > ul > li').length;i++){
                       $('.team3 > ul > li')[i].style.opacity = .2
                   }
                   this.style.opacity = 1

            addCanvas()
            canvas.style.left = $('.team3 > ul > li')[0].offsetWidth*$(this).index() +'px'
        })
        function addCanvas() {
            if(!canvas){
                $('.team3').append('<canvas></canvas>')
                canvas = $('canvas')[0]
                canvas.width = $('.team3 > ul > li')[0].offsetWidth
                canvas.height = $('.team3 > ul > li')[0].offsetHeight


                $('.team3')[0].onmouseleave = function () {
                    for(var i = 0;i<$('.team3 > ul > li').length;i++){
                        $('.team3 > ul > li')[i].style.opacity = 1
                    }
                    removeCanvas()
                }
                QiPao()
            }
        }

        function QiPao(){
            if(canvas.getContext){
                var ctx = canvas.getContext("2d");
                var arr=[];
                //将数组中的圆绘制到画布上
                timer1=setInterval(function(){
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    //动画
                    for(var i=0;i<arr.length;i++){
                        arr[i].deg+=10;
                        arr[i].x = arr[i].startX +  Math.sin( arr[i].deg*Math.PI/180 )*arr[i].step*2;
                        arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step ;

                        if(arr[i].y <=50){
                            arr.splice(i,1)
                        }
                    }
                    //绘制
                    for(var i=0;i<arr.length;i++){
                        ctx.save();
                        ctx.fillStyle="rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].alp+")";
                        ctx.beginPath();
                        ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
                        ctx.fill();
                        ctx.restore();
                    }
                },1000/60)

                //往arr中注入随机圆的信息
                timer2=setInterval(function(){
                    var r =Math.random()*6+2;
                    var x = Math.random()*canvas.width;
                    var y = canvas.height - r;
                    var red =   Math.round(Math.random()*255);
                    var green = Math.round(Math.random()*255);
                    var blue =  Math.round(Math.random()*255);
                    var alp = 1;


                    var deg =0;
                    var startX = x;
                    var startY = y;
                    //曲线的运动形式
                    var step =Math.random()*20+10;
                    arr.push({
                        x:x,
                        y:y,
                        r:r,
                        red:red,
                        green:green,
                        blue:blue,
                        alp:alp,
                        deg:deg,
                        startX:startX,
                        startY:startY,
                        step:step
                    })
                },50)
            }
        }

        function removeCanvas() {
            canvas.remove()
            canvas = null
            clearInterval(timer1)
            clearInterval(timer2)
        }

    }
    //第四屏图片炸裂功能
    function picBoom() {

        var str = ''
        for (var i=0;i<4;i++){
            str+='<li><img/></li>'
        }
        $('.item > ul').append(str)
        $('.item > ul > li').css('width',''+$('.item > ul').width()/2+'px')
        $('.item > ul > li').css('height',''+$('.item > ul').height()/2+'px')
        $('.item > ul > li:lt(4) img').attr('src',''+$('.item > ul')[0].dataset.src+'')
        $('.item > ul > li:gt(3) img').attr('src',''+$('.item > ul')[1].dataset.src+'')
        /*
						1. left:0    top:0
						2. left:-w   top:0
						3. left:0    top:-h
						4. left:-w   top:-h
						*/
        for (var i=0;i<4;i++){
            $('.item > ul > li:lt(4) img')[i].style.left = -(i%2)*$('.item > ul').width()/2+"px"
            $('.item > ul > li:lt(4) img')[i].style.top = -Math.floor(i/2)*$('.item > ul').height()/2+"px"
            $('.item > ul > li:gt(3) img')[i].style.left = -(i%2)*$('.item > ul').width()/2+"px"
            $('.item > ul > li:gt(3) img')[i].style.top = -Math.floor(i/2)*$('.item > ul').height()/2+"px"
        }
        /*
			1. left:0    top:0
			2. left:-w   top:0
			3. left:0    top:-h
			4. left:-w   top:-h
		*/
        /*
         1. left:0    top:h
         2. left:-2w   top:0
         3. left:w    top:-h
         4. left:-w   top:-2h
         */

        $('.item > ul:lt(1)').mouseenter(function () {
            $('.item > ul > li:lt(4)  img')[0].style.top = $('.item > ul').height()+'px'
            $('.item > ul > li:lt(4)  img')[1].style.left = -$('.item > ul').width()+'px'
            $('.item > ul > li:lt(4) img')[2].style.left = $('.item > ul').width()/2+'px'
            $('.item > ul > li:lt(4) img')[3].style.top = -$('.item > ul').height()+'px'
        })
        $('.item > ul:gt(0)').mouseenter(function () {
            $('.item > ul > li:gt(3)  img')[0].style.top = $('.item > ul').height()+'px'
            $('.item > ul > li:gt(3)  img')[1].style.left = -$('.item > ul').width()+'px'
            $('.item > ul > li:gt(3) img')[2].style.left = $('.item > ul').width()/2+'px'
            $('.item > ul > li:gt(3) img')[3].style.top = -$('.item > ul').height()+'px'
        })
        $('.item > ul').mouseleave(function () {
            for (var i=0;i<4;i++){
                $('.item > ul > li:lt(4) img')[i].style.left = -(i%2)*$('.item > ul').width()/2+"px"
                $('.item > ul > li:lt(4) img')[i].style.top = -Math.floor(i/2)*$('.item > ul').height()/2+"px"
                $('.item > ul > li:gt(3) img')[i].style.left = -(i%2)*$('.item > ul').width()/2+"px"
                $('.item > ul > li:gt(3) img')[i].style.top = -Math.floor(i/2)*$('.item > ul').height()/2+"px"
            }
        })
    }

    //第一屏3d效果功能
    var oldIndex = 0
    var aotuIndex = 0
    //home3d()
     function home3d() {

         $('.home2 li').click(function () {
             clearInterval(timer3D)
             for (var i = 0 ;i<$('.home2 li').length;i++){
                 $('.home2 li')[i].classList.remove('active')
             }
             $(this).addClass('active')
             //从左往右  当前索引大于上一次索引  rightShow
             if($(this).index()>oldIndex){
                $('.home1 li')[$(this).index()].classList.remove("leftShow");
                 $('.home1 li')[$(this).index()].classList.remove("leftHide");
                 $('.home1 li')[$(this).index()].classList.remove("rightHide");
                 $('.home1 li')[$(this).index()].classList.add("rightShow");


                $('.home1 li')[oldIndex].classList.remove("leftShow");
                 $('.home1 li')[oldIndex].classList.remove("rightShow");
                 $('.home1 li')[oldIndex].classList.remove("rightHide");
                 $('.home1 li')[oldIndex].classList.add("leftHide");
             }

             //从右往左  当前索引小于上一次索引 leftShow
             if($(this).index()<oldIndex){
                 $('.home1 li')[$(this).index()].classList.remove("rightShow");
                 $('.home1 li')[$(this).index()].classList.remove("leftHide");
                 $('.home1 li')[$(this).index()].classList.remove("rightHide");
                 $('.home1 li')[$(this).index()].classList.add("leftShow");

                 $('.home1 li')[oldIndex].classList.remove("leftShow");
                 $('.home1 li')[oldIndex].classList.remove("rightShow");
                 $('.home1 li')[oldIndex].classList.remove("leftHide");
                 $('.home1 li')[oldIndex].classList.add("rightHide");
             }
             oldIndex = $(this).index()
             console.log(oldIndex);

             //手动轮播  ---> 自动轮播的同步问题！！
             //手动点完是需要自动轮播的，自动轮播从哪个面开始播？--->手动点的这个面开始自动轮播
             //手动轮播的逻辑必须药告诉自动轮播 我刚刚点了哪一个面
             //aotuIndex = $(this).index()
             //atuo()
         })

         //自动轮播
         atuo()
         function atuo() {
             timer3D = setInterval(function () {
                 aotuIndex++
                 if(aotuIndex >= $('.home1 li').length){
                     aotuIndex = 0
                 }
                 for (var i = 0 ;i<$('.home2 li').length;i++){
                     $('.home2 li')[i].classList.remove('active')
                 }
                 $('.home2 li')[aotuIndex].classList.add('active')

                 $('.home1 li')[aotuIndex].classList.remove("leftShow");
                 $('.home1 li')[aotuIndex].classList.remove("leftHide");
                 $('.home1 li')[aotuIndex].classList.remove("rightHide");
                 $('.home1 li')[aotuIndex].classList.add("rightShow");


                 $('.home1 li')[oldIndex].classList.remove("leftShow");
                 $('.home1 li')[oldIndex].classList.remove("rightShow");
                 $('.home1 li')[oldIndex].classList.remove("rightHide");
                 $('.home1 li')[oldIndex].classList.add("leftHide");

                 //自动轮播 --> 手动轮播的同步问题！！
                 //自动轮播一直运行...autoIndex一直在加加,自动轮播到一半时有可能触发手动轮播
                 //这个时候自动轮播的逻辑必须要告诉手动轮播  我播到哪一个面上了
                    oldIndex = aotuIndex
             },2000)
         }

         $('.home1').mouseenter(function () {
             clearInterval(timer3D)
         })
         $('.home1').mouseleave(function () {
             atuo()
         })

     }


    //内容区功能
    window.onresize = function () {
        content()
        var contentleft = -($(document).height() - $('#head').height() )*index1 +'px'
        $('.list:first').css('top',contentleft)
    }//不论你屏幕怎么变化，始终让用户看到当前浏览的那一屏


     function content() {
          var contentWidth = $(document).height() - $('#head').height() +'px'
         $('#content').css('height',contentWidth)//设置内容区的高度为视口减去头部
         $('#content .list > li').css('height',contentWidth)
         if(contentid.addEventListener){
             contentid.addEventListener("DOMMouseScroll",function(ev){
                 ev=ev||event;
                 //让fn的逻辑在DOMMouseScroll事件被频繁触发的时候只执行一次
                 clearTimeout(timer);
                 timer = setTimeout(function(){
                     fn(ev)
                 },200)

             });
         }
         contentid.onmousewheel=function(ev){
             ev=ev||event;
             clearTimeout(timer);
             timer = setTimeout(function(){
                 fn(ev)
             },200)
         };
          function  fn(ev) {
              ev= ev||event
              var dir="";

              if(ev.wheelDelta){
                  dir = ev.wheelDelta>0?"up":"down";
              }else if(ev.detail){
                  dir = ev.wheelDelta<0?"up":"down";
              }
              prevP = index1
              switch (dir){
                  case "up":
                      if(index1>0){
                          index1--
                          move(index1)
                      }
                      break;
                  case "down":
                      if(index1<$li.length - 1){
                          index1++
                          move(index1)
                      }
                      break;
              }
          }

     }
     //头部功能
    function haed() {
        var lioffset =$firstli.position()
        var left  = lioffset.left + $firstli.width()/2 - $arrow.width()/2 + 'px'
        $firstup.css('width','100%')
        $arrow.css('left',left)
        //导航栏点击
        $li.click(function () {
            prevP = index1
            index1 = $(this).index()
            move(index1)
        })
        //左侧栏点击按钮
        $('.dot > li').click(function () {
            prevP = index1

            index1 = $(this).index()

            move(index1)

        })
    }

    //动画的核心函数
    function move(index) {
        $allup.css('width','')
        $li[index].firstElementChild.style.width = '100%'
        var contentleft = -($(document).height() - $('#head').height() )*index +'px'
        $('.list:first').css('top',contentleft)
        var left = $li[index].offsetLeft + $li[index].offsetWidth/2 - $arrow.width()/2+ 'px'
        $arrow.css('left',left)
        for (var i = 0 ;i<$('.dot > li').length;i++){
            $('.dot > li')[i].classList.remove('active')
        }
        $('.dot > li')[index].classList.add('active')
        //出入场动画
        if(arr[index]&&typeof arr[index]["inAn"] === "function") {
            arr[index]["inAn"]();
        }
        if(arr[prevP]&&typeof arr[prevP]["inAn"] === "function") {
            arr[prevP]["outAn"]();
        }
    }
})()