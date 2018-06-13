/**
 * Project
 * @author: nn (Easy-link Co.)
 * @update: nn (2018-3-6 15:10)
 */
/**
 * 基础定义
 */
const COMMON = {

};

/**
 * 接口地址
 */
var API = {

    GET_MISSION_COMPANY: "task/company",   //公司任务
    GET_COMPANY : "company/list",   //公司列表
    ADD_NEW_COMPANY : "company/add",   //添加公司
    ADD_NEW_EMPLOY : "user/add", //添加员工
    GET_EMPLOY_POST : "role/list",  //岗位列表
    GET_EMPLOY_DEPT : "department/list",  //部门列表
    GET_USER : "user/list",   //用户列表

    GET_USER_INFO : "user/info",   //用户详情

    ADD_USER : "user/add",
    GET_CHANGE_RECORD : "getChangeRecord",

    CHANGE_ATTACHED_USER : "task/changeUser",

    GET_COMPANY_TASK : "company/task",

    GET_PERSONAL_INFO : "user/detail", //获取个人中心用户信息

    GET_IMG : "getImg",

    //0404 新增
    /**
     * page-index
     */
    //获取任务列表，（参数 current status name）
    GET_MISSIONS : "task/company",
    /**
     * page-add-mission
     */
    //获取公司列表，返回值id、name
    GET_COMPANY_LIST : "company/select",
    GET_COMPANY_ADD_OPTION : "company/attributeList",

    //获取公司任务，任务分类：（参数 parentId 0 | 返回值 id name），任务详情：（参数 parentId 任务分类返回的id | 返回值 id name）
    GET_MISSION_KINDS : "business/list",
    /**
     * page-add-mission-step
     */
    //获取办理人列表，返回值 id name
    GET_EMPLOY : "user/select",

    /**
     * page-add-mission-submit
     */
    //提交添加任务-POST方法 参数 userId companyId items
    ADD_NEW_MISSION : "company/addBuisness",
    /**
     * page-index-company
     */
    //参数companyId
    GET_COMPANY_INFO : "company/info",
    /**
     * page-company-mission
     */
    //参数 id（取自上一页面任务id），返回任务详情流程id name date desc status
    GET_MISSION_DETAIL : "task/info",
    //变更记录
    //转发
    /**
     * page-mission-detail
     */
    //节点详情查看 参数 id（取自任务详情流程id）
    GET_MILEPOST_DETAIL : "task/flow",
    //变更发起人 参数 id userId
    GET_CHANGE_MISSION_INITATOR : "task/changeUser",

    //图片上传 参数 file_photo
    UPLOAD_IMG : "images/upload",

    LOGOUT : "passport/logout",
    LOGIN : "passport/login",

    GET_BALANCE_SHEET : "company_balance_sheet/list",
    GET_BALANCE_SHEET_DETAIL : "company_balance_sheet/info",
    UPDATE_BALANCE_SHEET_DETAIL : "company_balance_sheet/edit",
    GET_PROFIT_STATEMENT : "company_profit_sheet/list",
    GET_PROFIT_STATEMENT_DETAIL : "company_profit_sheet/info",
    UPDATE_PROFIT_STATEMENT_DETAIL : "company_profit_sheet/edit",
    GET_BASIC_DATA : "company_business_data/list",
    GET_BASIC_DATA_DETAIL : "company_business_data/info",
    UPDATE_BASIC_DATA : "company_business_data/edit",


    //参数 id userId
    // POST_ATTACHED_USER : "task/changeUser",
    // GET_COMPANY : "getCompany",
    // ADD_NEW_COMPANY : "addNewCompany",
    // GET_EMPLOY : "getEmploy",
    // GET_EMPLOY_INFO : "getEmployInfo",
    // GET_EMPLOY_POST : "getEmployPost",
    // GET_EMPLOY_DEPT : "getEmployDept",
    // ADD_NEW_EMPLOY : "addNewEmploy",
    // GET_CHANGE_RECORD : "getChangeRecord",
    // GET_IMG : "getImg",
    // GET_USER : "getUsers"
    // GET_ATTACHED_USER_LIST : "user/select",
};

/**
 * 配置项
 */
var config = {
    status : "debug"
};

const URLS = {
    BASE : "http://accountant.api.gocolu.com/v1/api/",//"http://localhost/agency/agency_code_jQM/",http://192.168.0.102:8080/accountant/v1/api/
    // BASE : "http://192.168.2.203:8080/accountant/v1/api/",
    // BASE : "http://192.168.31.213:8080/accountant/v1/api/",
    IMG_SRC : "http://accountant.api.gocolu.com",
    PLUGINS_URL : 'plugins/',
    JS_URL : 'js/',
};

const PAGE = {
    PAGE_LOGIN : "page-login.html",
    PAGE_MISSIONS : "page-index.html",
    PAGE_ADD_MISSION : "page-add-mission.html",
    PAGE_ADD_MISSION_QUERY : 'page-add-mission-query.html',
    PAGE_ADD_MISSION_STEP : "page-add-mission-step.html",
    PAGE_ADD_MISSION_STEP_QUERY : 'page-add-mission-step-query.html',
    PAGE_ADD_MISSION_SUBMIT : "page-add-mission-submit.html",

    PAGE_COMPANY_MISSION : "page-company-mission.html",
    PAGE_BALANCE_SHEET : "page-balance-sheet.html",
    PAGE_BALANCE_SHEET_DETAIL : "page-balance-sheet-detail.html",
    PAGE_BALANCE_SHEET_NEW : "page-balance-sheet-new.html",
    PAGE_PROFIT_STATEMENT : "page-profit-statement.html",
    PAGE_PROFIT_STATEMENT_DETAIL : "page-profit-statement-detail.html",
    PAGE_PROFIT_STATEMENT_NEW : "page-profit-statement-new.html",
    PAGE_BASIC_DATA : "page-basic-data.html",
    PAGE_BASIC_DATA_DETAIL : "page-basic-data-detail.html",
    PAGE_BASIC_DATA_NEW : "page-basic-data-new.html",

    PAGE_MISSION_DETAIL : "page-mission-detail.html",
    PAGE_COMPANY : "page-index-company.html",
    PAGE_ADD_COMPANY : "page-add-company.html",
    PAGE_COMPANY_INFO : "page-company-info.html",
    PAGE_EMPLOY : "page-index-employ.html",
    PAGE_ADD_EMPLOY : "page-add-employ.html",
    PAGE_EMPLOY_INFO : "page-employ-info.html",
    PAGE_EMPLOY_COMPANY : "page-employ-company.html",
    PAGE_MILEPOST_DETAIL : "page-milepost-detail.html",
    PAGE_PICTURE_SHOW : "page-picture-show.html",
    PAGE_CHANGE_PASSWORD : "page-change-password.html",
    PAGE_FORGET_PASSWORD : "page-forget-password",

    PAGE_QUERY_MISSION : 'page-query-mission.html',
    PAGE_QUERY_COMPANY : 'page-query-company.html',
    PAGE_QUERY_EMPLOY : 'page-query-employ.html',
};

/**
 * 令牌
 */
var token = sessionStorage.getItem('token') || '';