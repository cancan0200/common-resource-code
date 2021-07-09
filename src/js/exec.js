function CNew(fn, ...args) {
    /**
     * 1、创建一个新的对象 2、绑定原型链 3、绑定this  4、返回一个对象
     */
    let obj = {};
    obj.__proto__ = fn.prototype;
    const result = fn.call(obj, ...args);

    return typeof result == 'object' ? result : obj;
}

// 判断左侧对象的父类以及子类中是否是右侧构造函数
function instance_of(left, right) {
    while (left) {
        if (left.__proto__ === right.prototype) {
            return true
        }
        left = left.__proto__;
    }
    return false
}

// 改变 this 的指向
Function.prototype.myCall = function(exec, ...args) {
    const _this = this;
    exec.fn = _this;
    const result = exec.fn(...args)
    delete exec.fn;
    return result;
}


function fn1() {
    this.a = 10
}

function fn2(a) {
    this.a = a
    return a
}

const fgwjfh = fn1.myCall(fn2, 49)
console.log(fgwjfh())

var a = 10
var obj = {
    a:1,
    geta: function() {
        console.log(this.a)
    }
}

console.log(obj.geta())