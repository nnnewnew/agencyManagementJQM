/**
 * Project
 * @author: nn (Easy-link Co.)
 * @update: nn (2018-3-6 15:10)
 */

var resizeWinTable = {
    fullHeight : function (obj){
        obj.css({
            height : window.innerHeight - 150,
            // overflowY : "scroll",
            // overflowScrolling : "touch"
        });
    },
    withHeaderHeight : function (obj) {
        obj.css({
            minHeight : window.innerHeight - 57
        });
    },
    fullAllMinHeight : function (obj) {
        obj.css({
            minHeight : window.innerHeight
        });
    }
};

var initElement = function () {
    var contentWrap = $(".content-wrap");
    resizeWinTable.fullAllMinHeight(contentWrap);

    resizeWinTable.fullAllMinHeight($("#add-mission"));
    resizeWinTable.fullAllMinHeight($("#add-company"));
    resizeWinTable.withHeaderHeight($("#personal-about"));
};

var	footerBtnMotion = {
    getDefaultMark : function (obj) {
        // console.log(obj);
        var _tail = $(obj).attr("id").split("-")[2] ? '-'+$(obj).attr("id").split("-")[2] : '';
        var curBtn = $(obj).attr("id").split("-")[1] + _tail;
        // console.log($(obj).find("#"+curBtn));
        // console.log(curBtn);
        $(obj).find("#"+curBtn).addClass("cur");
    },
    clicked : function (obj) {
        console.log(obj);
        // $(obj).addClass("cur").siblings().removeClass("cur");
        // console.log(URLS.BASE + 'page-' + obj.id + '.html');
        $.mobile.changePage('page-' + obj.id + '.html', {
            transition: "none",
            changeHash: true
        });
    }
};

function getDocumentTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

/**
 * page-index (page-mission)
 */
var logout = function () {
    ajaxUtil.ajaxPost(API.LOGOUT,{},token)
        .then(function () {
            sessionStorage.removeItem('token');
            $.mobile.changePage(PAGE.PAGE_LOGIN, {
                transition: "none",
                changeHash: true
            });
        });
};
var misssions = {
    clearTable : function () {
        $("#page-index .mission-table").html("");
    },
    changeStatus : function (obj) {
        obj.addClass("cur").siblings().removeClass("cur");
        return $("#all").hasClass("cur") ? "" : "1";
    },
    setFilter : function (name, cur, status) {
        var data = {
            name : name,
            current : cur,
            status : status
        };
        return ajaxUtil.ajaxGet(API.GET_MISSIONS, data, token)
    },
    appendList : function (res) {
        console.log(res);
        $.each(res, function (index, item) {
            var content = '<div class="mission-item-wrap" id="'+item.id+'">'+
                '<div class="mission-item">'+
                '<div class="item-left">';
            if(item.business.length > 0 ) {
                content += '<p class="">'+item.business[0].name+'</p>';
            }
            if(item.business.length > 1 ) {
                content += '<p class="">'+item.business[1].name+'</p>';
            }
                content +='<p>(<span id="mission-done-count">'+item.finished+'</span>/<span id="mission-all-count">'+item.total+'</span>)';
            if (item.business.length > 2 ){
                content += '<span>……</span>';
            }
            content += '</p>'+
                '</div>'+
                '<div class="item-right">'+
                '<p>'+item.type+'</p>'+
                '<p>&nbsp;</p>'+
                '<p>'+item.companyName+'</p>'+
                '</div>'+
                '<div class="clear"></div>'+
                '</div>'+
                '</div>';
            $(content).appendTo("#page-index .mission-table");
        });

    }
};
var bottomBar = {
    getRight : function () {
        return ajaxUtil.ajaxGet(API.GET_PERSONAL_INFO, {id:token}, token)
    },
    appendToDom : function (res) {
        switch (res) {
            case 1:
                bottomBar.managerBar();
                break;
            case 2:
                bottomBar.mainBar();
                break;
            case 3:
                bottomBar.agencyBar();
                break;
        }
    },
    managerBar : function () {
        var content = '<div class="btn-footer" id="index">\n' +
            '\t\t\t\t\t\t<p><i class="fa fa-home"></i></p>\n' +
            '\t\t\t\t\t\t<p>当前任务</p>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t<div class="btn-footer" id="index-company">\n' +
            '\t\t\t\t\t\t<p><i class="fa fa-file-text-o"></i></p>\n' +
            '\t\t\t\t\t\t<p>公司信息</p>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t<div class="btn-footer" id="index-employ">\n' +
            '\t\t\t\t\t\t<p><i class="fa fa-id-card-o"></i></p>\n' +
            '\t\t\t\t\t\t<p>员工信息</p>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t<div class="btn-footer" id="index-personal-about">\n' +
            '\t\t\t\t\t\t<p><i class="fa fa-user-o"></i></p>\n' +
            '\t\t\t\t\t\t<p>个人中心</p>\n' +
            '\t\t\t\t\t</div>';
        $(content).appendTo(".footer-bar");
    },
    mainBar : function () {
        var content = '<div class="btn-footer" id="index">\n' +
            '\t\t\t\t\t\t<p><i class="fa fa-home"></i></p>\n' +
            '\t\t\t\t\t\t<p>当前任务</p>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t<div class="btn-footer" id="index-company">\n' +
            '\t\t\t\t\t\t<p><i class="fa fa-file-text-o"></i></p>\n' +
            '\t\t\t\t\t\t<p>公司信息</p>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t<div class="btn-footer" id="index-personal-about">\n' +
            '\t\t\t\t\t\t<p><i class="fa fa-user-o"></i></p>\n' +
            '\t\t\t\t\t\t<p>个人中心</p>\n' +
            '\t\t\t\t\t</div>';
        $(content).appendTo(".footer-bar");
    },
    agencyBar : function () {
        var content = '<div class="btn-footer" id="index">\n' +
            '\t\t\t\t\t\t<p><i class="fa fa-home"></i></p>\n' +
            '\t\t\t\t\t\t<p>当前任务</p>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t<div class="btn-footer" id="index-personal-about">\n' +
            '\t\t\t\t\t\t<p><i class="fa fa-user-o"></i></p>\n' +
            '\t\t\t\t\t\t<p>个人中心</p>\n' +
            '\t\t\t\t\t</div>';
        $(content).appendTo(".footer-bar");
    }
};
$(document).on("pageshow", "#page-index", function(){
    console.log($(this).attr("id"));
    var companyName = $("#search-input").val();
    var current = 1;
    var status;
    var loading = 1;

    initElement();
    localStorage.clear();

    console.log('step1');
    bottomBar.getRight().then(function (value) {
        $(".footer-bar").html('');
        bottomBar.appendToDom(value.roleId);
    });

    misssions.setFilter(companyName, current, '').then(function (res) {
        misssions.clearTable();
        current += 8;
        misssions.appendList(res);
        loading = 1;
    });

    // window.onscroll = function(){
    //     if($(document).height() - $(this).scrollTop() - $(this).height()<50){
    //         if(loading < 2){
    //             misssions.setFilter(companyName, current, '').then(function (res) {
    //                 misssions.clearTable();
    //                 current += 8;
    //                 misssions.appendList(res);
    //                 loading = 1;
    //             });
    //         }
    //         loading++;
    //     }
    // };

    $(document).off("click", "#page-index #search-input")
        .on("click", "#page-index #search-input", function () {
        // status = status || '';
        // misssions.setFilter(companyName, current, status).then(function (res) {
        //     misssions.clearTable();
        //     current = 0;
        //     misssions.appendList(res);
        // });
            console.log(PAGE.PAGE_QUERY_MISSION);
            $.mobile.changePage(PAGE.PAGE_QUERY_MISSION, {
                transition: "none",
                changeHash: true
            });
    });
    $(document).off("click", "#page-index #logout")
        .on("click", "#page-index #logout", function () {
            logout();
    });

    $(document).off("click", "#page-index .bar-btn")
        .on("click", "#page-index .bar-btn", function () {
        status = misssions.changeStatus($(this));

        misssions.setFilter(companyName, current, status).then(function (res) {
            misssions.clearTable();
            current = 1;
            misssions.appendList(res);
        });
    });
    $(document).off("click", "#page-index .btn-add-mission")
        .on("click", "#page-index .btn-add-mission", function () {
            $.mobile.changePage(PAGE.PAGE_ADD_MISSION, {
                transition: "none",
                changeHash: true
            });
    });

    $(document).off("click", "#page-index .mission-item-wrap")
        .on("click", "#page-index .mission-item-wrap", function () {
        $.mobile.changePage(PAGE.PAGE_COMPANY_MISSION + "?id=" + $(this).attr("id"), {
            transition: "none",
            changeHash: true
        });
    });

    footerBtnMotion.getDefaultMark(this);
    $(document).off("click", "#page-index .btn-footer")
        .on("click", "#page-index .btn-footer", function () {
        footerBtnMotion.clicked(this);
    });
});

/**
 * page-add-mission
 */
var choiceTable = {
    loadKinds : function (id) {
        var data = {
            parentId : 0,
        };
        return ajaxUtil.ajaxGet(API.GET_MISSION_KINDS, data, token)
    },
    loadSubKinds : function (id) {
        var data = {
            parentId : id
        };
        return ajaxUtil.ajaxGet(API.GET_MISSION_KINDS, data, token)
    },
    appendTable : function (res) {
        $(".choice-table").html("");
        var content = "";
        $.each(res, function (index, item) {
            content += '<div class="btn-style type-choice" data-val="'+item.id+'">'+item.name+'</div>';
        });
        $(content).appendTo(".choice-table");
    },
    chooseItem : function (obj) {
        obj.addClass("cur").siblings().removeClass("cur");
    },
    chooseItems : function (obj) {
        obj.toggleClass("cur");
    }
};

var addMissionPage = {
    cacheData : function () {
        // localStorage.companyId = $("#page-add-mission #company-name").data("id");
        // localStorage.companyName = $("#page-add-mission #company-name").html();
        localStorage.missionTypeId = $("#page-add-mission .choice-table .cur").data("val");
        localStorage.missionTypeDesc = $("#page-add-mission .choice-table .cur").text() || "";
    },
    cacheStepData : function () {
        // localStorage.attachedId = $("#page-add-mission-step #company-name").data("id");
        // localStorage.attachedName = $("#page-add-mission-step #company-name").html();
        localStorage.missionSubTypeId = $("#page-add-mission-step .choice-table .cur").data("val");
        localStorage.missionSubTypeDesc = $("#page-add-mission-step .choice-table .cur").text();
        var arr = $("#page-add-mission-step .choice-table .cur");
        localStorage.missionSubTypeStrings = "";
        $.each(arr, function (index, item) {
            (index==0) ? localStorage.missionSubTypeStrings = $(item).data("val") : localStorage.missionSubTypeStrings += "|" + $(item).data("val");
        })
    }
};

$(document).on("pageshow", "#page-add-mission", function(){
    console.log($(this).attr("id"));

    initElement();
    msgBox.appendToDom("#page-add-mission");
    choiceTable.loadKinds().then(function (res) {
        choiceTable.appendTable(res);
    });
    $("#page-add-mission #company-name").html(localStorage.companyName);

    $(document).off("click", "#page-add-mission #company-name")
        .on("click", "#page-add-mission #company-name", function () {
            // $(this).blur();
            // choiceToast.loadTable({},API.GET_COMPANY_LIST).then(function (res) {
            //     choiceToast.showTable("公司列表",res);
            // });
            // $(document).off("click", "#page-add-mission .toast-list-item")
            //     .on("click", "#page-add-mission .toast-list-item", function () {
            //         // console.log($(this).attr("id"));
            //         $("#page-add-mission #company-name").data("val", $(this).attr("id"));
            //         $("#page-add-mission #company-name").val($(this).text());
            //         choiceToast.hideTable();
            // });
            $.mobile.changePage(PAGE.PAGE_ADD_MISSION_QUERY, {
                transition: "none",
                changeHash: true
            });
        });

    $(document).off("click", "#page-add-mission .type-choice")
        .on("click", "#page-add-mission .type-choice", function () {
            choiceTable.chooseItem($(this));
        });

    $(document).off("click", "#page-add-mission .choice-button")
        .on("click", "#page-add-mission .choice-button", function () {
            addMissionPage.cacheData();
            if (validUtil.isEmpty($("#page-add-mission #company-name").html())){
                emptyWarning.addTips($("#company-name"));
                return
            }else{
                emptyWarning.clearTips();
            }
            if ($("#page-add-mission .choice-table .cur").length==0){
                emptyWarning.addTips($(".choice-table"));
                return
            }else{
                emptyWarning.clearTips();
            }
            if ( validUtil.isEmpty($("#page-add-mission #company-name").html()) || $("#page-add-mission .choice-table .cur").length==0 ){
                msgBox.showOut("请选择公司及任务类型");
            }else {
                $.mobile.changePage(PAGE.PAGE_ADD_MISSION_STEP, {
                    transition: "none",
                    changeHash: true
                });
            }
        });
});

$(document).on("pageshow", "#page-add-mission-query", function () {
    console.log($(this).attr("id"));
    var query = function () {
        // 取得div层
        var $search = $('#search');
        //取得输入框JQuery对象
        var $searchInput = $search.find('#search-text');
        //关闭浏览器提供给输入框的自动完成
        $searchInput.attr('autocomplete', 'off');
        //创建自动完成的下拉列表，用于显示服务器返回的数据,插入在搜索按钮的后面，等显示的时候再调整位置
        var $autocomplete = $('<div class="autocomplete"></div>')
            .hide()
            .insertAfter('.list');
        //清空下拉列表的内容并且隐藏下拉列表区
        var clear = function () {
            $autocomplete.empty().hide();
        };
        //注册事件，当输入框失去焦点的时候清空下拉列表并隐藏
        $searchInput.blur(function () {
            setTimeout(clear, 500);
        });
        //下拉列表中高亮的项目的索引，当显示下拉列表项的时候，移动鼠标或者键盘的上下键就会移动高亮的项目，想百度搜索那样
        var selectedItem = null;
        //timeout的ID
        var timeoutid = null;
        //设置下拉项的高亮背景
        var setSelectedItem = function (item) {
            //更新索引变量
            selectedItem = item;
            //按上下键是循环显示的，小于0就置成最大的值，大于最大值就置成0
            if (selectedItem < 0) {
                selectedItem = $autocomplete.find('li').length - 1;
            }
            else if (selectedItem > $autocomplete.find('li').length - 1) {
                selectedItem = 0;
            }
            //首先移除其他列表项的高亮背景，然后再高亮当前索引的背景
            $autocomplete.find('li').removeClass('highlight')
                .eq(selectedItem).addClass('highlight');
        };
        var ajax_request = function () {
            // ajax服务端通信
            var data = {
                name : $searchInput.val(),
                current : 1,
                orderby : "",
                belongsTo : ""
            };
            ajaxUtil.ajaxGet(API.GET_COMPANY, data, token).then(function (data) {
                if (data.length) {
                    //遍历data，添加到自动完成区
                    $.each(data, function (index, item) {
                        console.log(item);
                        var content;
                        if(item.active == 1){
                            content = '<div data-id="'+item.id+'" data-name="'+item.name+'" class="mission-item-wrap not">\n';
                        }else {
                            content = '<div data-id="'+item.id+'" data-name="'+item.name+'" class="mission-item-wrap">\n';
                        }
                        content += '\t\t\t\t\t\t<div class="mission-item">\n' +
                            '\t\t\t\t\t\t\t<div class="company-name">'+item.name+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-status">'+item.status+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="clear"></div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-location"><i class="fa fa-location-arrow"></i>'+item.address+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-type">'+item.companyType+'</div>\n' +
                            '\t\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t</div>';
                        $(content).appendTo($autocomplete)
                        //创建li标签,添加到下拉列表中
                        // $('<li></li>').text(term).appendTo($autocomplete)
                            .addClass('clickable')
                            .hover(function () {
                                //下拉列表每一项的事件，鼠标移进去的操作
                                $(this).siblings().removeClass('highlight');
                                $(this).addClass('highlight');
                                selectedItem = index;
                            }, function () {
                                //下拉列表每一项的事件，鼠标离开的操作
                                $(this).removeClass('highlight');
                                //当鼠标离开时索引置-1，当作标记
                                selectedItem = -1;
                            })
                            .click(function () {
                                //鼠标单击下拉列表的这一项的话，就将这一项的值添加到输入框中
                                localStorage.companyId = $(this).data('id');
                                localStorage.companyName = $(this).data('name');
                                $.mobile.changePage(PAGE.PAGE_ADD_MISSION, {
                                    transition: "none",
                                    changeHash: true
                                });
                                // $searchInput.val(term);
                                //清空并隐藏下拉列表
                                $autocomplete.empty().hide();
                            });
                    });//事件注册完毕
                    $('<li>暂无更多信息</li>').appendTo($autocomplete);
                    //设置下拉列表的位置，然后显示下拉列表
                    var ypos = $searchInput.position().top;
                    var xpos = $searchInput.position().left;
                    $autocomplete.css('width', '100%');
                    $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px"});
                    setSelectedItem(0);
                    //显示下拉列表
                    $autocomplete.show();
                }
            });
        };
        //对输入框进行事件注册
        $searchInput
            .keyup(function (event) {
                //字母数字，退格，空格
                if (event.keyCode > 40 || event.keyCode == 8 || event.keyCode == 32) {
                    //首先删除下拉列表中的信息
                    $autocomplete.empty().hide();
                    clearTimeout(timeoutid);
                    timeoutid = setTimeout(function (){
                        ajax_request();
                    }, 100);
                }
                else if (event.keyCode == 38) {
                    //上
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem($autocomplete.find('li').length - 1);
                    }
                    else {
                        //索引减1
                        setSelectedItem(selectedItem - 1);
                    }
                    event.preventDefault();
                }
                else if (event.keyCode == 40) {
                    //下
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem(0);
                    }
                    else {
                        //索引加1
                        setSelectedItem(selectedItem + 1);
                    }
                    event.preventDefault();
                }
            })
            .keypress(function (event) {
                //enter键
                if (event.keyCode == 13) {
                    //列表为空或者鼠标离开导致当前没有索引值
                    if ($autocomplete.find('li').length == 0 || selectedItem == -1) {
                        return;
                    }
                    // $searchInput.val($autocomplete.find('li').eq(selectedItem).text());
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            })
            .keydown(function (event) {
                //esc键
                if (event.keyCode == 27) {
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            });
        //注册窗口大小改变的事件，重新调整下拉列表的位置
        $(window).resize(function () {
            var ypos = $searchInput.position().top;
            var xpos = $searchInput.position().left;
            // $autocomplete.css('width', $searchInput.css('width'));
            $autocomplete.css('width', '100%');
            $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px", 'right': '0'});
        });
    };
    query();

    $(document).off("click", "#page-query-company #cancel")
        .on("click", "#page-query-company #cancel", function () {
            var fromPage = sessionStorage.getItem('fromPage');
            $.mobile.changePage(fromPage, {
                transition: "none",
                changeHash: true
            });
        });
});

/**
 * page-add-mission-step
 */

$(document).on("pageshow", "#page-add-mission-step", function(){
    console.log($(this).attr("id"));

    initElement();
    msgBox.appendToDom("#page-add-mission-step");
    choiceTable.loadSubKinds(localStorage.missionTypeId).then(function (res) {
        choiceTable.appendTable(res);
    });

    $("#page-add-mission-step #company-name").html(localStorage.attachedName);

    $(document).off("click", "#page-add-mission-step #company-name")
        .on("click", "#page-add-mission-step #company-name", function () {
            // $(this).blur();
            // choiceToast.loadTable({companyId : localStorage.companyId},API.GET_EMPLOY).then(function (res) {
            //     choiceToast.showTable("人员列表",res);
            // });
            // $(document).off("click", "#page-add-mission-step .toast-list-item")
            //     .on("click", "#page-add-mission-step .toast-list-item", function () {
            //         // console.log(111111);
            //     $("#page-add-mission-step #company-name").data("val", $(this).attr("id"));
            //     $("#page-add-mission-step #company-name").val($(this).text());
            //         // console.log($(this).data("id"));
            //         // console.log($("#page-add-mission-step #company-name").data("val"));
            //     choiceToast.hideTable();
            // });
            // console.log(localStorage);
            $.mobile.changePage(PAGE.PAGE_ADD_MISSION_STEP_QUERY, {
                transition: "none",
                changeHash: true
            });
        });

    $(document).off("click", "#page-add-mission-step .type-choice")
        .on("click", "#page-add-mission-step .type-choice", function () {
            choiceTable.chooseItems($(this));
        });

    $(document).off("click", "#page-add-mission-step .choice-button")
        .on("click", "#page-add-mission-step .choice-button", function () {
            addMissionPage.cacheStepData();
            if( $("#page-add-mission-step #company-name").html()=="" || $("#page-add-mission-step .choice-table .cur").length==0 ){
                msgBox.showOut("请选择办理人及任务详情");
            }else{
                $.mobile.changePage(PAGE.PAGE_ADD_MISSION_SUBMIT, {
                    transition: "none",
                    changeHash: true
                });
            }
        });
});

$(document).on("pageshow", "#page-add-mission-step-query", function () {
    console.log($(this).attr("id"));

    var query = function () {
        // 取得div层
        var $search = $('#search');
        //取得输入框JQuery对象
        var $searchInput = $search.find('#search-text');
        //关闭浏览器提供给输入框的自动完成
        $searchInput.attr('autocomplete', 'off');
        //创建自动完成的下拉列表，用于显示服务器返回的数据,插入在搜索按钮的后面，等显示的时候再调整位置
        var $autocomplete = $('<div class="autocomplete"></div>')
            .hide()
            .insertAfter('.list');
        //清空下拉列表的内容并且隐藏下拉列表区
        var clear = function () {
            $autocomplete.empty().hide();
        };
        //注册事件，当输入框失去焦点的时候清空下拉列表并隐藏
        $searchInput.blur(function () {
            setTimeout(clear, 500);
        });
        //下拉列表中高亮的项目的索引，当显示下拉列表项的时候，移动鼠标或者键盘的上下键就会移动高亮的项目，想百度搜索那样
        var selectedItem = null;
        //timeout的ID
        var timeoutid = null;
        //设置下拉项的高亮背景
        var setSelectedItem = function (item) {
            //更新索引变量
            selectedItem = item;
            //按上下键是循环显示的，小于0就置成最大的值，大于最大值就置成0
            if (selectedItem < 0) {
                selectedItem = $autocomplete.find('li').length - 1;
            }
            else if (selectedItem > $autocomplete.find('li').length - 1) {
                selectedItem = 0;
            }
            //首先移除其他列表项的高亮背景，然后再高亮当前索引的背景
            $autocomplete.find('li').removeClass('highlight')
                .eq(selectedItem).addClass('highlight');
        };
        var ajax_request = function () {
            // ajax服务端通信
            var data = {
                name : $searchInput.val(),
                current : 1,
                orderby : ""
            };
            ajaxUtil.ajaxGet(API.GET_USER, data, token).then(function (data) {
                if (data.length) {
                    //遍历data，添加到自动完成区
                    $.each(data, function (index, item) {
                        var content;
                        if(item.isDelete == 1){
                            content = '<div data-id="'+item.id+'" data-name="'+item.name+'" class="mission-item-wrap leave">\n';
                        }else {
                            content = '<div data-id="'+item.id+'" data-name="'+item.name+'" class="mission-item-wrap">\n';
                        }
                        content += '\t\t\t\t\t\t<div class="mission-item">\n' +
                            '\t\t\t\t\t\t\t<div class="company-name"><span>'+item.name+'</span><span>'+item.mobile+'</span></div>\n' +
                            '\t\t\t\t\t\t\t<!--<div class="company-isnew">主办橘子</div>-->\n' +
                            '\t\t\t\t\t\t\t<div class="company-status">'+item.status+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="clear"></div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-location">'+item.role+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-type">'+item.department+'</div>\n' +
                            '\t\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t</div>';
                        $(content).appendTo($autocomplete)
                        //创建li标签,添加到下拉列表中
                        // $('<li></li>').text(term).appendTo($autocomplete)
                            .addClass('clickable')
                            .hover(function () {
                                //下拉列表每一项的事件，鼠标移进去的操作
                                $(this).siblings().removeClass('highlight');
                                $(this).addClass('highlight');
                                selectedItem = index;
                            }, function () {
                                //下拉列表每一项的事件，鼠标离开的操作
                                $(this).removeClass('highlight');
                                //当鼠标离开时索引置-1，当作标记
                                selectedItem = -1;
                            })
                            .click(function () {
                                //鼠标单击下拉列表的这一项的话，就将这一项的值添加到输入框中
                                console.log($(this));
                                localStorage.attachedId= $(this).data('id');
                                localStorage.attachedName = $(this).data('name');
                                $.mobile.changePage(PAGE.PAGE_ADD_MISSION_STEP, {
                                    transition: "none",
                                    changeHash: true
                                });
                                // $searchInput.val(term);
                                //清空并隐藏下拉列表
                                $autocomplete.empty().hide();
                            });
                    });//事件注册完毕
                    $('<li>暂无更多信息</li>').appendTo($autocomplete);
                    //设置下拉列表的位置，然后显示下拉列表
                    var ypos = $searchInput.position().top;
                    var xpos = $searchInput.position().left;
                    $autocomplete.css('width', '100%');
                    $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px"});
                    setSelectedItem(0);
                    //显示下拉列表
                    $autocomplete.show();
                }
            });
        };
        //对输入框进行事件注册
        $searchInput
            .keyup(function (event) {
                //字母数字，退格，空格
                if (event.keyCode > 40 || event.keyCode == 8 || event.keyCode == 32) {
                    //首先删除下拉列表中的信息
                    $autocomplete.empty().hide();
                    clearTimeout(timeoutid);
                    timeoutid = setTimeout(function (){
                        ajax_request();
                    }, 100);
                }
                else if (event.keyCode == 38) {
                    //上
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem($autocomplete.find('li').length - 1);
                    }
                    else {
                        //索引减1
                        setSelectedItem(selectedItem - 1);
                    }
                    event.preventDefault();
                }
                else if (event.keyCode == 40) {
                    //下
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem(0);
                    }
                    else {
                        //索引加1
                        setSelectedItem(selectedItem + 1);
                    }
                    event.preventDefault();
                }
            })
            .keypress(function (event) {
                //enter键
                if (event.keyCode == 13) {
                    //列表为空或者鼠标离开导致当前没有索引值
                    if ($autocomplete.find('li').length == 0 || selectedItem == -1) {
                        return;
                    }
                    $searchInput.val($autocomplete.find('li').eq(selectedItem).text());
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            })
            .keydown(function (event) {
                //esc键
                if (event.keyCode == 27) {
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            });
        //注册窗口大小改变的事件，重新调整下拉列表的位置
        $(window).resize(function () {
            var ypos = $searchInput.position().top;
            var xpos = $searchInput.position().left;
            // $autocomplete.css('width', $searchInput.css('width'));
            $autocomplete.css('width', '100%');
            $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px"});
        });
    };
    query();

    $(document).off("click", "#page-query-employ #cancel")
        .on("click", "#page-query-employ #cancel", function () {
            $.mobile.changePage(PAGE.PAGE_EMPLOY, {
                transition: "none",
                changeHash: true
            });
        });
});

/**
 * page-add-mission-submit
 */

var submitInfo = {
    appendData : function () {
        $("#base-company-name").text(localStorage.companyName);
        $("#base-company-name").data("val",localStorage.companyId);
        $("#base-company-attached").text(localStorage.attachedName);
        $("#base-company-attached").data("val",localStorage.attachedId);
        $("#base-company-type").text(localStorage.missionTypeDesc);
        $("#base-company-type").data("val",localStorage.missionTypeId);
        $("#base-company-desc").text(localStorage.missionSubTypeDesc);
        $("#base-company-desc").data("val",localStorage.missionSubTypeId);
    },
    sendInfo : function () {
        var data = {
            companyId : localStorage.companyId,
            userId : localStorage.attachedId,
            items : localStorage.missionSubTypeStrings
        };
        return ajaxUtil.ajaxPost(API.ADD_NEW_MISSION, data, token)
    }
};

$(document).on("pageshow", "#page-add-mission-submit", function(){
    console.log($(this).attr("id"));

    submitInfo.appendData();

    $(document).off("click", "#page-add-mission-submit .footer-btn-submit")
        .on("click", "#page-add-mission-submit .footer-btn-submit", function () {
            submitInfo.sendInfo().then(function () {
                localStorage.clear();
                $.mobile.changePage(PAGE.PAGE_MISSIONS, {
                    transition: "none",
                    changeHash: true
                });
            });
        });
});

/**
 * page-index-company
 */
var company = {
    clearTable : function () {
        $("#page-index-company .mission-table").html("");
    },
    setFilter : function (name, current, orderBy, belongsTo) {
        var data = {
            name : name,
            current : current,
            orderby : orderBy || "",
            belongsTo : belongsTo || ""
        };
        return ajaxUtil.ajaxGet(API.GET_COMPANY, data, token)
    },
    appendList : function (res) {
        $.each(res, function (index, item) {
            var content;
            if(item.active == 1){
                content = '<div id="'+item.id+'" class="mission-item-wrap not">\n';
            }else {
                content = '<div id="'+item.id+'" class="mission-item-wrap">\n';
            }
            content += '\t\t\t\t\t\t<div class="mission-item">\n' +
            '\t\t\t\t\t\t\t<div class="company-name">'+item.name+'</div>\n' +
            '\t\t\t\t\t\t\t<div class="company-status">'+item.status+'</div>\n' +
            '\t\t\t\t\t\t\t<div class="clear"></div>\n' +
            '\t\t\t\t\t\t\t<div class="company-location"><i class="fa fa-location-arrow"></i>'+item.address+'</div>\n' +
            '\t\t\t\t\t\t\t<div class="company-type">'+item.companyType+'</div>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>';
            $(content).appendTo("#page-index-company .mission-table");

        });
    }
};
$(document).on("pageshow", "#page-index-company", function(){
    console.log($(this).attr("id"));
    var name = $("#search-input").val() || "";
    var current = 1;
    var orderBy;
    var belongs;

    initElement();
    localStorage.clear();
    // company.clearTable();
    bottomBar.getRight().then(function (value) {
        bottomBar.appendToDom(value.roleId);
    });

    company.setFilter(name, current).then(function (res) {
        current += 8;
        company.clearTable();
        company.appendList(res);
    });

    // $(document).off("click", "#page-index-company #search-company")
    //     .on("click", "#page-index-company #search-company", function () {
    //     name = $("#search-input").val();
    //     current = 0;
    //     company.setFilter(name, current, orderBy, belongs).then(function (res) {
    //         current += 8;
    //         company.clearTable();
    //         company.appendList(res);
    //     });
    // });

    $(document).off("click", "#page-index-company #search-input")
        .on("click", "#page-index-company #search-input", function () {
            // status = status || '';
            // misssions.setFilter(companyName, current, status).then(function (res) {
            //     misssions.clearTable();
            //     current = 0;
            //     misssions.appendList(res);
            // });
            sessionStorage.setItem('fromPage',PAGE.PAGE_COMPANY);
            console.log(PAGE.PAGE_QUERY_COMPANY);
            $.mobile.changePage(PAGE.PAGE_QUERY_COMPANY, {
                transition: "none",
                changeHash: true
            });
        });

    $(document).off("click", "#page-index-company .bar-btn")
        .on("click", "#page-index-company .bar-btn", function () {
        $(".bar-btns-list").slideToggle();
    });

    $(document).off("click", "#page-index-company .btns-item")
        .on("click", "#page-index-company .btns-item", function () {
            current = 1;
            $("#page-index-company #order-filter").text($(this).text());
            $(this).parent().slideToggle();
            orderBy = $(this).data("val");
            company.setFilter(name, current, orderBy, belongs).then(function (res) {
                current += 8;
                company.clearTable();
                company.appendList(res);
            });
    });


    $(document).off("click", "#page-index-company .mission-item-wrap")
        .on("click", "#page-index-company .mission-item-wrap", function () {
        var id = $(this).attr("id");
        $.mobile.changePage(PAGE.PAGE_COMPANY_INFO + "?id=" + id, {
            transition: "none",
            changeHash: true
        });
    });

    footerBtnMotion.getDefaultMark(this);
    $(document).off("click", "#page-index-company .btn-footer")
        .on("click", "#page-index-company .btn-footer", function () {
        footerBtnMotion.clicked(this);
    });

    $(document).off("click", "#page-index-company .btn-add-mission")
        .on("click", "#page-index-company .btn-add-mission", function () {
        $.mobile.changePage(PAGE.PAGE_ADD_COMPANY, {
            transition: "none",
            changeHash: true
        });
    });
});

/**
 * page-add-company
 */
var companyAdd = {
    loadOptions : function () {
        return ajaxUtil.ajaxGet(API.GET_COMPANY_ADD_OPTION, {}, token)
    },
    postNewCompanyInfo : function (data) {
        return ajaxUtil.ajaxPost(API.ADD_NEW_COMPANY, data, token)
    },
    showTable : function (title,res) {
        // console.log(res);
        $(".toast-wrap").html("");
        $(".toast-wrap").css("display","block");
        var content = '<div class="toast-info-list">\n' +
            '\t\t\t\t\t<div class="toast-list-table">\n' +
            '\t\t\t\t\t\t<div class="toast-title">'+title+'</div>\n';
        $.each(res, function (index, item) {
            content +='\t\t\t\t\t\t<div class="toast-list-item" id="'+item.key+'">'+item.value+'</div>\n';
        });
        content += '\t\t\t\t\t\t<div class="toast-last-item">没有更多了</div>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t</div>';
        $(content).appendTo(".toast-wrap");
    }
};
$(document).on("pageshow", "#page-add-company", function(){
    console.log($(this).attr("id"));

    initElement();
    msgBox.appendToDom("#page-add-company");

    // var url = "http://192.168.2.203:8080/accountant/v1/api/images/upload";
    var url = URLS.BASE + API.UPLOAD_IMG;
    var fileupload1 = '';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        singleFileUploads: true,
        paramName: 'file_photo',
        done: function (e, data) {
            fileupload1 = data.result.data;
            // $("#user_avatar").attr("src",URLS.IMG_SRC + fileupload1);
            var content = '<img src="'+URLS.IMG_SRC + fileupload1+'"/>';
            $(content).appendTo('.pre-img-list');

            var used = $("#img-input-list").val();
            if(!isEmpty(used)){
                $("#img-input-list").val(used + "|" + fileupload1);
            }else {
                $("#img-input-list").val(fileupload1);
            }
            console.log($("#img-input-list").val());
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    var fileupload2 = '';
    $('#fileupload2').fileupload({
        url: url,
        dataType: 'json',
        singleFileUploads: true,
        paramName: 'file_photo',
        done: function (e, data) {
            fileupload2 = data.result.data;
            // $("#user_avatar2").attr("src",URLS.IMG_SRC + fileupload2);
            var content = '<img src="'+URLS.IMG_SRC + fileupload2+'"/>';
            $(content).appendTo('.pre-img-list2');

            var used = $("#img-input-list2").val();
            if(!isEmpty(used)){
                $("#img-input-list2").val(used + "|" + fileupload2);
            }else {
                $("#img-input-list2").val(fileupload2);
            }
            console.log($("#img-input-list2").val());
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $(document).off("click", "#page-add-company .add-option")
        .on("click", "#page-add-company .add-option", function () {
            companyAdd.loadOptions().then(function (res) {
                companyAdd.showTable('添加属性',res);
            });

            $(document).off("click", "#page-add-company .toast-list-item")
                .on("click", "#page-add-company .toast-list-item", function () {
                    var content = '<li class="active-option" id="'+$(this).attr("id")+'">\n' +
                        '\t\t\t\t\t\t\t<div class="company-extra-item" id="insert">\n' +
                        '\t\t\t\t\t\t\t\t<span>'+$(this).text()+'：</span>\n' +
                        '\t\t\t\t\t\t\t\t<span class="btn btn-success fileinput-button">\n' +
                        '\t\t\t\t\t\t\t\t\t<i class="glyphicon glyphicon-plus"></i>\n' +
                        '\t\t\t\t\t\t\t\t\t<span class="see-picture filePicker">插入图片</span>\n' +
                        '\t\t\t\t\t\t\t\t\t<input data-role="none" id="fileupload" name="file_photo" multiple="" type="file">\n' +
                        '\t\t\t\t\t\t\t\t</span>\n' +
                        '\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t\t<div class="pre-img-list">\n' +
                        '\t\t\t\t\t\t\t\t<img id="user_avatar" />\n' +
                        '\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t</li>';
                    $(content).appendTo(".active-options-list");
                    $(".toast-wrap").css("display","none");
                });
        });

    $(document).off("click", "#page-add-company .choice-item")
        .on("click", "#page-add-company .choice-item", function () {
            $(this).addClass("cur").siblings().removeClass("cur");

            if($(this).parent().parent().parent().attr('id')==='add-company-stamp'){
                $("#isStamp").val($(this).children(".choice-status").data('id'));
            }else {
                $("#isDelete").val($(this).children(".choice-status").data('id'));
            }
        });

    $(document).off("click", "#page-add-company .footer-btn-submit")
        .on("click", "#page-add-company .footer-btn-submit", function () {
            if(validUtil.isEmpty($("#add-company-name").val())){
                emptyWarning.addTips($("#add-company-name"));
                return
            }else {
                emptyWarning.clearTips();
            }
            if(validUtil.isEmpty($("#add-company-address").val())){
                emptyWarning.addTips($("#add-company-address"));
                return
            }else {
                emptyWarning.clearTips();
            }
            if(validUtil.isEmpty($("#add-contract-user").val())){
                emptyWarning.addTips($("#add-contract-user"));
                return
            }else {
                emptyWarning.clearTips();
            }
            if(validUtil.isEmpty($("#add-company-contract").val())){
                emptyWarning.addTips($("#add-company-contract"));
                return
            }else {
                emptyWarning.clearTips();
            }
            if(validUtil.isEmpty($("#add-company-code").val())){
                emptyWarning.addTips($("#add-company-code"));
                return
            }else {
                emptyWarning.clearTips();
            }
            // // var valiRes = validUtil.isEmpty($("#add-company-name").val())
            // //     || validUtil.isEmpty($("#add-company-address").val())
            // //     || validUtil.isEmpty($("#add-contract-user").val())
            // //     || validUtil.isEmpty($("#add-company-contract").val())
            // //     || validUtil.isEmpty($("#add-company-code").val());
            // // if (!valiRes){
            //     emptyWarning.clearTips();
            //     var data = {
            //         isDelete : $("#add-company-status .cur .choice-status").attr("data-id"),
            //         name : $("#add-company-name").val(),
            //         registerAddress : $("#add-company-address").val(),
            //         contact : $("#add-contract-user").val(),
            //         mobile : $("#add-company-contract").val(),
            //         creditCode : $("#add-company-code").val(),
            //         isStamp : $("#add-company-stamp .cur .choice-status").attr("data-id"),
            //         operateLicense : fileupload1,
            //         establishLicense : fileupload2,
            //     };
            //     companyAdd.postNewCompanyInfo(data).then(function () {
            //         $.mobile.changePage(PAGE.PAGE_COMPANY, {
            //             transition: "none",
            //             changeHash: true
            //         });
            //     });
            // // }
            $.fn.serializeJson= function()
            {
                var o = {};
                var a = this.serializeArray();
                $.each(a, function(){
                    if(o[this.name]){
                        if(!o[this.name].push){
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value ||'');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };

            console.log($("form").serializeJson());
            var data = $("form").serializeJson();
            emptyWarning.clearTips();
            companyAdd.postNewCompanyInfo(data).then(function () {
                $.mobile.changePage(PAGE.PAGE_COMPANY, {
                    transition: "none",
                    changeHash: true
                });
            });
    });
});

/**
 * page-company-info
 */
var companyInfo = {
    loadData : function (id) {
        var data = {
            id : id
        };
        return ajaxUtil.ajaxGet(API.GET_COMPANY_INFO, data, token)
    },
    appendInfo : function (res) {
        if(!res.isDelete){
            $("#base-company-status").addClass("has");
            $("#base-company-status").html("启用");
        }else {
            $("#base-company-status").html("停用");
        }
        $("#base-company-name").html(res.name||"");
        $("#base-company-address").html(res.registerAddress||"");
        $("#base-company-contact").html(res.contact||"");
        $("#base-company-tel").html(res.mobile||"");
        $("#base-company-code").html(res.creditCode||"");
        if(res.isStamp){
            $(".stamp").addClass("has");
            $(".stamp").html("有");
        }else{
            $(".stamp").html("无");
        }
        if (res.businessLicense) {
            $(".see-picture").attr("id",res.businessLicense);
        }else{
            $(".see-picture").text("无");
            $(".see-picture").css("cursor","none");
            $(document).off("click", ".see-picture");
        }
        if(res.openLicense){
            $(".permission").attr("id",res.openLicense);
        }else{
            $(".permission").text("无");
            $(".permission").css("cursor","none");
            $(document).off("click", ".see-picture");
        }
        $("#current-mission-count").html(res.currentTask);
        $("#history-done-count").html(res.finishedTask);
        $("#history-all-count").html(res.totalTask);
    }
};
$(document).on("pageshow", "#page-company-info", function(){
    console.log($(this).attr("id"));

    var companyId = getUrlString("id");
    companyInfo.loadData(companyId).then(function (res) {
        companyInfo.appendInfo(res);
    });

    $(document).off("click", ".see-picture")
        .on("click", ".see-picture", function (event) {
        event.preventDefault();
            window.location.href = $(".see-picture").attr("id");
    });

    $(document).off("click", ".permission")
        .on("click", ".see-picture", function (event) {
            event.preventDefault();
            window.location.href = $(".permission").attr("id");
        });

    $(document).off("click", ".btn-mission-detail")
        .on("click", ".btn-mission-detail", function () {
        $.mobile.changePage(PAGE.PAGE_COMPANY_MISSION + "?id=" + companyId, {
            transition: "none",
            changeHash: true
        });
    });
});

$(document).on("pageshow", "#page-company-list", function(){
    console.log($(this).attr("id"));
});

/**
 * page-company-mission
 */
var companyMissions = {
    loadData : function (id) {
        var data = {
            id : id
        };
        return ajaxUtil.ajaxGet(API.GET_COMPANY_TASK, data, token)
    },
    appendInfo : function (res) {
        $(".service-object").html(res.name);
        $(".service-type").html(res.type || "新办企业");
        if(res.type==null){
            $(".service-type").addClass("has");
        }
        $("#user-post").html(res.userPost || "成员");
        $("#user-name").html(res.userName);
        if (res.monthTask){
            $.each(res.monthTask, function (index, items) {
                var content = '<div class="missions-per-month">\n' +
                    '\t\t\t\t\t\t<div class="mission-date">'+items.month+'</div>\n';
                $.each(items.task, function (index, item) {
                    if (item.status==1) {
                        content += '\t\t\t\t\t\t<div class="mission-list-item" id="'+item.id+'">\n' +
                            '<div class="mission-group">\n' +
                            '\t\t\t\t\t\t\t\t<span class="mission-status">进行中</span>\n' +
                            '\t\t\t\t\t\t\t\t<span class="mission-desc">'+item.name+'</span>\n' +
                            '\t\t\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t\t\t<div style="" class="btn-change-attach">转发</div>' +
                            '\t\t\t\t\t\t</div>\n';
                    }else {
                        content += '\t\t\t\t\t\t<div class="mission-list-item done" id="'+item.id+'">\n' +
                            '\t\t\t\t\t\t\t<span class="mission-status">已完结</span>\n' +
                            '\t\t\t\t\t\t\t<span class="mission-desc">'+item.name+'</span>\n' +
                            '\t\t\t\t\t\t\t<span class="btn-change-attach"></span>\n' +
                            '\t\t\t\t\t\t</div>\n';
                    }
                });
                content += '\t\t\t\t\t</div>';
                $("#page-company-mission .mission-list-table").html("");
                $(content).appendTo("#page-company-mission .mission-list-table");
            });
        }
    },
    attachChange : function (task_id, user_id) {
        var data = {
            taskId : task_id,
            userId : user_id
        };
        return ajaxUtil.ajaxPut(API.CHANGE_ATTACHED_USER, data, token);
    }
};
var choiceToast = {
    loadTable : function (data, api) {
        return ajaxUtil.ajaxGet(api, data, token)
    },
    showTable : function (title, res) {
        // console.log(res);
        $(".toast-wrap").html("");
        $(".toast-wrap").css("display","block");
        var content = '<div class="toast-info-list">\n' +
            '\t\t\t\t\t<div class="toast-list-table">\n' +
            '\t\t\t\t\t\t<div class="toast-title">'+title+'</div>\n';
        $.each(res, function (index, item) {
            content +='\t\t\t\t\t\t<div class="toast-list-item" id="'+item.id+'">'+item.name+'</div>\n';
        });
        content += '\t\t\t\t\t\t<div class="toast-last-item">没有更多了</div>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t</div>';
        $(content).appendTo(".toast-wrap");
    },
    hideTable : function () {
        $(".toast-wrap").css("display","none");
    }
};
var loadIcon = {
    showUp : function () {
        $(".loading").css("display","block");
        setTimeout(function () {
            loadIcon.hide();
            msgBox.showOut("当前网络状态不稳定，请更换网络后刷新页面");
        },60000);
    },
    hide : function () {
        $(".loading").css("display","none");
    }
};
$(document).on("pageshow", "#page-company-mission", function(){
    console.log($(this).attr("id"));

    var companyId = getUrlString("id");
    companyMissions.loadData(companyId).then(function (res) {
        companyMissions.appendInfo(res);
    });

    $(document).off("click", "#page-company-mission .btn-change-record")
        .on("click", "#page-company-mission .btn-change-record", function () {
        loadIcon.showUp();
        choiceToast.loadTable({}, API.GET_CHANGE_RECORD).then(function (res) {
            var title = "变更记录";
            loadIcon.hide();
            choiceToast.showTable(title, res);
        });
    });

    $(document).off("click", "#page-company-mission #balance-sheet")
        .on("click", "#page-company-mission #balance-sheet", function () {
            $.mobile.changePage(PAGE.PAGE_BALANCE_SHEET + "?id=" + companyId, {
                transition: "none",
                changeHash: true
            });
        });
    $(document).off("click", "#page-company-mission #profit-statement")
        .on("click", "#page-company-mission #profit-statement", function () {
            $.mobile.changePage(PAGE.PAGE_PROFIT_STATEMENT + "?id=" + companyId, {
                transition: "none",
                changeHash: true
            });
        });
    $(document).off("click", "#page-company-mission #basic-data")
        .on("click", "#page-company-mission #basic-data", function () {
            $.mobile.changePage(PAGE.PAGE_BASIC_DATA + "?id=" + companyId, {
                transition: "none",
                changeHash: true
            });
        });


    $(document).off("click", "#page-company-mission .mission-group")
        .on("click", "#page-company-mission .mission-group", function () {
        var id = $(this).parent().attr("id");
        $.mobile.changePage(PAGE.PAGE_MISSION_DETAIL + "?id=" + id, {
            transition: "none",
            changeHash: true
        });
    });

    $(document).off("click", "#page-company-mission .btn-change-attach")
        .on("click", "#page-company-mission .btn-change-attach", function () {
            loadIcon.showUp();
            choiceToast.loadTable({}, API.GET_EMPLOY).then(function (res) {
                var title = "人员列表";
                loadIcon.hide();
                choiceToast.showTable(title, res);
            });
            var task_id = $(this).parent().attr("id");
            $(document).off("click", "#page-company-mission .toast-list-item")
                .on("click", "#page-company-mission .toast-list-item", function () {
                    var user_id = $(this).attr("id");
                    companyMissions.attachChange(task_id, user_id).then(function (res) {
                        choiceToast.hideTable();
                    });

                    choiceToast.hideTable(); //此处暂无接口
                });
    });
});

/**
 * page-balance-sheet
 */
var balanceSheet = {
    loadData : function (token, cur) {
        var data = {
            companyId : getUrlString("id"),
            current : cur
        };
        return ajaxUtil.ajaxGet(API.GET_BALANCE_SHEET, data, token)
    },
    appendList : function (res) {
        var content = "";
        $("#page-balance-sheet .balance-data-table").html('');
        $.each(res, function (index, item) {
            content += '<li class="balance-item" id="'+item.id+'" data-val="'+item.picture+'">'+
                '<span>'+ item.month +'数据</span>';
            if(item.picture){
                content += '<span class="done">已上传<i class="fa fa-angle-right"></i></span>';
            }else {
                content += '<span class="">上传<i class="fa fa-angle-right"></i></span>';
            }
            content += '</li>';
            $(content).appendTo("#page-balance-sheet .balance-data-table");
        });
    }
};
$(document).on("pageshow", "#page-balance-sheet", function(){
    console.log($(this).attr("id"));
    var pageCurrent = 1;

    initElement();

    balanceSheet.loadData(token, pageCurrent).then(function (res) {
        pageCurrent ++;
        balanceSheet.appendList(res);
    });

    $(document).off("click", "#page-balance-sheet .balance-item")
        .on("click", "#page-balance-sheet .balance-item", function () {
            // console.log($(this).attr("id"));
            if(isEmpty($(this).data("val"))){
                $.mobile.changePage(PAGE.PAGE_BALANCE_SHEET_NEW + "?id=" + $(this).attr("id"), {
                    transition: "none",
                    changeHash: true
                });
            }else {
                $.mobile.changePage(PAGE.PAGE_BALANCE_SHEET_DETAIL + "?id=" + $(this).attr("id"), {
                    transition: "none",
                    changeHash: true
                });
            }
        });

});

/**
 * page-balance-sheet-detail
 */
var balanceSheetDetail = {
    loadData : function (token) {
        var data = {
            id : getUrlString("id")
        };
        return ajaxUtil.ajaxGet(API.GET_BALANCE_SHEET_DETAIL, data, token)
    },
    appendInfo : function (res) {
        $(".backup-words").html(res.remark);
        $("#img-list img").attr('src', URLS.IMG_SRC + res.picture);
    }
};
$(document).on("pageshow", "#page-balance-sheet-detail", function(){
    console.log($(this).attr("id"));

    initElement();

    balanceSheetDetail.loadData(token).then(function (res) {
        balanceSheetDetail.appendInfo(res);
    });

    $(document).off("click", "#page-balance-sheet-detail #insert-img")
        .on("click", "#page-balance-sheet-detail #insert-img", function () {
            // console.log($(this).attr("id"));
            $.mobile.changePage(PAGE.PAGE_BALANCE_SHEET_DETAIL + "?id=" + $(this).attr("id"), {
                transition: "none",
                changeHash: true
            });
        });

});

/**
 * page-balance-sheet-new
 */
var balanceSheetNew = {
    uploadData : function (fileupload1, token) {
        var data = {
            id : getUrlString("id"),
            remark : $("#backup").val(),
            picture : fileupload1,
        };
        return ajaxUtil.ajaxPost(API.UPDATE_BALANCE_SHEET_DETAIL, data, token)
    }
};
$(document).on("pageshow", "#page-balance-sheet-new", function(){
    console.log($(this).attr("id"));

    initElement();

    var url = URLS.BASE + API.UPLOAD_IMG;
    var fileupload1 = '';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        singleFileUploads: true,
        paramName: 'file_photo',
        done: function (e, data) {
            fileupload1 = data.result.data;
            $("#user_avatar").attr("src",URLS.IMG_SRC + fileupload1);
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $(document).off("click", "#page-balance-sheet-new .footer-btn-submit")
        .on("click", "#page-balance-sheet-new .footer-btn-submit", function () {
            // console.log($(this).attr("id"));
            balanceSheetNew.uploadData(fileupload1,token);
        });

});

/**
 * page-profit-statement
 */
var profitStatement = {
    loadData : function (token, cur) {
        var data = {
            companyId : getUrlString("id"),
            current : cur
        };
        return ajaxUtil.ajaxGet(API.GET_PROFIT_STATEMENT, data, token)
    },
    appendList : function (res) {
        var content = "";
        $("#page-profit-statement .balance-data-table").html('');
        $.each(res, function (index, item) {
            content += '<li class="balance-item" id="'+item.id+'" data-val="'+item.picture+'">'+
                '<span>'+ item.month +'数据</span>';
            if(item.picture){
                content += '<span class="done">已上传<i class="fa fa-angle-right"></i></span>';
            }else {
                content += '<span class="">上传<i class="fa fa-angle-right"></i></span>';
            }
            content += '</li>';
            $(content).appendTo("#page-profit-statement .balance-data-table");
        });
    }
};
$(document).on("pageshow", "#page-profit-statement", function(){
    console.log($(this).attr("id"));
    var pageCurrent = 1;

    initElement();

    profitStatement.loadData(token, pageCurrent).then(function (res) {
        pageCurrent ++;
        profitStatement.appendList(res);
    });


    $(document).off("click", "#page-profit-statement .balance-item")
        .on("click", "#page-profit-statement .balance-item", function () {
            // console.log($(this).attr("id"));
            console.log(isEmpty($(this).data("val")));
            if(isEmpty($(this).data("val"))){
                $.mobile.changePage(PAGE.PAGE_PROFIT_STATEMENT_NEW + "?id=" + $(this).attr("id"), {
                    transition: "none",
                    changeHash: true
                });
            }else{
                $.mobile.changePage(PAGE.PAGE_PROFIT_STATEMENT_DETAIL + "?id=" + $(this).attr("id"), {
                    transition: "none",
                    changeHash: true
                });
            }
        });
});

/**
 * page-profit-statement-detail
 */
var profitStatementDetail = {
    loadData : function (token) {
        var data = {
            id : getUrlString("id")
        };
        return ajaxUtil.ajaxGet(API.GET_PROFIT_STATEMENT_DETAIL, data, token)
    },
    appendInfo : function (res) {
        $(".backup-words").html(res.remark);
        $("#img-list img").attr('src',URLS.IMG_SRC + res.picture);
    }
};
$(document).on("pageshow", "#page-profit-statement-detail", function(){
    console.log($(this).attr("id"));

    initElement();

    profitStatementDetail.loadData(token).then(function (res) {
        profitStatementDetail.appendInfo(res);
    });


    $(document).off("click", "#page-profit-statement-detail #insert-img")
        .on("click", "#page-profit-statement-detail #insert-img", function () {
            // console.log($(this).attr("id"));

        });
});

/**
 * page-profit-statement-new
 */
var profitStatementNew = {
    uploadData : function (fileupload1, token) {
        var data = {
            id : getUrlString("id"),
            remark : $("#backup").val(),
            picture : fileupload1,
        };
        return ajaxUtil.ajaxPost(API.UPDATE_PROFIT_STATEMENT_DETAIL, data, token)
    }
};
$(document).on("pageshow", "#page-profit-statement-new", function(){
    console.log($(this).attr("id"));

    initElement();

    var url = URLS.BASE + API.UPLOAD_IMG;
    var fileupload1 = '';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        singleFileUploads: true,
        paramName: 'file_photo',
        done: function (e, data) {
            fileupload1 = data.result.data;
            $("#user_avatar").attr("src",URLS.IMG_SRC + fileupload1);
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $(document).off("click", "#page-profit-statement-new .footer-btn-submit")
        .on("click", "#page-profit-statement-new .footer-btn-submit", function () {
            // console.log($(this).attr("id"));
            profitStatementNew.uploadData(fileupload1,token).then(function (value) {
                window.history.back();
            });
        });
});

/**
 * page-basic-data
 */
var basicData = {
    loadData : function (token) {
        var data = {
            companyId : getUrlString("id")
        };
        return ajaxUtil.ajaxGet(API.GET_BASIC_DATA, data, token)
    },
    appendList : function (res) {
        var content = "";
        $("#page-basic-data .balance-data-table").html('');
        $.each(res, function (index, item) {
            content += '<li class="balance-item" id="'+item.id+'" data-val="'+item.remark+'">'+
                '<span>'+ item.month +'数据</span>';
            if(item.isUploaded ==='1'){
                content += '<span class="done">已上传<i class="fa fa-angle-right"></i></span>';
            }else {
                content += '<span class="">上传<i class="fa fa-angle-right"></i></span>';
            }
            content += '</li>';
            $(content).appendTo("#page-basic-data .balance-data-table");
        });
    }
};
$(document).on("pageshow", "#page-basic-data", function(){
    console.log($(this).attr("id"));

    initElement();

    basicData.loadData(token).then(function (res) {
        basicData.appendList(res);
    });


    $(document).off("click", "#page-basic-data .balance-item")
        .on("click", "#page-basic-data .balance-item", function () {
            // console.log($(this).attr("id"));
            if(isEmpty($(this).data("val"))){
                $.mobile.changePage(PAGE.PAGE_BASIC_DATA_NEW + "?id=" + $(this).attr("id"), {
                    transition: "none",
                    changeHash: true
                });
            }else {
                $.mobile.changePage(PAGE.PAGE_BASIC_DATA_DETAIL + "?id=" + $(this).attr("id"), {
                    transition: "none",
                    changeHash: true
                });
            }

        });
});

/**
 * page-basic-data-detail
 */
var basicDataDetail = {
    loadData : function (token) {
        var data = {
            companyId : getUrlString("id")
        };
        return ajaxUtil.ajaxGet(API.GET_BASIC_DATA_DETAIL, data, token)
    },
    appendInfo : function (res) {
        $("#tax").html(res.tax);
        $("#profit").html(res.profit);
        $("#assets").html(res.assets);
        $("#added-value-tax").html(res.addedValueTax);
        $("#consumption-duty").html(res.consumptionDuty);
        $("#city-construction-tax").html(res.cityConstructionTax);
        $("#water-works").html(res.waterWorks);
        $("#tuition-additional").html(res.tuitionAdditional);
        $("#tuition-additional-local").html(res.tuitionAdditionalLocal);
        $("#property-tax").html(res.propertyTax);
        $("#land-use-tax").html(res.landUseTax);
        $("#cultural-tax").html(res.culturalTax);
        $("#stamp-duty").html(res.stampDuty);
        $("#business-income-taxes").html(res.businessIncomeTaxes);
        $("#individual-income-tax").html(res.individualIncomeTax);
    }
};
$(document).on("pageshow", "#page-basic-data-detail", function(){
    console.log($(this).attr("id"));

    initElement();
    var companyId = getUrlString("id");

    basicDataDetail.loadData(token).then(function (res) {
        basicDataDetail.appendInfo(res);
    });
});

/**
 * page-basic-data-detail
 */
var basicDataNew = {
    submitData : function (token) {
        var data = {
            tax : $("#tax").html(),
            profit : $("#profit").html(),
            assets : $("#assets").html()
        };
        return ajaxUtil.ajaxPost(API.UPDATE_BASIC_DATA, data, token)
    }
};
$(document).on("pageshow", "#page-basic-data-detail", function(){
    console.log($(this).attr("id"));

    initElement();
    var companyId = getUrlString("id");

    basicDataDetail.loadData(token).then(function (res) {
        basicDataDetail.appendInfo(res);
    });

    $(document).off("click", "#page-basic-data-detail .footer-btn-submit")
        .on("click", "#page-basic-data-detail .footer-btn-submit", function () {
            // console.log($(this).attr("id"));
            basicDataNew.submitData(token).then(function () {
                $.mobile.changePage(PAGE.PAGE_COMPANY_MISSION + "?id=" + companyId, {
                    transition: "none",
                    changeHash: true
                });
            });
        });
});


/**
 * page-index-employ
 */
var employ = {
    clearTable : function () {
        $("#page-index-employ .mission-table").html("");
    },
    setFilter : function (name, current, orderBy) {
        var data = {
            name : name,
            current : current,
            orderby : orderBy || ""
        };
        return ajaxUtil.ajaxGet(API.GET_USER, data, token)
    },
    appendList : function (res) {
        $.each(res, function (index, item) {
            var content;
            if(item.isDelete == 1){
                content = '<div id="'+item.id+'" class="mission-item-wrap leave">\n';
            }else {
                content = '<div id="'+item.id+'" class="mission-item-wrap">\n';
            }
            content += '\t\t\t\t\t\t<div class="mission-item">\n' +
                '\t\t\t\t\t\t\t<div class="company-name"><span>'+item.name+'</span><span>'+item.mobile+'</span></div>\n' +
                '\t\t\t\t\t\t\t<!--<div class="company-isnew">主办橘子</div>-->\n' +
                '\t\t\t\t\t\t\t<div class="company-status">'+item.status+'</div>\n' +
                '\t\t\t\t\t\t\t<div class="clear"></div>\n' +
                '\t\t\t\t\t\t\t<div class="company-location">'+item.role+'</div>\n' +
                '\t\t\t\t\t\t\t<div class="company-type">'+item.department+'</div>\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>';
            $(content).appendTo("#page-index-employ .mission-table");
        });
    }
};
$(document).on("pageshow", "#page-index-employ", function(){
    console.log($(this).attr("id"));
    var name = $("#search-input").val();
    var current = 1;
    var orderBy;

    initElement();
    localStorage.clear();
    // employ.clearTable();

    bottomBar.getRight().then(function (value) {
        bottomBar.appendToDom(value.roleId);
    });

    employ.setFilter(name, current).then(function (res) {
        current += 8;
        employ.clearTable();
        employ.appendList(res);
    });

    // $(document).off("click", "#page-index-employ #search-company")
    //     .on("click", "#page-index-employ #search-company", function () {
    //     name = $("#search-input").val();
    //     employ.setFilter(name, current, orderBy).then(function (res) {
    //         current += 8;
    //         employ.clearTable();
    //         employ.appendList(res);
    //     });
    // });

    $(document).off("click", "#page-index-employ #search-input")
        .on("click", "#page-index-employ #search-input", function () {
            // status = status || '';
            // misssions.setFilter(companyName, current, status).then(function (res) {
            //     misssions.clearTable();
            //     current = 0;
            //     misssions.appendList(res);
            // });
            console.log(PAGE.PAGE_QUERY_EMPLOY);
            $.mobile.changePage(PAGE.PAGE_QUERY_EMPLOY, {
                transition: "none",
                changeHash: true
            });
        });

    $(document).off("click", "#page-index-employ .bar-btn")
        .on("click", "#page-index-employ .bar-btn", function () {
        $(".bar-btns-list").slideToggle();
    });

    $(document).off("click", "#page-index-employ .btns-item")
        .on("click", "#page-index-employ .btns-item", function () {
            current = 1;
            $("#page-index-employ #order-filter").text($(this).text());
            $(this).parent().slideToggle();
            orderBy = $(this).data("val");
            employ.setFilter(name, current, orderBy).then(function (res) {
                current += 8;
                employ.clearTable();
                employ.appendList(res);
            });
    });

    $(document).off("click", "#page-index-employ .btn-add-mission")
        .on("click", "#page-index-employ .btn-add-mission", function () {
        $.mobile.changePage(PAGE.PAGE_ADD_EMPLOY, {
            transition: "none",
            changeHash: true
        });
    });

    $(document).off("click", "#page-index-employ .mission-item-wrap")
        .on("click", "#page-index-employ .mission-item-wrap", function () {
        var id = $(this).attr("id");
        $.mobile.changePage(PAGE.PAGE_EMPLOY_INFO + "?id=" + id, {
            transition: "none",
            changeHash: true
        });
    });

    footerBtnMotion.getDefaultMark(this);
    $(document).off("click", "#page-index-employ .btn-footer")
        .on("click", "#page-index-employ .btn-footer", function () {
        footerBtnMotion.clicked(this);
    });

    $(document).off("click", "#page-index-employ .btn-add-mission")
        .on("click", "#page-index-employ .btn-add-mission", function () {
            $.mobile.changePage(PAGE.PAGE_ADD_EMPLOY, {
                transition: "none",
                changeHash: true
            });
        });
});

/**
 * page-add-employ
 */
var employAdd = {
    postNewEmployInfo : function (data) {
        return ajaxUtil.ajaxPost(API.ADD_NEW_EMPLOY, data, token)
    }
};

var emptyWarning = {
    addTips : function(that){
        that.addClass("vali-tips");
        that.attr("placeholder","此项内容不能为空");
        msgBox.showOut("提示项不能为空！");
        return
    },
    clearTips : function(){
        $(".page-wrap input").removeClass("vali-tips");
    }
};
$(document).on("pageshow", "#page-add-employ", function(){
    console.log($(this).attr("id"));
    msgBox.appendToDom("#page-add-employ");

    $(document).off("click", "#page-add-employ .choice-item")
        .on("click", "#page-add-employ .choice-item", function () {
            $(this).addClass("cur").siblings().removeClass("cur");
        });

    $(document).off("click", "#page-add-employ #add-employ-post")
        .on("click", "#page-add-employ #add-employ-post", function () {
            choiceToast.loadTable({}, API.GET_EMPLOY_POST).then(function (res) {
                choiceToast.showTable("岗位选择", res);
            });
            $(document).off("click", "#page-add-employ .toast-list-item")
                .on("click", "#page-add-employ .toast-list-item", function () {
                    $("#page-add-employ #add-employ-post").val($(this).text());
                    $("#page-add-employ #add-employ-post").data("id",$(this).attr("id"));
                    choiceToast.hideTable();
            });
        });

    $(document).off("click", "#page-add-employ #add-employ-dept")
        .on("click", "#page-add-employ #add-employ-dept", function () {
            choiceToast.loadTable({}, API.GET_EMPLOY_DEPT).then(function (res) {
                choiceToast.showTable("部门选择", res);
            });
            $(document).off("click", "#page-add-employ .toast-list-item")
                .on("click", "#page-add-employ .toast-list-item", function () {
                $("#page-add-employ #add-employ-dept").val($(this).text());
                $("#page-add-employ #add-employ-dept").data("id",$(this).attr("id"));
                choiceToast.hideTable();
            });
        });

    $(document).off("click", "#page-add-employ .footer-btn-submit")
        .on("click", "#page-add-employ .footer-btn-submit", function () {
            if(validUtil.isEmpty($("#add-employ-name").val())){
                emptyWarning.addTips($("#add-employ-name"));
                return
            }else {
                emptyWarning.clearTips();
            }
            if(validUtil.isEmpty($("#add-employ-mobile").val())){
                emptyWarning.addTips($("#add-employ-mobile"));
                return
            }else {
                emptyWarning.clearTips();
            }
            if(validUtil.isEmpty($("#add-employ-post").val())){
                emptyWarning.addTips($("#add-employ-post"));
                return
            }else {
                emptyWarning.clearTips();
            }
            if(validUtil.isEmpty($("#add-employ-dept").val())){
                emptyWarning.addTips($("#add-employ-dept"));
                return
            }else {
                emptyWarning.clearTips();
            }
            // var valiRes = validUtil.isEmpty($("#add-employ-name").val())
            //     || validUtil.isEmpty($("#add-employ-mobile").val())
            //     || validUtil.isEmpty($("#add-employ-post").val())
            //     || validUtil.isEmpty($("#add-employ-dept").val());
            // if (!valiRes){
                emptyWarning.clearTips();
                var data = {
                    isDelete : $("#add-employ-status .cur").data("val"),
                    kind : $("#add-employ-type .cur").data("val"),
                    name : $("#add-employ-name").val(),
                    mobile : $("#add-employ-mobile").val(),
                    roleId : $("#add-employ-post").data("id"),
                    departmentId : $("#add-employ-dept").data("id"),
                    // date : $("#add-employ-startDate").val()
                };
                employAdd.postNewEmployInfo(data).then(function () {
                    // $.mobile.changePage(PAGE.PAGE_ADD_EMPLOY);
                    $.mobile.changePage(PAGE.PAGE_EMPLOY, {
                        transition: "none",
                        changeHash: true
                    });
                });
            // }
        });
});

/**
 * page-employ-info
 */
var employInfo = {
    loadData : function (id) {
        var data = {
            id : id
        };
        return ajaxUtil.ajaxGet(API.GET_USER_INFO, data, token)
    },
    appendData : function (res) {
        $("#base-employ-name").html(res.name);
        $("#base-employ-tel").html(res.mobile);
        if(!res.isDelete){
            $("#base-employ-status").addClass("has");
        }else {
        }
        $("#base-employ-status").html(res.status);
        $("#base-employ-type").html(res.label);
        $("#base-employ-post").html(res.role);
        $("#base-employ-dept").html(res.department);
        $("#base-employ-date").html(res.created);
        $("#active-company-count").html(res.companyActived);
        $("#attached-company-count").html(res.companyAll);
    }
};
$(document).on("pageshow", "#page-employ-info", function(){
    console.log($(this).attr("id"));

    var id = getUrlString("id");
    employInfo.loadData(id).then(function (res) {
        employInfo.appendData(res);
    });

    $(document).on("click", "#page-employ-info .btn-mission-detail", function () {
        $.mobile.changePage(PAGE.PAGE_EMPLOY_COMPANY + "?id=" + id, {
            transition: "none",
            changeHash: true
        });
    });
});

/**
 * page-employ-company
 */
$(document).on("pageshow", "#page-employ-company", function(){
    console.log($(this).attr("id"));
    var companyName = $("#search-input").val() || "";
    var current = 1;
    var orderBy;
    var belongs = getUrlString("id");

    company.setFilter(companyName, current, orderBy, belongs).then(function (res) {
        company.clearTable();
        current += 8;
        company.appendList(res);
    });
    $(document).off("click", "#page-employ-company .bar-btn")
        .on("click", "#page-employ-company .bar-btn", function () {
        $(".bar-btns-list").slideToggle();
    });

    $(document).off("click", "#page-employ-company .btns-item")
        .on("click", "#page-employ-company .btns-item", function () {
        current = 1;
        $("#page-employ-company #order-filter").text($(this).text());
        orderBy = $(this).data("val");
        company.setFilter(companyName, current, orderBy, belongs).then(function (res) {
            company.clearTable();
            current += 8;
            company.appendList(res);
        });
    });

    $(document).off("click", "#search-company")
        .on("click", "#search-company", function () {
        current = 1;
        companyName = $("#search-input").val();
        company.setFilter(companyName, current, orderBy, belongs).then(function (res) {
            company.clearTable();
            current += 8;
            company.appendList(res);
        });
    });

    $(document).off("click", ".mission-item-wrap")
        .on("click", ".mission-item-wrap", function () {
        var id = $(".mission-item-wrap").attr("id");
        $.mobile.changePage(PAGE.PAGE_COMPANY_INFO + "?id=" + id, {
            transition: "none",
            changeHash: true
        });
    });
});

/**
 * page-mission-detail
 */
var missionDetail = {
    loadData : function (id) {
        var data = {
            id : id
        };
        return ajaxUtil.ajaxGet(API.GET_MISSION_DETAIL, data, token)
    },
    appendInfo : function (res) {
        $(".synopsis-desc").html(res.name);
        $(".synopsis-status").html(res.status);
        $(".initiator").html(res.create);
        $(".attached").html(res.handle);
        // $(".attached-dep").html(res.handle);
        // $(".attached-employ").html(res.handle);
        $(".endDate").html(res.endTime);
        $.each(res.flow, function (index, item) {
            var content;
            if (index == res.flow.length-1){
                content = '<div class="milepost-item last-item" id="'+item.id+'">\n';
            }else {
                content = '<div class="milepost-item" id="'+item.id+'">\n';
            }
            content += '\t<div class="item-mark"></div>\n' +
                '\t<div class="item-date">'+item.handleTime+'</div>\n' +
                '\t<div class="item-desc">'+item.name+'</div>\n';
            if(item.hasDetail){
                content += '\t<div class="btn-see-detail">查看详情</div>\n';
            }
            content += '</div>';
            $(content).appendTo(".milepost-time-line");
        });
    }
};
$(document).on("pageshow", "#page-mission-detail", function(){
    console.log($(this).attr("id"));

    var id = getUrlString("id");
    missionDetail.loadData(id).then(function (res) {
        missionDetail.appendInfo(res);
    });

    $(document).off("click", "#page-mission-detail .change-initiator")
        .on("click", "#page-mission-detail .change-initiator", function () {
        // $.mobile.changePage(PAGE.PAGE_ADD_EMPLOY);
            loadIcon.showUp();
            choiceToast.loadTable({}, API.GET_CHANGE_MISSION_INITATOR).then(function (res) {
                var title = "发起人变更";
                loadIcon.hide();
                choiceToast.showTable(title, res);
            });
            $(document).off("click", "#page-mission-detail .toast-list-item")
                .on("click", "#page-mission-detail .toast-list-item", function () {
                //    发起人变更请求
                choiceToast.hideTable();
            });
    });

    $(document).off("click", "#page-mission-detail .btn-see-detail")
        .on("click", "#page-mission-detail .btn-see-detail", function () {
        var id = $(this).parent().data("id");
        $.mobile.changePage(PAGE.PAGE_MILEPOST_DETAIL + "?id=" + id, {
            transition: "none",
            changeHash: true
        });
    });
});

/**
 * page-milepost-detail
 */
$(document).on("pageshow", "#page-milepost-detail", function(){
    console.log($(this).attr("id"));
    $(document).off("click", "#page-milepost-detail .footer-btn-submit")
        .on("click", "#page-milepost-detail .footer-btn-submit", function () {
            window.history.back()
        });
});

/**
 * page-picture-show
 */
var picture = {
    loadImg : function (id) {
        var data = {
            id : id
        };
        return ajaxUtil.ajaxGet(API.GET_IMG, data, token)
    },
    appendImg : function (res) {
        $(".img-picture-show").attr("src",URLS.IMG_SRC + res.imgSrc);
    }
};
$(document).on("pageshow", "#page-picture-show", function(){
    console.log($(this).attr("id"));
    var picId = getUrlString("id");
    picture.loadImg(picId).then(function (res) {
        picture.appendImg(res)
    });
    $(document).off("click", "#page-picture-show .footer-btn-submit")
        .on("click", "#page-picture-show .footer-btn-submit", function () {
            window.history.back()
    });
});

/**
 * page-index-personal-about
 */
var personal = {
    loadData : function () {
        var data = {
            id : token
        };
        return ajaxUtil.ajaxGet(API.GET_PERSONAL_INFO, data, token)
    },
    appendData : function (res) {
        $("#name").html(res.name);
        $("#mobile").html(res.mobile);
        $("#address").html(res.address);
        $("#post").html(res.post);
    },
};
$(document).on("pageshow", "#page-index-personal", function(){
    console.log($(this).attr("id"));

    initElement();
    personal.loadData().then(function (res) {
        personal.appendData(res)
    });
    $(document).off("click", "#page-index-personal .header-right")
        .on("click", "#page-index-personal .header-right", function () {
            logout();
        });
    $(document).off("click", "#page-index-personal .btn-modify")
        .on("click", "#page-index-personal .btn-modify", function () {
            $.mobile.changePage(PAGE.PAGE_CHANGE_PASSWORD, {
                transition: "none",
                changeHash: true
            });
        });

    footerBtnMotion.getDefaultMark(this);
    $(document).off("click", "#page-index-personal .btn-footer")
        .on("click", "#page-index-personal .btn-footer", function () {
            footerBtnMotion.clicked(this);
        });
});

/**
 * page-login
 */
var login = {
    login : function () {
        var data = {
            username : $("#mobile").val(),
            password : $("#password").val()
        };
        return ajaxUtil.ajaxPost(API.LOGIN, data, '1');
    }
};
$(document).on("pageshow", "#page-login", function(){
    console.log($(this).attr("id"));

    initElement();

    $(document).off("click", "#page-login .button-login")
        .on("click", "#page-login .button-login", function () {
            login.login(token).then(function (res) {
                sessionStorage.setItem('token',res);
                // $.mobile.changePage(PAGE.PAGE_MISSIONS, {
                //     transition: "none",
                //     allowSamePageTransition: true,
                //     changeHash: false,
                //     reloadPage: true
                // });
                window.location.href = 'page-index.html';
            })
        });
    $(document).off("click", "#page-login .button-register")
        .on("click", "#page-login .button-register", function () {
            $.mobile.changePage(PAGE.PAGE_FORGET_PASSWORD, {
                transition: "none",
                changeHash: true
            });
        });
});



/**
 * page-query
 */
$(document).on("pageshow", "#page-query", function(){
    console.log($(this).attr("id"));

    initElement();

    $(document).off("click", "#page-logint .button-login")
        .on("click", "#page-personal-about .button-login", function () {
            login.login(token).then(function () {
                $.mobile.changePage(PAGE.PAGE_MISSIONS, {
                    transition: "none",
                    changeHash: true
                });
            });
        });


});



$(document).on("pageshow", "#page-query-mission", function () {
    console.log($(this).attr("id"));

    var query = function () {
        // 取得div层
        var $search = $('#search');
        //取得输入框JQuery对象
        var $searchInput = $search.find('#search-text');
        //关闭浏览器提供给输入框的自动完成
        $searchInput.attr('autocomplete', 'off');
        //创建自动完成的下拉列表，用于显示服务器返回的数据,插入在搜索按钮的后面，等显示的时候再调整位置
        var $autocomplete = $('<div class="autocomplete"></div>')
            .hide()
            .insertAfter('.list');
        //清空下拉列表的内容并且隐藏下拉列表区
        var clear = function () {
            $autocomplete.empty().hide();
        };
        //注册事件，当输入框失去焦点的时候清空下拉列表并隐藏
        $searchInput.blur(function () {
            setTimeout(clear, 500);
        });
        //下拉列表中高亮的项目的索引，当显示下拉列表项的时候，移动鼠标或者键盘的上下键就会移动高亮的项目，想百度搜索那样
        var selectedItem = null;
        //timeout的ID
        var timeoutid = null;
        //设置下拉项的高亮背景
        var setSelectedItem = function (item) {
            //更新索引变量
            selectedItem = item;
            //按上下键是循环显示的，小于0就置成最大的值，大于最大值就置成0
            if (selectedItem < 0) {
                selectedItem = $autocomplete.find('li').length - 1;
            }
            else if (selectedItem > $autocomplete.find('li').length - 1) {
                selectedItem = 0;
            }
            //首先移除其他列表项的高亮背景，然后再高亮当前索引的背景
            $autocomplete.find('li').removeClass('highlight')
                .eq(selectedItem).addClass('highlight');
        };
        var ajax_request = function () {
            // ajax服务端通信
            var data = {
                name : $searchInput.val(),
                current : 1,
                status : status
            };
            ajaxUtil.ajaxGet(API.GET_MISSIONS, data, token).then(function (data) {
                if (data.length) {
                    //遍历data，添加到自动完成区
                    $.each(data, function (index, item) {
                        //创建li标签,添加到下拉列表中
                        var content = '<div class="mission-item-wrap" id="'+item.id+'">'+
                            '<div class="mission-item">'+
                            '<div class="item-left">';
                        if(item.business.length > 0 ) {
                            content += '<p class="">'+item.business[0].name+'</p>';
                        }
                        if(item.business.length > 1 ) {
                            content += '<p class="">'+item.business[1].name+'</p>';
                        }
                        content +='<p>(<span id="mission-done-count">'+item.finished+'</span>/<span id="mission-all-count">'+item.total+'</span>)';
                        if (item.business.length > 2 ){
                            content += '<span>……</span>';
                        }
                        content += '</p>'+
                            '</div>'+
                            '<div class="item-right">'+
                            '<p>'+item.type+'</p>'+
                            '<p>&nbsp;</p>'+
                            '<p>'+item.companyName+'</p>'+
                            '</div>'+
                            '<div class="clear"></div>'+
                            '</div>'+
                            '</div>';
                        // $(content).appendTo("#page-index .mission-table");
                        $(content).appendTo($autocomplete)
                        // $('<li></li>').text(term).appendTo($autocomplete)
                            .addClass('clickable')
                            .hover(function () {
                                //下拉列表每一项的事件，鼠标移进去的操作
                                $(this).siblings().removeClass('highlight');
                                $(this).addClass('highlight');
                                selectedItem = index;
                            }, function () {
                                //下拉列表每一项的事件，鼠标离开的操作
                                $(this).removeClass('highlight');
                                //当鼠标离开时索引置-1，当作标记
                                selectedItem = -1;
                            })
                            .click(function () {
                                //鼠标单击下拉列表的这一项的话，就将这一项的值添加到输入框中
                                // $searchInput.val(term);
                                $.mobile.changePage(PAGE.PAGE_COMPANY_MISSION + "?id=" + $(this).attr("id"), {
                                    transition: "none",
                                    changeHash: true
                                });
                                // window.location.href = PAGE.PAGE_COMPANY_MISSION + "?id=" + $(this).attr("id");
                                //清空并隐藏下拉列表
                                $autocomplete.empty().hide();
                            });
                    });//事件注册完毕
                    $('<li style="text-align: center;padding:10px;">……暂无更多信息……</li>').appendTo($autocomplete);
                    //设置下拉列表的位置，然后显示下拉列表
                    // var ypos = $searchInput.position().top;
                    // var xpos = $searchInput.position().left;
                    // $autocomplete.css('width', $searchInput.css('width'));
                    // $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px"});
                    $autocomplete.css('width', '100%');
                    $autocomplete.css({'position': 'relative', 'left': 0 + "px", 'top': 0 + "px"});
                    setSelectedItem(0);
                    //显示下拉列表
                    $autocomplete.show();
                }
            });
        };
        //对输入框进行事件注册
        $searchInput
            .keyup(function (event) {
                //字母数字，退格，空格
                if (event.keyCode > 40 || event.keyCode == 8 || event.keyCode == 32) {
                    //首先删除下拉列表中的信息
                    $autocomplete.empty().hide();
                    clearTimeout(timeoutid);
                    timeoutid = setTimeout(function (){
                        ajax_request();
                    }, 100);
                }
                else if (event.keyCode == 38) {
                    //上
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem($autocomplete.find('li').length - 1);
                    }
                    else {
                        //索引减1
                        setSelectedItem(selectedItem - 1);
                    }
                    event.preventDefault();
                }
                else if (event.keyCode == 40) {
                    //下
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem(0);
                    }
                    else {
                        //索引加1
                        setSelectedItem(selectedItem + 1);
                    }
                    event.preventDefault();
                }
            })
            .keypress(function (event) {
                //enter键
                if (event.keyCode == 13) {
                    //列表为空或者鼠标离开导致当前没有索引值
                    if ($autocomplete.find('li').length == 0 || selectedItem == -1) {
                        return;
                    }
                    $searchInput.val($autocomplete.find('li').eq(selectedItem).text());
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            })
            .keydown(function (event) {
                //esc键
                if (event.keyCode == 27) {
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            });
        //注册窗口大小改变的事件，重新调整下拉列表的位置
        $(window).resize(function () {
            var ypos = $searchInput.position().top;
            var xpos = $searchInput.position().left;
            // $autocomplete.css('width', $searchInput.css('width'));
            $autocomplete.css('width', '100%');
            $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px"});
        });
    };
    query();

    $(document).off("click", "#page-query-mission #cancel")
        .on("click", "#page-query-mission #cancel", function () {
            $.mobile.changePage(PAGE.PAGE_MISSIONS, {
                transition: "none",
                changeHash: true
            });
        });
});

$(document).on("pageshow", "#page-query-company", function () {
    console.log($(this).attr("id"));
    var query = function () {
        // 取得div层
        var $search = $('#search');
        //取得输入框JQuery对象
        var $searchInput = $search.find('#search-text');
        //关闭浏览器提供给输入框的自动完成
        $searchInput.attr('autocomplete', 'off');
        //创建自动完成的下拉列表，用于显示服务器返回的数据,插入在搜索按钮的后面，等显示的时候再调整位置
        var $autocomplete = $('<div class="autocomplete"></div>')
            .hide()
            .insertAfter('.list');
        //清空下拉列表的内容并且隐藏下拉列表区
        var clear = function () {
            $autocomplete.empty().hide();
        };
        //注册事件，当输入框失去焦点的时候清空下拉列表并隐藏
        $searchInput.blur(function () {
            setTimeout(clear, 500);
        });
        //下拉列表中高亮的项目的索引，当显示下拉列表项的时候，移动鼠标或者键盘的上下键就会移动高亮的项目，想百度搜索那样
        var selectedItem = null;
        //timeout的ID
        var timeoutid = null;
        //设置下拉项的高亮背景
        var setSelectedItem = function (item) {
            //更新索引变量
            selectedItem = item;
            //按上下键是循环显示的，小于0就置成最大的值，大于最大值就置成0
            if (selectedItem < 0) {
                selectedItem = $autocomplete.find('li').length - 1;
            }
            else if (selectedItem > $autocomplete.find('li').length - 1) {
                selectedItem = 0;
            }
            //首先移除其他列表项的高亮背景，然后再高亮当前索引的背景
            $autocomplete.find('li').removeClass('highlight')
                .eq(selectedItem).addClass('highlight');
        };
        var ajax_request = function () {
            // ajax服务端通信
            var data = {
                name : $searchInput.val(),
                current : 1,
                orderby : "",
                belongsTo : ""
            };
            ajaxUtil.ajaxGet(API.GET_COMPANY, data, token).then(function (data) {
                if (data.length) {
                    //遍历data，添加到自动完成区
                    $.each(data, function (index, item) {
                        console.log(item);
                        var content;
                        if(item.active == 1){
                            content = '<div id="'+item.id+'" class="mission-item-wrap not">\n';
                        }else {
                            content = '<div id="'+item.id+'" class="mission-item-wrap">\n';
                        }
                        content += '\t\t\t\t\t\t<div class="mission-item">\n' +
                            '\t\t\t\t\t\t\t<div class="company-name">'+item.name+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-status">'+item.status+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="clear"></div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-location"><i class="fa fa-location-arrow"></i>'+item.address+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-type">'+item.companyType+'</div>\n' +
                            '\t\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t</div>';
                        $(content).appendTo($autocomplete)
                        //创建li标签,添加到下拉列表中
                        // $('<li></li>').text(term).appendTo($autocomplete)
                            .addClass('clickable')
                            .hover(function () {
                                //下拉列表每一项的事件，鼠标移进去的操作
                                $(this).siblings().removeClass('highlight');
                                $(this).addClass('highlight');
                                selectedItem = index;
                            }, function () {
                                //下拉列表每一项的事件，鼠标离开的操作
                                $(this).removeClass('highlight');
                                //当鼠标离开时索引置-1，当作标记
                                selectedItem = -1;
                            })
                            .click(function () {
                                //鼠标单击下拉列表的这一项的话，就将这一项的值添加到输入框中
                                $.mobile.changePage(PAGE.PAGE_COMPANY_INFO + "?id=" + $(this).attr("id"), {
                                    transition: "none",
                                    changeHash: true
                                });
                                // $searchInput.val(term);
                                //清空并隐藏下拉列表
                                $autocomplete.empty().hide();
                            });
                    });//事件注册完毕
                    $('<li>暂无更多信息</li>').appendTo($autocomplete);
                    //设置下拉列表的位置，然后显示下拉列表
                    var ypos = $searchInput.position().top;
                    var xpos = $searchInput.position().left;
                    $autocomplete.css('width', '100%');
                    $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px"});
                    setSelectedItem(0);
                    //显示下拉列表
                    $autocomplete.show();
                }
            });
        };
        //对输入框进行事件注册
        $searchInput
            .keyup(function (event) {
                //字母数字，退格，空格
                if (event.keyCode > 40 || event.keyCode == 8 || event.keyCode == 32) {
                    //首先删除下拉列表中的信息
                    $autocomplete.empty().hide();
                    clearTimeout(timeoutid);
                    timeoutid = setTimeout(function (){
                        ajax_request();
                    }, 100);
                }
                else if (event.keyCode == 38) {
                    //上
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem($autocomplete.find('li').length - 1);
                    }
                    else {
                        //索引减1
                        setSelectedItem(selectedItem - 1);
                    }
                    event.preventDefault();
                }
                else if (event.keyCode == 40) {
                    //下
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem(0);
                    }
                    else {
                        //索引加1
                        setSelectedItem(selectedItem + 1);
                    }
                    event.preventDefault();
                }
            })
            .keypress(function (event) {
                //enter键
                if (event.keyCode == 13) {
                    //列表为空或者鼠标离开导致当前没有索引值
                    if ($autocomplete.find('li').length == 0 || selectedItem == -1) {
                        return;
                    }
                    // $searchInput.val($autocomplete.find('li').eq(selectedItem).text());
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            })
            .keydown(function (event) {
                //esc键
                if (event.keyCode == 27) {
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            });
        //注册窗口大小改变的事件，重新调整下拉列表的位置
        $(window).resize(function () {
            var ypos = $searchInput.position().top;
            var xpos = $searchInput.position().left;
            // $autocomplete.css('width', $searchInput.css('width'));
            $autocomplete.css('width', '100%');
            $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px", 'right': '0'});
        });
    };
    query();

    $(document).off("click", "#page-query-company #cancel")
        .on("click", "#page-query-company #cancel", function () {
            var fromPage = sessionStorage.getItem('fromPage');
            $.mobile.changePage(fromPage, {
                transition: "none",
                changeHash: true
            });
        });
});

$(document).on("pageshow", "#page-query-employ", function () {
    console.log($(this).attr("id"));

    var query = function () {
        // 取得div层
        var $search = $('#search');
        //取得输入框JQuery对象
        var $searchInput = $search.find('#search-text');
        //关闭浏览器提供给输入框的自动完成
        $searchInput.attr('autocomplete', 'off');
        //创建自动完成的下拉列表，用于显示服务器返回的数据,插入在搜索按钮的后面，等显示的时候再调整位置
        var $autocomplete = $('<div class="autocomplete"></div>')
            .hide()
            .insertAfter('.list');
        //清空下拉列表的内容并且隐藏下拉列表区
        var clear = function () {
            $autocomplete.empty().hide();
        };
        //注册事件，当输入框失去焦点的时候清空下拉列表并隐藏
        $searchInput.blur(function () {
            setTimeout(clear, 500);
        });
        //下拉列表中高亮的项目的索引，当显示下拉列表项的时候，移动鼠标或者键盘的上下键就会移动高亮的项目，想百度搜索那样
        var selectedItem = null;
        //timeout的ID
        var timeoutid = null;
        //设置下拉项的高亮背景
        var setSelectedItem = function (item) {
            //更新索引变量
            selectedItem = item;
            //按上下键是循环显示的，小于0就置成最大的值，大于最大值就置成0
            if (selectedItem < 0) {
                selectedItem = $autocomplete.find('li').length - 1;
            }
            else if (selectedItem > $autocomplete.find('li').length - 1) {
                selectedItem = 0;
            }
            //首先移除其他列表项的高亮背景，然后再高亮当前索引的背景
            $autocomplete.find('li').removeClass('highlight')
                .eq(selectedItem).addClass('highlight');
        };
        var ajax_request = function () {
            // ajax服务端通信
            var data = {
                name : $searchInput.val(),
                current : 1,
                orderby : ""
            };
            ajaxUtil.ajaxGet(API.GET_USER, data, token).then(function (data) {
                if (data.length) {
                    //遍历data，添加到自动完成区
                    $.each(data, function (index, item) {
                        var content;
                        if(item.isDelete == 1){
                            content = '<div id="'+item.id+'" class="mission-item-wrap leave">\n';
                        }else {
                            content = '<div id="'+item.id+'" class="mission-item-wrap">\n';
                        }
                        content += '\t\t\t\t\t\t<div class="mission-item">\n' +
                            '\t\t\t\t\t\t\t<div class="company-name"><span>'+item.name+'</span><span>'+item.mobile+'</span></div>\n' +
                            '\t\t\t\t\t\t\t<!--<div class="company-isnew">主办橘子</div>-->\n' +
                            '\t\t\t\t\t\t\t<div class="company-status">'+item.status+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="clear"></div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-location">'+item.role+'</div>\n' +
                            '\t\t\t\t\t\t\t<div class="company-type">'+item.department+'</div>\n' +
                            '\t\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t</div>';
                        $(content).appendTo($autocomplete)
                        //创建li标签,添加到下拉列表中
                        // $('<li></li>').text(term).appendTo($autocomplete)
                            .addClass('clickable')
                            .hover(function () {
                                //下拉列表每一项的事件，鼠标移进去的操作
                                $(this).siblings().removeClass('highlight');
                                $(this).addClass('highlight');
                                selectedItem = index;
                            }, function () {
                                //下拉列表每一项的事件，鼠标离开的操作
                                $(this).removeClass('highlight');
                                //当鼠标离开时索引置-1，当作标记
                                selectedItem = -1;
                            })
                            .click(function () {
                                //鼠标单击下拉列表的这一项的话，就将这一项的值添加到输入框中
                                $.mobile.changePage(PAGE.PAGE_EMPLOY_INFO + "?id=" + $(this).attr("id"), {
                                    transition: "none",
                                    changeHash: true
                                });
                                // $searchInput.val(term);
                                //清空并隐藏下拉列表
                                $autocomplete.empty().hide();
                            });
                    });//事件注册完毕
                    $('<li>暂无更多信息</li>').appendTo($autocomplete);
                    //设置下拉列表的位置，然后显示下拉列表
                    var ypos = $searchInput.position().top;
                    var xpos = $searchInput.position().left;
                    $autocomplete.css('width', '100%');
                    $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px"});
                    setSelectedItem(0);
                    //显示下拉列表
                    $autocomplete.show();
                }
            });
        };
        //对输入框进行事件注册
        $searchInput
            .keyup(function (event) {
                //字母数字，退格，空格
                if (event.keyCode > 40 || event.keyCode == 8 || event.keyCode == 32) {
                    //首先删除下拉列表中的信息
                    $autocomplete.empty().hide();
                    clearTimeout(timeoutid);
                    timeoutid = setTimeout(function (){
                        ajax_request();
                    }, 100);
                }
                else if (event.keyCode == 38) {
                    //上
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem($autocomplete.find('li').length - 1);
                    }
                    else {
                        //索引减1
                        setSelectedItem(selectedItem - 1);
                    }
                    event.preventDefault();
                }
                else if (event.keyCode == 40) {
                    //下
                    //selectedItem = -1 代表鼠标离开
                    if (selectedItem == -1) {
                        setSelectedItem(0);
                    }
                    else {
                        //索引加1
                        setSelectedItem(selectedItem + 1);
                    }
                    event.preventDefault();
                }
            })
            .keypress(function (event) {
                //enter键
                if (event.keyCode == 13) {
                    //列表为空或者鼠标离开导致当前没有索引值
                    if ($autocomplete.find('li').length == 0 || selectedItem == -1) {
                        return;
                    }
                    $searchInput.val($autocomplete.find('li').eq(selectedItem).text());
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            })
            .keydown(function (event) {
                //esc键
                if (event.keyCode == 27) {
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            });
        //注册窗口大小改变的事件，重新调整下拉列表的位置
        $(window).resize(function () {
            var ypos = $searchInput.position().top;
            var xpos = $searchInput.position().left;
            // $autocomplete.css('width', $searchInput.css('width'));
            $autocomplete.css('width', '100%');
            $autocomplete.css({'position': 'relative', 'left': xpos + "px", 'top': ypos + "px"});
        });
    };
    query();

    $(document).off("click", "#page-query-employ #cancel")
        .on("click", "#page-query-employ #cancel", function () {
            $.mobile.changePage(PAGE.PAGE_EMPLOY, {
                transition: "none",
                changeHash: true
            });
        });
});

/**
 * page-update-tips
 */
$(document).on("pageshow", "#page-update-tips", function(){
    console.log($(this).attr("id"));
    var update_arr = [
        {
            date : "0402",
            data : [
                "更新了11项问题，（略）"
            ]
        },
        {
            date : "0408",
            data : [
                "1、更新了当前任务页面，列表中公司名font的值12px",
                "2、对header部分进行了结构调整，将条件筛选由content迁入header；取消了header的textshadow效果",
                "3、更新了各页面的title",
                "4、更新了公司任务页，页面结构调整，mission-item重切，逻辑上将两个btn平级",
                "5、更新了新增任务页面，新增任务页面的content-wrap背景为白色全屏"
            ]
        },
        {
            date : "0409",
            data : [
                "1、更新了有header、footer的列表页，其中content部分滑动条，仅在中间部分滑动，现在选择筛选按钮会随header浮动",
                "2、更新了带index命名的列表页，改写代码避免不同列表页面加载内容时发生混淆，现在各页面列表不会加载混淆",
                "3、更新了所有新增页面，有单选的时候会默认给予一个选项选中效果（默认左侧按钮），现在所有单选都有默认选项",
                "4、更新了所有新增页面中带输入框input的部分，增加了对输入值的非空验证（判断），现在新增任务（公司、员工）时，未完成全部选择（填充全部内容）将在未完成出给予相应的样式提示，并弹出信息提示，且不会发生页面跳转",
                "5、更新了带可选筛选条件的列表页面的筛选值，（公司排序、员工排序两页面不同）现在能够正确的按选中条件排序",
                "6、更正了公司详情的接口，现在能够正确的在公司详情页面显示公司信息",
                "7、更正了任务详情的页面，现在能够正确的在任务详情页面显示任务名称了",
                "8、更新了任务列表页面，接口增加了属性type，并做了渲染，现在能够（在右上角红色字）显示任务类型了",
                "9、更新了新增任务第二步，会根据第一步选择的公司对可选人员进行筛选，现在新增任务选择分派人时，只显示关联的可选人员了"
                //"3、"
            ]
        },
        {
            date : "0417-0419",
            data : [
                "1、增加了个人中心的页面及相关功能，接口尚未联调",
                "2、登录页相关功能",
            ]
        },
        {
            date : "0421-0422",
            data : [
                "1、更正了任务不能正确显示的问题，现在可以在当前任务页面正确的显示全部的公司了",
            ]
        },
        {
            date : "0425-0426",
            data : [
                "1、完成三个首页查询的跳转页面，现在能够正常跳转并根据输入实时从数据库读取筛选列表了",
            ]
        },
        {
            date : "已做调整，未能重现，可能依然存在风险的问题",
            data : [
                "1、各index页面数据混合加载的问题。",
                "2、上方及下方滑动可能会出现黑色背景的问题应该是浏览器正常显示，暂无解决方法。",
                "3、筛选功能的新方式，跳转到新的筛选页面，选取对应内容后返回的页面及功能。需根据来源不同的页面请求不同的接口地址，此功能尚未完成；接口尚未联调",
                "4、图片上传功能页面，待整合、测试",
                "5、任务转发功能尚无接口，功能不能实现",
            ]
        },
        {
            date : "尚未解决问题",
            data : [
                "*  登录找回页面缺失。",
                "*  个人中心的修改密码跳转页面尚未设计图。",
                //"3、"
            ]
        }
    ];
    var content = "";
    $.each(update_arr,function (index, items) {
        content += '<ul style="background-color: #f2f2f2;line-height: 35px;font-size: 18px;">'+items.date;
        $.each(items.data, function (index, item) {
            content += '<li style="background-color:#fff;line-height:25px;font-size:14px;padding:0 1em;">'+item+'</li>';
        });
        content += '</ul>';
    });
    $(content).appendTo(".update-table");

    $(document).off("click", "#page-update-tips .footer-btn-submit")
        .on("click", "#page-update-tips .footer-btn-submit", function () {
            $.mobile.changePage(PAGE.PAGE_MISSIONS, {
                transition: "none",
                changeHash: true
            });
        });
});