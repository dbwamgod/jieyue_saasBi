<template>
  <div >
    <div >
      <div class="task-content" >
        <div class='clearfloat taskHandtitle' >
          <div class='titleFont'>运营任务</div> 
          <p class="fr">
            <el-radio-group v-model="taskHandListType" @change='radioChange' :disabled="dialogToggle" class='taskHandRadio' size="mini">
                <el-radio-button label="0" >可见列表</el-radio-button>
                <el-radio-button label="1" >隐藏列表</el-radio-button>
            </el-radio-group>
          </p>
        </div>      
        <div style=' min-height:400px' v-loading='loading'> 
          <el-row  :gutter="30">
            <div v-if="!showData" style="text-align: center;margin-top:50px;font-size:18px; padding:30px 0;">{{titleFont}}</div>
            <el-col  :span='5' v-for="item in taskHandList" v-if="showData" style='min-width:255px;'>
              <div class="grid-content"> <!--item.storeTotal && v-show="item.displayStatus==taskHandListType"  @click="editClick(item)" -->
                <div class='task-card-title'>
                  <span class='task-card-item '><img  :src="require('../../../assets/images/itemIcon.png')" alt="" style='margin-right:4px; vertical-align: middle;'><span style='vertical-align: middle;'> {{item.createTime | filterLength}} </span></span>
                  <span class="task-card-eyes">
                    <el-tooltip :content="item.displayStatus==0?'隐藏任务':'取消隐藏'" placement="bottom">
                     <img  :src="require('@/assets/images/eyesIcon.png')" alt="" @click.stop="taskHandIsShow(item,1)" v-if="item.displayStatus==0"> 
                     <img  :src="require('@/assets/images/eyesHiddenIcon.png')" alt="" @click.stop="taskHandIsShow(item,0)" v-if="item.displayStatus==1">
                    </el-tooltip >
                  </span>
                  <el-tooltip content="查看详情" placement="bottom">
                    <span class="task-card-check" ><img  :src="require('../../../assets/images/checkIcon.png')" alt="" @click.stop='editClick(item)'></span>
                  </el-tooltip>
                </div>
                <p  style="height:72px;text-align:center">{{item.taskName || '' | stringFilter(20)}}<br/>{{item.storeTotal || 0}}个门店</p>
                <el-row  type='flex' justify='end' :gutter='12'>
                 <el-col :span='3' >
                      <!-- <span @click.stop='cancelEvent()'> -->
                         <!-- <el-button type="primary" style="padding:8px 15px" @click.stop="sendKey" :disabled="item.isValid==1">一键发送</el-button> -->
                    <el-tooltip :content="item.taskStatus==1?'已发送':'发送消息'" placement="top" style="outline:none;">
                      <span>
                        <img  :src="require('@/assets/images/sendMessage.png')" alt=""   v-show='item.taskStatus==1'>
                        <img class="pointer" :src="require('@/assets/images/sendMessageAction.png')" alt="" @click.stop="sendHandTask(item.id)" v-show='item.taskStatus!=1'>

                      </span>
                    </el-tooltip>
                      <!-- </span> -->
                  </el-col>
                  <el-col :span='4' style='margin-right:12px;'>
                      <!-- <el-button type="primary" style="padding:8px 15px" @click.stop='taskClickDetails(item.id)'>核对列表</el-button> -->
                      <el-tooltip content="消息核对" placement="top">
                          <img class="pointer" :src="require('@/assets/images/checkButtonIconAction.png')" alt="" @click.stop='taskClickDetails(item.id)'>
                      </el-tooltip>
                      <!-- <img class="pointer" :src="require('@/assets/images/checkButtonIcon.png')" alt=""> -->
                      <!-- :disabled="item.isValid==0"  -->
                  </el-col>
                  <!-- <el-col :span='3' >
                    <span @click.stop='cancelEvent()'>
                      <el-button type="primary" style="padding:8px 15px" @click.stop="recallKey" :disabled="item.taskStatus==0">一键召回</el-button> 
                      <img class="pointer" :src="require('@/assets/images/recallMessage.png')" alt="">
                      <img class="pointer" :src="require('@/assets/images/recallMessageAction.png')" alt="">
                    </span>
                  </el-col>  -->
                </el-row>   
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- <taskHandModal :dialogTitle='dialogTitle' :dialogToggle="dialogToggle" @dialogVisibleClick='dialogVisibleClick'></taskHandModal>  -->
    </div>
        
  </div>
</template>

<script>
import api from "@/api";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import eyesIcon from "@/assets/images/eyesIcon.png";
import eyesHiddenIcon from "@/assets/images/eyesHiddenIcon.png";
import Moment from "moment";


export default {
  data() {
    return {
      taskHandList: [],
      tableData: [],
      shows: true,
      showData: true,
      taskHandListType: sessionStorage.getItem("taskHandListType") || "0",
      dialogTitle: "消息核对（已发消息）",
      dialogToggle: false, //切换控制按钮
      isShow: "0",
      titleFont: "",
      eyesIcon,
      loading: true,
      eyesHiddenIcon
    };
  },
  components: {
    // taskHandModal
  },
  filters: {
    filterLength(value) {
      return value.substring(0, value.length - 3);
    }
  },
  mounted: function() {
    this.init();
  },
  methods: {
    init() {
      this.dialogToggle = true;
      if (!this.taskHandList.length) {
        this.showData = false;
      }
      this.$http
        .post(api.getTaskHandInstanceList(), {
          currentPage: 1,
          displayStatus: this.taskHandListType,
          endTime: Moment(new Date()).format("YYYY-MM-DD"),
          pageSize: 1000,
          startTime: Moment(new Date().getTime() - 24 * 60 * 60 * 1000).format(
            "YYYY-MM-DD"
          ),
          taskType: 2
        })
        .then(r => {
          if (r.data.code === 200) {
            this.loading = false;
            if (
              r.data.data.length == 0 ||
              r.data.data == "" ||
              r.data.data == null ||
              r.data.data == undefined
            ) {
              if (this.taskHandListType == 0) {
                this.titleFont = "暂无手动任务运营数据~";
              } else {
                this.titleFont = "这里空空如也~";
              }
              this.showData = false;
            } else {
              this.showData = true;
              this.taskHandList = r.data.data;
            }
          } else {
            this.loading = false;
            if (this.taskHandListType == 0) {
              this.titleFont = "暂无手动任务运营数据~";
            } else {
              this.titleFont = "这里空空如也~";
            }
            this.$message({
              message: r.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
          this.dialogToggle = false;
        });
    },
    voice() {
      let recognition = new webkitRTCPeerConnection();
      recognition.onresult=(event) =>{
        console.log('录取',event);
        
      }
      console.log(recognition)
      recognition.start();
    },
    editClick(datas) {
      this.shows = false;
      this.$router.push({
        path: "/saas/message/taskHand/handTemplate",
        query: {
          page: "edit",
          id: datas.id,
          isDisable: true, //判断是不是发送过!!Number(datas.isValid)
          orgIds: "301" //datas.orgIds.toString()
        }
      });
    },
    radioChange(data) {
      sessionStorage.setItem("taskHandListType", this.taskHandListType);
      this.init();
    },
    gotoCreat() {
      this.$router.push({ path: "/saas/message/yjMsgTemplate" });
      sessionStorage.setItem("state", "3-1");
      this.stateRouter("3-1");
    },
    taskClickDetails(id) {
      //传枚举钉类型
      // this.dialogTitle= "消息核对（未发消息）";
      // this.dialogToggle = true;
      this.$router.push({
        name: "taskHandCheckList",
        params: {
          id
        }
      });
    },
    dialogVisibleClick(type) {
      this.dialogToggle = type;
    },
    recallKey() {
      this.dialogTitle = "消息核对（召回消息）";
      // this.dialogToggle= true;
    },
    sendHandTask(taskId) {
      this.$dbwDialog("你确定要发送消息么?", "提示", {
        typeVisible: true, //隐藏属性
        // footerCancel: false, //是否显示底部取消按钮
        style: { "text-align": "center" }, //内容box样式 width height
        align: "center", //底部按钮排列方式
        // footer: false, //是否显示底部按钮
        autoHidden: "", //是否自动消失 传auto 是自动消失
        duration: "", //自动消失时间 默认1500
        okText:'',//确定按钮文本 不传默认确定
        cancelText:'',// 取消按钮文本 不传默认取消
        okClick: action => {
          this.sendKey(taskId);
        },
        cancelClick: () => {}
      });
    },
    sendKey(taskId) {
      this.$http.get(api.sendTash(taskId)).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "发送成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
        this.init();
      });
    },
    taskHandIsShow(data, type) {
      this.$http
        .post(api.setDisplayStatus(), {
          id: data.id,
          displayStatus: type
        })
        .then(r => {
          if (r.data.code == 200) {
            data.displayStatus = type;
            this.$message({
              message: type == 1 ? "任务已移至隐藏列表" : "任务已移至可见列表",
              duration: "1500",
              type: "success"
            });
            this.init();
          } else {
            this.$message({
              message: r.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        });
    },
    cancelEvent() {
      console.log("111");
    }
  }
};
</script>

<style scoped>
.task-content {
  /*border:1px solid black;*/
  /* box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); */
}
.taskHandtitle {
  margin-bottom: 10px;
  padding: 11px 10px;
  box-sizing: border-box;
}
.grid-content {
  text-align: center;
  padding: 5px 0 10px;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  margin-bottom: 15px;
  min-height: 100px;
  color: #707070;
  font-size: 20px;
  transition: all 0.5s cubic-bezier(0.08, 0.65, 1, 1);
  background-color: #ffffff;
}
.grid-content:hover {
  transform: translateY(-5px);
}
.grid-content p {
  margin: 24px 0;
  padding: 0 12px;
  /* min-height: 70px; */
  color: #707070;
  font-size: 16px;
  text-align: left;
  line-height: 24.97px;
}
.task-card-title {
  display: flex;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  border-bottom: 1px solid #e1e1e1;
}
.task-card-item {
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  color: #676767;
  flex-grow: 4;
  padding-left: 12px;
}
.task-card-eyes {
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
  margin-right: 12px;
}
.task-card-check {
  cursor: pointer;
  flex-grow: 1;
  margin-right: 12px;
  text-align: center;
}
.pointer {
  cursor: pointer;
}
.taskHandtitle > .titleFont{
   display: inline-block;
   font-size:18px; 
   color:#333744;
   font-weight: bold;
}
.taskHandtitle > .titleFont::before{
  content:'';
  width:0;
  height:100%;
  position: relative;
  left:-10px;
  border-left:3px solid #75AFFF;
}
</style>

