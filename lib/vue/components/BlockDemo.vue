<template>
  <div :class="['block-demo', isFullscreen ? 'block-demo--fixed' : '']" ref="block">
    <div class="preview" ref="preview">
      <div class="demo" ref="demo"></div>
    </div>
    <div class="editor" ref="editor">
      <div class="bock-demo__ctrl">
        <!-- <el-tooltip class="item" effect="dark" content="运行" placement="top"> -->
          <span title="运行" @click="syncCode" class="icon"><img src="./svgs/play.svg" alt="运行" /></span>
        <!-- </el-tooltip> -->
        <template v-if="!isFullscreen">
          <!-- <el-tooltip class="item" effect="dark" content="全屏" placement="top"> -->
            <span  title="全屏" @click="fullscreen" class="icon"><img src="./svgs/full-screen.svg" alt="全屏" /></span>
          <!-- </el-tooltip> -->
        </template>
        <template v-if="isFullscreen">
          <!-- <el-tooltip class="item" effect="dark" content="取消全屏" placement="top"> -->
            <span title="取消全屏" @click="fullscreen" class="icon"><img src="./svgs/recovery.svg" alt="取消全屏" /></span>
          <!-- </el-tooltip> -->
        </template>
        <!-- <el-tooltip class="item" effect="dark" content="复制代码" placement="top">
          <span @click="copyCode" class="icon"><img src="./svgs/code-copy.svg" alt="复制代码" /></span>
        </el-tooltip> -->
      </div>
      <div class="bock-demo__code">
        <el-tabs v-model="activeTab" :before-leave="checkAndInitEditor">
          <el-tab-pane label="HTML" name="html">
            <textarea ref="htmlTextarea"></textarea>
          </el-tab-pane>
          <el-tab-pane label="CSS" name="css">
            <textarea ref="cssTextarea"></textarea>
          </el-tab-pane>
           <el-tab-pane label="JavaScript" name="js">
            <textarea ref="jsTextarea"></textarea>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- <textarea ref="copytxt" class="copytxt"></textarea> -->
  </div>
</template>
<script>
import CodeMirror from 'codemirror'
import Split from 'split.js'
import { unescape } from 'scapegoat'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/lib/codemirror.css'
import { throttle } from '../utils/throttle'

export default {
  props: {
    tip: String,
    html: String,
    css: String,
    js: String,
  },

  data () {
    return {
      activeTab: 'js',
      htmlEditor: null,
      cssEditor: null,
      jsEditor: null,

      visible: true,
      isJSON: false,
      isFullscreen: false,
      showEditor: true
    }
  },

  mounted () {
    let tip = this.tip.split(',')

    try {
      tip = JSON.parse(JSON.stringify(tip))
    } catch (e) { }

    let innerWidth = window.innerWidth
    this.isFullscreen = tip.indexOf('fullscreen') > -1
      ; (this.showEditor = innerWidth >= 768) && this.initSplit()

    this.jsEditor = this.initEditor('jsTextarea', 'application/javascript', this.js)

    try {
      this.$nextTick(() => {
        this.syncCode()
      })
    } catch (e) {
      throw e
    }

    window.addEventListener('resize', this.initSplit)
  },
  destroyed() {
    window.removeEventListener('resize', this.initSplit)
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    },
    unescape (html) {
      return unescape(html)
    },

    initSplit () {
      Split([this.$refs['preview'], this.$refs['editor']], {
        sizes: [50, 50]
      })
    },

    initEditor (ref, mode = 'application/javascript', toSetValue) {
      const editor = CodeMirror.fromTextArea(this.$refs[ref], {
        mode: mode,
        extraKeys: {
          'Ctrl-Space': 'autocomplete'
        },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        lineNumbers: true,
        lineWrapping: false
      })
      editor.getDoc().setValue(this.unescape(toSetValue))
      return editor
    },

    checkAndInitEditor(to) {
      this.$nextTick(() => {
         switch (to) {
          case 'js':
            !this.jsEditor && (this.jsEditor = this.initEditor('jsTextarea', 'application/javascript', this.js));
            break;
          case 'css':
            !this.cssEditor && (this.cssEditor = this.initEditor('cssTextarea', 'text/css', this.css));
            break;
          case 'html':
            !this.htmlEditor && (this.htmlEditor = this.initEditor('htmlTextarea', 'text/html', this.html));
            break;
        }
      })
    },

    syncCode () {
      const oDemo = this.$refs['demo']
      oDemo.innerHTML = `<iframe class="chart-frame" frameborder="0"></iframe>`
      const iframe = oDemo.querySelector('iframe')
      const js = this.$config.js || []
      const srcs = js.length ? js.reduce((a, c) => {
        a += `<script src=${c}><\/script>`
        return a
      }, ``) : ''
      iframe.contentWindow.document.write(
        `
        <style>${this.cssEditor ? this.cssEditor.getValue() : this.css}<\/style>
        ${this.htmlEditor ? this.htmlEditor.getValue(): this.html}
        ${srcs}
        <script>${this.jsEditor ? this.jsEditor.getValue() : this.js}<\/script>
        `
      )
    },

    fullscreen () {
      this.isFullscreen = !this.isFullscreen;
      if (window.parent) {
        window.parent.postMessage({ fullScreen: this.isFullscreen }, '*');
      }
    }
  }
}
</script>

<style lang="scss">
.block-demo {
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border: 1px solid #edeff1;
  background: #fff;
  font-size: 1.2rem;
}

.gutter {
  background: #efefef00;
  cursor: col-resize;
  position: relative;
  z-index: 100;
  left: 5px;
}

.block-demo button {
  position: relative;
  z-index: 9999;
  padding: 0.15rem 0.5rem;
}

.block-demo--fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  margin-top: 0 !important;
}

.block-demo + .block-demo {
  margin-top: 30px;
}

.block-demo > .editor,
.block-demo > .preview {
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  min-height: 300px;
}

@media (max-width: 768px) {
  .block-demo {
    flex-direction: column;

    > .editor,
    > .preview {
      width: 100% !important;
    }

    > .preview {
      min-height: 100px;
    }
  }
}

.block-demo > .preview {
  box-sizing: border-box;
  max-height: 100%;
  padding: 1rem;
  overflow: hidden;
}

.editor {
  background: #f8fafe;
  border-left: 1px solid #edeff1;
}

.bock-demo__ctrl {
  position: relative;
  z-index: 1000000;
  height: 45px;
  padding: 0 15px;
  border-bottom: 1px solid #ddd;
  text-align: right;
  background: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.bock-demo__ctrl button + button {
  margin-left: 10px;
}

.bock-demo__code {
  height: calc(100% - 46px);
}

.block-demo .demo {
  height: 100%;
}

.block-demo .demo iframe.chart-frame {
  width: 100%;
  height: 100%;
}
.block-demo + h4 {
  margin-top: 0;
  padding-top: 3.6rem;
}

.CodeMirror {
  height: 298px !important;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  font-size: 14px;
  background: transparent !important;
}
.CodeMirror-gutters {
  background-color: #f7f9fb;
  border-right: none;
}
.cm-s-default .cm-string {
  color: #f84e44ff;
}
.icon {
  cursor: pointer;
  opacity: 0.6;
  font-size: 20px;
  margin-left: 12px;
}
.icon:hover {
  opacity: 1;
}

.copytxt {
  width: 100%;
  height: 1px;
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
