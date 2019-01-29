<template>
    <div>
        <div class="clearfloat" >
            <div class="title_header contentTitle" style="margin-bottom: 10px;">
              <div class="titleFont fl">消息核对 </div>
              <div class="fr backIcon" @click="outBack">返回</div>
            </div>
        </div>
        <div style="padding: 5px 5px 0 5px; ">
            <el-row :gutter="10" type="flex" align="middle" class='toolbar-box' style=" margin-left:0px; margin-right:0px;">
              <el-col :span="5">
                <el-select v-model="searchSelectInfo" style="width:100%; " placeholder="请选择">
                  <el-option
                    v-for="item in searchOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-input v-model="searchTextInfo" :placeholder="placeHolder"></el-input>
              </el-col>
              <el-col :span="3">
                <el-button type="primary"  icon="el-icon-search" @click="searchHandclick"> 搜索</el-button>
              </el-col>
              <el-col :span="11" >
                <div style="text-align:right;">
                  <!--<span :class="`resend-btn ${documeType?'resend-btn-start':'resend-btn-end'}`" @click="resendCheck">
                    <img :src="require('@/assets/images/resendStart.png')" alt="" v-if="documeType">
                    <img :src="require('@/assets/images/resendEnd.png')" alt="" v-if="!documeType">
                    <span>重发</span>
                  </span>-->
                  <span class="resend-btn resend-btn-start" @click="resendCheck">
                    <img :src="require('@/assets/images/exportIcon.png')" alt="" >
                    <span>导出</span>
                  </span>
                </div>
              </el-col>
            </el-row>
            <el-table v-loading="loading"
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column
                  type="index"
                  label = '序号'
			      	width = '60px'
			      	align="center" 
                  :index="indexMethod">
                </el-table-column>
                        <el-table-column prop="taskName" align="left" label="门店名称" ></el-table-column>
                        <el-table-column prop="left" align="center" label="推送内容">
					    	<template slot-scope="scope">
					    		 <el-popover
					    		 	slot='—'
								    placement="top-start"
								    trigger="hover"
								    >
								    <!-- <div v-html="$options.filters.strSub(scope.row.content)"></div> -->
		               	 <p>{{$options.filters.strSub(scope.row.content).replace(/ [^<]*[>]/g, '')}}</p>
								    <div slot="reference">{{$options.filters.removeHtml(scope.row.content)}}</div>
								  </el-popover>
					    	</template>
					    </el-table-column>
                        <el-table-column align="center" prop="receiverId" label="接收人" ></el-table-column>
                        <el-table-column align="center" prop='sendConfig' label="状态" width="100">
                            <template slot-scope="scope">
                              <el-tooltip :content="scope.row.sendConfig==1?'设为不推送':'设为推送'" placement="top" v-show='!scope.row.sendStatus' :enterable="false" >
                                <el-switch v-model="scope.row.sendConfig" @change='switchChange(scope.row,scope.$index)' :active-value='1' :inactive-value='0'></el-switch>
                              </el-tooltip>
                                <span v-show='scope.row.sendStatus'> {{scope.row.sendStatus | sendStatusEnum}}</span>
                            </template>
                        </el-table-column>
            </el-table>
        </div>
        <el-pagination  style="margin-top:30px;"
            background
            v-if="pageShow"
            layout="total,prev, pager, next"
                  :current-page.sync = "page.currentPage"
                  @current-change="aTable"
                  :page-count = "page.totalPages"
                >
          </el-pagination>
  
    </div>
      
</template> 
<script>
import api from "@/api";
export default {
  name: "taskHandCheckList",
  data() {
    return {
      dialogVisible: true,
      switchType: true,
      checkTaskId: this.$route.params.id,
      taskStatus: "",
      pageShow: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        totalPages: 0
      },
      placeHolder:'请输入门店名称',
      documeType:true,
      tableData: [],
      loading: true,
      searchOptions: [
        { label: "门店", value: "1" },
        { label: "姓名", value: "2" }
      ],
      searchTextInfo:'',
      searchSelectInfo:'1',
    };
  },
  //   props: {
  //       dialogTitle: String,
  //       dialogToggle: Boolean,
  //   },
  filters: {
    sendStatusEnum: value => {
      switch (value) {
        case 1:
          return "已推送";
          break;
        case 2:
          return "已召回";
          break;
        default:
          return "未发";
          break;
      }
    },
  },
  mounted() {
    this.init();
  },
   watch:{
   		searchSelectInfo(){
   			if(this.searchSelectInfo=='1'){
   				this.placeHolder='请输入门店名称';
   			}else if(this.searchSelectInfo=='2'){
   				this.placeHolder='请输入姓名';
   			}
   		}
   },
  methods: {
    indexMethod(index) {
      return index + 1 + (this.page.currentPage - 1) * this.page.pageSize;
    },
    init() {
      this.$http.post(api.checkTaskList(), {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          taskInstanceId: this.checkTaskId,
          searchNm:this.searchSelectInfo,
          searchField:this.searchTextInfo,
        })
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.page.totalPages = res.data.page.totalPages;
            this.tableData = res.data.data[0].detail;
            this.taskStatus = res.data.data[0].taskStatus;
            
            if (res.data.page.totalPages == 0) {
              this.pageShow = false;
            } else {
              this.pageShow = true;
              if (res.data.data[0].detail == null||res.data.data[0].detail == ""||res.data.data[0].detail == undefined) {
                this.page.currentPage = this.page.currentPage - 1;
                this.$common.setUrL('page='+this.page.currentPage)
                this.init();
              }
            }
            
          } else {
            this.loading = false;
            this.$message({
              message: r.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        });
    },
    searchHandclick() {
      this.page.currentPage = 1;
      this.init();
      // this.searchTextInfo="";
      // this.searchSelectInfo="1";
    },
    switchChange(data, index) {
      //   data.address!=data.address;
      this.$http.post(api.sendConfig(), {
          masterId: data.id,
          sendConfig: data.sendConfig
        }).then(res => {
          if (res.data.code == 200) {
            this.tableData[index].sendConfig = data.sendConfig;
            this.$message({
              message: data.sendConfig == 1 ? "开启成功" : "关闭成功",
              duration: "1500",
              type: "success"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    outBack() {
      // window.location.assign('/saas/message/taskHand');
      this.$router.go(-1);
    },
    aTable(val) {
      this.page.currentPage = val;
      this.init();
    },
    resendCheck () {
      	window.open(api.checktaskExport(this.checkTaskId),"_blank");
    }
  }
};
</script> 
<style scoped>
</style>

