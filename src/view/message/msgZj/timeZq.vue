<template>
	<div class="timeZq">
		<el-form-item class="redBar">
			<div class="yjItem"><span>*</span> 通知方式：</div>
			<el-checkbox style="margin-right:20px;" :disabled="disabledAll" v-model="chlApp">站内信</el-checkbox>
			<el-checkbox style="margin-right:20px;" :disabled="disabledAll" v-model="chlPush">手机通知</el-checkbox>
			<el-checkbox style="margin-right:20px;" :disabled="disabledAll" v-model="chlEmail">邮件</el-checkbox>
			<el-checkbox style="margin-right:20px;" :disabled="disabledAllSMS" v-model="chlSms">短信</el-checkbox>
			<!--<el-checkbox v-model="chlWeiXin" disabled>微信公众号</el-checkbox>-->
		</el-form-item>
		<el-form-item class="redBar" v-if="typeLxRW">
				<div class="yjItem"><span>*</span> 发送时间：</div>
				<el-radio-group v-model="txl">
					<el-radio class="fl" :disabled="disabledAll" style="margin-right:30px;margin-top: 15px;" @change="changeSendTime" v-if="txlBools" :label="1">{{nameValue}}</el-radio>
					<el-radio class='fl' :disabled="disabledAll" style="margin-right: 10px;margin-top: 15px;" @change="changeSendTime" :label="0"><span style="display: none;">22</span></el-radio>
			    	<el-select class="fl" :disabled="disabledAll" v-model="value" placeholder="请选择" style="width:33.5%;">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-radio-group>
		</el-form-item>
		<div v-if="typeSendTime">
		<el-form-item class="redBar" v-show="typeCycle" v-if="typeLxRW">
			<div class="yjItem"><span>*</span> 发送频次：</div>
			<el-radio-group v-model="radio2" class="fl" style="margin-right:15px;margin-top:15px;" :disabled="disabledAll">
				<div class="fl" style="margin-right:30px;"><el-radio :label="1" v-show="oncType">只一次</el-radio></div>
				<div class="fl" style="margin-right:30px;" @click="dialogTableVisible = true"><el-radio :label="2" @change="dialogTableVisible = true">按天</el-radio></div>
				<div class="fl" style="margin-right:30px;" @click="anZM"><el-radio :label="3" @change="anZM">按周</el-radio></div>
				<div class="fl" style="margin-right:30px;" @click="anMM"><el-radio :label="4" @change="anMM">按月</el-radio></div>
			</el-radio-group>
		</el-form-item>
		</div>
		<el-form-item class="redBar" v-if="typeSendTime">
			<div class="yjItem"><span>*</span> 有效周期：</div>
			<!--<el-date-picker 
			  :disabled="disabledAll"
		      v-model="value6"
		      type="daterange"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      value-format="yyyy-MM-dd"
		      :editable="false"
		      >
		   	</el-date-picker>-->
		    <el-date-picker
		     :disabled="disabledAll"
		      v-model="value6[0]"
		      type="date"
		      value-format="yyyy-MM-dd"
		      :editable="false"
		      placeholder="开始时间">
		    </el-date-picker>
		    　至　
		    <el-date-picker
		      :disabled="disabledAll"
		      v-model="value6[1]"
		      type="date"
		      value-format="yyyy-MM-dd"
		      :editable="false"
		      placeholder="结束时间">
		    </el-date-picker>
		</el-form-item>
		
		<el-dialog title="选择时间" :visible.sync="dialogTableVisible"  width="30%"  @close="closeDay">
			<div style="margin-left:30px;">
				<el-radio-group v-model="radio3" style="margin-right:15px;margin-top:15px;">
					<el-radio :label="1">每天</el-radio>
					<el-radio :label="2">隔天</el-radio>
				</el-radio-group>
				<div style="clear: both;"></div>
			</div>
			<div slot="footer" class="dialog-footer fr">
		    	<el-button @click="closeDay" style="float: left;">取 消</el-button>
		   	 	<el-button type="primary" @click="queryBtn" style="float: left;">确 定</el-button>
		   	 	<div style="clear: both;"></div>
		 	</div>
		</el-dialog>
		<el-dialog title="选择时间" :visible.sync="dialogTableVisibleZM"  width="30%" @close="closeTime">
			<div style="margin-left:30px;margin-right:30px;">
				<el-checkbox-group class="fl" style="margin-right:15px;width:60px;margin-bottom: 10px;" v-model="dayArr" v-for="mpb in dayArrList" >
					<el-checkbox :key="mpb.id" :checked="mpb.checked" :label="mpb.id">{{mpb.name}}</el-checkbox>
				</el-checkbox-group>
				<div style="clear: both;"></div>
			</div>
			<div slot="footer" class="dialog-footer fr">
			 	<el-button @click="closeTime"  style="float: left;">取 消</el-button>
		   	 	<el-button type="primary" @click="timeList" style="float: left;">确 定</el-button>
		 	</div>
		 	<div style="clear: both;"></div>
		</el-dialog>
		<el-dialog title="选择时间" :visible.sync="dialogTableVisibleZMT"  width="30%" @close="closeTime">
			<div style="margin-left:30px;margin-right:30px;">
				<el-checkbox-group class="fl" style="margin-right:15px;width:60px;margin-bottom: 10px;" v-model="listArr" v-for="mpb in dayArrList1" >
					<el-checkbox :key="mpb.id" :checked="mpb.checked" :label="mpb.id">{{mpb.name}}</el-checkbox>
				</el-checkbox-group>
				<div style="clear: both;"></div>
			</div>
			<div slot="footer" class="dialog-footer fr">
			 	<el-button @click="closeTime" style="float: left;">取 消</el-button>
		   	 	<el-button type="primary" @click="timeList" style="float: left;">确 定</el-button>
		 	</div>
		 	<div style="clear: both;"></div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	      	dialogTableVisible:false,
	      	dialogTableVisibleZM:false,
	      	dialogTableVisibleZMT:false,
	      	typeSendTime:false,
	      	radio2:1,
	      	radio3:0,
	      	radio3Num:0,
	      	value:'',
	      	nameValue:'触发阈值，立即发送',
	      	value6:[this.getdate(0),this.getdate(1)],
	      	chlApp:true,
	      	chlEmail:false,
	      	chlPush:false,
	      	chlSms:false,
	      	chlWeiXin:false,
	      	arrListEmit:[],
	      	dayArr:[],
	      	dayArrNum:[],
	      	listArr:[],
	      	listArrNum:[],
	      	checkList:[],
	      	dayArrList:[],
	      	dayArrList1:[],
	      	txl:1,
	      	disabledAllSMS:'',
	      	options:[
	      		{
		          value: '00:00',
		          label: '00:00'
		        }, {
		          value: '01:00',
		          label: '01:00'
		        }, {
		          value: '02:00',
		          label: '02:00'
		        }, {
		          value: '03:00',
		          label: '03:00'
		        }, {
		          value: '04:00',
		          label: '04:00'
		        },{
		          value: '05:00',
		          label: '05:00'
		        }, {
		          value: '06:00',
		          label: '06:00'
		        }, {
		          value: '07:00',
		          label: '07:00'
		        }, {
		          value: '08:00',
		          label: '08:00'
		        }, {
		          value: '09:00',
		          label: '09:00'
		        },{
		          value: '10:00',
		          label: '10:00'
		        }, {
		          value: '11:00',
		          label: '11:00'
		        }, {
		          value: '12:00',
		          label: '12:00'
		        }, {
		          value: '13:00',
		          label: '13:00'
		        }, {
		          value: '14:00',
		          label: '14:00'
		        }, {
		          value: '15:00',
		          label: '15:00'
		        }, {
		          value: '16:00',
		          label: '16:00'
		        }, {
		          value: '17:00',
		          label: '17:00'
		        }, {
		          value: '18:00',
		          label: '18:00'
		        }, {
		          value: '19:00',
		          label: '19:00'
		        },{
		          value: '20:00',
		          label: '20:00'
		        }, {
		          value: '21:00',
		          label: '21:00'
		        }, {
		          value: '22:00',
		          label: '22:00'
		        }, {
		          value: '23:00',
		          label: '23:00'
		        }
	      	]
	      }
	      
	    },
	    props: {
	    	sms:String,
	      	typeLxRW: Boolean,
	      	oncType:Boolean,
	      	arrList:Array,
	      	txlBools:Boolean,
	      	typeCycle:Boolean,
	      	templateType:String,
	      	disabledAll:Boolean,
      		required: true,
	    },
	    mounted:function(){
	    	if(this.templateType=='custom'){
	    		this.nameValue = '立即发送'
	    		//this.typeCycle = false;
	    	}else{
	    		this.typeSendTime = true;
	    	}
	    	
	    	this.sendParent();
	    },
	    created:function(){
	    	if(this.sms=='SMS'){
	    		this.disabledAllSMS = false;
		    }else{
		    	this.disabledAllSMS = true;
		    	this.chlSms = false;
		    }
		    if(this.disabledAll){
		    	this.disabledAllSMS = true;
		    }
	    },
	    watch:{
	    	txl(){
	    		if(this.txl==1){
	    			this.typeSendTime = false;
	    		}else{
	    			this.typeSendTime = true;
	    		}
	    		this.sendParent();
	    	},
	    	sms(){
	    		if(this.sms=='SMS'){
	    			this.disabledAllSMS = false;
		    	}else if(this.sms==''){
		    		this.disabledAllSMS = true;
		    		this.chlSms = false;
		    	}
		    	if(this.disabledAll){
		    		this.disabledAllSMS = true;
		    	}
	    	},
	    	arrList(){
	    		this.infos();
	    	},
	    	value(){
	    		this.sendParent();
	    	},
	    	value6(){
	    		this.sendParent();
	    	},
	    	radio2(){
	    		this.sendParent();
	    	},
	    	radio3Num(){
	    		this.sendParent();
	    	},
	    	chlApp(){
	    		this.sendParent();
	    	},
	    	chlEmail(){
	    		this.sendParent();
	    	},
	    	chlPush(){
	    		this.sendParent();
	    	},
	    	chlSms(){
	    		this.sendParent();
	    	},
	    	chlWeiXin(){
	    		this.sendParent();
	    	}
	    },
	    methods:{
	    	changeSendTime($event){
	    		if(this.templateType=='custom'){
	    			$event=="1"?this.typeSendTime = false:this.typeSendTime = true;
	    		}else if(this.templateType=='creatTask'){
	    			$event=="1"?this.typeSendTime = true:this.typeSendTime = true;
	    		}
	    	},
	    	/*closeTime(){
	    		this.sendParent();
	    		his.dialogTableVisibleZM=false;
	    	},*/
	    	closeTime(){
	    		if(this.arrList.length<=0){
	    			this.dayArr=this.dayArrNum;
	    			this.listArr=this.listArrNum;
	    		}
	    		this.dialogTableVisibleZM = false;
	    		this.dialogTableVisibleZMT = false;
	    	},
	    	getdate(val) {
	            var now = new Date();
	            var y = now.getFullYear();
	            var m = ("0" + (now.getMonth() + 1)).slice(-2);
	                if(now.getDate()+val<10){
	                 var d = '0' + (now.getDate()+val);
	                }else{
	                 var d = now.getDate()+val;
	                }
	                //d = ("0" + now.getDate()).slice(-2)+val;
	            return y + "-" + m + "-" + d ;
	       },
	       closeDay(){
	       		this.radio3 = this.radio3Num;
	       		this.dialogTableVisible = false;
	       },
	       queryBtn(){
	       		this.radio3Num = this.radio3;
	       		this.dialogTableVisible = false;
	       },
	    	sendParent(){
	    		let arrss = []
	    		if(this.chlApp==true){
	    			arrss.push(1)
	    		}else{
	    			arrss.push(0)
	    		}
	    		if(this.chlEmail==true){
	    			arrss.push(1)
	    		}else{
	    			arrss.push(0)
	    		}
	    		if(this.chlPush==true){
	    			arrss.push(1)
	    		}else{
	    			arrss.push(0)
	    		}
	    		if(this.chlSms==true){
	    			arrss.push(1)
	    		}else{
	    			arrss.push(0)
	    		}
	    		if(this.chlWeiXin==true){
	    			arrss.push(1)
	    		}else{
	    			arrss.push(0)
	    		}
	    		let lists="";
	    		if(this.radio2==1){
	    			lists=this.radio2;
	    		}else if(this.radio2==2){
	    			lists=this.radio3Num;
	    		}else if(this.radio2==3){
	    			lists = (this.dayArrNum).join(",")
	    		}else if(this.radio2==4){
	    			lists = (this.listArrNum).join(",")
	    		}
	    		if(this.txl==1){
	    			this.value = "";
	    		}
	    		this.arrListEmit = [
	    			{sendTime:this.value},
	    			{effectCycleStartEnd:this.value6},
	    			{type:this.radio2},
	    			{typeArr:lists},
	    			{list:arrss},
	    			{sendType:this.txl},
	    		]
	    		this.$emit('arrListEmit', this.arrListEmit);
	    	},
	    	infos(){
	    		this.txl = this.arrList[5].sendType;
	    		this.value = this.arrList[0].sendTime;
	    		this.value6 = [this.arrList[1].effectCycleStart,this.arrList[2].effectCycleEnd];
	    		
	    		this.arrList[3].fsArr[0]==1?this.chlApp = true:this.chlApp = false
	    		this.arrList[3].fsArr[1]==1?this.chlEmail = true:this.chlEmail = false
	    		this.arrList[3].fsArr[2]==1?this.chlPush = true:this.chlPush = false
	    		this.arrList[3].fsArr[3]==1?this.chlSms = true:this.chlSms = false
	    		this.arrList[3].fsArr[4]==1?this.chlWeiXin = true:this.chlWeiXin = false
	    		
	    		this.radio2 = parseInt(this.arrList[4].type);
	    		if(this.radio2==2){
	    			this.radio3=parseInt(this.arrList[4].typeList[0]);
	    			this.radio3Num = this.radio3;
	    		}else if(this.radio2==3){
	    			this.dayArrNum=this.arrList[4].typeList.split(",");
	    			this.dayArr=this.dayArrNum.map(function(data){ 
				        return +data;  
				    });
	    		}else if(this.radio2==4){
	    			this.listArrNum=this.arrList[4].typeList.split(",");
	    			this.listArr=this.listArrNum.map(function(data){ 
				        return +data;  
				    });
	    		}
	    		
	    	},
	    	timeList(){
	    		this.dayArrNum = this.dayArr;
	    		this.listArrNum = this.listArr;
	    		this.dialogTableVisibleZM = false;
	    		this.dialogTableVisibleZMT = false;
	    		this.sendParent();
	    		//this.dayArr=[];
	    	},
	      	anZM:function(){
	      		this.dialogTableVisibleZM=true;
	      		this.dayArrList=[
		      		{id:2,name:"周一",checked:false},
		      		{id:3,name:"周二",checked:false},
		      		{id:4,name:"周三",checked:false},
		      		{id:5,name:"周四",checked:false},
		      		{id:6,name:"周五",checked:false},
		      		{id:7,name:"周六",checked:false},
		      		{id:1,name:"周日",checked:false}
		      	]
	      	},
	      	anMM:function(){
	      		this.dialogTableVisibleZMT=true;
	      		this.dayArrList1=[
		      		{id:1,name:"1日",checked:false},
		      		{id:2,name:"2日",checked:false},
		      		{id:3,name:"3日",checked:false},
		      		{id:4,name:"4日",checked:false},
		      		{id:5,name:"5日",checked:false},
		      		{id:6,name:"6日",checked:false},
		      		{id:7,name:"7日",checked:false},
		      		{id:8,name:"8日",checked:false},
		      		{id:9,name:"9日",checked:false},
		      		{id:10,name:"10日",checked:false},
		      		{id:11,name:"11日",checked:false},
		      		{id:12,name:"12日",checked:false},
		      		{id:13,name:"13日",checked:false},
		      		{id:14,name:"14日",checked:false},
		      		{id:15,name:"15日",checked:false},
		      		{id:16,name:"16日",checked:false},
		      		{id:17,name:"17日",checked:false},
		      		{id:18,name:"18日",checked:false},
		      		{id:19,name:"19日",checked:false},
		      		{id:20,name:"20日",checked:false},
		      		{id:21,name:"21日",checked:false},
		      		{id:22,name:"22日",checked:false},
		      		{id:23,name:"23日",checked:false},
		      		{id:24,name:"24日",checked:false},
		      		{id:25,name:"25日",checked:false},
		      		{id:26,name:"26日",checked:false},
		      		{id:27,name:"27日",checked:false},
		      		{id:28,name:"28日",checked:false},
		      		{id:29,name:"29日",checked:false},
		      		{id:30,name:"30日",checked:false},
		      		{id:31,name:"31日",checked:false},
		      	]
	      	}
	      	
	    }
	}
</script>
<style>
	.dxDay,.listDay{
		position: fixed;
		z-index: 10;
		top:160px;
		width:800px;
		border: 1px solid #333333;
		background: #FFFFFF;
		min-height: 300px;
		left:50%;
		margin-left:-400px;
	}
	.timeZq .el-dialog__footer {
    padding: 0px 20px 60px;
    text-align: right;
    box-sizing: border-box;
	}
</style>
