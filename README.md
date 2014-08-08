#世界杯专题页面　说明

##兼容性

* android2.3+ ios5+兼容
* js由于使用了defineProperty,Array.prototype.forEach等部分ie8-支持度不高的方法，ie低版本需要polyfill
* css使用了android2.1+ ios3.2+兼容的-webkit-box相关属性


##演示说明

* 数据采用jsonp模拟，演示时可以使用webview，如fiddler代理

##模块

* html页面分为worldcup user lottory appList inspire recommend模块，其中共用组件放在worldcup模块下，如worldcup-btn
* js部分分为main.js tie.js，main.js采用面向对象写法，使用数据绑定，tie.js为简单的数据绑定库
* 应用数据采用jsonp形式模拟，分为app和recommend
* style部分单文件按照html页面模块组织

##语义

* 模块命名采用全称英文，元素命名部分采用缩写
* html标签使用针对article section h2 p ol li figure figcaption采用对应语义化使用，div作为布局补充

##分离

* 采用依赖，逻辑，表现，结构分离
* 采用绑定方式实现积分变动，交互状态变更等逻辑，将html标签和样式从js中分离出来

##性能优化

* 将js放置在页尾
* 采用webview全局滚动条，提升滚动效率

##用户体验

* 针对图片采用默认的透明base64图，减少图片加载失败带来的失望

##实现思路

在收到psd文件后->分析页面模块->整理出对应的html框架代码->进行模块命名->编写对应的html代码->并根据psd的相应样式事项对应的css样式->针对页面的交互逻辑进行梳理->增加js逻辑->并考虑后端数据接口->在webview上测试

##遇到的问题

* psd中没有交代竞猜按钮，立即完善，支持分享等点击后的后续动作，在js中做了保留接口
* 没有真实的数据，采用模拟数据进行
* 部分容错没有完善

##其他

* css命名采用修改后的bem方式
* tie.js采用了部分polyfill如weakmap

