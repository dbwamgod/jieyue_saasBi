<template>
	<div>
		<div class="contentTitle">
			<div class="titleFont">{{title}}</div>
			<div class="fr backIcon" @click="dqMb">返回</div>
		</div>
		
		<div class='contentBoxBg'>
			<el-form ref="form" :model="form" label-width="100px">
			  	<el-form-item class="input_box redBar">
				  	<div class="yjItem"><span>*</span> 模板名称：</div>
				  	<div style="width:80%;float:left;position: relative;">
				  		<el-input maxlength="30" :disabled="isDisabled" v-model.trim="form.name"></el-input>
				        <div class="total_num">
				          <span class="current_num">{{form.name.length}}</span>
				          <span>/30</span>
				        </div>
				  	</div>
			  	</el-form-item>
			  	<el-form-item class="input_box redBar">
				  	<div class="yjItem"><span>*</span> 消息标题：</div>
				  	<div style="width:80%;float:left;position: relative;">
					    <el-input maxlength="35" :disabled="isDisabled" v-model.trim="form.title"></el-input>
				        <div class="total_num">
				          <span class="current_num">{{form.title.length}}</span>
				          <span>/35</span>
				        </div>
				   </div>
			  	</el-form-item>
			  
				<quillEditor :isDisabled="isDisabled" v-on:quillContent="quillContents" v-if="qullBool" :initQuill="initQuill"></quillEditor>
				<div class="btnBox" v-if="!isDisabled">
				    <el-button type="info" class="btnLeft" @click="dqMb">取消</el-button>
				    <el-button type="primary" class="btnRight" :disabled="disabled" @click="onSubmit">确定</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import quillEditor from "@/view/message/msgZj/quillEditor";
import api from "../../../api";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisibleZM: false,
      title: "新增消息模板",
      disabled: true,
      isDisabled:false,
      id: "",
      form: {
        name: "",
        title: ""
      },
      quillContent: { html: "", content: "" },
      initQuill: "",
      qullBool: true
    };
  },
  components: {
    quillEditor
  },
  mounted: function() {
    // console.log(this.$route.query.id);
    if (this.$route.query.id) {
      this.title = "编辑消息模板";
      this.id = this.$route.query.id;
      this.qullBool = false;
      this.initEdit();
      if(this.$route.query.detail=='check'){
      	this.title = "查看消息模板";
      	this.isDisabled = true;
      }
    } else {
      this.disabled = false;
    }
  },
  methods: {
    quillContents(data) {
      this.quillContent = data;
    },
    onSubmit(name) {
      let vm = this;
      vm.form.name = this.form.name.replace(/\s/g, "");
      if (vm.form.name == "") {
        this.$dbwDialog("模板名称不能为空！", "提示", {
          typeVisible: true,
                footerCancel: false,
                align: "center",
        });
        return false;
      }
      if (vm.form.title == "") {
        this.$dbwDialog("消息标题不能为空！", "提示", {
         typeVisible: true,
                footerCancel: false,
                align: "center",
        });
        return false;
      }
      this.disabled = true;
      if (vm.id) {
        if (vm.quillContent.html == "") {
          this.$dbwDialog("推送内容不能为空！", "提示", {
            typeVisible: true,
                footerCancel: false,
                align: "center",
          });
          this.disabled = false;
          return false;
        }
        if (
          vm.quillContent.content.replace(/\s/g, "") == "<p></p>" ||
          vm.quillContent.content.replace(/\s/g, "") == ""
        ) {
          this.$dbwDialog("推送内容不能为空！", "提示", {
           typeVisible: true,
                footerCancel: false,
                align: "center",
          });
          this.disabled = false;
          return false;
        }
        this.$http.get(api.checkMsgTask(vm.id)).then(res => {
          //console.log(res);
          if (res.data.code == 200) {
            this.disabled = false;
            this.$http.post(api.msgUpdate(), {
                templetId: vm.id,
                name: vm.form.name,
                title: vm.form.title,
                channelList:[0,1,4],
                content: vm.quillContent.html,
                textContent:vm.quillContent.content
              })
              .then(res => {
                //console.log(res);
                if (res.data.code == 200) {
                  this.$dbwDialog("消息模板修改成功！", "提交成功", {
                    typeVisible: true,
                    align: "center",
                    footerCancel: false,
                    okClick: action => {
                      this.$router.go(-1);
                    }
                  });
                } else {
                  vm.$message({
                    message: res.data.msg,
                    duration: "1500",
                    type: "warning"
                  });
                }
              });
            //this.$router.push({path:"/saas/message/msgTemplate",query:{id:vm.form.name}});
          } else {
            this.disabled = false;
            this.$dbwDialog(
              "编辑当前模板，消息调度方会一起被变更, 是否继续?",
              "提示",
              {
               typeVisible: true,
               align: "center",
               okText:'继续',
               cancelText:'放弃',
               okClick:() => {
                   this.$http
                  .post(api.msgUpdate(), {
                    templetId: vm.id,
                    name: vm.form.name,
                    title: vm.form.title,
                    channelList:[0,1,4],
                    content: vm.quillContent.html,
                    textContent:vm.quillContent.content
                  })
                  .then(res => {
                    if (res.data.code == 200) {
                      this.$dbwDialog("消息模板修改成功！", "提交成功", {
												typeVisible:true,
												align:'center',
												footerCancel:false,
                        okClick: action => {
                          this.$router.go(-1);
                        }
                      });
                    } else {
                      vm.$message({
                        message: res.data.msg,
                        duration: "1500",
                        type: "warning"
                      });
                    }
                  });
               }
              }
            )
              
          }
        });
      } else {
        if (vm.quillContent.html == "") {
          this.$dbwDialog("推送内容不能为空！", "提示", {
           	typeVisible:true,
												align:'center',
												footerCancel:false,
          });
          this.disabled = false;
          return false;
        }
        if (
          vm.quillContent.content.replace(/\s/g, "") == "<p></p>" ||
          vm.quillContent.content.replace(/\s/g, "") == ""
        ) {
          this.$dbwDialog("推送内容不能为空！", "提示", {
            	typeVisible:true,
												align:'center',
												footerCancel:false,
          });
          this.disabled = false;
          return false;
        }
        this.$http
          .post(api.msgAdd(), {
            name: vm.form.name,
            title: vm.form.title,
            channelList:[0,1,4],
            content: vm.quillContent.html,
            textContent:vm.quillContent.content
          })
          .then(res => {
            //console.log(res);
            if (res.data.code == 200) {
              this.disabled = false;
              this.$dbwDialog("消息模板新建成功！", "提交成功", {
								typeVisible:true,
								align:'center',
								footerCancel:false,
                okClick: action => {
                 	this.$router.go(-1);
                }
              });
            } else {
              vm.$message({
                message: res.data.msg,
                duration: "1500",
                type: "warning"
              });
              this.disabled = false;
            }
          });
      }
    },
    initEdit: function() {
      var vm = this;
      this.$http.get(api.msgSearchDT(vm.id)).then(res => {
        //console.log(res);
        if (res.data.code == 200) {
          vm.form.name = res.data.data.name;
          vm.form.title = res.data.data.title;
          vm.initQuill = res.data.data.content;
          vm.qullBool = true;
          this.disabled = false;
          //this.$router.push({path:"/saas/message/msgTemplate",query:{id:vm.form.name}});
        } else {
          vm.$message({
            message: res.data.msg,
            duration: "1500",
            type: "warning"
          });
        }
      });
    },
    dqMb: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.el-textarea__inner {
  min-height: 200px !important;
}
/*.fidBox {
  position: fixed;
  z-index: 10;
  top: 100px;
  width: 800px;
  border: 1px solid #333333;
  background: #ffffff;
  min-height: 300px;
  left: 50%;
  margin-left: -690px;
}
.bbBox {
  position: fixed;
  z-index: 10;
  top: 100px;
  width: 800px;
  border: 1px solid #333333;
  background: #ffffff;
  min-height: 300px;
  left: 50%;
  margin-left: -690px;
}*/
.input_box {
  position: relative;
  margin-bottom: 32px;
  .total_num {
    position: absolute;
    right: 0%;
    top: -33px;
  }
  .total_num_desc {
    position: absolute;
    right: 0%;
    top: -33px;
  }
  .current_num {
    color: red;
  }
}
</style>
