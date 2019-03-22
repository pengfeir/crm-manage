import Vue from 'vue'
import common from './common'
let setProp =  (obj, path, value) => { // 234
  if (!path) {
    return
  }
  var pList = path.split('.')
  var len = pList.length
  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i]
    if (!obj[elem]) obj[elem] = {}
    obj = obj[elem]
  }
  obj[pList[len - 1]] = value
};
let getProp = (obj, prop) =>
  prop.reduce((xs, x) => {
    if (xs && xs[x] && (typeof xs[x] === 'string')) {
      return xs[x]
    } else {
      return (xs && xs[x]) ? xs[x] : null
    }
  }, obj);
let compMap = {
  'input': 'el-input',
  'text': 'el-input',
  'select': 'el-select',
  'textarea': 'el-input',
  'date': 'el-date-picker',
  'checkbox': 'el-checkbox-group',
  'radio': 'el-radio-group'
}

let defaultProps = {
  'el-select': {
    clearable: true
  },
  'ever-select': {
    clearable: true
  }
}

let savebtn = `
  <el-col class="submit-zone">
    <el-form-item>
      <el-button :disabled="disabled" type="primary" @click="submitForm()" v-if="!objId">创建</el-button>
      <el-button :disabled="disabled" type="primary" @click="submitForm()" v-if="objId">保存</el-button>
      <el-button @click="resetForm()" v-if="!objId">重置</el-button>
    </el-form-item>
  </el-col>
  `
let querybtn = `
  <el-form-item>
    <el-button type="primary" @click="query()">查询</el-button>
  </el-form-item>
`

function createEle (obj, item, createElement, form) {
  let name = item.name || ''
  let comp = item.comp || 'text'
  let props = item.props || {}
  if (comp === 'textarea') {
    props.type = 'textarea'
    // 设置文本域自适应高度
    props.autosize = { minRows: 2 }
  }
  let comp1 = compMap[comp] || comp
  let slots = []
  if (item.slots) {
    slots = item.slots.map(slot => {
      return createElement(Vue.extend({
        template: slot.template
      }), {
        slot: slot.name
      })
    })
  }
  if (['el-select'].indexOf(comp1) > -1 && props.options) {
    slots = props.options.map(option => {
      return createElement('el-option', {
        props: {
          key: option.id || option.value,
          label: option.name || option.label,
          value: option.id || option.value
        }
      })
    })
  } else if (comp1 === 'el-radio-group') {
    slots = props.options.map(option => {
      return createElement('el-radio', {
        props: {
          key: option.id || option.value,
          label: option.name || option.label || option.value
        }
      }, option.id || option.value)
    })
  } else if (comp1 === 'el-checkbox-group') {
    slots = props.options.map(option => {
      return createElement('el-checkbox', {
        props: {
          key: option.id || option.value,
          label: option.name || option.label || option.value
        }
      }, option.id || option.value)
    })
  }

  let extralProps = item.extralProps ? JSON.parse(item.extralProps) : {}
  props = Object.assign(
    {
      value: getProp(obj, name.split('.'))
    },
    defaultProps[comp1],
    props,
    extralProps
  )
  if (item.children) {
    slots = createFormItems(item.children, obj, createElement, {})
  }
  if (item.plainContent) {
    slots = item.plainContent
  }
  let extandAttrs = {}
  if (props && props.placeholder) extandAttrs.placeholder = props.placeholder
  if (props && props.maxlength) extandAttrs.maxlength = props.maxlength
  props.size = form.size || ''
  if (comp1 === 'el-input' && item.type === 'number') {
    props.type = 'number'
  }
  let ele = createElement(comp1, {
    on: {
      input: function (val) {
        if (item.type === 'number') {
          try {
            if (val === '') {
              val = null
            } else {
              val = Number(val)
            }
          } catch (e) {

          }
        }
        setProp(obj, name, val)
        // input 只有在用户有输入时候触发，这点与 change 事件不同
        if (ele.context.isQuery && comp1 !== 'el-input') {
          ele.context.query()
        }
      },
      'focus': (e) => {
        form.$emit('focus', name, obj)
      }
    },
    nativeOn: {
      'keyup': (e) => {
        if (ele.context.isQuery && e.keyCode === 13) {
          ele.context.query()
        }
      }
    },
    props: props,
    attrs: Object.assign({}, extandAttrs, item.attrs),
    style: item.style,
    class: item.class,
    ref: item.ref
  }, slots)
  return ele
}

function createFormItems (schema, obj, createElement, form) {
  return schema.filter(v => {
    if (v.if && obj) {
      return v.if(obj)
    }
    return true
  }).map(v => {
    let name = v.name
    let comp = v.comp
    let ele
    if (form.readonly) {
      ele = obj[name]
      if (['object', 'array'].indexOf(v.rule.dataType) > -1) {
        var ComponentClass = Vue.component(compMap[v.comp] || v.comp)
        if (ComponentClass) {
          var instance = new ComponentClass({
            propsData: { value: obj[name] },
            parent: form
          })
          if (instance.getStringVal) {
            ele = instance.getStringVal() || '--'
          }
        }
      }
    } else {
      if (comp === 'custom') {
        ele = form.$slots[name]
        if (v.noWrap) {
          return ele
        }
      } else {
        ele = createEle(obj, v, createElement, form)
      }
    }
    let formItem = null
    if (v.isInput === false) {
      formItem = ele
    } else {
      formItem = createElement(
        'el-form-item',
        {
          props: {
            label: v.label,
            prop: name,
            labelWidth: v.labelWidth
          },
          'class': v.parentClass || ''
        },
        [ele])
    }
    if (form.inline) {
      return formItem
    } else {
      let colProps = Object.assign({ span: v.span || form.span || 24 }, v.col)
      if (form.forceFullline) {
        colProps.span = 24
      }
      colProps.newRow = v.newRow
      colProps.style = colProps.style || {}
      let col = createElement('el-col', {
        props: colProps,
        style: colProps.style,
        'class': colProps.cla
      }, [formItem])
      return col
    }
  })
}

function createRows (formItems, createElement, gutter, rowFlex) {
  let rowItems = formItems.reduce((acc, curr) => {
    if (!acc.length || (curr && curr.data && curr.data.props && curr.data.props.newRow)) {
      acc.push([])
    }
    acc[acc.length - 1].push(curr)
    return acc
  }, [])
  return rowItems.map(v => {
    let rowProps = {
      gutter: gutter || 0
    }
    if (rowFlex) rowProps.type = 'flex'
    return createElement('el-row', { props: rowProps }, v)
  })
}

export default Vue.component('everForm2', {
  render: function (createElement) {
    let obj = this.value
    let formItems = createFormItems(this.schema, obj, createElement, this)
    if (!this.nosubmit) {
      let formComp = this
      formItems.push(this.$slots['default'] || createElement(Vue.extend(
        {
          props: ['disabled'],
          template: this.isQuery ? querybtn : savebtn,
          data () {
            return {
              objId: formComp.objId
            }
          },
          methods: {
            submitForm () {
              formComp.submitForm()
            },
            resetForm () {
              formComp.resetForm()
            },
            query () {
              formComp.query()
            }
          }
        }),
        {
          props: {
            disabled: formComp.disabled
          }
        }
      ))
    }

    // 如果查询后面还需要附加其他按钮在这里处理（场景可能会很少）by lvjiangtao@everjiankang.com
    if (this.hasExt) {
      let extbtn = `
        <el-form-item>
          <el-button type="primary" @click="extAction()">${this.extBtnString}</el-button>
        </el-form-item>
      `
      let formComp = this
      formItems.push(createElement(Vue.extend(
        {
          props: ['disabled'],
          template: extbtn,
          data () {
            return {

              objId: formComp.objId
            }
          },
          methods: {
            extAction () {
              formComp.extAction()
            }
          }
        }),
        {
          props: {
            disabled: formComp.disabled
          }
        }
      ))
    }

    let formProps = {
      rules: this.rules,
      inline: this.inline,
      model: this.value,
      disabled: this.allDisabled,
      validateOnRuleChange: this.validateOnRuleChange === undefined ? true : this.validateOnRuleChange,
      showMessage: this.showMessage === undefined ? true : this.showMessage
    }
    let formChild = formItems
    if (!this.inline) {
      formProps = Object.assign(formProps, {
        labelWidth: this.labelWidth || '120px',
        labelPosition: this.labelPosition || 'right'
      })
      formChild = createRows(formItems, createElement, this.gutter, this.rowFlex)
    }
    return createElement(
      'el-form',
      {
        props: formProps,
        ref: 'form'
      },
      formChild
    )
  },
  props: ['schema', 'rules', 'value', 'labelWidth', 'labelPosition', 'inline', 'span', 'gutter', 'rowFlex', 'nosubmit', 'api', 'info', 'isQuery', 'readonly', 'allDisabled', 'hasExt', 'extBtnString', 'size', 'validateOnRuleChange', 'showMessage', 'forceFullline'],
  data () {
    return {
      objId: this.value.id || (this.$route && this.$route.params && this.$route.params.id),
      disabled: false
    }
  },
  methods: {
    submitForm () {
      this.disabled = true
      if (this.$refs.selfvalidate) {
        let comps = this.$refs.selfvalidate
        if (!Array.isArray(comps)) {
          comps = [comps]
        }
        for (let i = 0; i < comps.length; i++) {
          if (typeof comps[i].validate === 'function') {
            comps[i].validate(valid => {
              if (!valid) {
                return false
              }
            })
          }
        }
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.api.createOrUpdate(this.value).then(result => {
            this.disabled = false
            this.$emit('objsaved', result)
          }, _ => {
            this.disabled = false
          })
        } else {
          this.disabled = false
          this.autofocus()
          return false
        }
      })
    },
    // 第一个出错元素获得焦点
    autofocus () {
      setTimeout(() => {
        var isError = document.getElementsByClassName('is-error')
        if (isError.length) {
          isError[0].querySelector('input').focus()
        }
      }, 1)
    },
    resetForm () {
      this.disabled = false
      this.$refs.form.resetFields()
    },
    getDetail: function (id) {
      this.api.getById(id || this.objId).then(result => {
        if (result && result.id) {
          Object.assign(this.value, result)
        }
      })
    },
    query () {
      this.$emit('query')
    },
    extAction () {
      this.$emit('extAction')
    }
  },
  created: function () {
    if (this.api && this.objId && !this.info) { // info true 不调getById
      this.getDetail()
    }
  }
})