<template>
  <div class="layout_inner">
    <!-- <fieldset>
      <legend>基础数据</legend>
      <div class="bidder">
        <div class="count-btn">
          <el-button type="primary" @click="count">计算</el-button>
        </div>     
        <el-form ref="form" :model="basicInfo" label-width="80px">
          <el-form-item label="时间范围">
            <div style="display: inline-block;">
              <el-date-picker
                v-model="basicInfo.beginDate"
                type="date"
                placeholder="开始时间">
              </el-date-picker>
            </div>
            至
            <div style="display: inline-block;">
              <el-date-picker
                v-model="basicInfo.endDate"
                type="date"
                placeholder="结束时间">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="设备">
            <div v-for="(item, index) in assetArr" :key="index">
              <el-select v-model="item.id" placeholder="名称（型号 序列号 生产厂家 验收日期）" clearable @change="(val) => {slectChange(index, val)}" style="width:300px;">
                <el-option
                  v-for="val in assetOptions"
                  :key="val.id"
                  :label="val.composeName"
                  :value="val.id">
                  <span style="float: left">{{ val.composeName }}</span>
                </el-option>
              </el-select>
              <el-button class="icon-btn" type="text" icon="el-icon-plus" @click="addAsset()"></el-button>
              <el-button class="icon-btn-del icon-btn" type="text" v-if="index !== 0" icon="el-icon-delete" @click="delAsset(index)"></el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </fieldset>
    <fieldset>
      <legend>营收</legend>
      <div class="bidder">
        <el-tabs type="border-card">
          <el-tab-pane label="汇总数据">
            <el-form ref="form" :label-position="'right'" :model="basicInfo" label-width="80px">
              <el-form-item label="设备费用:" class="form-style">
                <el-input v-model="basicInfo.consumablesPrice">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="耗材费用:" class="form-style">
                <el-input v-model="basicInfo.consumablesPrice">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="其他费用:" class="form-style">
                <el-input v-model="basicInfo.otherPrice">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>  
              <el-form-item label="总费用:" class="form-style">
                <el-input v-model="basicInfo.otherPrice">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>         
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="明细数据">
            <el-form ref="form" :label-position="'right'" :model="basicInfo" label-width="80px">
              <el-row style="margin-bottom: 20px;">
                <el-col :span="24">
                  <span style="margin-right:20px;"><label>设备费用合计：</label>¥ {{'0'}}</span>
                  <span style="margin-right:20px;"><label>耗材费用合计：</label>¥ {{'0'}}</span>
                  <span><label>其他费用合计：</label>¥ {{'0'}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" v-for="(item, index) in assetArr" v-if="!!item.assetName" :key="index" class="div-col">
                  <div class="container">
                    <el-form-item label="设备:">
                      <span>{{item.assetName}}</span>
                    </el-form-item>
                    <el-form-item label="设备费用:" class="form-width">
                      <el-input v-model="item.assetPrice">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="耗材费用:" class="form-width">
                      <el-input v-model="item.consumablesPrice">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="其他费用:" class="form-width">
                      <el-input v-model="item.otherPrice">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>  
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </fieldset>
    <fieldset>
      <legend>成本</legend>
      <div class="bidder">
        <el-tabs type="border-card">
          <el-tab-pane label="汇总数据">
            <el-form ref="form" :label-position="'right'" :model="basicInfo" label-width="80px">
              <el-form-item label="耗材成本:" class="form-style">
                <el-input v-model="basicInfo.consumablesPrice">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="其他成本:" class="form-style">
                <el-input v-model="basicInfo.otherPrice">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>         
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="明细数据">
            <el-form ref="form" :label-position="'right'" :model="basicInfo" label-width="80px">
              <el-row>
                <el-col :span="12" v-for="(item, index) in assetArr" v-if="!!item.assetName" :key="index" class="div-col">
                  <div class="container">
                    <el-form-item label="设备:">
                      <span>{{item.assetName}}</span>
                    </el-form-item>
                    <el-form-item label="耗材成本:" class="form-width">
                      <el-input v-model="item.consumablesCost">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="其他成本:" class="form-width">
                      <el-input v-model="item.otherCost">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </fieldset> -->
    <div class="analysis" style="margin-top:30px;">
      <div class="title">效益分析</div>
      <div class="money">
        <ul>
          <li>
            <div class="money-title">收入</div>
            <div class="money-info">
              <span class="money-style red">{{'1232233' | formatToFinacial}}</span>
              <span class="company">元</span>
            </div>
          </li>
          <li>
            <div class="money-title">支出</div>
            <div class="money-info">
              <span class="money-style" style="color: #55AA00;">{{'1232233' | formatToFinacial}}</span>
              <span class="company">元</span>
            </div>
          </li>
          <li>
            <div class="money-title">净利润</div>
            <div class="money-info">
              <span class="money-style red">{{'1232233' | formatToFinacial}}</span>
              <span class="company">元</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api";
import token from "@/plugins/getUploadToken";
import moment from 'moment';
export default {
  mixins: [token],
  data() {
    return {
      api,
      basicInfo: {
        assetId: '',
        beginDate: '',
        endDate: '',
        otherPrice: 0,
        consumablesPrice: 0
      },
      assetArr: [
        {
          id: '',
          assetName: '', // 设备名称组合
          consumablesCost: 0, // 耗材成本
          otherCost: 0, // 其他成本
          assetPrice: 0, // 设备费用
          consumablesPrice: 0, // 耗材费用
          otherPrice: 0 // 其他费用
        }
      ],
      assetOptions: [],
      assetArrObj: {}
    };
  },
  methods: {
    addAsset () {
      this.assetArr.push(
        {
          id: '',
          assetName: '', // 设备名称组合
          consumablesCost: 0, // 耗材成本
          otherCost: 0, // 其他成本
          assetPrice: 0, // 设备费用
          consumablesPrice: 0, // 耗材费用
          otherPrice: 0 // 其他费用
        }
      );
    },
    delAsset (index) {
      this.assetArr.splice(index, 1);
    },
    slectChange (index, val) {
      if (val) {
        this.assetArr[index]['assetName'] = this.assetArrObj[val];
      } else {
        this.assetArr[index] = {
          id: '',
          assetName: '', // 设备名称组合
          consumablesCost: 0, // 耗材成本
          otherCost: 0, // 其他成本
          assetPrice: 0, // 设备费用
          consumablesPrice: 0, // 耗材费用
          otherPrice: 0 // 其他费用
        }
      } 
    },
    async count () {
      this.getAssetCost();
    },
    getAssetCost () {
      let assetIds = [];
      this.assetArr.forEach(item => {
        if (item.assetName) {
          assetIds.push(item.id)
        }
      });
      let params = {
        beginDate: moment(this.basicInfo.beginDate).format('YYYY-MM-DD') + ' 00:00:00',
        endDate: moment(this.basicInfo.endDate).format('YYYY-MM-DD') + ' 23:59:59'
      };
      if (assetIds.length > 0) {
        params.assetIds = assetIds;
      }
      api.faultCount(params).then(rs => { // 设备维修数据

      })
      api.maintainQaCount(params).then(rs => { // 设备质控/保养数据

      })
      api.assetList({pageNum: 0, pageSize: 1000, assetIds: assetIds}).then(rs => { // 获取设备信息，采购价格，损耗

      })
      api.findByAssetsContract({pageNum: 0, pageSize: 1000, assetIds: assetIds}).then(rs => { // 获取设备合同信息，对应的分享金额

      })
    }
  },
  created () {
    api.assetList({pageNum: 1, pageSize: 5000}).then(rs => {
      if (rs.code === 200) {
        rs.data.list.forEach(item => {
          item.composeName = `${item.name}（${item.model || '-'} ${item.sn || '-'} ${item.vender || '-'} ${item.ctime.split(' ')[0] || '-'} ）`;
          this.assetArrObj[item.id] = item.composeName
        })
        this.assetOptions = rs.data.list;
      }
    })
    this.basicInfo.endDate = moment().format('YYYY-MM-DD');
    this.basicInfo.beginDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  }
};
</script>
<style lang="less" scoped>
.scroll {
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
.bidder {
  position: relative;
}
fieldset {
  border-color: #eee;
  border-width: 1px;
  border-style: double;
  margin-top: 20px;
}
legend {
  padding: 0 10px;
}
.el-form-item {
  margin-bottom: 5px;
}
.icon-btn {
  margin-left: 5px;
  font-size: 18px;
  padding: 0;
}
.icon-btn-del {
  color:#fa5555;
}
.div-col {
  padding:5px;
  .container{
    padding: 10px;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    background: #FFF;
    box-sizing: border-box;
  }
}
.count-btn {
  right: 0;
  position: absolute;
  z-index: 100;
  .el-button {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
  }
}
.form-width {
  width:250px;
  display:inline-block;
}
.form-style {
  display: inline-block;
  width: 50%;
}
.analysis {
  .title{
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    width: 100%;
  }
  .money {
    li {
      margin:10px;
      float: left;
      padding: 0 10px;
      display: inline-block;
      border-right: 1px solid #eee;
      .money-title {
        font-size: 14px;
        color: #606266;
      }
      .money-info {
        margin-top: 10px;
        .company {
          margin-left: 20px;
        }
        .money-style {
          font-size: 24px;
          font-weight: 500;
        }
        .red {
          color: red;
        }
      }
      
    }
    
  }
}
</style>