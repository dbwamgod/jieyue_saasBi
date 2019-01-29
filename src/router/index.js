import Vue from 'vue'
import Router from 'vue-router'
import saas from '@/view/saasHT'

/**消息板块**/
import msgCommon from '@/view/message/msgTemplates/msgCommon'
import msgTemplate from '@/view/message/msgTemplates/msgTemplate'
import msgCtnt from '@/view/message/msgTemplates/msgCtnt'
/***自动消息***/
import autoTaskCommon from '@/view/message/autoTask/autoTaskCommon'
import taskAuto from '@/view/message/autoTask/rw_zdTemp'
import rw_zdEdit from '@/view/message/autoTask/rw_zdEdit'
/***预警消息***/
import yjMsgTemplate from '@/view/message/createTask/yjMsgTemplate'
import createCommon from '@/view/message/createTask/createCommon'
import taskList from '@/view/message/createTask/taskList'
/***普通消息***/
import customCommon from '@/view/message/custom/customCommon'
import customTemplate from '@/view/message/custom/customTemplate'
import customCtnt from '@/view/message/custom/customCtnt'
import customTaskList from '@/view/message/custom/customTaskList'

//手动任务
import taskHandCommon from '@/view/message/taskHand/taskHandCommon'
import taskHand from '@/view/message/taskHand/taskHand'
import handTemplate from '@/view/message/taskHand/handTemplate'
import taskHandCheckList from '@/view/message/taskHand/taskHandCheckList'
/**脱敏规则**/
import desensitizationCommon from '@/view/message/desensitization/desensitizationCommon'
import desensitization from '@/view/message/desensitization/desensitization'
import desensitizationDetails from '@/view/message/desensitization/desensitizationDetails'
//参数维护
/***数据指标***/
import dataIndicatorsCommon from '@/view/paramInfo/dataIndicators/dataIndicatorsCommon'
import dataIndicators from '@/view/paramInfo/dataIndicators/dataIndicators'
import dataIndicatorsEdit from '@/view/paramInfo/dataIndicators/dataIndicatorsEdit'
/***数据导入***/
import dataUpload1 from '@/view/paramInfo/dataUpload1'
import dataUpload2 from '@/view/paramInfo/dataUpload2'
import dataUpload3 from '@/view/paramInfo/dataUpload3'
import dataUpload4 from '@/view/paramInfo/dataUpload4'

//简报
import nationwide from '../view/briefing/nationwideEcharts';
import regionEcharts from '../view/briefing/regionEcharts';

import Login from '@/view/login';
import userList from '@/view/userList';

//const Login = r => require.ensure([], () => r(require('@/view/login')), 'Login');


Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'Login',
      path: '/',
      component: Login,
      meta: {
      	title:'后台管理系统',
        keepAlive: true
      }
    },
    {
      name: '当前位置',
      path: '/saas',
      component: saas,
      meta: {
        title: '后台管理系统'
      },
      children: [
        {
          path: '/saas/message',
          redirect:'/saas/message/msgTemplate',
	        component:msgCommon,
          name: '消息模板',
          meta: {
            title: '消息模板'
          },
          children:[
          		{
			          path: '/saas/message/msgTemplate',
			          component: msgTemplate,
			          name: '消息模板',
			          meta:{
		            	title: '消息模板'
		          	},
		        	},
		        	
          		{
			          path: '/saas/message/msgCtnt',
			          component: msgCtnt,
			          name: '消息模板编辑',
		        	},
          ]
        },
        
        {
          path: '/saas/message',
          component: autoTaskCommon,
          redirect:'/saas/message/taskAuto',
          name: '自动预警任务',
          meta: {
            title: '自动预警任务'
          },
          children:[
          		{
          		 	path: '/saas/message/taskAuto',
			          component: taskAuto,
			          name: '自动预警任务',
			          meta: {
			            title: '自动预警任务'
			          },
			        },
          		{
			          path: '/saas/message/autoTemplate',
			          component: rw_zdEdit,
			          name: '自动预警任务编辑',
			        },
          ]
        },
        
        {
          path: '/saas/message',
          component: createCommon,
          redirect:'/saas/message/taskList',
          name: '预警消息调度',
          meta: {
            title: '预警消息调度'
          },
          children:[
          		{
			          path: '/saas/message/taskList',
			          component: taskList,
			          name: '预警消息调度',
			          meta: {
			            title: '预警消息调度'
			          },
		        	},
          		{
			          path: '/saas/message/yjMsgTemplate',
			          component: yjMsgTemplate,
			          name: '预警消息调度',
			        },
          ]
        },
        
        {
          path: '/saas/message',
          component: customCommon,
          redirect:'/saas/message/customTaskList',
          name: '普通消息任务',
          meta: {
            title: '普通消息任务'
          },
          children:[
          		{
			          path: '/saas/message/customTemplate',
			          component: customTemplate,
			          name: '普通消息任务',
			          meta: {
			            title: '普通消息任务'
			          },
		        	},
          		{
			          path: '/saas/message/customCtnt',
			          component: customCtnt,
			          name: '普通消息任务编辑',
			        },
			        {
			        	path: '/saas/message/customTaskList',
			          component: customTaskList,
			          name: '普通消息任务',
			          meta: {
			            title: '普通消息任务'
			          },
			        }
          ]
        },
        
        {
          path: '/saas/message',
          component: taskHandCommon,
          redirect:'/saas/message/taskHand',
          name: '手动任务',
          meta: {
            title: '手动任务'
          },
          children: [
          		{
			        	path: '/saas/message/taskHand',
			          component: taskHand,
			          name: '手动任务',
			          meta: {
			            title: '手动任务'
			          },
			        },
          		{
			          path: '/saas/message/taskHand/handTemplate',
			          component: handTemplate,
			          name: '手动任务编辑',
			        },
          		{
                path: '/saas/message/taskHand/taskHandCheckList/:id',
                component: taskHandCheckList,
                name: 'taskHandCheckList',
			        },
          ]
        },
        
        {
          path: '/saas/message',
          component: desensitizationCommon,
          redirect:'/saas/message/desensitization',
          name: '脱敏',
          meta: {
            title: '脱敏规则'
          },
          children: [
          		{
			          path: '/saas/message/desensitization',
			          component: desensitization,
			          name: 'desensitization',
			          meta: {
			            title: '脱敏规则'
			          },
          		},
          		{
              	path: '/saas/message/desensitization/desensitizationDetails',
              	name:'脱敏新增',
              	component: desensitizationDetails,
			        },
			        {
			          path: '/saas/message/desensitization/desensitizationDetailsEdit',
			          name:'脱敏详情',
			          component: desensitizationDetails,
			        },
          ]
        },
        
        {
          path: '/saas/param',
          component: dataIndicatorsCommon,
          redirect:'/saas/param/dataIndicators',
          name: '数据指标',
          meta: {
            title: '数据指标'
          },
          children: [
          			{
				          path: '/saas/param/dataIndicators',
				          component: dataIndicators,
				          name: '数据指标',
				          meta: {
				            title: '数据指标'
				          }
				        },
          		 	{
				          path: '/saas/param/dataIndicatorsEdit',
				          component: dataIndicatorsEdit,
				          name: '指标编辑',
				          meta: {
				            title: '数据指标'
				          }
			        	},
          ],
        },
       
        {
          path: '/saas/param/dataUpload1',
          component: dataUpload1,
          name: 'dataUpload',
          meta: {
            title: '数据导入'
          }
        },
        {
          path: '/saas/param/dataUpload2',
          component: dataUpload2,
          name: 'dataUpload',
          meta: {
            title: '数据导入'
          }
        },
        {
          path: '/saas/param/dataUpload3',
          component: dataUpload3,
          name: 'dataUpload',
          meta: {
            title: '数据导入'
          }
        },
        {
          path: '/saas/param/dataUpload4',
          component: dataUpload4,
          name: 'dataUpload',
          meta: {
            title: '数据导入'
          }
        },
        {
          path: '/saas/briefing/nationwide',
          component: nationwide,
          name: 'nationwide',
          meta: {
            title: '全国简报'
          }
        },
        {
          path: '/saas/briefing/regionEcharts',
          component: regionEcharts,
          name: 'regionEcharts',
          meta: {
            title: '大区简报'
          }
        },
        {
          path: '/saas/userList',
          component: userList,
          name: 'userList',
          meta: {
            title: '新增用户'
          }
        },
        
      ]
    },
    {
      name: '404',
      path: '/*',
      component: Login,
      meta: {
        title: '后台管理系统',
        keepAlive: true
      }
    },
  ]
})

