<template>
	<div>
		<div class="contentBg">
			<div class="contentTitle">
				<div class="titleFont">消息模板</div>
			</div>
			
			<el-row :gutter="10" type="flex" align="middle" class='toolbar-box' style=" margin-left:0px; margin-right:0px;">
              <el-col :span="24" >
                <div style="text-align:right;">
                  <span class="resend-btn resend-btn-start" @click="newTemplate">
                    <img :src="require('@/assets/images/icon/addPage.png')" alt="" >
                    <span>新增</span>
                  </span>
                </div>
              </el-col>
          	</el-row>
          	
			 <el-table stripe v-loading="loading" border :data="tableData" >    <!-- @header-click="headerClick" :header-cell-style="cellStyle"  暂时隐藏-->
			 	 <el-table-column
			      	type="index"
			      	:index="indexMethod"
			      	label = '序号'
			      	width = '60px'
			      	align="center" 
			      	>
			    </el-table-column>
			    <el-table-column align="left" prop="name" label="模板名称">
			    	<template slot-scope="scope">
			    		 <el-popover
			    		 	slot='—'
						    placement="top-start"
						    trigger="hover"
						    >
						    <!-- <div v-html="$options.filters.strSub(scope.row.content)"></div> -->
                <p>{{$options.filters.strSub(scope.row.content).replace(/ [^<]*[>]/g, '')}}</p>
						    <div slot="reference">{{scope.row.name}}</div>
						  </el-popover>
			    	</template>
			    </el-table-column>
			    <el-table-column align="center" prop="channels" label="使用渠道 ">
			    	<template slot-scope="scope" >
			    		<span>{{scope.row.channels | channelsName}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column align="center" prop="taskCount" label="任务数 "></el-table-column>
			    <el-table-column align="center" prop="createTime" label="创建时间 "></el-table-column>
			    <el-table-column align="center" prop="creator" label="创建人 "></el-table-column>
			    <el-table-column align="center" prop="modifyTime" label="更新时间 "></el-table-column>
			    <el-table-column align="center" prop="modifier" label="更新人 "></el-table-column>
			    <el-table-column align="center" label="操作" width="140" fixed="right">
	      			<template slot-scope="scope" >
	      				<div style="display: -webkit-box;display: flex;">
						  	<el-tooltip :enterable="false" content='查看' placement="top"><div class="icon_details" @click.stop="detailsClick(scope.row)" type="text" size="small"></div></el-tooltip>
	        				<div v-if='scope.row.channels.find((ele) => ele==2)==2'>
	        					<el-tooltip :enterable="false" content='短信模板不支持编辑' placement="top"><div class="edit_disable"  type="text" size="small"></div></el-tooltip>
	        					<el-tooltip :enterable="false" content='短信模板不支持删除' placement="top"><div class="deleteIcon_disable"  type="text" size="small"></div></el-tooltip>
	        				</div>
	        				<div v-else>
	        					<el-tooltip :enterable="false" content='编辑' placement="top"><div class="edit" @click="editClick(scope.row)" type="text" size="small"></div></el-tooltip>
	        					<el-tooltip :enterable="false" content='删除' placement="top"><div class="deleteIcon" @click="handleClick(scope.row,scope.$index)" type="text" size="small"></div></el-tooltip>
	        				</div>
						  </div>
					  </template>
	    		</el-table-column>
			</el-table>
			</div>
			<el-pagination v-show="shows" style="margin-top:30px;"
			  background
			  layout="total,prev, pager, next"
           	  :current-page.sync = "currentPage"
              @current-change="aTable"
              :page-count="totalPages"
            >
			</el-pagination>
		
	</div>
</template>

<script>
import api from "../../../api";
export default {
  data() {
    return {
      tableData: [],
      shows: false,
      currentPage: 0,
      pageSize: 10,
      disabledBloo: false,
      length: "",
      requests: "",
      totalPages: 1,
      sort: "DESC",
      loading: true,
      sortFieldName: "create_time",
      sortStyle:
        "background:url(" +
        require("../../../assets/images/icon/sortDown.png") +
        ")  83% center no-repeat;"
    };
  },
  created: function() {
    this.currentPage = +this.$route.query.page || 1;
    this.fetchData();
  },
  watch: {
    /*    currentPage() {
    	console.log(this.currentPage,"------------")
      	
    },*/
    sort() {
      this.fetchData();
    },
    $route: "getPath"
  },
  filters: {
    channelsName: function(myText) {
      let arr = [];
      if (myText == "" || myText == null || myText == undefined) {
        arr = ["-"];
      } else {
        arr = myText.map(function(key, idx) {
          if (key == 0) {
            key = "站内信";
          } else if (key == 1) {
            key = "邮件";
          } else if (key == 2) {
            key = "短信";
          } else if (key == 3) {
            key = "微信";
          } else if (key == 4) {
            key = "手机通知";
          }
          return key;
        });
      }
      return arr.join(",");
    }
  },
  methods: {
    detailsClick(datas) {
      this.$router.push({
        path: "/saas/message/msgCtnt",
        query: {
          id: datas.templet_id,
          detail: "check"
        }
      });
    },
    getPath() {
      this.currentPage = +this.$route.query.page || 1;
      this.fetchData();
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize;
    },
    cellStyle({ row, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 6) {
        //指定坐标
        return this.sortStyle;
      } else {
        return "";
      }
    },
    headerClick(column, event) {
      if (column.label == "更新时间 ") {
        this.sortFieldName = "create_time";
        if (this.sort == "DESC") {
          this.sort = "ASC";
          this.sortStyle =
            "background:url(" +
            require("../../../assets/images/icon/sortUp.png") +
            ")  83% center no-repeat;";
        } else if (this.sort == "ASC") {
          this.sort = "DESC";
          this.sortStyle =
            "background:url(" +
            require("../../../assets/images/icon/sortDown.png") +
            ") 83% center no-repeat ;";
        }
      }
    },
    editClick: function(vals) {
      this.$router.push({
        path: "/saas/message/msgCtnt",
        query: {
          id: vals.templet_id
        }
      });
    },
    handleClick: function(vals, indexs) {
      var vm = this;
      this.$dbwDialog("您正在删除<"+vals.name+">，是否继续？", "提示", {
        typeVisible: true,
        okText: "继续",
        cancelText: "放弃",
        align: "center",
        okClick: () => {
          this.$http
            .post(api.msgDelete(), {
              templetId: vals.templet_id
            })
            .then(res => {
              if (res.data.code == 200) {
                this.tableData.splice(indexs, 1);
                this.fetchData();
              } else if (res.data.code == 500) {
                let htmlTask1 = "";
                let sum = 0;
                let htmlTask2 = "";
                let sum1 = 0;
                let task1 = "";
                let task2 = "";
                for (var i = 0; i < res.data.data.length; i++) {
                  if (res.data.data[i].taskType == 1) {
                    task1 = res.data.data[i].taskNames;
                  } else if (res.data.data[i].taskType == 3) {
                    task2 = res.data.data[i].taskNames;
                  }
                }
                if (task1 != "") {
                  for (var item = 0; item < task1.length; item++) {
                    sum = item + 1;
                    htmlTask1 +=
                      '<div class="barItems" ><div class="barItemsBall">' +
                      sum +
                      "</div>" +
                      task1[item] +
                      "</div>";
                  }
                }
                if (task2 != "") {
                  for (var items = 0; items < task2.length; items++) {
                    sum1 = items + 1;
                    htmlTask2 +=
                      '<div class="barItems" ><div class="barItemsBall">' +
                      sum1 +
                      "</div>" +
                      task2[items] +
                      "</div>";
                  }
                }
                let html =
                  '<div class="barBox">' +
                  '<div class="barBoxTitle">' +
                  res.data.msg +
                  "</div>" +
                  '<div class="barBoxContent">' +
                  '<div class="barBoxitem">' +
                  '<div class="barBoxContentTitle">' +
                  '<div class="leftbox">预警任务</div>' +
                  "</div>" +
                  '<div class="barBoxContentScroll">' +
                  '<div class="barScrooLeft">' +
                  "" +
                  htmlTask1 +
                  "" +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  '<div class="barBoxitem" style="float:right;">' +
                  '<div class="barBoxContentTitle">' +
                  '<div class="leftbox">普通任务</div>' +
                  "</div>" +
                  '<div class="barBoxContentScroll">' +
                  '<div class="barScrooLeft">' +
                  "" +
                  htmlTask2 +
                  "" +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  '<div style="clear:both;"></div>';
                "</div>" + "</div>";
                var val = "width:400px";
                this.$dbwDialog(html, "提示", {
                  style: "width:640px",
                  typeVisible: true,
                  okText: "知道了",
                  footerCancel: false,
                  align: "center",
                  okClick: val => {},
                  cancelClick: val => {}
                });
              } else {
                vm.$message({
                  message: res.data.msg,
                  duration: "1500",
                  type: "error"
                });
              }
            });
        }
      });
    },
    newTemplate: function() {
      this.$router.push({ path: "/saas/message/msgCtnt" });
    },
    fetchData() {
      var vm = this;
      this.$http
        .post(api.msgList(), {
          currentPage: vm.currentPage,
          pageSize: vm.pageSize,
          sortField: vm.sortFieldName,
          sortOrder: vm.sort
        })
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            if (res.data.page.totalPages == 0) {
              vm.shows = false;
            } else {
              vm.shows = true;
              if (
                res.data.data == null ||
                res.data.data == "" ||
                res.data.data == undefined
              ) {
                vm.currentPage = vm.currentPage - 1;
                this.$common.setUrL("page=" + this.currentPage);
                this.fetchData();
              }
            }
            vm.tableData = res.data.data;
            vm.totalPages = res.data.page.totalPages;
            vm.currentPage = res.data.page.currentPage;
          } else {
            this.loading = false;
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "error"
            });
          }
        })
        .catch(() => {
          /*vm.$message({
					        message: res.data.msg,
					        duration:'1500',
					        type: 'error'
				    	});  */
        });
    },
    aTable(val) {
      this.currentPage = val;
      //this.fetchData(val, this.pageSize);
      this.$common.setUrL("page=" + this.currentPage);
      this.fetchData();
    }
  }
};
</script>

<style>
.el-popover {
  background: #fffae8 !important;
  color: #2c3e50 !important;
}
.el-popper .popper__arrow {
  display: none !important;
}
.el-popover {
  min-width: 10px !important;
  max-width: 300px !important;
  overflow-x: hidden;
}
</style>
