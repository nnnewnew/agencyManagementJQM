/**
 * Project
 * @author: nn (Easy-link Co.)
 * @update: nn (2018-3-6 15:10)
 */

var pageLoad = {
	cssCode: function (code) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        try{
            //for Chrome Firefox Opera Safari
            style .appendChild(document.createTextNode(code));
        }catch(ex){
            //for IE
            style.styleSheet.cssText = code;
        }
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    },
	cssLink: function (obj) {
        var style = document.createElement('link');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.href =  obj;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    },
	jscript: function (obj) {
        var style = document.createElement('script');
        style.type = 'text/javascript';
        style.src =  obj;
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(style);
    }
};





// var	footerBtnMotion = {
// 	getDefaultMark : function () {
//         var curBtn = localStorage.currentBtn ? localStorage.currentBtn : "index";
// 		$("#"+curBtn).addClass("cur");
// 		console.log(curBtn);
//     },
// 	clicked : function (obj) {
// 		$(obj).addClass("cur").siblings().removeClass("cur");
// 		localStorage.currentBtn = obj.id;
//         console.log(localStorage.currentBtn);
// 		console.log(URLS.BASE + 'page-' + obj.id + '.html');
//         // $.mobile.changePage(URLS.BASE + 'page-' + obj.id + '.html');
//     }
// };

// $(function () {
    // initElement();

    // pageLoad.cssLink(URLS.PLUGINS_URL + 'jQueryMobile/jquery.mobile-1.4.5.css');
    // pageLoad.cssLink(URLS.PLUGINS_URL + 'jQueryMobile/jquery.mobile.icons.min.css');
    // pageLoad.jscript(URLS.PLUGINS_URL + 'jQueryMobile/jquery.mobile-1.4.5.js');
    // pageLoad.jscript(URLS.JS_URL + 'util.js');
    // footerBtnMotion.getDefaultMark();

    // $(document).on("click", ".btn-footer", function () {
    //     footerBtnMotion.clicked(this);
    // });
// });
