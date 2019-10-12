<template>
  <div class="layout_inner">
    <div v-show="echartShow">
      <fieldset>
        <legend>基础数据</legend>
        <div>
          <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" label-position="right" :nosubmit="true" :inline="true">
            <template slot="dept">
              <el-select v-model="queryObj.dept" filterable placeholder="请选择科室">
                <el-option
                  v-for="item in deptArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
            <template slot="btn">
              <el-button icon="el-icon-search" type="primary" @click="query"></el-button>
            </template>
          </ever-form2>
        </div>
        <div class="bidder">
          <ever-form2 :schema="querySchema1" v-model="queryObj1" @query="query" ref="form" class="package-sale" :info="true" label-position="right" :nosubmit="true" :inline="true">
            <template slot="time">
              <div style="display: inline-block;width:150px;">
                <el-date-picker
                  v-model="basicInfo.beginDate"
                  type="date"
                  placeholder="开始时间">
                </el-date-picker>
              </div>
              -
              <div style="display: inline-block;width:150px;">
                <el-date-picker
                  v-model="basicInfo.endDate"
                  type="date"
                  placeholder="结束时间">
                </el-date-picker>
              </div>
            </template>
            <template slot="btn">
              <el-button type="primary" @click="count">计算</el-button>
            </template>
          </ever-form2>
          <el-form ref="form" :model="basicInfo" label-width="40px" class="dept">
            <el-form-item label="设备">
              <div v-for="(item, index) in assetArr" :key="index">
                <el-select v-model="item.id" placeholder="名称（型号 序列号 生产厂家 验收日期）" clearable @change="(val) => {slectChange(index, val)}" style="width:320px;">
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
        <legend>收入</legend>
        <div class="bidder">
          <el-tabs type="border-card" v-model="incomeName">
            <el-tab-pane label="汇总数据">
              <el-form ref="form" :label-position="'right'" :model="incomeSummary" label-width="80px">
                <el-form-item label="设备费用:" class="form-style">
                  <el-input v-model="incomeSummary.assetPrice" type="number" @blur="incomeSummaryChange" @keyup.enter.native="incomeSummaryChange">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="耗材费用:" class="form-style">
                  <el-input v-model="incomeSummary.consumablesPrice" type="number" @blur="incomeSummaryChange" @keyup.enter.native="incomeSummaryChange">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="其他费用:" class="form-style">
                  <el-input v-model="incomeSummary.otherPrice" type="number" @blur="incomeSummaryChange" @keyup.enter.native="incomeSummaryChange">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="总费用:" class="form-style">
                  <el-input v-model="incomeSummary.allPrice" type="number">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="明细数据">
              <el-form ref="form" :label-position="'right'" :model="assetIncomeSummary" label-width="80px">
                <el-row style="margin-bottom: 10px;">
                  <el-col :span="24">
                    <span style="margin-right:20px;"><label>设备费用合计：</label>¥ <span class="green">{{assetIncomeSummary.assetPrice | formatToFinacial}}</span></span>
                    <span style="margin-right:20px;"><label>耗材费用合计：</label>¥ <span class="green">{{assetIncomeSummary.consumablesPrice | formatToFinacial}}</span></span>
                    <span style="margin-right:20px;"><label>其他费用合计：</label>¥ <span class="green">{{assetIncomeSummary.otherPrice | formatToFinacial}}</span></span>
                    <span><label>总计：</label>¥ <span class="green">{{assetIncomeSummary.allPrice | formatToFinacial}}</span></span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" v-for="(item, index) in assetArr" v-if="!!item.assetName" :key="index" class="div-col">
                    <div class="container">
                      <el-form-item label="设备:">
                        <span>{{item.assetName}}</span>
                      </el-form-item>
                      <el-form-item label="设备费用:" class="form-width">
                        <el-input v-model="item.assetPrice" type="number" @blur="assetInputChange(1)" @keyup.enter.native="assetInputChange(1)">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="耗材费用:" class="form-width">
                        <el-input v-model="item.consumablesPrice" type="number" @blur="assetInputChange(2)" @keyup.enter.native="assetInputChange(2)">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="其他费用:" class="form-width">
                        <el-input v-model="item.otherPrice" type="number" @blur="assetInputChange(3)" @keyup.enter.native="assetInputChange(3)">
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
        <legend>支出</legend>
        <div class="bidder">
          <el-tabs type="border-card" v-model="costName">
            <el-tab-pane label="汇总数据">
              <el-form ref="form" :label-position="'right'" :model="costSummary" label-width="80px">
                <el-form-item label="耗材支出:" class="form-style">
                  <el-input v-model="costSummary.consumablesPrice" @blur="costSummaryChange" @keyup.enter.native="costSummaryChange">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="其他支出:" class="form-style">
                  <el-input v-model="costSummary.otherPrice" @blur="costSummaryChange" @keyup.enter.native="costSummaryChange">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="总支出:" class="form-style">
                  <el-input v-model="costSummary.allPrice">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="明细数据">
              <el-form ref="form" :label-position="'right'" :model="basicInfo" label-width="80px">
                <el-row style="margin-bottom: 10px;">
                  <el-col :span="24">
                    <span style="margin-right:20px;"><label>耗材支出合计：</label>¥ <span class="green">{{assetCostSummary.consumablesPrice | formatToFinacial}}</span></span>
                    <span style="margin-right:20px;"><label>其他支出合计：</label>¥ <span class="green">{{assetCostSummary.otherPrice | formatToFinacial}}</span></span>
                    <span><label>总计：</label>¥ <span class="green">{{assetCostSummary.allPrice | formatToFinacial}}</span></span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" v-for="(item, index) in assetArr" v-if="!!item.assetName" :key="index" class="div-col">
                    <div class="container">
                      <el-form-item label="设备:">
                        <span>{{item.assetName}}</span>
                      </el-form-item>
                      <el-form-item label="耗材支出:" class="form-width">
                        <el-input v-model="item.consumablesCost"  @blur="costInputChange(2)" @keyup.enter.native="costInputChange(2)">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="其他支出:" class="form-width">
                        <el-input v-model="item.otherCost"  @blur="costInputChange(3)" @keyup.enter.native="costInputChange(3)">
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
      <div style="height: 50px;visibility: hidden;overflow: hidden;">
        <el-table id="excelTable" :data="tableData" style="width: 100%" border stripe max-height="470">
          <el-table-column type="index" width="50" align="center" label="序号">
          </el-table-column>
          <el-table-column prop="name" label="设备名称">
          </el-table-column>
          <el-table-column prop="deptName" label="设备类别">
          </el-table-column>
          <el-table-column prop="model" label="型号">
          </el-table-column>
          <el-table-column prop="sn" label="SN序列号">
          </el-table-column>
          <!-- <el-table-column prop="deptName" label="院区1">
          </el-table-column>
          <el-table-column prop="deptName" label="科室1">
          </el-table-column> -->
          <el-table-column prop="vender" label="厂家">
          </el-table-column>
          <el-table-column prop="purchasePrice" label="采购价格">
          </el-table-column>
          <el-table-column prop="depreciationCharge" label="设备年折旧费">
          </el-table-column>
          <el-table-column prop="assetPrice" label="设备收入">
          </el-table-column>
          <el-table-column prop="wxAmount" label="设备维护支出">
          </el-table-column>
          <el-table-column prop="htAmount" label="设备保修合同支出">
          </el-table-column>
          <el-table-column prop="consumablesPrice" label="耗材收入">
          </el-table-column>
          <el-table-column prop="consumablesCost" label="耗材支出">
          </el-table-column>
          <el-table-column prop="otherCost" label="其他支出">
          </el-table-column>
          <el-table-column prop="otherPrice" label="其他收入">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-show="!echartShow">
      <div class="ever-bread-crumb">
        <el-button @click="echartShow = true" class="diy-btn-style"><i class="el-icon-arrow-left"></i></el-button>
        <span>返回</span>
      </div>
      <div class="analysis" style="margin-top:10px;">
        <div class="title">
          <span>效益分析</span>
          <el-button @click="exportExcel" plain type="primary" class="backStyle">导出</el-button>
        </div>
        <div class="money">
          <ul>
            <li>
              <div class="money-title">收入</div>
              <div class="money-info">
                <span class="money-style red">{{analysisData.incomePrice | formatToFinacial}}</span>
                <span class="company">元</span>
              </div>
            </li>
            <li>
              <div class="money-title">支出</div>
              <div class="money-info">
                <span class="money-style green">{{analysisData.expenditurePrice | formatToFinacial}}</span>
                <span class="company">元</span>
              </div>
            </li>
            <li>
              <div class="money-title">设备损耗</div>
              <div class="money-info">
                <span class="money-style green">{{analysisData.lossPrice | formatToFinacial}}</span>
                <span class="company">元</span>
              </div>
            </li>
            <li>
              <div class="money-title">净利润</div>
              <div class="money-info">
                <span class="money-style red">{{analysisData.profitPrice | formatToFinacial}}</span>
                <span class="company">元</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="background-color:#fff;">
        <el-row>
          <el-col :span="12" style="border-right:1px solid #eee;">
            <income-echarts :eData="echartsDataArr.incomeEchartsData"></income-echarts>
          </el-col>
          <el-col :span="12">
            <income-echarts :eData="echartsDataArr.expenditureEchartsData"></income-echarts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-top:20px;">
            <asset-echarts :eData="echartsDataArr.assetIncomeData"></asset-echarts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <cost-echarts :eData="echartsDataArr.assetCostData"></cost-echarts>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <efficiency-echarts :eData="echartsDataArr.assetCostData"></efficiency-echarts>
          </el-col>
        </el-row> -->
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import token from '@/plugins/getUploadToken'
import moment from 'moment'
import incomeEcharts from './income.echarts'
import assetEcharts from './asset.echarts'
import efficiencyEcharts from './efficiency.echarts'
import costEcharts from './cost.echarts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
let schema = [
  {
    label: '科室',
    name: 'dept',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn1',
    comp: 'custom'
  }
]
let schema1 = [
  {
    label: '时间',
    name: 'time',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn1',
    comp: 'custom'
  }
]
export default {
  mixins: [token],
  components: {
    incomeEcharts,
    assetEcharts,
    costEcharts,
    efficiencyEcharts
  },
  data () {
    let obj = this.createObjFromSchema(schema)
    let obj1 = this.createObjFromSchema(schema1)
    obj.time = [
      moment(new Date().getTime() - 86400000 * 7).format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    ]
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      querySchema1: schema1,
      queryObj1: obj1,
      deptArr: [],
      echartShow: true,
      tableData: [],
      basicInfo: {
        assetId: '',
        beginDate: '',
        endDate: '',
        otherPrice: 0,
        consumablesPrice: 0
      },
      incomeSummary: { //  收入汇总数据
        assetPrice: 0, // 设备费用
        otherPrice: 0, // 其他费用
        consumablesPrice: 0, // 耗材费用
        allPrice: 0 // 总费用
      },
      assetIncomeSummary: { // 收入设备明细汇总数据
        assetPrice: 0, // 设备费用
        otherPrice: 0, // 其他费用
        consumablesPrice: 0, // 耗材费用
        allPrice: 0 // 总费用
      },
      costSummary: { // 支出汇总数据
        consumablesPrice: 0, // 耗材支出
        otherPrice: 0, // 其他支出
        allPrice: 0 // 总指出
      },
      assetCostSummary: { // 支出设备明细汇总数据
        consumablesPrice: 0, // 耗材支出
        otherPrice: 0, // 其他支出
        allPrice: 0 // 总指出
      },
      assetArr: [
        {
          id: '',
          assetName: '', // 设备名称组合
          htAmount: 0, // 设备合同费用
          wxAmount: 0, // 设备维修费用
          consumablesCost: 0, // 耗材支出
          otherCost: 0, // 其他支出
          assetPrice: 0, // 设备费用
          consumablesPrice: 0, // 耗材费用
          otherPrice: 0 // 其他费用
        }
      ],
      assetOptions: [],
      assetArrObj: {},
      echartsDataArr: {
        incomeEchartsData: {},
        expenditureEchartsData: {},
        assetIncomeData: {},
        assetCostData: {}
      },
      incomeName: '',
      costName: '',
      analysisData: {
        incomePrice: 0, // 收入
        expenditurePrice: 0, // 支出
        profitPrice: 0, // 利润
        lossPrice: 0 // 设备损耗
      },
      assetCostInfo: {}
    }
  },
  methods: {
    goBack () {
      this.echartShow = true
    },
    costSummaryChange () {
      this.costSummary.allPrice = Number(this.costSummary.consumablesPrice) + Number(this.costSummary.otherPrice)
    },
    costInputChange (key) {
      let price = 0
      if (key === 2) {
        this.assetArr.forEach(item => {
          price += Number(item.consumablesCost)
        })
        this.assetCostSummary.consumablesPrice = price
      } else {
        this.assetArr.forEach(item => {
          price += Number(item.otherCost)
        })
        this.assetCostSummary.otherPrice = price
      }
      this.assetCostSummary.allPrice = Number(this.assetCostSummary.otherPrice) + Number(this.assetCostSummary.consumablesPrice)
    },
    incomeSummaryChange () {
      this.incomeSummary.allPrice = Number(this.incomeSummary.assetPrice) + Number(this.incomeSummary.otherPrice) + Number(this.incomeSummary.consumablesPrice)
    },
    assetInputChange (key) {
      let price = 0
      if (key === 1) {
        this.assetArr.forEach(item => {
          price += Number(item.assetPrice)
        })
        this.assetIncomeSummary.assetPrice = price
      } else if (key === 2) {
        this.assetArr.forEach(item => {
          price += Number(item.consumablesPrice)
        })
        this.assetIncomeSummary.consumablesPrice = price
      } else {
        this.assetArr.forEach(item => {
          price += Number(item.otherPrice)
        })
        this.assetIncomeSummary.otherPrice = price
      }
      this.assetIncomeSummary.allPrice = Number(this.assetIncomeSummary.assetPrice) + Number(this.assetIncomeSummary.otherPrice) + Number(this.assetIncomeSummary.consumablesPrice)
    },
    addAsset () {
      this.assetArr.push(
        {
          id: '',
          assetName: '', // 设备名称组合
          htAmount: 0, // 设备合同费用
          wxAmount: 0, // 设备维修费用
          consumablesCost: 0, // 耗材支出
          otherCost: 0, // 其他支出
          assetPrice: 0, // 设备费用
          consumablesPrice: 0, // 耗材费用
          otherPrice: 0 // 其他费用
        }
      )
    },
    delAsset (index) {
      this.assetArr.splice(index, 1)
    },
    slectChange (index, val) {
      if (val) {
        this.assetArr[index]['assetName'] = this.assetArrObj[val]
      } else {
        this.assetArr[index] = {
          id: '',
          assetName: '', // 设备名称组合
          htAmount: 0, // 设备合同费用
          wxAmount: 0, // 设备维修费用
          consumablesCost: 0, // 耗材支出
          otherCost: 0, // 其他支出
          assetPrice: 0, // 设备费用
          consumablesPrice: 0, // 耗材费用
          otherPrice: 0 // 其他费用
        }
      }
    },
    async count () {
      this.getAssetCost()
      this.initIncome()
      this.echartShow = false
    },
    initFaultDataExport (data) {
      data.forEach(item => {
        let asset = this.assetArr.find(lab => lab.id === item.assetId)
        if (asset) {
          let amount = 0
          item.maintainCountDtos.forEach(lab => {
            amount += Number(lab.offerPrice)
          })
          asset.wxAmount = amount
        }
      })
    },
    initFaultData (json, echartsData, lossPrice) {
      // console.log(json, 'aaaaa')
      let allPrice = 0 // 所有设备多次维修的维修总金额
      if (json.code === 200 && json.data.length > 0) {
        this.initFaultDataExport(json.data) // 格式化设备维修金额的 导出数据
        let obj = {}
        json.data.forEach(item => {
          let assetPrice = 0
          item.maintainCountDtos.forEach(lab => {
            allPrice += Number(lab.offerPrice) || 0
            assetPrice += Number(lab.offerPrice) || 0
          })
          if (this.assetCostInfo[item.maintainCountDtos[0]['assetName']]) {
            this.assetCostInfo[item.maintainCountDtos[0]['assetName']]['faultPrice'] = assetPrice
          } else {
            this.assetCostInfo[item.maintainCountDtos[0]['assetName']] = { faultPrice: assetPrice }
          }
          obj[item.maintainCountDtos[0]['assetName']] = { price: assetPrice, info: item.maintainCountDtos } // info 单个设备多次维修的记录信息
        })
      }
      lossPrice.val += Number(allPrice)
      echartsData.objInfo.push({ name: '维修费用', value: allPrice })
      echartsData.titleInfo.push('维修费用')
    },
    initMaintainQaData (json, echartsData, lossPrice) {
      let allMaintainPrice = 0 // 所有设备多次保养费用
      let allQaPrice = 0 // 所有设备多次质控费用
      if (json.code === 200 && json.data.length > 0) {
        let obj = {}
        json.data.forEach(item => {
          let maintainPrice = 0
          let qaPrice = 0
          let infoObj = {
            maintain: [],
            qa: []
          }
          item.maintainCountDtos.forEach(lab => {
            if (lab.kind === 'maintain') {
              allMaintainPrice += Number(lab.offerPrice) || 0
              maintainPrice += Number(lab.offerPrice) || 0
              infoObj.maintain.push(lab)
            } else {
              qaPrice += Number(lab.offerPrice) || 0
              allQaPrice += Number(lab.offerPrice) || 0
              infoObj.qa.push(lab)
            }
          })
          if (this.assetCostInfo[item.maintainCountDtos[0]['assetName']]) {
            this.assetCostInfo[item.maintainCountDtos[0]['assetName']]['maintainPrice'] = maintainPrice
            this.assetCostInfo[item.maintainCountDtos[0]['assetName']]['qaPrice'] = qaPrice
          } else {
            this.assetCostInfo[item.maintainCountDtos[0]['assetName']] = { maintainPrice: maintainPrice, qaPrice: qaPrice }
          }
          // console.log(this.assetCostInfo, 33334444)
          obj[item.maintainCountDtos[0]['assetName']] = { maintainPrice: maintainPrice, qaPrice: qaPrice, info: obj } // info 单个设备多次维修的记录信息
        })
      }
      lossPrice.val += (Number(allQaPrice) + Number(allMaintainPrice))
      echartsData.objInfo.push({ name: '设备保养', value: allMaintainPrice })
      echartsData.titleInfo.push('设备保养')
      echartsData.objInfo.push({ name: '设备质控', value: allQaPrice })
      echartsData.titleInfo.push('设备质控')
    },
    initAssetData (json, echartsData, params, lossPrice) {
      let allPrice = 0 // 所有设备的
      if (json.code === 200 && json.data.list.length > 0) {
        let endDate = new Date(params.endDate.split(' ')[0]).getTime()
        let beginDate = new Date(params.beginDate.split(' ')[0]).getTime()
        let obj = {}
        json.data.list.forEach(item => {
          let begin = new Date(item.ctime.split(' ')[0]).getTime() < beginDate ? beginDate : new Date(item.ctime).getTime()
          let money = (Math.ceil((endDate - begin) / 86400000 + 1) * (item.depreciationCharge / 365)).toFixed(2)
          obj.name = Number(money)
          allPrice += Number(money)
          if (this.assetCostInfo[item.name]) {
            this.assetCostInfo[item.name]['assetPrice'] = Number(money)
          } else {
            this.assetCostInfo[item.name] = { assetPrice: Number(money) }
          }
        })
      }
      lossPrice.val += Number(allPrice)
      echartsData.objInfo.push({ name: '设备折旧费', value: allPrice })
      echartsData.titleInfo.push('设备折旧费')
    },
    initAssetsContractDataExport (data) {
      data.forEach(item => {
        item.assetServiceContracts.forEach(lab => {
          let obj = this.assetArr.find(e => e.id === lab.assetId)
          if (obj) {
            obj.htAmount = lab.amount
          }
        })
      })
    },
    initAssetsContractData (json, echartsData, params, lossPrice) {
      if (json.code === 200 && json.data.length > 0) {
        this.initAssetsContractDataExport(json.data) // 格式化导出列表保修合同费用
        let arr = []
        let allPrice = 0
        params.assetIds.forEach(item => {
          json.data.forEach(lab => {
            let infoObj = {}
            let info = lab.assetServiceContracts.find(val => val.assetId === item) || { assetName: '' }
            if (info.assetName) {
              infoObj.amount = info.amount
              infoObj.assetName = info.assetName
              infoObj.beginDate = lab.beginDate
              infoObj.endDate = lab.endDate
              infoObj.guaranteeCycle = lab.guaranteeCycle
            }
            arr.push(infoObj)
          })
        })
        let endDate = new Date(params.endDate.split(' ')[0]).getTime()
        let beginDate = new Date(params.beginDate.split(' ')[0]).getTime()
        arr.forEach(item => {
          let end = ''
          let begin = ''
          if (new Date(item.endDate.split(' ')[0]).getTime() < endDate) {
            end = new Date(item.endDate.split(' ')[0]).getTime()
          } else {
            end = endDate
          }
          if (new Date(item.beginDate.split(' ')[0]).getTime() < beginDate) {
            begin = beginDate
          } else {
            begin = new Date(item.beginDate.split(' ')[0]).getTime()
          }
          let money = (Math.ceil((end - begin) / 86400000 + 1) * (item.amount / (item.guaranteeCycle * 30))).toFixed(2)
          allPrice += Number(money)
          if (this.assetCostInfo[item.assetName]) {
            this.assetCostInfo[item.assetName]['assetContractPrice'] = Number(money)
          } else {
            this.assetCostInfo[item.assetName] = { assetContractPrice: Number(money) }
          }
        })
        lossPrice.val += Number(allPrice)
        echartsData.objInfo.push({ name: '保修费用', value: allPrice })
        echartsData.titleInfo.push('保修费用')
      }
    },
    initInputCost () {
      let objInfo = []
      if (this.costName === '0') {
        objInfo = [
          { name: '耗材支出', value: this.costSummary.consumablesPrice },
          { name: '其他支出', value: this.costSummary.otherPrice }
        ]
        this.analysisData.expenditurePrice = this.costSummary.allPrice
      } else {
        objInfo = [
          { name: '耗材支出', value: this.assetCostSummary.consumablesPrice },
          { name: '其他支出', value: this.assetCostSummary.otherPrice }
        ]
        this.analysisData.expenditurePrice = this.assetCostSummary.allPrice
      }
      return {
        objInfo: objInfo,
        titleInfo: ['耗材支出', '其他支出'],
        title: '支出明细'
      }
    },
    async getAssetCost () {
      this.assetCostInfo = {}
      this.echartsDataArr.assetCostData = {
        assetName: [],
        faultPrice: [],
        maintainPrice: [],
        qaPrice: [],
        assetPrice: [],
        assetContractPrice: [],
        allPrice: []
      }
      let expenditureEchartsData = this.initInputCost()
      let lossPrice = { val: 0 }
      let assetIds = []
      this.assetArr.forEach(item => {
        if (item.assetName) {
          assetIds.push(item.id)
        }
      })
      let params = {
        beginDate: moment(this.basicInfo.beginDate).format('YYYY-MM-DD') + ' 00:00:00',
        endDate: moment(this.basicInfo.endDate).format('YYYY-MM-DD') + ' 23:59:59'
      }
      if (assetIds.length > 0) {
        params.assetIds = assetIds
      }
      if (assetIds.length > 0) {
        let fault = api.faultCount(params) // 设备维修数据
        let maintainQa = api.maintainQaCount(params) // 设备质控/保养数据
        let asset = api.assetList({ pageNum: 0, pageSize: 1000, assetIds: assetIds }) // 设备折旧费
        let assetsContract = api.findByAssetsContract({ pageNum: 0, pageSize: 1000, assetIds: assetIds }) // 设备保修合同费用
        let faultData = await fault
        let maintainQaData = await maintainQa
        let assetData = await asset
        let assetsContractData = await assetsContract
        this.initFaultData(faultData, expenditureEchartsData, lossPrice) // 设备维修数据
        this.initMaintainQaData(maintainQaData, expenditureEchartsData, lossPrice) // 设备质控/保养数据
        this.initAssetData(assetData, expenditureEchartsData, params, lossPrice) // 设备折旧费
        this.initAssetsContractData(assetsContractData, expenditureEchartsData, params, lossPrice) // 设备保修合同费用
        this.analysisData.lossPrice = lossPrice.val
        // console.log(this.assetCostInfo, 111122223333)
        this.analysisData.profitPrice = this.analysisData.incomePrice - this.analysisData.expenditurePrice - this.analysisData.lossPrice
        this.initAssetCostData()
      } else {

      }
      this.echartsDataArr.expenditureEchartsData = expenditureEchartsData
    },
    initAssetCostData () {
      let assetCostInfo = JSON.parse(JSON.stringify(this.assetCostInfo))
      for (let key in assetCostInfo) {
        let item = assetCostInfo[key]
        // faultPrice 维修 maintainPrice 保养 qaPrice 质控 assetPrice 折旧费 assetContractPrice 保修合同费用
        item.allPrice = Number(item.faultPrice) + Number(item.maintainPrice) + Number(item.qaPrice) + Number(item.assetPrice) + Number(item.assetContractPrice)
      }
      let data = {
        assetName: [],
        faultPrice: [],
        maintainPrice: [],
        qaPrice: [],
        assetPrice: [],
        assetContractPrice: [],
        allPrice: []
      }
      for (let key in assetCostInfo) {
        let item = assetCostInfo[key]
        data.assetName.push(key)
        data.faultPrice.push(item.faultPrice)
        data.maintainPrice.push(item.maintainPrice)
        data.qaPrice.push(item.qaPrice)
        data.assetPrice.push(item.assetPrice)
        data.assetContractPrice.push(item.assetContractPrice)
        data.allPrice.push(item.allPrice)
      }
      this.echartsDataArr.assetCostData = data
    },
    initIncome () {
      this.echartsDataArr.assetIncomeData = {
        assetNames: [], // 名称
        assetPrice: [], // 设备费用
        consumablesPrice: [], // 耗材费用
        otherPrice: [], // 其他费用
        allPrice: []
      }
      let objInfo = []
      if (this.incomeName === '0') {
        objInfo = [
          { name: '设备费用', value: this.incomeSummary.assetPrice },
          { name: '耗材费用', value: this.incomeSummary.consumablesPrice },
          { name: '其他费用', value: this.incomeSummary.otherPrice }
        ]
        this.analysisData.incomePrice = this.incomeSummary.allPrice
      } else {
        objInfo = [
          { name: '设备费用', value: this.assetIncomeSummary.assetPrice },
          { name: '耗材费用', value: this.assetIncomeSummary.consumablesPrice },
          { name: '其他费用', value: this.assetIncomeSummary.otherPrice }
        ]
        this.analysisData.incomePrice = this.assetIncomeSummary.allPrice
        this.initAssetIncomeData()
      }
      this.echartsDataArr.incomeEchartsData = {
        objInfo: objInfo,
        titleInfo: [
          '设备费用',
          '耗材费用',
          '其他费用'
        ],
        title: '收入明细'
      }
    },
    initAssetIncomeData () {
      let assets = JSON.parse(JSON.stringify(this.assetArr))
      assets.forEach(item => {
        item.allPrice = Number(item.assetPrice) + Number(item.consumablesPrice) + Number(item.otherPrice)
      })
      assets.sort(function (a, b) {
			  return b.allPrice - a.allPrice
		  }) // 排序
      let obj = {
        assetNames: [], // 名称
        assetPrice: [], // 设备费用
        consumablesPrice: [], // 耗材费用
        otherPrice: [], // 其他费用
        allPrice: []
      }
      assets.forEach(item => {
        obj.assetNames.push(item.assetName)
        obj.assetPrice.push(item.assetPrice)
        obj.consumablesPrice.push(item.consumablesPrice)
        obj.otherPrice.push(item.otherPrice)
        obj.allPrice.push(item.allPrice)
      })
      this.echartsDataArr.assetIncomeData = obj
    },
    query () {
      this.assetArr = [
        {
          id: '',
          assetName: '', // 设备名称组合
          htAmount: 0, // 设备合同费用
          wxAmount: 0, // 设备维修费用
          consumablesCost: 0, // 耗材支出
          otherCost: 0, // 其他支出
          assetPrice: 0, // 设备费用
          consumablesPrice: 0, // 耗材费用
          otherPrice: 0 // 其他费用
        }
      ]
      api.findByDept({ dept: this.queryObj.dept }).then(rs => {
        if (rs.code === 200) {
          rs.data.forEach(item => {
            item.composeName = `${item.name}（${item.model || '-'} ${item.sn || '-'} ${item.vender || '-'} ${item.ctime.split(' ')[0] || '-'} ）`
            this.assetArrObj[item.id] = item.composeName
          })
          this.assetOptions = rs.data
        }
      })
    },
    exportExcel () {
      this.tableData = []
      this.assetArr.forEach(item => {
        if (item.assetName) {
          let asset = this.assetOptions.find(lab => lab.id === item.id)
          this.tableData.push(Object.assign({}, asset, item))
        }
      })
      this.$nextTick(_ => {
        var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '效益分析.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      })
    }
  },
  created () {
    api.deptList({ pageNum: 1, pageSize: 500 }).then(rs => {
      this.deptArr = rs.data.list || []
      this.queryObj.dept = rs.data.list[1]['id']
      this.query()
    })
    this.basicInfo.endDate = moment().format('YYYY-MM-DD')
    this.basicInfo.beginDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
  },
  watch: {
    // 'incomeName': {
    //   handler(val) {

    //   },
    //   immediate: true
    // }
  }
}
</script>
<style lang="less" scoped>
.layout_inner /deep/ .el-input-group__append{
  padding: 0 10px;
}
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
    padding: 5px;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    background: #FFF;
    box-sizing: border-box;
    & /deep/ label {
      line-height: 30px !important;
    }
    & /deep/ .el-form-item__content {
      line-height: 30px !important;
    }
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
  width: 25%;
}
.analysis {
  background-color: #fff;
  position: relative;
  .title{
    width: 100%;
    border-bottom: 5px solid #f8fafe;
    box-sizing: border-box;
    padding: 10px;
  }
  .money {
    overflow: hidden;
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
      }
    }
  }
  .money li:last-child {
    boder:none;
  }
}
.red {
  color: red;
}
.green {
  color: #55AA00;
}
.backStyle {
  text-align:right;
  padding:5px 10px;
  position: absolute;
  right: 10px;
}
.el-date-editor{
    height: 32px;
    line-height: 32px;
    & /deep/ .el-input__icon {
      line-height: 20px;
    }
    & /deep/ .el-range-separator {
      line-height: 22px !important;
    }
  }
  .el-button {
    margin-left: 10px;
    padding: 7px 8px;
  }
  .el-input /deep/ input {
    height: 32px !important;
  }
  .dept /deep/ label {
    color: #000;
  }
  .ever-bread-crumb {
    margin: 0px 0 15px 0;
    color:#606266;
  }
  .diy-btn-style {
    padding: 3px 4px;
    margin: 0 5px 0 0 !important;

  }
</style>
