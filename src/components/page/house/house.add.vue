<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'物联网络'"></ever-bread-crumb>
    <div class="scroll">
        <ever-form2 :schema="querySchema" v-model="queryObj" ref="form" class="package-sale" labelWidth="130px" label-position="right" :rules="rules">
          <template slot="area">
            <el-select v-model="queryObj.area" filterable placeholder="请选择" @change="val => {areaChange(val)}">
              <el-option
                v-for="item in options.areaArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template slot="building">
            <el-select v-model="queryObj.building" filterable placeholder="请选择" @change="val => {buildingChange(val)}">
              <el-option
                v-for="item in options.buildingArr"
                :key="item.id"
                :label="item.composeName"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template slot="floorNo">
            <el-select v-model="queryObj.floorNo" filterable placeholder="请选择">
              <el-option
                v-for="item in options.floorNoArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template slot="dept">
            <el-select v-model="queryObj.dept" filterable placeholder="请选择">
              <el-option
                v-for="item in options.deptArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template slot="urlList">
            <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.reportList:[]" :on-remove="handleReportRemove" :on-success="handleReportContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </template>
          <template slot="default">
            <div></div>
          </template>
        </ever-form2>
      </div>
      <div class="log-btn-container" style="margin-bottom:60px;padding-left:130px;">
        <el-button type="primary" @click="prev">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
      
  </div>
</template>
<script>
import api from "@/api/api";
import token from "@/plugins/getUploadToken";
let schema = [
  {
    name: "roomNo",
    label: "房间号"
  },
  {
    name: "area",
    label: "院区",
    comp: "custom"
  },
  {
    name: "building",
    label: "楼名",
    comp: "custom"
  },
  {
    name: "floorNo",
    label: "楼层",
    comp: "custom"
  },
  {
    name: "dept",
    label: "所属科室",
    comp: "custom"
  },
  {
    name: "descr",
    label: "房间描述"
  },
  {
    name: "urlList",
    label: "房间资料",
    comp: "custom"
  },
  {
    name: "extra",
    label: "其他扩展信息"
  }
];
export default {
  mixins: [token],
  data () {
    var obj = this.createObjFromSchema(schema);
    return {
      querySchema: schema,
      queryObj: obj,
      detailId: "",
      // 保存图片地址
      imgObj: {
        reportImg: []
      },
      // 回显图片地址
      filelistObj: {
        reportList: []
      },
      rules: {
        macAddr: [
          {
            required: true,
            message: "必填项",
            trigger: ["blur"]
          }
        ]
      },
      options: {
        areaArr: [], //院区
        buildingArr: [], // 建筑
        floorNoArr: [{id:1,name:'1 层'}], // 楼层
        deptArr: [] // 科室
      },
      floorNoDefault: [
        {id: '6',name: '6 层'},
        {id: '5',name: '5 层'},
        {id: '4',name: '4 层'},
        {id: '3',name: '3 层'},
        {id: '2',name: '2 层'},
        {id: '1',name: '1 层'},
        {id: '-1',name: 'B1 层'},
        {id: '-2',name: 'B2 层'}
      ],
      allBuildingArr: {}
    }
  },
  methods: {
    areaChange(val) {
      this.options.buildingArr = this.allBuildingArr[val];
      this.queryObj.building = this.allBuildingArr[val][0]['id'];
      this.options.floorNoArr = this.initFloorNoArr(this.allBuildingArr[val][0]['floorsOnGround'], this.allBuildingArr[val][0]['floorsUnderground'])
    },
    initFloorNoArr(on, under) {
      let arr = [];
      for(let i = on; i > 0; i --) {
        let obj = {id: i, name: i + ' 层'}
        arr.push(obj);
      }
      for (let i = 1; i < under + 1; i ++) {
        let obj = {id: '-' + i, name: 'B'+ i + ' 层'};
        arr.push(obj);
      }
      if (arr.length === 0) {
        arr = this.floorNoDefault;
      }
      return arr
    },
    buildingChange(val) {
      let info = this.options.buildingArr.find(item => item.id === val);
      this.queryObj.area = info.hospitalArea;
      this.options.floorNoArr = this.initFloorNoArr(info.floorsOnGround, info.floorsUnderground)
    },
    handleClose() {
      this.$router.go(-1)
    },
     //删除数组里面删除的图片地址
    handleReportRemove(file, fileList) {
      this.imgObj.reportImg = this.sliceArr(this.imgObj.reportImg, file, "key");
    },
    // 保存上传的图片地址
    handleReportContractSuccess(response, file, fileList) {
      console.log(response, file);
      this.imgObj.reportImg.push({
        name: file.name,
        url: `${this.imgBaseUrl}/${file.response.key}`,
        type: this.getFileType(file.raw.name),
        key: file.response.key
      });
    },
    beforeUploadGetKey(file) {
      //每个文件上传之前 给它一个 名字
      this.uploadData.key = this.generateUUID();
      this.uploadData.token = this.uploadToken;
    },
    prev(id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = "createRoom";
          if (this.detailId) {
            url = "updateRoom";
          }
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.queryObj);
           params.urlList =
        this.imgObj.reportImg.length > 0
          ? JSON.stringify(this.imgObj.reportImg)
          : "";
          api[url](params).then(rs => {
            this.popShow = false;
            if (rs.code === 200) {
              this.$messageTips(this, "success", tips + "成功");
              this.$router.go(-1)
            } else {
              this.$messageTips(this, "error", tips + "失败");
            }
          });
        }
      });
    },
    emitInfo(row) {
      this.detailId = row.id;
      Object.assign(this.queryObj, row);
      this.filelistObj.reportList = (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) || [];
      this.imgObj.reportImg = (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) || [];
    },
    clearInfo() {
      Object.keys(this.imgObj).map(key => {
        this.imgObj[key] = [];
      });
      Object.keys(this.filelistObj).map(key => {
        this.filelistObj[key] = [];
      });
    },
    async initOptions () {
      let area = api.areaList({pageNum: 1, pageSize: 200});
      let building = api.buildingList({pageNum: 1, pageSize: 1000});
      let dept = api.deptList({pageNum: 1, pageSize: 100});
      let areaArr = await area;
      let buildingArr = await building;
      let deptArr =await dept;
      this.options.areaArr = areaArr.data.list || [];
      (buildingArr.data.list || []).forEach(item => {
        if (this.allBuildingArr[item.hospitalArea]) {
          this.allBuildingArr[item.hospitalArea].push(item)
        } else {
          this.allBuildingArr[item.hospitalArea] = []
          this.allBuildingArr[item.hospitalArea].push(item)
        }
        let curArea = this.options.areaArr.find(lab => lab.id === item.hospitalArea) || {name: ''};
        item.hospitalAreaName = curArea.name;
        item.composeName = item.name + ' < ' + item.hospitalAreaName
      });
      this.options.buildingArr = buildingArr.data.list || [];
      this.options.deptArr = deptArr.data.list || [];
      this.options.floorNoArr = this.floorNoDefault;
    }
  },
  created (){
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      api.roomFindById({id: this.detailId}).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
    }
    this.initOptions();
  },
  watch: {
    $route: {
      handler(value) {
        if (!value) {
          this.clearInfo();
        }
      },
      immediate: true
    }
  }
}
</script>

