;(function(win ,doc ,tie ,worldcup) {
    /*
     * =$
     * @about 选择器
     * @from https://gist.github.com/ryanseddon/1009759
     */
    function $(a ,b){
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
        };

        //绑定渲染器
        tie(user ,"winnings" ,user.elements ,"winnings" ,"textContent");
    }


    /*
     * =AppList
     */
    function AppList() {
        var appList = this;
        appList.apps = [];
        appList.elements = {
            appList: null //appList的dom
        }
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
        app.action = "";

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
    }

    function loadData(callback) {
        //测试下使用jsonp
        var data;
        win.Data = function(d) {
            data = d;
        }
        var script = doc.createElement("script");
        script.src="app/data";
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

        //应用列表
        var  appList = new AppList
            ,appElement = tie$("app")[0]
            ,appElementPrototype = appElement.cloneNode(true)
            ,frag = doc.createDocumentFragment()
            ,i ,app ,elements
            ;
        loadData(function(data) {
            [].forEach.call(data ,function(item ,index) {
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
                elements.icon = tie$("app-icon" ,elements.app)[0];
                elements.name = tie$("app-name" ,elements.app)[0];
                elements.slogan = tie$("app-slogan" ,elements.app)[0];
            });
            insertAfter(appElement ,frag);
        })

        //暴露接口
        worldcup.user = user;
        worldcup.appList = appList;
    })();

})(window ,document ,TIE ,window.WORLDCUP = window.WORLDCUP || {});
