<template>
	<div>
		<el-form ref="form" :model="form" label-width="100px">
			<el-form-item class="redBar">
				<div class="yjItem"><span>*</span> 消息模板：</div>
		    	<el-select :disabled="disabledAll "  v-model="value" @change="getMsgTemplate" placeholder="请选择" style="width:80%;">
				    <el-option 
				      v-for="item in options"
				      :key="item.templet_id"
				      :label="item.name"
				      :value="item.templet_id">
				    </el-option>
				</el-select>
		  	</el-form-item>
		  	<el-form-item class="redBar">
		  		<div class="yjItem">消息标题：</div>
		    	<el-input v-model="form.title" style="width:80%" disabled ></el-input>
		 	</el-form-item>
		 	<el-form-item class="redBar">
		 		<div class="yjItem">推送内容：</div>
		    	<div class="htmContent ql-editor" id="textArea" style="width:80%;" v-html="form.desc" disabled></div>
		  	</el-form-item>
		</el-form>
	</div>
</template>

<script>
import api from "../../../api";
export default {
  data() {
    return {
      options: [],
      form: {
        title: "",
        desc: "",
        name: ""
      },
      value: "",
      valueName: "",
    };
  },
  props: {
    values: String,
    required: true,
    disabledAll:Boolean,
    isDisabled: Boolean,
  },
  created: function() {
  	console.log(this.values)
  	if(this.disabledAll){
  		this.value = parseInt(this.values);
  		this.getMsgTemplate();
  	}else{
  		this.getMsgNameList();
  	}
    
  },
  watch:{
  	values(){
  		if(this.disabledAll){
  			this.value = parseInt(this.values);
  			this.getMsgTemplate();
	  	}else{
	  		this.getMsgNameList();
	  	}
  	}
  },
  methods: {
    getMsgNameList() {
      let vm = this;
      this.$http.get(api.getMsgListName(), {}).then(res => {
        if (res.data.code == 200) {
          vm.options = res.data.data;
          if (vm.values) {
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].templet_id == vm.values) {
                vm.value = parseInt(this.values);
                this.getMsgTemplate();
              }
            }
          }
        } else {
          vm.$message({
            message: res.data.msg,
            duration: "1500",
            type: "warning"
          });
        }
      });
    },
    getMsgTemplate() {
      let vm = this;
      this.$http.get(api.msgSearchDT(vm.value)).then(res => {
        if (res.data.code == 200) {
        	if(res.data.data!=null&&res.data.data!=''){
        		vm.form.title = res.data.data.title;
		        vm.form.desc = res.data.data.content;
		        vm.valueName = res.data.data.name;
		        if(this.disabledAll){
		        	vm.value = res.data.data.name;
		        }else{
		        	vm.value = res.data.data.templet_id;
		        }
		        let SMSType = '';
		        //console.log(res.data.data.channels.find((ele) => ele==2));
		        for (const element of res.data.data.channels) {
				    if(element==2){
		        		SMSType = 'SMS';
		        	}
				}
		        let formList = {
		           value: vm.value,
		           title: vm.form.title,
		           desc: vm.form.desc,
		           valueName: vm.valueName,
		           SMSType: SMSType
		        };
		        this.$emit("templateList", formList);
        	}
          
        } else {
          //vm.$message.error(res.data.Msg);
        }
      });
    }
  }
};
</script>

<style>
	.htmContent{
		height:110px;
		overflow-y: auto;
		overflow-x: hidden;
		border:1px solid #c0c4cc;
		-webkit-appearance: none;
	    background-color: #f5f7fa;
	    border-color: #e4e7ed;
	    color: #c0c4cc;
	    cursor: not-allowed;
	    border-radius: 4px;
		-webkit-user-select:none;
    	-moz-user-select:none;
    	-ms-user-select:none;
    	user-select:none;
    	/* text-indent: 15px; */
	}
</style>