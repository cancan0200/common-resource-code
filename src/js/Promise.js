/**
 * @author: czhou
 * @desc: 实现一个简易的promise 
 new promise, promise.all, promise.race, promise.resolve, promise.reject
 实现 promise 的链式调用
 * @param {*}
 */

// Promise 的三种状态
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

export default function CPromise(exec) {
    const _this = this;

    _this.status = PENDING;
    _this.value = undefined;

    function resolve(value) {
        _this.status = RESOLVED;
        _this.value = value;
        _this.then()
    }

    function reject() {
        _this.status = REJECTED;
        _this.value = value;
        _this.catch(value)
    }

    exec(resolve, reject);
}

CPromise.prototype.then = (resolve, reject) => {
    const _this = this;
    console.log(_this)
    if (_this.status == RESOLVED) {
        resolve(_this.value);
    }

}

CPromise.prototype.catch = (value) => {

}

// 接收一个类型为promise的数组
CPromise.prototype.all = () => {}

// 接收一个类型为promise的数组
CPromise.prototype.race = () => {

}

const testPromise = new Promise((resolve, reject) => {
    resolve();
    reject();
})

function* gen() {
    const a = yield 1;
    const b = yield a;

    console.log(a)
}
var gen = gen();
gen.next();
gen.next();


const testP = () => {
    return new Promise(resolve, )
};


const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function APromise(fn) {
    const _this = this;
    _this.status = PENDING
    resolve = (...args) => {
        if (_this.status == PENDING) {
            _this.status = RESOLVED
            _this.then()
        }
    }
    reject = () => {
        if (_this.status == PENDING) {
            _this.status = REJECTED
            exec.apply(_this, args)
            _this.catch();
        }
    }

    fn(resolve, reject)
}

APromise.prototype.then = function(success, fail) {
    this.callBacks.push(success)
}

APromise.prototype.catch = function(success, fail) {}
