# tween.js
Plain javascript easing functions, 纯js缓动函数, 利用数学函数的坐标变换自定义缓动函数    

很多人不理解为什么可以只接受一个参数t，单变量的思路是把所有的求**y值的增加看作是0到1的过程，x的增加的也是0到1的过程**，再用**图形坐标变换**得到相应的函数公式   
   
[在线 Demo](http://www.a4z.cn/pui/workbench-easing.html)   

## Usage 使用方法
参考 demo.html
<script src="tween.min.js"></script>


``` javascript
        $(function () {
            $('.content img').click(function () {
                var This = $(this);
                var s = This.parents('.content').width(),
                    easing = This.attr('id').replace('_ball', ''),
                    timeNow = 0;
                // 运动
                var move = function () {
                    var f_t = tween[easing](timeNow) * s;
                    if (timeNow <= 1) {
                        This.css('webkitTransform', 'translate3d(' + f_t + 'px, 0, 0)');
                        timeNow += 0.02; // 时间增加
                        requestAnimationFrame(move);
                    } else {
                        This.css('webkitTransform', 'translate3d(' + s + 'px, 0, 0)');
                    }
                }
                move();
            });

        });
```

## Easing 缓动函数图像参考
[![easings.net](https://github.com/nelsonkuang/tween.js/blob/master/tween.jpg?raw=true)](http://easings.net)
