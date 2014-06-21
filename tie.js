;(function(win ,doc) {

    /*
     * =watch
     */
    function watch(obj ,prop ,handler) {
        try{//ignore if configure is false
            var  defineProperty = Object.defineProperty
                ,handlers = obj.__tie__handlers__
                ,watchers = obj.__tie__watchers__
                ;
            //handlers
            if(!handlers) {
                handlers = {};
                defineProperty(obj ,"__tie__handlers__" ,{
                    value: handlers
                    ,enumerable: false
                    ,configurable: true
                })
            }
            if(prop in handlers) {
                handlers[prop].push(handler);
            }
            else {
                handlers[prop] = [handler];
            }
            //watchers signal
            if(!watchers) {
                watchers = {};
                defineProperty(obj ,"__tie__watchers__" ,{
                    value: watchers
                    ,enumerable: false
                    ,configurable: true
                })
            }
            var  descriptor = Object.getOwnPropertyDescriptor(obj ,prop)
                ,o = {}
                ;
            //如果已有getter 和 setter则储存，可以形成链
            if(!watchers[prop]  && descriptor && descriptor.get) {
                defineProperty(o ,prop ,descriptor);
            }
            else {
                o[prop] = obj[prop];
            }
            defineProperty(obj ,prop ,{//defineProperty针对移动设备支持率很高
                 get: function() {
                    return o[prop];
                }
                ,set: function(val) {
                    var  oldVal = o[prop]
                        ,i ,handler
                        ;
                    o[prop] = val;
                    for(i=0; handler = handlers[prop][i]; i++) {
                        handler(obj, prop, oldVal, val);
                    }
                }
                ,enumerable: true
                ,configurable: true
            });
            //设定标识
            watchers[prop] = true;
        }catch(e) {}
    }
    ////test
    //var a = {b:1}
    //watch(a ,"b" ,function(obj ,prop ,oldVal ,val) {
    //    console.log("first" ,val)
    //})
    //a.b = 2;
    //watch(a ,"b" ,function(obj ,prop ,oldVal ,val) {
    //    console.log("second" ,val)
    //})
    //a.b = 3;
    //console.log(a)


    /*
     * =unwatch
     */
    function unwatch(obj ,prop ,handler) {//todo
    }


    /*
     * =eachElement
     */
    function eachElement(elements ,callback) {
        if(elements) {
            if(!("length" in elements)) {
                elements = [elements];
            }
            ;[].forEach.call(elements ,callback);//forEach移动支持度很高
        }
    }


    /*
     * =directives
     */
    var directives = {};
    directives.textContent = function(elements ,oldVal ,val) {
        eachElement(elements ,function(element) {
            element.textContent = val;
        })
    }


    /*
     * =tie
     * @about 绑定对象
     */
    function Tie() {
        var that = this;
        that.object = null;
        that.property = null;
        that.elementPoint = null;
        that.directive = null;
    }


    /*
     * =win.TIE
     * @about 绑定
     * @usage TIE(obj ,elementPoint ,prop ,directive)
     *        element = elementPoint[prop]
     *        value = obj[prop]
     *        element[directive] = value ,某些指令可能特殊处理具体看directives，
     *        使用引用实现简易DI
     */
    win.TIE = function(obj ,prop ,elementPoint ,elementProp ,directive) {
        //绑定
        var tie = new Tie;
        tie.object = obj;
        tie.property = prop;
        tie.elementPoint = elementPoint;
        tie.elementProperty = elementProp;

        //更新函数
        function update(obj ,prop ,oldVal ,val) {
            var drctvtp = typeof(directive);
            if(drctvtp == "string") {//使用预置的渲染指令
                console.log(val)
                //directives[directive](tie.elementPoint[tie.elementProperty] ,oldVal ,val);
            }else if(drctvtp == "function") {//使用自定义渲染指令
                directives(tie.elementPoint[tie.elementProperty] ,oldVal ,val);
            }
        }

        //后续触发
        watch(tie.object ,tie.property ,update);//监测值变化
        watch(tie.elementPoint ,tie.elementProperty ,function() {//监测dom变化
            update(tie.object ,tie.property ,"" ,tie.object[tie.property]);
        });

        //首次触发
        update();

        return tie;
    }


    /*
     * =win.UNTIE
     * @about 取消绑定
     */
    win.UNTIE = function() {//todo
    }

})(window ,document);
