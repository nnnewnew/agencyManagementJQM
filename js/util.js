/**
* Project
* @author: nn (Easy-link Co.)
* @update: nn (2018-3-6 15:10)
*/

/**
 * ajax请求公共对象
 * @method ajaxLogin：登录请供求
 * @method ajaxGet：get请求
 * @method ajaxPostHeader：特殊headers请求
 */
var ajaxUtil = {
    ajaxLogin : function (api, data) {
        console.log("*****************************");
        var defer = $.Deferred();
        var url = URLS.BASE + api;
        $.ajax({
            url : url,
            data : JSON.stringify(data),
            type : "POST",
            dataType : "json"
        }).done(function (msg) {
            console.log("msg");
            console.log(msg);
            if (msg.code==200){
                defer.resolve(msg.data);
            }else{
                msgBox.showOut(msg.message);
            }
        });
        return defer.promise();
    },
    ajaxGet : function (api, data, token) {
        console.log("**********************************");
        console.log("ajaxUtil.ajaxGet(api, data, token)");
        console.log(api);
        console.log(data);
        console.log(token);
        var defer = $.Deferred();
        if(token){
            var url = URLS.BASE + api;
            $.ajax({
                url : url,
                data : data,
                type : "get",
                dataType : "json",
                headers: {
                    token: token
                }
            }).done(function (msg) {
                console.log("msg");
                console.log(msg);
                if (msg.code==200){
                    defer.resolve(msg.data);
                }else{
                    msgBox.showOut(msg.message);
                }
            });
            return defer.promise();
        }else {
            $.mobile.changePage(PAGE.PAGE_LOGIN, {
                transition: "none",
                changeHash: true
            });
            return defer.promise();
        }
    },
    ajaxPost : function (api, data, token) {
        console.log("***********************************");
        console.log("ajaxUtil.ajaxPost(api, data, token)");
        console.log(api);
        console.log(data);
        console.log(token);
        var defer = $.Deferred();
        if(token){
            var url = URLS.BASE + api;
            $.ajax({
                url : url,
                data : JSON.stringify(data),
                type : "POST",
                dataType : "json",
                headers: {
                    token : token ,
                    'Content-Type' : "application/json"
                }
            }).done(function (msg) {
                console.log("msg");
                console.log(msg);
                if (msg.code==200){
                    defer.resolve(msg.data);
                }else{
                    msgBox.showOut(msg.message);
                }
            });
            return defer.promise();
        }else {
            $.mobile.changePage(PAGE.PAGE_LOGIN, {
                transition: "none",
                changeHash: true
            });
            return defer.promise();
        }
    },
    ajaxDel : function (api, data, token) {
        console.log("ajaxUtil.ajaxGet(api, data, token)");
        console.log(api);
        console.log(data);
        console.log(token);
        var defer = $.Deferred();
        var url = URLS.BASE + api;
        $.ajax({
            url : url,
            data : JSON.stringify(data),
            type : "DELETE",
            dataType : "json",
            headers: {
                token: token,
                'Content-Type' : "application/json"
            }
        }).done(function (msg) {
            console.log("msg");
            console.log(msg);
            if (msg.code==200){
                defer.resolve(msg.data);
            }else{
                msgBox.showOut(msg.message);
            }
        });
        return defer.promise();
    },
    ajaxPut : function (api, data, token) {
        console.log("ajaxUtil.ajaxPut(api, data, token)");
        console.log(api);
        console.log(data);
        console.log(token);
        var defer = $.Deferred();
        var url = URLS.BASE + api;
        $.ajax({
            url : url,
            data : data,
            type : "PUT",
            dataType : "json",
            headers: {
                token: token
            }
        }).done(function (msg) {
            console.log("msg");
            console.log(msg);
            if (msg.code==200){
                defer.resolve(msg.data);
            }else{
                msgBox.showOut(msg.message);
            }
        });
        return defer.promise();
    },
    ajaxPutHeader : function (api, data, headers) {
        console.log("ajaxUtil.ajaxPutHeader(api, data, headers)");
        console.log(api);
        console.log(data);
        console.log(headers);
        var defer = $.Deferred();
        var url = URLS.BASE + api;
        $.ajax({
            url : url,
            data : JSON.stringify(data),
            type : "PUT",
            dataType : "json",
            headers: headers
        }).done(function (msg) {
            console.log("msg");
            console.log(msg);
            if (msg.code==200){
                defer.resolve(msg.data);
            }else{
                msgBox.showOut(msg.message);
            }
        });
        return defer.promise();
    },
    ajaxPostHeader : function (api, data, headers) {
        console.log("ajaxUtil.ajaxPostHeader(api, data, headers)");
        console.log(api);
        console.log(data);
        console.log(headers);
        var defer = $.Deferred();
        var url = URLS.BASE + api;
        $.ajax({
            url : url,
            data : JSON.stringify(data),
            type : "post",
            dataType : "json",
            headers: headers
        }).done(function (msg) {
            console.log("msg");
            console.log(msg);
            if (msg.code==200){
                defer.resolve(msg.data);
            }else{
                msgBox.showOut(msg.message);
            }
        });
        return defer.promise();
    }
};

/**
 * 验证通用对象
 * @method isEmpty
 * * @param v 输入对象
 *
*/
var validUtil = {
    isEmpty : function (val) {
        switch (typeof val) {
            case 'undefined':
                return true;
            case 'string':
                if (val.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
                break;
            case 'boolean':
                if (!val) return true;
                break;
            case 'number':
                if (0 === val || isNaN(val)) return true;
                break;
            case 'object':
                if (null === val || val.length === 0) return true;
                for (var i in val) {
                    return false;
                }
                return true;
        }
        return false;
    },
    isInteger : function (val) {
        var reg =  /^[1-9]\d*$/;
        return reg.test(val);
    },
    isMoney : function (val) {
        var reg=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        return reg.test(val);
    },
    isNumber : function(val){
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if(regPos.test(val) || regNeg.test(val)){
            return true;
        }else{
            return false;
        }
    },
    isMobile : function checkMobile(val){
        var length = val.length;
        if(length == 11 && /^(((1[0-9]{2})|(1[0-9]{2})|(1[0-9]{2})|(1[0-9]{2})|)+\d{8})$/.test(val) )
        {
            return true;
        }else{
            return false;
        }
    }
};

/**
 * 日期通用对象
 * @method showDate
 * * @param elementId ，theDate
 *
 */
var DateUtils = {
    showDate: function (elementId, theDate) {
        var year = theDate.getFullYear();
        var month = theDate.getMonth() + 1;
        var date = theDate.getDate();
        document.getElementById(elementId).innerHTML = year + '年' + month + '月' + date + '日';
    },
    getToday: function () {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        month = String(month).length === 1 ? '0' + month : month;
        var date = today.getDate();
        date = String(date).length === 1 ? '0' + date : date;
        return year + '-' + month + '-' + date;
    },
    getLocalDate: function (selectedDate) {
        var today = selectedDate === undefined ? new Date() : new Date(selectedDate);
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        month = String(month).length === 1 ? '0' + month : month;
        var date = today.getDate();
        date = String(date).length === 1 ? '0' + date : date;
        return year + '年' + month + '月' + date + '日';
    },
    getTheDate: function (dt) {
        var today = dt === undefined ? new Date() : new Date(dt);
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        month = String(month).length === 1 ? '0' + month : month;
        var date = today.getDate();
        date = String(date).length === 1 ? '0' + date : date;
        return year + '-' + month + '-' + date;
    },
    computeDate: function (text, days) {
        var theDate = text === undefined ? new Date() : new Date(text);
        var dayCount = days === undefined ? 0 : Number(days);
        theDate.setDate(theDate.getDate() + dayCount);
        var year = theDate.getFullYear();
        var month = theDate.getMonth() + 1;
        month = String(month).length === 1 ? '0' + month : month;
        var date = theDate.getDate();
        date = String(date).length === 1 ? '0' + date : date;
        return year + '-' + month + '-' + date;
    },
    getTomorrow: function () {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        //var today = dt === undefined ? new Date() : new Date(dt);
        var year = tomorrow.getFullYear();
        var month = tomorrow.getMonth() + 1;
        month = String(month).length === 1 ? '0' + month : month;
        var date = tomorrow.getDate();
        date = String(date).length === 1 ? '0' + date : date;
        return year + '-' + month + '-' + date;
    },
    getTime: function (time) {
        var today = time === undefined ? new Date() : new Date(time);
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        month = String(month).length === 1 ? '0' + month : month;
        var date = today.getDate();
        date = String(date).length === 1 ? '0' + date : date;
        var hour = today.getHours();
        hour = String(hour).length === 1 ? '0' + hour : hour;
        var minute = today.getMinutes();
        minute = String(minute).length === 1 ? '0' + minute : minute;
        var second = today.getSeconds();
        second = String(second).length === 1 ? '0' + second : second;
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    },
    showToday: function (elementId) {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var date = today.getDate();
        document.getElementById(elementId).innerHTML = year + '年' + month + '月' + date + '日';
    },
    formatDate: function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = String(month).length === 1 ? '0' + month : month;
        var date = date.getDate();
        date = String(date).length === 1 ? '0' + date : date;
        return year + '-' + month + '-' + date;
    },
    format: function (timeString, style) {
        var time = new Date(timeString);
        if (time.toString() === 'Invalid Date') {
            return null;
        } else {
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            month = String(month).length === 1 ? '0' + month : month;
            var date = time.getDate();
            date = String(date).length === 1 ? '0' + date : date;
            var hour = time.getHours();
            hour = String(hour).length === 1 ? '0' + hour : hour;
            var minute = time.getMinutes();
            minute = String(minute).length === 1 ? '0' + minute : minute;
            var second = time.getSeconds();
            second = String(second).length === 1 ? '0' + second : second;
            var string = style.replace(/yyyy/i, year).replace(/MM/i, month).replace(/dd/i, date)
                .replace(/hh/i, hour).replace(/mi/i, minute).replace(/ss/i, second);
            return string;
        }

    },
    formatText: function (text, style) {
        var string = String(text).replace(/年/, '-').replace(/月/, '-').replace(/日/, '');
        return this.format(string, style);
    },
    getTheLocalDate:function (dt) {
        var today = dt === undefined ? new Date() : new Date(dt);
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        month = String(month).length === 1 ? '0' + month : month;
        var date = today.getDate();
        date = String(date).length === 1 ? '0' + date : date;
        return year + '年' + month + '月' + date + '日';
    },
    dateFormat :function(date,fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
};
// /**
//  * 登录身份验证
//  * @method login
//  * @para name：登录用户名
//  * @para pwd：登录密码
//  * @para url：跳转地址
//  */
// var login = function (name, pwd, url) {
//     var data = {
//         username: name,
//         password: pwd
//     };
//     if(isEmpty(charFilter(name))){
//         msgBox.showOut('请输入姓名');
//         return;
//     }
//     if(isEmpty(charFilter(pwd))){
//         msgBox.showOut('请输入密码');
//         return;
//     }
//     ajaxUtil.ajaxLogin(common.loginApi, data).then(function () {
//         window.location.href = url;
//     });
// };

/**
 * 输入对象空判断

 */
var isEmpty = function(v) {
    switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
            break;
        case 'boolean':
            if (!v) return true;
            break;
        case 'number':
            if (0 === v || isNaN(v)) return true;
            break;
        case 'object':
            if (null === v || v.length === 0) return true;
            for (var i in v) {
                return false;
            }
            return true;
    }
    return false;
};

/**
 * 输入对象字符过滤
 * @method charFilter
 * @param str 输入对象
 */
var charFilter = function (str) {
    console.log("charFilter("+str+")");
    var str1 = str.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');// 去掉转义字符
    var str2= str1.replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '');// 去掉特殊字符
    return str2;
};

/**
 * 信息弹出框
 */
var msgBox = {
    /**
     * 信息框渲染到页面
     * @method appendToDom
     */
    appendToDom : function (that) {
        console.log(that + " .page-wrap");
        var content = '<div class="msg-box-wrap" id="msg-box">'+
                '<div class="msg-box">'+
                    '<a href="#" data-ajax="false" class="msgClose">×</a>'+
                    '<div id="msg-box-tips"></div>'+
                '</div>'+
            '</div>';
        $(content).appendTo(that);

        $(".msg-box").css({
            background: "rgba(0, 0, 0, 0.6) none repeat scroll 0 0",
            width: "80%",
            height: "50px",
            padding: "5px 0",
            margin: "0 auto",
            textAlign: "right",
            borderRadius : "8px",
            color: "#fff"

        });
        $(".msgClose").css({
            paddingRight: "10px",
            textDecoration: "none",
            color: "#fff"
        });
        $("#msg-box-tips").css({
            padding: "0 20px",
            textAlign: "center",
            wordBreak: "keep-all",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        });
        $(".msg-box-wrap").css({
            width: "100%",
            height: "50px",
            bottom: "-1000px",
            fontSize: "15px",
            left: "0",
            position: "fixed",
            zIndex: "10000"
        });
        $(document).off("click", ".msgClose")
            .on("click", ".msgClose", function () {
            $('#msg-box').hide();
        })
    },
    /**
     * 信息弹出框
     * @method showOut
     * @param str 弹出信息内容
     */
    showOut : function (str) {
        $('#msg-box').show();
        $('#msg-box-tips').empty().html(str);
        var h = $('#msg-box').outerHeight();
        $('#msg-box').css('bottom', -50+'px').animate({bottom:'55px'},1000);
        setTimeout("$('#msg-box').animate({bottom:'"+(-50)+"px'},500)", 4000 );
    }
};

/**
 * 获取当前Url中的输入对象参数值
 * @method getQueryString
 * @param name 输入对象名称
 */
var getUrlString = function (name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
};


/**
 * 时间管理空间
 * @method countDown：倒计时方法
 */
var timeControl = {
    /**
     * 倒计时方法
     * @param maxtime：输入/当前时间对象（倒计时起点时间）
     */
    countDown : function (maxtime) {
        var hours,minutes,seconds,msg,msg2;
        if (maxtime >= 0) {
            hours = Math.floor(maxtime / 3600);
            minutes = Math.floor(maxtime / 60 % 60);
            seconds = Math.floor(maxtime % 60);
            msg2 = minutes >0 ? minutes + "分" + seconds + "秒" : seconds + "秒";
            msg = hours >0 ? hours + "时" + minutes + "分" + seconds + "秒" : msg2;
            $("#timer").html(msg);
            // if (maxtime == 5 * 60)alert("还剩5分钟");
            --maxtime;
            timer = setInterval(function () {
                clearInterval(timer);
                timeControl.countDown(maxtime);
            },1000);
        } else{
            clearInterval(timer);
            alert("时间到，结束!");
        }
    },
    /**
     * 格式化时间日期到微秒
     * @method formatToNS
     * @param nS 输入时间对象
     */
    formatToNS : function (nS) {
        var now = new Date(nS);
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //分
        var clock = year + "-";
        if (month < 10) clock += "0";
        clock += month + "-";
        if (day < 10) clock += "0";
        clock += day + " ";
        if (hh < 10) clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm + ":";
        clock += ss;
        return clock;
    }
};

/**
 * dom对象集合
 */
var domObjs = {
    pageWrap : $(".page-wrap"),
    mobile : $("#mobile"),
    pwd : $("#password"),
    repwd : $("#re-password"),
    user_name : $("#user-name"),
    mockExam : $("#mock-exam"),
    review : $("#review"),
    examRecord : $("#exam-record"),
    infoTable : $(".personal-info-table"),
    resultToastWrap : $(".result-toast-wrap"),
    recordWrap : $(".record-wrap"),
};

