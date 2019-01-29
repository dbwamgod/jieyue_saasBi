<template>
  <div style="display: inline-block;">
  	<el-checkbox v-model="defaultP" style="margin-right:20px; " v-if="showDefault" :disabled="disabledAll"  class="fl" :checked="defaultType">默认人员</el-checkbox>
    <el-button :disabled="disabledAll" style="height:30px;padding:0px 20px;" @click="isMolType" type="primary">{{ryName}}</el-button>
    <!--<div class="fl" style="cursor: pointer;width: auto;margin:0 20px;color:#5594EB;" @click="isMolType">+ 排他门店</div>-->
    <el-dialog title='编辑' customClass="peopleDialog" :visible.sync="dialogPersonnelVisible" @close="closeDialog" v-if="dialogPersonnelVisible" >
      <!-- <div class="personne-dialog-title">
        <span>编辑</span>
      </div> -->
      <div style="width:50%;padding:10px 0;">
        <el-autocomplete
          v-model="statePerson"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入人员名称"
          @select="handleSelect"
          size="medium"
          :hide-loading="true"
          :trigger-on-focus="false"  
          class='personneInput'
        ></el-autocomplete>
        <div style="clear: both;"></div>
      </div>
      
      <div class="boxTree" >
        <div class="boxTree-content">
            <p class="boxTree-content-title">可选</p>
            <div class="personneTree">
              <!-- <div class="personneTreeScrol"> -->

                  <el-tree
                  :data="info"
                  :default-checked-keys='defaultCheckedKeys'
                  :props="props1"
                  node-key='id'
                  ref="tree"
                  default-expand-all
                  @check-change="handleCheckChange"
                  show-checkbox>
                </el-tree>
              <!-- </div> -->
            
            </div>
        </div>
        <div class="boxTree-content" style="margin-left:25px; flex-shrink:0;">
            <div class="boxTree-content-title"><span>已选</span><div class="deleteIcon" style="float:right; height:30px;" @click="removePersonAll"></div> </div>
          <div class="personneShowList">
            <!-- <div class="personneListScrol" style="padding-bottom: 20px;"> -->
            <ul>
              <li v-for="(item, index) in personneCheckedList "  :key='item.id' style="padding:5px 10px;font-size:16px; line-height: normal;">
                {{item.name}}  <span class="el-icon-close" style="float:right;cursor:pointer;"
                                      @click="removePerson(item.id,personneCheckedList)"></span></li>
            </ul>
            <!-- </div> -->
           </div>
        </div>
       
      
      </div>

			<div slot="footer" class="dialog-footer btnBox" style="text-align: center;    margin-left: 15px;">
				    <el-button type="info" class="btnLeft" @click="closeDialog">取消</el-button>
				    <el-button type="primary" class="btnRight" @click="affirmDialog">确定</el-button>
			</div>
      
    </el-dialog>
  </div>
</template>


<script>
import api from "@/api";
export default {
  data() {
    return {
      dialogPersonnelVisible: false,
      statePerson: "",
      ryName: "+ 额外人员",
      personneCheckedList: [],
      newPersonneCheckedList: [],
      defaultP: "",
      defaultType: true,
      showDefault: true,
      props1: {
        label: "name",
        children: "child"
      },
      info: [
        // {
        //   id: "0e2",
        //   name: "全选",
        //   type: "1",
        //   child: []
        // }
      ]
    };
  },
  watch: {
    personneList: function(val, oldVal) {
      const personneList = val.map(r => {
        r.id = r.id.toString();
        return r;
      });
      this.closePersonneList = JSON.parse(JSON.stringify(personneList));
      this.personneCheckedList = JSON.parse(JSON.stringify(personneList));
    },
    defaultP: function() {
      this.storeSendFun();
    }
  },
  props: [
    "orgIds",
    "personneList",
    "defaultCheckedKeys",
    "disabledAll",
    "templateType",
    "defaultPs",
    "isRuleOut"
  ],
  mounted() {
    if (this.orgIds) {
      this.$http
        .post(api.findPersonnelNum(), {
          code: this.orgIds
        })
        .then(r => {
          if (r.data.code === 200) {
            this.info.push(...r.data.data);
          }
        });
    }
    if (this.templateType == "custom") {
      this.showDefault = false;
      this.ryName = "选择人员";
    }
    if (this.isRuleOut) {
      this.showDefault = false;
      this.ryName = "排他人员";
    }
    if (this.defaultPs == false || this.defaultPs == true) {
      this.defaultP = this.defaultPs;
    }

    const personneList = this.personneList.map(r => {
      r.id = r.id.toString();
      return r;
    });
    this.closePersonneList = JSON.parse(JSON.stringify(personneList));
    this.personneCheckedList = JSON.parse(JSON.stringify(personneList));
    this.storeSendFun();
  },
  methods: {
    storeSendFun() {
      let src = "";
      if (this.defaultP == true) {
        src = 1;
      } else {
        src = 0;
      }
      this.$emit("storeSenda", src);
    },
    removePerson(id, personneCheckedList) {
      let keys = personneCheckedList.filter(r => r.id !== id).map(r => r.id);
      this.$refs.tree.setCheckedKeys(keys);
      this.personneCheckedList.remove(
        personneCheckedList.filter(r => r.id === id)[0]
      );
      this.statePerson = "";
    },
    removePersonAll() {
      this.$refs.tree.setCheckedKeys(new Array());
      this.personneCheckedList=[];
    },
    querySearchAsync(queryString, cb) {
      this.$http
        .post(api.searchPersonnel(), {
          name: queryString || ""
        })
        .then(r => {
          if (r.data.code === 200) {
            if (r.data.data) {
              const results = r.data.data.map(item => {
                item.value = item.name;
                return item;
              });
              cb(results);
            }
          }
        });
    },
    handleSelect(item) {
      const data = {
        id: item.id + "",
        name: item.value,
        type: "2",
        child: null
      };
      this.personneCheckedList.filter(r => r.id === data.id)[0]
        ? ""
        : this.personneCheckedList.push(data);
      this.$refs.tree.setCheckedKeys(this.personneCheckedList.map(r => r.id));
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleCheckChange(data, checked, indeterminate) {
      // //数据  是否选中  子节点是否选中
      // if (data.type === "1") {

      // if (checked && !indeterminate) {

      //     data.child.map(item => {

      //       if (!this.personneCheckedList.filter(r => r.id === item.id)[0] ) {
      //         this.personneCheckedList.push(item);
      //       } else {
      //         this.personneCheckedList.remove(item);
      //       }
      //     });
      //   }else{
      //       data.child.map(item => {
      //       if (this.personneCheckedList.filter(r => r.id === item.id)[0]) {
      //        this.personneCheckedList.remove(item);
      //       }
      //     });

      //   }
      // }
      if (checked && !indeterminate && data.type !== "1") {
        if (!this.personneCheckedList.filter(r => r.id === data.id)[0]) {
          this.personneCheckedList.push(data);
        }
      } else {
        this.personneCheckedList.remove(data);
      }
    },
    closeDialog() {
      this.dialogPersonnelVisible = false;
      this.isRuleOut
        ? this.$emit("ruleOutpersonneCheckedList", this.closePersonneList)
        : this.$emit("personneCheckedList", this.closePersonneList);
      this.statePerson = "";
    },
    affirmDialog() {
      if (this.personneCheckedList.length === 0) {
        return this.$dbwDialog("请选择人员", "提示", {
          typeVisible: true,
          align: "center",
          footerCancel: false
        });
      }
      this.isRuleOut
        ? this.$emit("ruleOutpersonneCheckedList", this.personneCheckedList)
        : this.$emit("personneCheckedList", this.personneCheckedList);
      this.dialogPersonnelVisible = false;
      this.statePerson = "";
    },
    isMolType() {
      this.dialogPersonnelVisible = true;
    }
  }
};
</script>
<style scoped>
.boxTree {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.boxTree-content-title {
  line-height: 30px;
  font-size: 16px;
  font-weight: 600;
  background: #f6f6f6;
  font-size: 14px;
  color: #333744;
  text-indent: 16px;
}
.boxTree-content{
  border:1px solid #C9C9C9;
  flex-grow: 1;
  max-width:50%;
}
.personneTree,
.personneShowList {
  position: relative;
  min-height: 300px;
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  /* overflow: hidden; */
  box-sizing: border-box;
 
}
.personneTree::-webkit-scrollbar,
.personneShowList ::-webkit-scrollbar {
  /* display: none; */
}
.personneInput {
  width: 100% !important;
  padding:0 1px;
}
.personneTreeScrol {
  min-height: 300px;
  max-height: 350px;
  width: 106%;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.personneListScrol {
  min-height: 300px;
  max-height: 305px;
  padding: 0 5px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 45px;
  bottom: 0;
  right: 0;
}
.personneShowList {
}

.personneShowList li:hover {
  background: #f5f7fa;
}
.peopleDialog .el-dialog__body {
  padding-top: 0px;
}
.personne-dialog-title {
  background: #f6f6f6;
}
.el-dialog__footer{
	padding:0 20px 20px !important;
}
</style>
