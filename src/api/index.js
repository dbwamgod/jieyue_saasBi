//  const _baseUrl = "http://bi.jieyuechina.com/api/saasbi/manager/" //正式环境
// const _baseUrl = 'http://10.50.180.111:10000/saasbi/manager/'//测试环境
const _baseUrl = 'http://172.18.101.118:10000/saasbi/manager/'//开发环境

//  const _loginUrl = 'http://bi.jieyuechina.com/api/'//正式环境登录
// const _loginUrl = 'http://10.50.180.111:10000/'//测试环境登录
const _loginUrl = 'http://172.18.101.118:10000/'//开发环境登录

export default {
	login(){//登录
		return _loginUrl +'mc-auth/auth/login'
	},
    msgList () {//消息模板列表
        return _baseUrl + 'templet/find/list'
    },
    msgDelete () {//消息模板删除
        return _baseUrl + 'templet/del'
    },
    msgAdd () {//消息模板添加
        return _baseUrl + 'templet/add'
    },
    msgSearchDT (id) {//获取模板详情
        return _baseUrl + 'templet/find/'+id
    },
    msgUpdate () {//消息模板更新
        return _baseUrl + 'templet/update'
    },
    getParam(){//获取插入参数
    	return _baseUrl +'templet/find/insert_param'
    },
    getBs(){//获取插入报表
    	return _baseUrl +'templet/find/bs'
    },
    checkMsgTask(id){//校验消息模板是否存在任务中
    	return _baseUrl +'templet/check/'+id
    },
    findPersonnelNum(){//获取人员
    	return _loginUrl +'mc-user/organise/findname'
    },
    searchPersonnel(){//搜索人员
    	return _loginUrl +'mc-user/user/username'
    },
    getSensitiveList(){//获取脱敏信息列表
    	return _baseUrl +'sensitive/find/list'
    },
    deleteSensitive(id){//删除脱敏
    	return _baseUrl +'sensitive/del/'+id
    },
    addSensitive(){//新增脱敏
    	return _baseUrl +'sensitive/add'
    },
    getSensitiveDetial(id){//获取脱敏详情
    	return _baseUrl +'sensitive/find/'+id
    },
    upDateSensitive(){//更新脱敏详情
    	return _baseUrl +'sensitive/update'
    },
    getTaskHandInstanceList() {//实例任务列表
      return _baseUrl +'task/instance/list'
    },
    setDisplayStatus() {//修改手动可见状态
      return _baseUrl + 'task/instance/setDisplayStatus'
    },
    getTaskTemp(id){//获取任务详情
    	return _baseUrl + 'task/get/'+id
    },
    getInstanceTemp(id){//获取任务实例详情
      return _baseUrl + 'task/instance/get/'+id
    },
    createdTask(){//新建任务
    	return _baseUrl +'task/add'
    },
    renewTask(){//更新任务
    	return _baseUrl + 'task/update'
    },
    setIsVal(){//实例任务启用禁用
    	return _baseUrl +'task/instance/setIsValid'
    },
    sendConfig() {//设置推送
      return _baseUrl + 'task/instance/detail/update/config'
    },
    triggerList(){//触发动作列表
    	return _baseUrl +'trigger/triggerList'
    },
    getTaskList(){//获取任务列表
    	return _baseUrl +'task/list'
    },
    setIsTaskValid(){//任务停用启用删除
    	return _baseUrl +'task/setIsValid'
    },
    
    customList(){//获取普通预警任务列表
    	return _baseUrl +'general/list'
    },
    getCustomDetial(id){//获取普通预警任务详情
    	return _baseUrl +'general/detail/'+id
    },
    addCustom(){//新增普通预警任务
    	return _baseUrl +'general/add'
    },
    updateCustom(){//更新普通预警任务
    	return _baseUrl +'general/update'
    },
    setCustom(){//禁用普通预警任务
    	return _baseUrl +'general/setIsValid'
    },
    autoList(){//获取自动任务列表
    	return _baseUrl +'task/msgAuto/list'
    },
    delMsgAuto(){//自动任务列表删除
    	return _baseUrl +'task/msgAuto/del'
    },
    updateMsgAuto(){//自动任务更新
    	return _baseUrl +'task/msgAuto/update'
    },
    detailMsgAutoDetail(id){//自动任务获取详情
    	return _baseUrl +'task/msgAuto/detail/'+id
    },
    
    getMsgListName(){//获取消息模板名称列表
    	return _baseUrl +'templet/find/name_list'
    },
    getTaskHandDetail(id){//手动任务详情
    	return _baseUrl +'task/manual/msgDetail/'+id
    },
    sendTask(){//手动任务发送
    	return _baseUrl +'task/manual/sendTask'
    },
    /****简报***/
    getnationwide(){//获取全国简报数据
   		return _baseUrl +'briefing/list'
    },
    pdng(){//判断用户是全国还是大区
      return _baseUrl +'menu/subject/list'
    },
    xialak(){//获取大区数目
      return _baseUrl +'org/child'
    },
    /*****参数维护******/
   	getTaskExport(time,type){//参数维护导入导出/导出
      return _baseUrl +'data/task/export?expTime='+time+'&exptype='+type
    },
    getEmploImprot(){//参数维护导入导出/导入人员花名册
      return _baseUrl +'data/emplo/import'
    },
    getStoreImprot(){//参数维护导入导出/导入门店任务
      return _baseUrl +'data/store/import'
    },
    getGoalsImprot(){//参数维护导入导出/导入目标阈值
      return _baseUrl +'data/goals/import'
    },
    getFinancialImprot(){//参数维护导入导出/导入理财产品
      return _baseUrl +'data/financial/import'
    },
    getEmploList(){//获取人员花名册列表
      return _baseUrl +'data/emplo/seach/list'
    },
    getStoreList(){//获取门店任务列表
      return _baseUrl +'data/store/seach/list'
    },
    getGoalsList(){//获取目标阈值列表
      return _baseUrl +'data/goals/seach/list'
    },
    getFinancList(){//获取理财产品列表
      return _baseUrl +'data/financ/seach/list'
    },
    getQuotaList(){//获取数据指标列表
    	return _baseUrl +'quota/list/name'
  	},
    stopOrBegin(){//数据指标->停用or启用
      return _baseUrl +'quota/enable/valid'
    },
    getQuotaMessage(id){//数据指标->编辑
      return _baseUrl +'quota/find/'+id
    },
    getQuotaMessageUpdate(){//数据指标->编辑更新
      return _baseUrl +'quota/valid/update'
    },
    getTaskHandInstanceList() {//任务实力列表
      return _baseUrl + 'task/instance/list'
    },
    setDisplayStatus() {//修改手动可见状态
      return _baseUrl + 'task/instance/setDisplayStatus'
    },
    checkTaskList() {//核对任务列表
      return _baseUrl + 'task/instance/detail/check'
    },
    checktaskExport(id){//核对任务列表导出
      return _baseUrl + 'data/check/export?taskInstanceId='+id
    },
    sendTash(taskId) {
      return _baseUrl + 'task/instance/send/' + taskId
    },
    
    
    masterInfo(){//获取业务
      return _baseUrl + 'masterInfo/list'
    },
    userAdd() {//用户添加接口
      return _baseUrl + 'user/add'
    },
    outfitList(){//用户选择机构
      return _baseUrl + 'org/list/301'
    },
    userList(){//用户列表
      return _baseUrl + 'user/list'
    }
    
}
