<template>
  <div class="contentBg" style="padding-bottom: 20px;">
			<div class="contentTitle" style="margin-bottom: 10px;">
				<div class="titleFont">编辑数据指标</div>
				<div class="fr backIcon" @click="outBack">返回</div>
			</div>
    <el-form ref="form" style="background-color: #fff;padding: 20px 0;" label-width="100px" class='dataIndicators-edit-form'>
    	<el-form-item class="redBar"> 
    		<div class="yjItem"><span>*</span> 指标名称：</div>
        <div>{{queryData.indexsNm}}</div>
      </el-form-item>
      <el-form-item class="redBar">
      	<div class="yjItem"><span>*</span> 数据分类：</div>
        <div>{{queryData.indexsSort}}</div>
      </el-form-item>
      <el-form-item  class="redBar">
      	<div class="yjItem"><span>*</span> 所属机构：</div>
        <div>{{queryData.orgName}}</div>
      </el-form-item>
      <!--<el-form-item class="redBar">
      	<div class="yjItem"><span>*</span> 有效期：</div>
		    <el-date-picker 
		      v-model="value6"
		      type="daterange"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      value-format="yyyy-MM-dd"
		      :editable="false"
		      >
		   </el-date-picker>
      </el-form-item>-->
      <el-form-item class="redBar input_box">
      	<div class="yjItem"><span>*</span> 目标值：</div>
        <input type="text" maxlength="12" @change="keyUpCheck(editData.targetsVal, 'targetsVal')" placeholder="请输入数字" class="el-input__inner" v-model="editData.targetsVal" style="width:30%;float:left;"></input><span class='form-errer' v-show='targetsVal'>请输出正确数值</span>  
      		<div class="total_num">
	          <span class="current_num">{{(editData.targetsVal+'').length}}</span>
	          <span>/12</span>
	        </div>
      </el-form-item>
      <el-form-item class="redBar input_box">
      	<div class="yjItem"><span>*</span> 上限值：</div>
        <input type="text" maxlength="12" @change="keyUpCheck(editData.maxVal, 'maxVal')" placeholder="请输入数字" class="el-input__inner" v-model="editData.maxVal" style="width:30%;float:left;"></input><span class='form-errer' v-show='maxVal'>请输出正确数值</span>  
      		<div class="total_num">
	          <span class="current_num">{{(editData.maxVal+'').length}}</span>
	          <span>/12</span>
	        </div>
      </el-form-item>
      <el-form-item class="redBar input_box">
      	<div class="yjItem"><span>*</span> 下限值：</div>
        <input type="text" maxlength="12" @change="keyUpCheck(editData.minVal, 'minVal')" placeholder="请输入数字" class="el-input__inner" v-model="editData.minVal" style="width:30%;float:left;"></input><span class='form-errer' v-show='minVal'>请输出正确数值</span>  
      		<div class="total_num">
	          <span class="current_num">{{(editData.minVal+'').length}}</span>
	          <span>/12</span>
	        </div>
      </el-form-item>
      <el-form-item class="redBar">
      	<div class="yjItem"><span>*</span> 是否预警：</div>
        <el-radio-group v-model="radio">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="btnBox">
				    <el-button type="info" class="btnLeft" @click="outBack">取消</el-button>
				    <el-button type="primary" class="btnRight" @click="commitData">确定</el-button>
				</div>
    </el-form>
  </div>
</template>

<script>
import api from "../../../api";
export default {
  data() {
    return {
      editData: [],
      radio: "",
      radioType: "",
      queryData: "",
      dataName: "",
      targetsVal: false,
      minVal: "",
      maxVal: "",
      value6: [],
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < new Date() - 8.64e7; //注意是||不是&&
        }
      }
    };
  },
  created: function() {
    var that = this;
    if (that.$route.query.data instanceof Object) {
      that.queryData = that.$route.query.data;
      localStorage.setItem("queryData", JSON.stringify(that.queryData));
    }
    that.queryData = JSON.parse(localStorage.getItem("queryData"));
    this.infoData();
  },
  watch: {
    // targetsVal(){
    // 	var rel = /^[-+]?(?:[0-9]|[1-9]\d*)(?:\.\d)?$/;
    // 	if(!rel.test(this.targetsVal)){
    // 		this.targetsVal = "";
    // 	}
    // }
  },
  methods: {
    outBack() {
      this.$router.go(-1);
    },
    infoData() {
      var that = this;
      that.$http
        .get(api.getQuotaMessage(that.queryData.id))
        .then(res => {
          if (res.data.code == 200) {
            that.editData = res.data.data;
            // that.targetsVal = res.data.data.targetsVal;
            // that.maxVal = res.data.data.maxVal;
            // that.minVal = res.data.data.minVal;
            that.value6 = [that.editData.createTime, that.editData.endTime];
            if (that.editData.enableStatus == 0) {
              that.radio = 0;
            } else {
              that.radio = 1;
            }
          } else {
            that.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        })
        .catch(() => {});
    },
    //更新数据指标
    commitData() {
      let that = this;
      let checkSrc = [];
      /*if(that.value6==""||that.value6==null||that.value6==undefined){
        	checkSrc.push('<p>有效周期不能空！</p>')
        }*/
      if (that.editData.targetsVal == "") {
        checkSrc.push("<p>目标值不能为空！</p>");
      }
      if (that.editData.maxVal == "") {
        checkSrc.push("<p>上限值不能为空！</p>");
      }
      if (that.editData.minVal == "") {
        checkSrc.push("<p>下限值不能为空！</p>");
      }
      if (checkSrc.length > 0) {
        checkSrc = checkSrc.join("");
        this.$dbwDialog(checkSrc, "提示", {
          typeVisible: true,
          align: "center",
          footerCancel: false
        });
        return false;
      }
      that
        .$dbwDialog("确认要修改信息？", "确认信息", {
          typeVisible: true,
          align: "center",
          okClick: () => {
            //确定
            if (that.radio == 0) {
              that.radioType = "0";
            } else {
              that.radioType = "1";
            }
             that.$http
            .post(api.getQuotaMessageUpdate(), {
              id: that.queryData.id,
              //createTime:that.value6[0],
              //endTime:that.value6[1],
              createTime: "2000-01-01 00:00:00",
              endTime: "2099-01-01 23:59:59",
              targetsVal: that.editData.targetsVal,
              maxVal: that.editData.maxVal,
              minVal: that.editData.minVal,
              enableStatus: that.radioType
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$router.go(-1);
              } else {
                that.$message({
                  message: res.data.msg,
                  duration: "1500",
                  type: "warning"
                });
              }
            })
            .catch(() => {});

          }
        })
    },
    keyUpCheck(target, key) {
      let rel = /^(\-|\+|\'')?\d+(\.\d+)?$/;
      if (!rel.test(target))
        return (this.editData[key] = ""), (this[key] = true);
      this[key] = false;
    }
  }
};
</script>

<style lang="less" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.dataIndicators-edit-form {
  .form-errer {
    font-size: 12px;
    color: red;
    margin-left: 10px;
  }
}

.input_box {
  position: relative;
  margin-bottom: 30px;
  .total_num {
     position: relative;
    /* width: 30%; */
    right: 0%;
    top: -33px;
    float: left;
    margin-left: -32px;
  }
  .total_num_desc {
    position: relative;
    /* width: 30%; */
    right: 0%;
    top: -33px;
    float: left;
    margin-left: -32px;
  }
  .current_num {
    color: red;
  }
}
</style>
