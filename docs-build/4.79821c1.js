(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./docs/config.js":
/*!************************!*\
  !*** ./docs/config.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: '测试文档',\n  logo: 'Docbook',\n  js: [\"https://unpkg.com/spritejs@3.7.27/dist/spritejs.min.js\", \"https://www.qcharts.cn/qcharts.js\"],\n  navs: [{\n    title: '首页',\n    path: '/home'\n  }, {\n    title: '文档',\n    path: '/doc'\n  }, {\n    title: \"Github\",\n    path: \"https://github.com/fantasticit/docbook\"\n  }],\n  routes: [{\n    title: '',\n    path: '',\n    redirect: 'home'\n  }, {\n    title: '首页',\n    path: '/home',\n    component: () => __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./home.vue */ \"./docs/home.vue\"))\n  }, {\n    title: '文档',\n    path: '/doc',\n    children: [{\n      title: '',\n      path: '',\n      redirect: 'overview'\n    }, {\n      title: '概述',\n      path: 'overview',\n      component: () => __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! ./doc/overview.md */ \"./docs/doc/overview.md\"))\n    }, {\n      title: '配置',\n      path: 'config',\n      component: () => __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./doc/config.md */ \"./docs/doc/config.md\"))\n    }, {\n      title: '编辑器',\n      path: 'editor',\n      component: () => __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ./doc/editor.md */ \"./docs/doc/editor.md\"))\n    }]\n  }]\n});\n\n//# sourceURL=webpack:///./docs/config.js?");

/***/ })

}]);