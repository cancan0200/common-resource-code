

# 网络协议部分

## TCP UDP WebSocket http 的基本简介

## http 和 https 的区别

1、http 不需要证书 https 需要申请证书
2、http 不会对传输的数据加密 是明文传输， https 则是具有安全性的 ssl 加密传输协议
3、http 使用的连接方式不一样 使用的端口也不一样 http 用的 80 https 用的 443
4、http 是无状态连接 HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 http 协议安全

## 从输入一个 URL 到页面加载出数据的 浏览器的过程

> 1、通过 URL 解析出域名
> 2、DNS 通过域名解析出 IP
> 3、通过三次握手 浏览器和服务器建立 TCP 连接
> 4、请求需要的资源
> 5、服务器响应
> 6、通过四次挥手 服务器和浏览器客户端断开连接
> 7、浏览器渲染 DOM
> (1) 通过 html 文档 生成 DOM 树
> (2) 通过 css 生成 css 树
> (3) 将 DOM 树和 CSS 树合成 render 树
> (4) 浏览器 根据 render 树 计算元素的位置和大小
> (5) 浏览器的渲染

## 三次握手 过程

## 四次挥手的过程

## this 指向，有哪些情况。

> 1、指向调用该方法的那个实例
> 2、没有引用对象 则指向 window
> 3、箭头函数的 this 指向上下文的 this

## javascript 中 bind、apply、call

> 共同点
> (1) 都是修改 this 的指向
> (2) 第一个参数都是 this 需要指向的对象
> 区别
> apply 和 call 的传参不一样 apply 第二个参数是一个数组 代表， call 的后面的参数 是展开的,
> bind 的返回值是一个函数
> 实现 call bind apply

# 框架部分

## vue 双向绑定原理

通过数据劫持 发布者订阅者的方式实现数据双向绑定
核心方法 Object.defineProperty
数组的双向绑定

## vue 怎么处理数组的双向绑定

> object.defineProperty 无法对数组进行数据劫持，通过重写数组的 push、pop 实现对数组的双向绑定

## vue 为什么要使用 key 值 以及 vue 的 virtual dom diff 算法的基本过程

> patchNode 算法中会先通过 sameNode 的方法判断是否是同一个 node，其中有一个判断条件是通过 key 判断， 如果不使用 key 值，则每次 patchNode 的时候都会重新更新 dom,
> key 推荐使用唯一的 id,不推荐使用 index 做为 key, 当其中一个发生变化时则后面 sameNode 判断 都会被判断为不是同一个 node， 会重新更新 Dom, 这样就和没有写 key
> 没有任何区别

## 框架原理

> （1）vue 双向绑定原理 --https://www.jianshu.com/p/11f1521a8cea --https://www.cnblogs.com/qianxiaox/p/14119940.html
> (1.1)扩展，数组怎么实现的，因为 object.definedproperty 只能代理对象，数组是因为 push pup unshift 等方法被重写了，先调用数组原生方法，再手动通知订阅 --https://blog.csdn.net/haoyanyu_/article/details/100031327
> （2）了解虚拟 dom 作用，大概了解 diff 算法 --https://segmentfault.com/a/1190000008782928
> (diff 有一个很大的优化就是只进行同层次对比，因为树结构，进行深层次对比非常耗费性能 n 的 n 次方，在就了解下首位对比的规则，具体怎么对比的可以不用太在意)

# 一些 js 的基本应用

## 防抖节流的应用场景

> 防抖：在单位时间内触发方法会被重置 避免事件被执行多次
> input 框输入 时处理一些数据 比如 做一些格式限制 输入搜索等功能
>
> 节流：在单位时间 内 方法只会执行一次。
> 在页面重复多次点击时 比如抢票， 懒加载、登陆、发短信

## Cookie 和 Session 有哪些方面的区别

> 相同点：都是用于缓存数据
> 不同点：session 是当浏览器关闭时数据就会被清空， cookie 的数据在有效期内会一直存在在缓存中。cookie 的容量更小， session 的数据容量会更大
> https://www.cnblogs.com/mark5/p/11641131.htmld

## 宏任务和微任务

> JS 是一个单进程的语言 同一时间只能处理一个任务 不可以处理多个任务
> 微任务的执行优先于宏任务
> 任务执行的过程
> 1 执行事件队列中的宏任务
> 2 询问当前的宏任务是否有微任务需要执行, 如果有则执行完全部微任务
> 3 更新下页面 dom
> 4 继续执行事件队列中的下一个宏任务
> 宏任务:
>
> 1. script (可以理解为外层同步代码)
> 2. setTimeout/setInterval
> 3. UI rendering/UI 事件
> 4. postMessage，MessageChannel
> 5. setImmediate，I/O（Node.js）
>    微任务: Promise.then Promise.catch

## new 操作符做了哪些步骤

> 1.创建一个新对象 2.原型链绑定 3.绑定 this  
> 4.返回新对象

## 协商缓存和强缓存 以及缓存策略的选择

## 八股文

（1）原型链，原型对象，对象的原型 --https://www.cnblogs.com/loveyaxin/p/11151586.html
（2）http 常见状态码 --https://www.cnblogs.com/loveyaxin/p/11151586.html d
（3）http 三次握手，四次挥手 --https://www.jianshu.com/p/3cdc08c0fd43 d
（4）输入 url，到页面渲染的过程 --https://blog.csdn.net/majunzhu/article/details/95450079 d
（5）协商缓存和强缓存 --https://www.jianshu.com/p/9c95db596df5
（6）js 几种基本数据类型 --https://blog.csdn.net/lgno2/article/details/111659563 d

## js 原理 （https://www.cnblogs.com/heshuaiblog/）

（1）new 操作符实现
（2）instanceof 实现
（3）promise 实现（没时间的话可以了解下，可以写写 Promise.all Promise.race 的实现，比较简单
（4）防抖节流实现
（5）javascript 中 bind、apply、call
（6）async await 的基本原理， generator 的基本简介和使用场景

## 算法

（1）冒泡排序，快排
（2）二分查找
（3）单向链表找到倒数第 n 个节点 （链表问题一般用快慢指针）https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
（4）二叉树前序 中序 后序遍历，递归就行

## js 实现继承的几种方式

> 原型链继承
> 构造函数继承
> 实例继承
> 拷贝继承
> 组合继承

## 数组的遍历方法以及使用的场景 有哪些是可阻断

```
1、for
2、forEach
3、map
4、fliter
5、for in
6、for of
7、
```



## 虚拟DOM
https://www.jianshu.com/p/af0b398602bc
1、什么是虚拟DOM？ 用JS 来模拟DOM 操作
2、为什么要使用虚拟dom
 * 减少dom的操作 避免一些不必要的dom更新 优化页面渲染的速度 
 * 可以实现跨平台 服务器端渲染
虚拟DOM diff 算法
