;(function(win ,doc ,tie ,worldcup) {
    /*
     * =$
     * @about 选择器
     * @from https://gist.github.com/ryanseddon/1009759
     */
    function $(a ,b){
        return (b || doc).querySelector(a)
    }

    /*
     * =$$
     * @about 选择器
     * @from https://gist.github.com/ryanseddon/1009759
     */
    function $$(a ,b){
        return (b || doc).querySelectorAll(a)
    }

    /*
     * =tie$
     * @about 适用于tie的选择器[data-tie=key]
     */
    function tie$(key ,root) {
        return $("[data-tie="+key+"]" ,root)
    }

    /*
     * =tie$$
     * @about 适用于tie的选择器[data-tie=key]
     */
    function tie$$(key ,root) {
        return $$("[data-tie="+key+"]" ,root)
    }
    /*
     * =insertAfter
     * @about 插入后面
     */
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }


    /*
     * =User
     */
    function User() {
        var user = this;
        user.winnings = 0;//彩金
        user.elements = {//element缓存
            winnings: null
            ,guess: null
        };

        //绑定渲染器
        tie(user ,"winnings" ,user.elements ,"winnings" ,"textContent");

        //绑定事件
        tie.call(user ,user ,"guess" ,user.elements ,"guess" ,"event.click");
    }
    User.prototype.guess = function() {
        //todo 竞猜逻辑
        console.log("guess")
    }

    /*
     * =Lottory
     */
    function Lottory() {
        var lottory = this;
        lottory.elements = {
            guess: null
        };

        //绑定事件
        tie.call(lottory ,lottory ,"guess" ,lottory.elements ,"guess" ,"event.click");
    }
    Lottory.prototype.guess = function() {
        console.log("guess")
    }

    /*
     * =AppList
     */
    function AppList() {
        var appList = this;
        appList.apps = [];
        appList.page = 1;
        appList.elements = {
            changeApp: null
        }

        //绑定事件
        tie.call(appList ,appList ,"changeApp" ,appList.elements ,"changeApp" ,"event.click");
    }
    AppList.prototype.changeApp = function(element ,e) {
        var appList = this
            ,apps = appList.apps
            ,app
            ;
        loadData("app/data"+(appList.page+1) ,function(data) {
            [].forEach.call(data ,function(item ,index) {
                app = apps[index];
                app.icon = item.icon;
                app.name = item.name;
                app.slogan = item.slogan;
            });
            appList.page++;
        })
        //todo 所有加载完成处理
        //todo 超时处理
    }


    /*
     * =App
     */
    function App() {
        var app = this;
        app.icon = "";
        app.name = "";
        app.id = -1;
        app.slogan = "";
        app.isInstalled = false;
        app.action = "下载";

        app.elements = {
             prototype: null
            ,app: null
            ,icon: null
            ,name: null
            ,id: null
            ,action: null
        }

        //绑定渲染器
        tie(app ,"icon" ,app.elements ,"icon" ,"src");
        tie(app ,"name" ,app.elements ,"icon" ,"alt");
        tie(app ,"name" ,app.elements ,"name" ,"textContent");
        tie(app ,"slogan" ,app.elements ,"slogan" ,"textContent");
        tie(app ,"action" ,app.elements ,"action" ,"textContent");

        //绑定事件
        tie.call(app ,app ,"download" ,app.elements ,"action" ,"event.click");
    }
    App.prototype.download = function() {
        //todo 下载逻辑
        var that = this;
        console.log("下载")

        setTimeout(function() {
            console.log("下载完毕")
            that.action = "打开";
        },100)
    }

    function loadData(url ,callback) {
        //测试下使用jsonp
        var data;
        win.Data = function(d) {
            data = d;
        }
        var script = doc.createElement("script");
        script.src=url;
        script.onload = function() {
            callback(data);
        }
        doc.head.appendChild(script);
    }
    /*
     * =bootstrape
     * @about 启动
     */
    ;(function() {
        var user = new User;
        user.winnings = '--';
        user.elements.winnings = tie$("user-winnings");
        user.elements.guess = tie$("user-guess");

        var lottory = new Lottory;
        lottory.elements.guess = tie$("lottory-guess");

        //应用列表
        var  appList = new AppList
            ,appElement = tie$("app")
            ,appElementPrototype = appElement.cloneNode(true)
            ,frag = doc.createDocumentFragment()
            ,i ,app ,elements
            ;
        loadData("app/data" ,function(data) {
            [].forEach.call(data ,function(item ,index) {//移动设备forEach支持度很高
                appList.apps.push(app = new App);
                app.elements.prototype = appElementPrototype;
                app.icon = item.icon;
                app.name = item.name;
                app.slogan = item.slogan;
                //elements
                elements = app.elements;
                if(index == 0) {
                    elements.app = appElement;
                }
                else {
                    frag.appendChild(elements.app = appElementPrototype.cloneNode(true));
                }
                elements.icon = tie$("app-icon" ,elements.app);
                elements.name = tie$("app-name" ,elements.app);
                elements.slogan = tie$("app-slogan" ,elements.app);
                elements.action = tie$("app-action" ,elements.app);
            });
            insertAfter(appElement ,frag);
        })
        appList.elements.changeApp = tie$("appList-changeApp");

        //暴露接口
        worldcup.user = user;
        worldcup.appList = appList;
    })();

})(window ,document ,TIE ,window.WORLDCUP = window.WORLDCUP || {});
