/**
 校验方法
 **/

 import {TMessage} from 'aid-taurus-desktop-cmcc'

 /**
  * 校验时间段是否重复
  * @param dateList 时间数组,格式为[{startDate:'2019-09-09 00:00:00',endDate:'2019-09-10 00:00:00'},...]
  * @param startStrName 开始时间字段名称
  * @param endStrName 结束时间字段名称
  * @returns {boolean} 是否重复
  */
 export function dateRepeat(dateList, startStrName, endStrName) {
   let startTimeArr = []
   let endTimeArr = [];
   (dateList || []).map(function(item) {
     startTimeArr.push(item[startStrName || 'startDate'])
     endTimeArr.push(item[endStrName || 'endDate'])
   })
   let allStartTime = startTimeArr.sort()
   let allEndTime = endTimeArr.sort()
   console.log(allStartTime, allEndTime)
   let result = 0
   for (let k = 1; k < allStartTime.length; k++) {
     if (allStartTime[k] <= allEndTime[k - 1]) {
       result += 1
     }
   }
   return result > 0
 }
 
 /**
  * 对table里面的form做校验
  * @param tabledata 表格data，必传参数
  * @param rules 必传参数
  * @param currProp 如果不是校验table，而是校验table中的某个字段，那么需要传过来当前需要校验的字段。可选参数
  * @param index 校验当前字段在tabledata数组中的行的下标。可选参数，如果currProp参数不为空，index必传
  * @param cb 回调函数，当前还没有使用这个参数，作为保留字段。可选参数
  * @param showKey 提示信息显示list中的某个字段
  * 规则如下几种：
  * required：必填
  * compare：对比 {name:'endDate',ruler:'lt',message:'开始日期必须小于结束日期'},eq 等于,neq 不等于,gt 大于,egt 大于等于,lt 小于,elt 小于等于
  * validator：{validator:fn,message:'我想自定义这个弹出消息'} 自定义校验
  * rules配置.eg：
   rules:{
     required:{
       username:'用户名字段必填'
     },
     length:{// 字符串长度校验
       username:{// 如果是对象的话，就是自定义message
         len:20,
         message:'用户名字符串长度不能大于20'
       }
     },
     match:{// 字符串匹配校验
       username:[{
         regExp:'',
         message:'用户名字符串正则不匹配'
       }]
     },
     compare:{
       startDate:{
         name:'endDate',// 对比字段的名称
         ruler:'lt',
         message:'开始日期必须小于结束日期'
       },
       ...
     },
     validator:{
       username:{
         validator:fn,
         message:'我想自定义这个弹出消息'
       }
     }
   }
  */
 // eq 等于,neq 不等于,gt 大于,egt 大于等于,lt 小于,elt 小于等于
 const contraryMap = {// 相反的map映射
   eq: 'neq',
   neq: 'eq',
   gt: 'elt',
   egt: 'lt',
   lt: 'egt',
   elt: 'gt'
 }
 
 export function tfDataValidate(tabledata, rules, currProp, index, cb) {
   if (!tabledata || !rules || !tabledata.length) {
     return
   }
   if (!Array.isArray(tabledata)) {
     return
   }
   // 如果有对比条件存在，则给现有的rulers新增一个相对应的对比ruler，等于判断会有点问题
   // let keys0 = Object.keys(tabledata[0])
   // for (let k = 0; k < keys0.length; k++) {
   //   if (rules && rules['compare']) {
   //     if (rules['compare'][keys0[k]]) {
   //       rules['compare'][rules['compare'][keys0[k]].name] = {
   //         name: keys0[k],
   //         ruler: contraryMap[rules['compare'][keys0[k]].ruler],
   //         message: rules['compare'][keys0[k]].message
   //       }
   //     }
   //   }
   // }
 
   for (let i = 0; i < tabledata.length; i++) {
     let rowData = tabledata[i]
     let keys = Object.keys(rowData)
     if (index === 0 || index) {
       if (i !== index) {
         continue
       }
     }
     for (let j = 0; j < keys.length; j++) {
       if (currProp) {
         if (keys[j] !== currProp) {
           continue
         }
       }
       // 自定义校验,优先级最高
       /* if(rules && rules.myValidator) {
 
       } */
       // 必填校验
       if (rules && rules.required) {
         if (rules.required[keys[j]]) {
           if (!rowData[keys[j]]) {
             TMessage.warning(`第${i + 1}行${rowData[rules.showKey] ? rowData[rules.showKey] : ''}:${rules.required[keys[j]]}`, 5) // 提示错误
             return false
           }
         }
       }
       // 长度校验
       if (rules && rules.length) {
         if (rules.length[keys[j]]) {
           // if (typeof rules.length[keys[j]] === 'number') {
           //   if (rowData[keys[j]].length > rules.length[keys[j]]) {
           //     TMessage.warning(`第${i + 1}行:字符长度必须小于等于${rules.length[keys[j]]}`, 5) // 提示错误
           //     return false
           //   }
           // } else if (typeof rules.length[keys[j]] === 'object') {
           if (rowData[keys[j]] !== null) {
             if (rowData[keys[j]].length > rules.length[keys[j]].len) {
               TMessage.warning(`第${i + 1}行:${rules.length[keys[j]].message}`, 5) // 提示自定义错误
               return false
             }
           }
 
           // }
         }
       }
 
       // 正则校验
       if (rules && rules.match) {
         if (rules['match'][keys[j]]) {
           /* if (rowData[keys[j]].length > rules.length[keys[j]].len) {
             TMessage.warning(`第${i + 1}行:${rules.length[keys[j]].message}`, 5) // 提示自定义错误
             return false
           } */
           if (!rules['required'][keys[j]]) {
             if (rowData[keys[j]]) {
               for (let n = 0; n < rules['match'][keys[j]].length; n++) {
                 if (!rules['match'][keys[j]][n]['regExp'].test(rowData[keys[j]])) {
                   TMessage.warning(`第${i + 1}行:${rules['match'][keys[j]][n].message}`, 5) // 提示自定义错误
                   return false
                 }
               }
             }
           } else {
             for (let n = 0; n < rules['match'][keys[j]].length; n++) {
               if (!rules['match'][keys[j]][n]['regExp'].test(rowData[keys[j]])) {
                 TMessage.warning(`第${i + 1}行:${rules['match'][keys[j]][n].message}`, 5) // 提示自定义错误
                 return false
               }
             }
           }
         }
       }
 
       // 对比校验
       if (rules && rules['compare']) {
         if (rules['compare'][keys[j]]) {
           if (!rowData[keys[j]]) {
             return false
           }
           if (!rowData[rules['compare'][keys[j]]['name']]) {
             return false
           }
           if (rules['compare'][keys[j]]['ruler'] === 'eq') { // 相等
             if (rowData[keys[j]] != rowData[rules['compare'][keys[j]]['name']]) {
               TMessage.warning(`第${i + 1}行:${rules['compare'][keys[j]]['message']}`, 5)
               return false
             }
           } else if (rules['compare'][keys[j]]['ruler'] === 'neq') { // 不相等
             if (rowData[keys[j]] == rowData[rules['compare'][keys[j]]['name']]) {
               TMessage.warning(`第${i + 1}行:${rules['compare'][keys[j]]['message']}`, 5)
               return false
             }
           } else if (rules['compare'][keys[j]]['ruler'] === 'gt') { // 大于
             if (rowData[keys[j]] <= rowData[rules['compare'][keys[j]]['name']]) {
               TMessage.warning(`第${i + 1}行:${rules['compare'][keys[j]]['message']}`, 5)
               return false
             }
           } else if (rules['compare'][keys[j]]['ruler'] === 'egt') { // 大于等于
             if (rowData[keys[j]] < rowData[rules['compare'][keys[j]]['name']]) {
               TMessage.warning(`第${i + 1}行:${rules['compare'][keys[j]]['message']}`, 5)
               return false
             }
           } else if (rules['compare'][keys[j]]['ruler'] === 'lt') { // 小于
             if (rowData[keys[j]] >= rowData[rules['compare'][keys[j]]['name']]) {
               TMessage.warning(`第${i + 1}行:${rules['compare'][keys[j]]['message']}`, 5)
               return false
             }
           } else if (rules['compare'][keys[j]]['ruler'] === 'elt') { // 小于等于
             if (rowData[keys[j]] > rowData[rules['compare'][keys[j]]['name']]) {
               TMessage.warning(`第${i + 1}行:${rules['compare'][keys[j]]['message']}`, 5)
               return false
             }
           }
         }
       }
       // 自定义校验
       if (rules && rules['validator']) {
         if (rules['validator'][keys[j]]) {
           if (rules['validator'][keys[j]]['validator']) {
             if (!rules['validator'][keys[j]]['validator'](i)) {
               if (rules['validator'][keys[j]]['message']) {
                 TMessage.warning(`第${i + 1}行:${rules['validator'][keys[j]]['message']}`, 5)
               }
               return false
             }
           }
         }
       }
     }
   }
   return true
 }
 
 /**
  * 判断数组是否重复
  * @param arr
  * @returns {*}
  */
 export function unique(arr) {
   const res = new Map()
   return arr.filter((a) => !res.has(a) && res.set(a, 1))
 }
 
 /**
  * 判断列表中的字段是否有重复
  * @param list
  * @param property
  * @returns 返回值有3种：
  * 1.有重复则返回{prop:'重复属性的名',len:'去重后的数组长度'}
  * 2.false表示没有重复
  * 3.1表示无需校验，数组的长度为1
  */
 export function listPropRepeat(list = [], ...property) {
   if (list.length === 1) {
     return 1
   }
   // console.log(list, property, arguments)
   let arr = []
   list.forEach((item, idx) => {
     for (let i = 0; i < property.length; i++) {
       if (!arr[i]) {
         arr[i] = []
       }
       arr[i].push(item[property[i]])
     }
   })
   for (let j = 0; j < arr.length; j++) {
     let originLen = arr[j].length
     let uniqueLen = unique(arr[j]).length
     if (uniqueLen < originLen) {
       return {prop: property[j], len: uniqueLen}
     }
   }
   return false
 }
 