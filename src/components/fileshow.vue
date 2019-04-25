<template>
  <div class="fileshow">
    <ul class="clear sl">
      <li class="fileimg" v-for="item in urlData" :key="item.key">
        <div class="zzp" ref="zzp">
          <img :src="item.url" alt="" v-if="item.type==='img'" ref="form">
          <img :src="require(`../assets/${item.type}.png`)" alt="" v-if="item.type!=='img'" ref="zzpimg2">
          <div class="zz" v-if="item.type==='img'">
            <i class="el-icon-zoom-in" ref="icon" @click="showPicture(item.url)"></i>
          </div>
        </div>
        <el-button v-if="!isNoShowBtn" class="name" type="text" small @click="showimg(item)">{{item.name}}</el-button>
      </li>
      <li v-if="tailor && (this.fileurlList?JSON.parse(this.fileurlList):[]).length > 1">
        <!-- <div class="null"></div> -->
        <el-button type="text" small @click="more">...</el-button>
      </li>
    </ul>
    <!-- <el-dialog title="详情" :visible.sync="dialogTableVisible" :append-to-body="true" :close-on-click-modal="false">
      <ul class="clear nor">
        <li class="fileimg" v-for="item in fileurlList&&JSON.parse(fileurlList)" :key="item.key">
          <div class="przzp">
            <img :src="item.url" alt="" v-if="item.type==='img'">
            <img :src="require(`../assets/${item.type}.png`)" alt="" v-if="item.type!=='img'">
            <div class="zz" v-if="item.type==='img'">
              <i class="el-icon-zoom-in" @click="showPicture(item.url)"></i>
            </div>
          </div>
          <el-button class="name" type="text" small @click="showimg(item)">{{item.name}}</el-button>
        </li>
      </ul>
    </el-dialog> -->
    <el-dialog :visible.sync="imgdialogVisible" width="1000px" class="img-log" :append-to-body="true">
      <div style="position:relative;">
        <div class="img-left-btn" @click="imgGo(-1)">
          <div>
            <i class="el-icon-arrow-left"></i>
          </div> 
        </div>      
        <img width="100%" :src="dialogImageUrl" alt="">
        <div class="img-left-btn right-btn"  @click="imgGo(1)">
          <div>
            <i class="el-icon-arrow-right"></i>
          </div> 
        </div>   
      </div>
    </el-dialog>
  </div>

</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    fileurlList: {
      type: String,
      default: ""
    },
    isNoShowBtn: {
      type: Boolean,
      defatule: true
    },
    tailor: {
      type: Boolean,
      defatule: true
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      imgdialogVisible: false,
      dialogImageUrl: "",
      urlData: []
    };
  },
  mounted () {
    let arr = this.fileurlList && this.fileurlList.indexOf('[') > -1 ? JSON.parse(this.fileurlList) : []
    if (this.tailor && arr.length > 0) {
      this.urlData = arr.splice(0, 1)
    } else if (!this.tailor && arr.length > 0) {
      this.urlData = arr
    }
  },
  created() {
  },
  methods: {
    imgGo (val) {
      let arr = this.fileurlList ? JSON.parse(this.fileurlList) : []
      for(let i = 0; i < arr.length; i++) {
        if (arr[i]['url'] === this.dialogImageUrl) {
          if (val === -1) {
            if (i !== 0) {
              this.dialogImageUrl = arr[i-1]['url']
            } else {
              this.dialogImageUrl = arr[arr.length-1]['url']
            }
          } else {
            if (i === arr.length-1) {
              this.dialogImageUrl = arr[0]['url']
            } else {
              this.dialogImageUrl = arr[i+1]['url']
            }
          }
          return
        }
      }
    },
    showimg(item) {
      window.open(`${item.url}?attname=${item.name}`);
    },
    more() {
      this.dialogTableVisible = true;
    },
    showPicture(url) {
      this.imgdialogVisible = true;
      this.dialogImageUrl = url;
    }
  }
};
</script>
<style lang="less" scoped>
.sl img {
  width: 30px;
  height: 30px;
}
.sl .zz .el-icon-zoom-in {
  line-height: 30px;
  font-size: 15px;
  cursor: pointer;
}
.nor img {
  width: 100px;
  height: 100px;
}
.fileshow ul li {
  margin-left: 5px;
  float: left;
}
.fileshow ul li a {
  color: #666;
}
.fileshow ul li a:hover {
  color: #409eff;
}
.el-button.el-button--text {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
.sl .name {
  display: block;
  line-height: 12px;
  font-size: 12px;
  width: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nor .name {
  display: block;
  line-height: 12px;
  font-size: 12px;
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fileimg .el-button--text {
  color: #666;
  margin-top: 5px;
  text-align: left;
}
.nor .zz .el-icon-zoom-in {
  line-height: 100px;
  font-size: 30px;
  cursor: pointer;
}
.fileimg .el-button--text:hover {
  color: #409eff;
}
.null {
  width: 40px;
  height: 40px;
}
.przzp {
  position: relative;
  width: 100px;
  height: 100px;
}
.zzp {
  position: relative;
  width: 30px;
  height: 30px;
}
.zz:hover {
  opacity: 1;
}
.zz {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}
.maxsize {
  .fileimg {
    margin:5px 5px 0 0;
  }
  .zzp {
    width: 60px !important;
    height: 60px !important;
  }
  .sl img {
    width: 60px !important;
    height: 60px !important;
  }
  .sl .zz .el-icon-zoom-in {
    line-height: 60px !important;
    font-size: 25px !important;
  }
}
.img-log /deep/ .el-dialog {
  margin-top: 5vh !important;
}
.img-left-btn {
  cursor: pointer;
  position: absolute; 
  height:100%;
  width: 50px;
  opacity: 0;
  div {
    position:absolute;
    top:50%;
    margin-top:-50px;
    background: rgba(0,0,0,0.5);
    i {
      font-size:40px;
      color:#fff;
    }
  }
}
.right-btn {
  right: 0;
  top: 0;
}
.img-left-btn:hover{
  visibility: visible;
  opacity: 1;
}
</style>

