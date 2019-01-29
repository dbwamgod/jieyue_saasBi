<template>
  <div>
    <div class="contentBg">
			<div class="contentTitle">
				<div class="titleFont">脱敏规则</div>
				<!--<div class="addBtn fr" @click="creatAuto"><i></i> 新增</div>-->
			</div>
			<el-row :gutter="10" type="flex" align="middle" class='toolbar-box' style=" margin-left:0px; margin-right:0px;">
              <el-col :span="24" >
                <div style="text-align:right;">
                  <span class="resend-btn resend-btn-start" @click="creatAuto">
                    <img :src="require('@/assets/images/icon/addPage.png')" alt="" >
                    <span>新增</span>
                  </span>
                </div>
              </el-col>
          	</el-row>
      <el-table v-loading="loading" stripe border ref="multipleTable" :data="tableData">
      	<el-table-column
			      	type="index"
			      	label = '序号'
			      	width = '60px'
			      	align="center" 
			      	:index="indexMethod">
			  </el-table-column>
        <el-table-column align="left" prop="sensitiveWord" label="脱敏词">
        	<template slot-scope="scope">
        		{{scope.row.sensitiveWord}}
        	</template>
        </el-table-column>
        <el-table-column align="center" prop="channelName" label="脱敏渠道">
          <template slot-scope="scope">
          {{scope.row.channelName.replace('PUSH', '手机通知')}}
          </template>  
        </el-table-column>
        <el-table-column align="left" prop="replaceWord" label="替换为" >
        	<template slot-scope="scope">
        		{{scope.row.replaceWord.replace(/\s/g, '&nbsp')}}
        	</template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="creator" label="创建人"></el-table-column>
        <el-table-column align="center" label="操作" width="120" fixed="right">
          <template slot-scope="scope">
          	<div style="display: -webkit-box;display: flex;">
            	<el-tooltip :enterable="false" content='编辑' placement="top"><div class="edit" @click="editClick(scope.row)" type="text" size="small"></div></el-tooltip>
            	<el-tooltip :enterable="false" content='删除' placement="top"><div class="deleteIcon" @click="deleteClick(scope.row,scope.$index)" type="text" size="small"></div></el-tooltip>
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
      currentPage: 0,
      pageSize: 10,
      totalPages: 1,
      shows: false,
      loading: true
    };
  },
  components: {},
  watch: {
    /*currentPage() {
      this.info();
    }*/
   '$route':'getPath'
  },
  created: function() {
    this.currentPage = +this.$route.query.page || 1;
  	this.info();
  },
  filters: {
    goBlank: function(myText) {
      return (myText = myText.replace(/\s/g, "　"));
    }
  },
  methods: {
  	getPath(){
  		this.currentPage = +this.$route.query.page || 1
  		this.fetchData();
  	},
  	indexMethod(index) {
  		return index+ 1 + ((this.currentPage-1)*this.pageSize);
    },
    info() {
      let vm = this;
      this.$http
        .post(api.getSensitiveList(), {
          currentPage: vm.currentPage,
          pageSize: vm.pageSize
        })
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            if (res.data.page.totalPages == 0) {
              vm.shows = false;
            } else {
              vm.shows = true;
              if (res.data.data == null||res.data.data == ""||res.data.data == undefined) {
                	vm.currentPage = vm.currentPage - 1;
                	this.$common.setUrL('page='+this.currentPage)
                	this.info();
              }
            }

            vm.tableData = res.data.data;
            vm.totalPages = res.data.page.totalPages;
            vm.currentPage = res.data.page.currentPage;
          } else {
            vm.shows = false;
            this.loading = false;
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        })
        .catch(() => {});
    },
    creatAuto() {
      this.$router.push({
        path: "/saas/message/desensitization/desensitizationDetails"
      });
    },
    editClick(datas) {
      this.$router.push({
        path: "/saas/message/desensitization/desensitizationDetailsEdit",
        query: {
          id: datas.sensitiveId
        }
      });
    },
    deleteClick(vals, indexs) {
      var vm = this;
      //console.log(vals)
      this.$dbwDialog("您正在执行删除操作，是否继续?", "提示", {
        typeVisible: true,
        align: "center",
        okClick: () => {
          this.$http
            .get(api.deleteSensitive(vals.sensitiveId))
            .then(res => {
              if (res.data.code == 200) {
                this.tableData.splice(indexs, 1);
                this.info();
              } else {
                vm.$message({
                  message: res.data.msg,
                  duration: "1500",
                  type: "error"
                });
              }
            })
            .catch(() => {});
        }
      });
    },
    aTable(val) {
      this.currentPage = val;
      // this.info(val, this.pageSize);
      this.$common.setUrL('page='+this.currentPage)
	    this.info();
    }
  }
};
</script>

<style scoped>
.el-table .cell {
  white-space: pre-line !important;
}
</style>
