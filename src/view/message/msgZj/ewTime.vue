<template>
	<div>
		<el-form-item class="redBar fl" style="width:200px;">
			<div class="yjItem"><span>*</span> 统计频度：</div>
			<div>每日</div>
		</el-form-item>
		<el-form-item class="redBar fl" style="width:400px;">
			<div class="yjItem"><span>*</span> 统计时间：</div>
			<el-select class="fl" v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
		</el-form-item>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	export default {
	    data() {
		      return {
		      	value:'06:00',
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
	    	created:function(){
	    		if(this.timeValues!=""){
	    			this.value=this.timeValues;
	    		}
	    		this.sendValue();
	    	},
	    	props: [
			    "timeValues",
			],
	   	 	watch:{
		    	value(){
		    		this.sendValue();
		    	},
	     	},
	     	methods:{
	     		sendValue(){
	     			this.$emit('timeValue', this.value);
	     		}
	     	}
	}
</script>

<style>
</style>