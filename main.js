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
    function tie$(key) {
        return $("[data-tie="+key+"]")
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
        tie(app ,"icon" ,app.elements ,"icon" ,"attributes.src");
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
            ,appElement = tie$("appList-app")[0]
            ,appElementPrototype = appElement.cloneNode(true)
            ,frag = doc.createDocumentFragment()
            ,i ,app ,elements
            ;

        for(i=0; i<2; i++) {
            appList.apps.push(app = new App);
            app.elements.prototype = appElementPrototype;
            elements = app.elements;
            if(i == 0) {
                elements.app = appElement;
            }
            else {
                frag.appendChild(elements.app = appElementPrototype.cloneNode(true));
            }
        }
        insertAfter(appElement ,frag);

        //暴露接口
        worldcup.user = user;
        worldcup.appList = appList;
    })();

})(window ,document ,TIE ,window.WORLDCUP = window.WORLDCUP || {});
