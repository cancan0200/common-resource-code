/*
 * @Author: czhou 
 * @Date: 2021-04-We 08:09:07 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 实现一些公用的方法 
 */

// 深拷贝 浅拷贝不仅拷贝了原有对象的值还拷贝了原有对象的内存地址
export const deepClone = (obj) => {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {}
    }
    return obj;
}

// 防抖 防抖的目的 防抖实现的几种方式
// 避免同时重复执行同一段代码
export const debounce = (fn, delay) => {
    let timer = null
    return function(...args) {
        const _this = this
        if (timer) {
            clearTimeout(timer)
            timer = null;
        }
        timer = setTimeout(() => {
            fn.call(_this, ...args)
        }, delay);
    }
}




// 节流 节流的目的 节流实现的几种方式
// 在一段时间内只执行某一段代码一次 时间戳的方式 定时器的方式
export function throttle(fn, delay) {
    let prev = 0;
    const _this = this;
    return function(...args) {
        if (prev && (Date.now() - prev < delay)) return;
        fn.call(_this, ...args)
        prev = Date.now();
    }
    // let timer = null
    // let flag = true
    // return function(...args) {
    //     if (!flag) return
    //     clearTimeout(timer)
    //     flag = false
    //     timer = window.setTimeout(() => {
    //         fn.apply(this, args)
    //         flag = true
    //     }, delay)
    // }
}


// call apply 
/**
 * call apply 都是用于修改this 的指向 不同点在于 call 的参数 接受一个列表， apply 的参数接受一个数组
 * call(_this, ...args) apply(_this, [...args])
 */

/**
 * new 操作符的过程 以及实现一个 new 的过程
 */

/**
 * 实现一个new 方法
 */
function CNew(func, ...args) {
    let obj = Object.create({});
    obj.__proto__ = func.prototype;
    let result = func.call(obj, ...args)
    return typeof result == 'object' ? result : obj;
}

// function Person(age) {
//     this.age = age
// }

// // let f = CNew(Person, 1);
// let f2 = new Person(1)
// console.log(f2 == CNew(Person, 1))

// console.log(test)


// 简单实现instanceof 作用是判断对象是否是指定类及其父类的一个实例。。
function instance_of(left, right) {
    let rP = right.prototype;
    left = left.__proto__;

    while (true) {
        if (left == null) return false;
        else if (rP === left) { return true }
        left = left.__proto__;
    }
}

// 升序 快排
function quickSort(arr, left, right) {
    if (left < right) {

        let i = left,
            j = right,
            temp = arr[left];
        while (i < j) {
            while (i < j && arr[j] >= temp) {
                // 从右向左查找比temp小的数
                j--;
            }
            if (i < j) {
                arr[i] = arr[j];
                i++;
            }
            while (i < j && arr[i] <= temp) {
                // 从左向右查找比temp大的数
                i++;
            }
            if (i < j) {
                arr[j] = arr[i];
                j--;
            }
        }
        arr[i] = temp;
        quickSort(arr, left, i - 1)
        quickSort(arr, i + 1, right);
    }
}

// let arr = [10, 9, 20, 30, 15, 20, 35, 6, 23, 34]
// quickSort(arr, 0, arr.length - 1)
// console.log(arr)

// 冒泡排序
function BubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
}
// let arr = [10, 9, 20, 30, 15, 20, 35, 6, 23, 34]
// BubbleSort(arr)
// console.log(arr)

// 二分查找 升序
function binarySeach(arr, findVal) {
    let low = 0,
        high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === findVal) {
            return mid;
        } else if (arr[mid] < findVal) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1;
}

let arr = [1, 2, 5, 6, 9, 12, 23, 34]
console.log(binarySeach(arr, 23))

function Person() {}
Person.prototype = Student

function Student() {}

let pers = new Person()
console.log(pers.prototype.constructor == Student)



// react hook 实现
// componentWillMount componentDidMount componentWillUpdate componentDidUpdate componentWillUnmount 
// shouldComponentUpdate 