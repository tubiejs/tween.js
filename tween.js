; (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['tween'], function (tween) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.tween = factory(tween));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('tween'));
    } else {
        // Browser globals (root is window)
        root.tween = factory(root.tween);
    }
}(this, function (tween) {
    var root = this || global;
    var previousTween = root.tween;
    var _t = { version: '0.1.1', author: 'Nelson Kuang', created: '2017.11.23' };
    // 注意：下面函数很多人不理解为什么可以只接受一个参数t，单变量的思路是把所有的求y值的增加看作是0~1的过程，x的增加的也是0~1的过程，再用图形坐标变换得到相应的函数公式
    // 图形坐标可参考: http://easings.net/ x轴0~1，y轴0~1
    // 图形坐标变换可使用在线工具：http://www.fooplot.com/
    _t.linear = function (t) {
        return t; // y = x
    }
    _t.easeInSine = function (t) {
        return Math.sin((Math.PI / 2) * (t - 1)) + 1; // y = sin(π/2 (x - 1)) + 1
    }
    _t.easeOutSine = function (t) {
        return Math.sin((Math.PI / 2) * t); // y = sin(π/2 * x)
    }
    _t.easeInOutSine = function (t) {
        return 0.5 * Math.sin(Math.PI * (t - 0.5)) + 0.5; // y = 0.5sin(πx - π/2) + 0.5
    }
    _t.easeInQuad = function (t) {
        return t * t; // y = x²
    }
    _t.easeOutQuad = function (t) {
        return -1 * Math.pow(t - 1, 2) + 1; // y = -(x-1)² + 1 
    }
    _t.easeInOutQuad = function (t) {
        if (t < 0.5) {
            return 2 * t * t; // y = 2x² 
        }
        return -2 * Math.pow(t - 1, 2) + 1; // y = -2(x-1)²+1 
    }
    _t.easeInCubic = function (t) {
        return t * t * t; // y = x³
    }
    _t.easeOutCubic = function (t) {
        return Math.pow(t - 1, 3) + 1; // y = (x-1)³+1
    }
    _t.easeInOutCubic = function (t) {
        if (t < 0.5) {
            return 4 * t * t * t;  // y = 4x³
        }
        return 4 * Math.pow(t - 1, 3) + 1; // y = 4(x-1)³ + 1
    }
    _t.easeInQuart = function (t) {
        return t * t * t * t; // y = x⁴
    }
    _t.easeOutQuart = function (t) {
        return -1 * Math.pow(t - 1, 4) + 1; // y = -(x-1)⁴+1
    }
    _t.easeInOutQuart = function (t) {
        if (t < 0.5) {
            return 8 * t * t * t * t;  // y = 8x⁴
        }
        return -8 * Math.pow(t - 1, 4) + 1; // y = -8(x-1)⁴+1
    }
    _t.easeInQuint = function (t) {
        return t * t * t * t * t; // y = x⁵
    }
    _t.easeOutQuint = function (t) {
        return Math.pow(t - 1, 5) + 1; // y = (x-1)⁵ + 1
    }
    _t.easeInOutQuint = function (t) {
        if (t < 0.5) {
            return 16 * t * t * t * t * t;  // y = 16x⁵
        }
        return 16 * Math.pow(t - 1, 5) + 1; // y = 16(x-1)⁵ + 1
    }
    _t.easeInExpo = function (t) {
        return t === 0 ? 0 : Math.pow(1024, t - 1); // y = 1024^(x-1), 数字1024 reference from: https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
    }
    _t.easeOutExpo = function (t) {
        return t === 1 ? 1 : -1 * Math.pow(1024, -1 * t) + 1; // y = -1024^(-x) + 1
    }
    _t.easeInOutExpo = function (t) {
        if (t < 0.5) {
            return t === 0 ? 0 : 0.5 * Math.pow(1024, 2 * t - 1);  // y = 0.5 * 1024^(2x-1)
        }
        return t === 1 ? 1 : -0.5 * Math.pow(1024, -2 * t + 1) + 1; // y = -0.5 * 1024^(-2x+1) + 1
    }
    _t.easeInCirc = function (t) {
        return -1 * Math.pow(1 - t * t, 0.5) + 1; // y = -(1-x²)^0.5 + 1
    }
    _t.easeOutCirc = function (t) {
        return Math.pow(1 - (t - 1) * (t - 1), 0.5); // y = (1-(x-1)²)^0.5
    }
    _t.easeInOutCirc = function (t) {
        if (t < 0.5) {
            return -1 * Math.pow(0.25 - t * t, 0.5) + 0.5;  // y = -(0.25-x²)^0.5 + 0.5
        }
        return Math.pow(0.25 - (t - 1) * (t - 1), 0.5) + 0.5; // y = (0.25-(x-1)²)^0.5 + 0.5
    }
    _t.easeInBack = function (t) {
        var s = 1.70158; // 把弓往后拉开10%, 即overshoot = 1.70158; reference from: https://github.com/tweenjs/tween.js/blob/master/src/Tween.js, s值可以自由调整
        return (s + 1) * t * t * t - s * t * t; // y = (s+1)x³-sx²
    }
    _t.easeOutBack = function (t) {
        var s = 1.70158;
        return (s + 1) * Math.pow((t - 1), 3) + s * Math.pow((t - 1), 2) + 1; // y = (s+1)(x-1)³ + s(x-1)² + 1
    }
    _t.easeInOutBack = function (t) {
        var s = 1.70158 * 1.525; // 把弓往后拉开10%, 即overshoot = 1.70158; reference from: https://github.com/tweenjs/tween.js/blob/master/src/Tween.js, s值可以自由调整
        if (t < 0.5) {
            return 0.5 * ((s + 1) * Math.pow(2 * t, 3) - s * Math.pow(2 * t, 2));
        }
        return 0.5 * ((s + 1) * Math.pow((2 * t - 2), 3) + s * Math.pow((2 * t - 2), 2) + 1) + 0.5;
    }
    _t.easeInElastic = function (t) {
        // reference from: https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
        if (t === 0) {
            return 0;
        }
        if (t === 1) {
            return 1;
        }
        var a = 2, // 越大波幅越大
            b = 10, // 越小震感越强烈
            c = 5; // 运动两个半左右周期
        return -1 * Math.pow(a, b * (t - 1)) * Math.sin((t - 1.1) * c * Math.PI); // y = -2^(10(x-1))*sin((x - 1.1) * 5 * π)
    }
    _t.easeOutElastic = function (t) {
        if (t === 0) {
            return 0;
        }
        if (t === 1) {
            return 1;
        }
        var a = 2, // 越大波幅越大
            b = 10, // 越小震感越强烈
            c = 5; // 运动两个半左右周期
        return Math.pow(a, -1 * b * t) * Math.sin((-1 * t - 2.1) * c * Math.PI) + 1; // y = 2^(-10x)*sin((-x-2.1) * 5 * π) + 1
    }
    _t.easeInOutElastic = function (t) {
        if (t === 0) {
            return 0;
        }
        if (t === 0.5) {
            return 0.5;
        }
        if (t === 1) {
            return 1;
        }

        var a = 2, // 越大波幅越大
            b = 10, // 越小震感越强烈
            c = 5; // 运动两个半左右周期

        if (t < 0.5) {
            return -0.5 * Math.pow(a, 2 * b * (t - 1 + 0.5)) * Math.sin(2 * (t - 1.1 + 0.5) * c * Math.PI); // y =  0.5(-2^(20(x-0.5))*sin(2(x - 0.6) * 5 * 3.14))
        }

        return Math.pow(a, -2 * b * (t - 0.5)) * Math.sin((-2 * (t - 0.5) - 4.1) * c * Math.PI) + 1; // y = 2^(-20(x-0.5))*sin((-2(x-0.5)-4.1) * 5 * π) + 1
    }
    /*
     * Bounce 反弹效果
     * reference from: https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
     */
    _t.easeInBounce = function (t) {
        return 1 - _t.easeOutBounce(1 - t);
    }
    _t.easeOutBounce = function (t) {
        if (t < (1 / 2.75)) {
            return 7.5625 * t * t;
        } else if (t < (2 / 2.75)) {
            return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
        } else if (t < (2.5 / 2.75)) {
            return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
        } else {
            return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
        }
    }
    _t.easeInOutBounce = function (t) {
        if (t < 0.5) {
            return _t.easeInBounce(t * 2) * 0.5;
        }

        return _t.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
    }

    return _t;
}))
