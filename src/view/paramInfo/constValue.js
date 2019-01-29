class valueList{
	//人员花名册检索条件
    static personnel = [
    	{
          value: '4',
          label: '员工编号'
        },
    	{
          value: '1',
          label: '员工名称'
        }, {
          value: '3',
          label: '岗位名称'
        }, {
          value: '2',
          label: '入职时间'
        }
        ]
    //门店检索条件
    static store = [{
          value: '1',
          label: '分部编码'
        }, {
          value: '2',
          label: '营业部编号'
        }, {
          value: '3',
          label: '会计日期'
        }, {
          value: '4',
          label: '导入时间'
        }]
    //全国目标阈值检索条件
    static target = [{
          value: '1',
          label: '会计日期'
        }, {
          value: '2',
          label: '目标值类型'
        }, {
          value: '3',
          label: '导入时间'
        }]
    //全国目标阈值检索条件
    static product = [
    	{
          value: '1',
          label: '产品展示编码'
        }, {
          value: '2',
          label: '产品名称'
        }]
}
export default{
    valueList
};