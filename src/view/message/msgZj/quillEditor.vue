<template>
	<div style="width:100%;">
		<el-form ref="form" :model="form">
			<el-form-item class="redBar">
				<div class="yjItem"><span>*</span> 推送内容：</div>
	        	<el-button type="primary" :disabled="isDisabled" @click="dialogTableVisible = true" style="height: 30px;padding:8px 20px;">插入参数</el-button>
	        	<el-button type="primary" :disabled="isDisabled" @click="dialogTableVisibleZM = true" style="height: 30px;padding:8px 20px;">插入报表</el-button>
		  	</el-form-item>
		  	<el-form-item class="redBar" style="width:100%;min-height: 100px;">
		  		<div class="yjItem"></div>
				<quill-editor style="margin-left:156px;width:80%;"
					  :disabled="isDisabled"
				      v-model="content" 
				      ref="myTextEditor" 
				      :options="editorOption" 
				      @change="onEditorChange($event)">
				</quill-editor>
			</el-form-item>
		</el-form>    
					<el-dialog title="选择参数" :visible.sync="dialogTableVisible" width="50%" @close="closeCz">
              <div class="quil-dialog-scrol">
                  <el-form ref="forms" v-for="item in csList" style="width:95%;margin:0 auto;">
                    <el-form-item style="margin-bottom: 0;">
                      <div style="font-size: 14px;color: #333744;font-weight: bold;">{{item.classifyName}}</div>
                      <el-checkbox-group style="border-bottom: 1px solid #E1E1E1;" v-model="checkList">
                          <el-checkbox v-for="mpb in item.data" style="width:200px;font-size: 14px;color: #333744;margin-right:10px;" :label="mpb.varName" >{{mpb.varName}}</el-checkbox>
                          <!--:key="mpb.id"-->
                        </el-checkbox-group>
                    </el-form-item>
                  </el-form>
              </div>
						<span slot="footer" class="dialog-footer">
								<el-button @click="closeCz">取 消</el-button>
								<el-button type="primary" @click="czClick">确 定</el-button>
						</span>
					</el-dialog>
					
					<el-dialog class="quillCheck" title="选择报表" :visible.sync="dialogTableVisibleZM"  width="50%" @close="closeBB">
						<el-form ref="forma" v-for="item in bbList" :model="forma" style="width:95%;margin:0 auto;">
									<el-form-item>
									<div style="font-size: 14px;color: #333744;font-weight: bold;">{{item.classifyName}}</div>
									<el-checkbox-group style="border-bottom: 1px solid #E1E1E1;" v-model="bbcheckList">
											<el-checkbox v-for="mpb in item.data" style="width:200px;font-size: 14px;color: #333744;margin-right:10px;" :key="mpb.bs_code" :label="mpb.bs_name">{{mpb.bs_name}}</el-checkbox>
										</el-checkbox-group>
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
								<el-button @click="closeBB">取 消</el-button>
								<el-button type="primary" @click="bbClick">确 定</el-button>
						</span>
					</el-dialog>
			
	</div>
   
</template> 
<script>
import Vue from "vue";
import ElementUI from "element-ui";
import api from "../../../api";

Vue.use(ElementUI);
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisibleZM: false,
      content: "",
      form: {
        name: "",
        title: "",
        desc: ""
      },
      forms: {
        type: []
      },
      forms: {
        type: []
      },
      forma: {
        type: []
      },
      csList: [],
      bbList: [],
      checkList: [],
      bbcheckList: [],
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"], // 加粗 斜体 下划线
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }]
          ]
        }
      }
    };
  },
  created: function() {
    this.getParams();
    this.getBss();
    if (this.initQuill) {
      this.content = this.initQuill;
      this.$emit("quillContent", {
        html: this.initQuill,
        content: this.content
      });
    }
  },
  props: {
    initQuill: String,
    isDisabled:Boolean,
    required: true
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      this.$emit("quillContent", {
        html: this.$refs.myTextEditor.quill.container.firstChild.innerHTML,
        content: text
      });
    },
    getParams() {
      var vm = this;
      this.$http.get(api.getParam()).then(res => {
        //console.log(res);
        if (res.data.code == 200) {
          //console.log(res.data.data)
          vm.csList = res.data.data;
        } else {
          vm.$message({
            message: res.data.msg,
            duration: "1500",
            type: "warning"
          });
        }
      });
    },
    getBss() {
      var vm = this;
      this.$http.get(api.getBs()).then(res => {
        //console.log(res);
        if (res.data.code == 200) {
          //console.log(res.data.data)
          vm.bbList = res.data.data;
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
    },
    closeBB() {
      this.bbcheckList = [];
      this.dialogTableVisibleZM = false;
    },
    closeCz() {
      this.checkList = [];
      this.dialogTableVisible = false;
    },
    czClick: function() {
      let vm = this;
      if (this.checkList.length > 0) {
        var len = this.$refs.myTextEditor.quill.getLength();
        var range = this.$refs.myTextEditor.quill.getSelection();
        if (range == null) {
          this.$refs.myTextEditor.quill.setSelection(len, 0);
          range = this.$refs.myTextEditor.quill.getSelection();
          /*this.$message({
				            message: '光标不在选择区域！',
				            duration:'1500',
				            type: 'warning'
				        });
				        this.dialogTableVisible=false;
				        return false;*/
        }
        this.$refs.myTextEditor.quill.insertText(range.index, " ", {
          color: "#2c3e50"
        });
        var range = this.$refs.myTextEditor.quill.getSelection();
        this.$refs.myTextEditor.quill.clipboard.dangerouslyPasteHTML(
          range.index,
          '<span style="color:red">${' + vm.checkList.join("}$${") + "}$</span>"
        );
        var range = this.$refs.myTextEditor.quill.getSelection();
        this.$refs.myTextEditor.quill.insertText(range.index, " ", {
          color: "#2c3e50"
        });
        this.dialogTableVisible = false;
      } else {
        this.$message({
          message: "请至少选择一个参数",
          duration: "1500",
          type: "warning"
        });
      }
    },
    bbClick: function() {
      let vm = this;
      if (this.bbcheckList.length > 0) {
        var len = this.$refs.myTextEditor.quill.getLength();
        var range = this.$refs.myTextEditor.quill.getSelection();
        var range = this.$refs.myTextEditor.quill.getSelection();
        if (range == null) {
          this.$refs.myTextEditor.quill.setSelection(len, 0);
          range = this.$refs.myTextEditor.quill.getSelection();
          /*this.$message({
				            message: '光标不在选择区域！',
				            duration:'1500',
				            type: 'warning'
				        });
				        this.dialogTableVisible=false;
				        return false;*/
        }
        this.$refs.myTextEditor.quill.insertText(range.index, " ", {
          color: "#2c3e50"
        });
        var range = this.$refs.myTextEditor.quill.getSelection();
        this.$refs.myTextEditor.quill.clipboard.dangerouslyPasteHTML(
          range.index,
          ' <span style="color:#3a96f2;">#{' +
            vm.bbcheckList.join("}##{") +
            "}#</span>"
        );
        var range = this.$refs.myTextEditor.quill.getSelection();
        this.$refs.myTextEditor.quill.insertText(range.index, " ", {
          color: "#2c3e50"
        });
        this.dialogTableVisibleZM = false;
      } else {
        this.$message({
          message: "请至少选择一个参数",
          duration: "1500",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style>
  .quil-dialog-scrol{
		max-height: 500px;
		overflow-y: scroll;
	}

</style>