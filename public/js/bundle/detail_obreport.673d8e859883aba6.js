"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["detail_obreport"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  computed: (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)(["currentUserPermissions", "currentUser"]),
  metaInfo: {
    title: "Detail OBReport"
  },
  data: function data() {
    return {
      isLoading: true,
      quote: {},
      //   details: [],
      //   variants: [],
      company: {},
      email: {
        to: "",
        subject: "",
        message: "",
        client_name: "",
        Quote_Ref: ""
      }
    };
  },
  methods: {
    //------------------------------ Print -------------------------\\
    print: function print() {
      this.$htmlToPaper('print_Invoice');
    },
    //----------------------------------- Print Quotation -------------------------\\
    Quote_PDF: function Quote_PDF() {
      var _this = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      var id = this.$route.params.id;
      axios.get("quote_pdf/".concat(id), {
        responseType: "blob",
        // important
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "OBReport" + _this.quote.Ref + ".pdf");
        document.body.appendChild(link);
        link.click();
        // Complete the animation of the  progress bar.
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
      })["catch"](function () {
        // Complete the animation of the  progress bar.
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
      });
    },
    //------------------------------Formetted Numbers -------------------------\\
    // formatNumber(number, dec) {
    //   const value = (typeof number === "string"
    //     ? number
    //     : number.toString()
    //   ).split(".");
    //   if (dec <= 0) return value[0];
    //   let formated = value[1] || "";
    //   if (formated.length > dec)
    //     return `${value[0]}.${formated.substr(0, dec)}`;
    //   while (formated.length < dec) formated += "0";
    //   return `${value[0]}.${formated}`;
    // },
    //----------------------------------- Get Details Product ------------------------------\\
    Get_Details: function Get_Details() {
      var _this2 = this;
      var id = this.$route.params.id;
      axios.get("quotations/".concat(id)).then(function (response) {
        _this2.quote = response.data.quote;
        //   this.details = response.data.details;
        _this2.company = response.data.company;
        _this2.isLoading = false;
      })["catch"](function (response) {
        setTimeout(function () {
          _this2.isLoading = false;
        }, 500);
      });
    },
    //------ Toast
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //------------------------------------ Form Send Quotation in Email -------------------------\\
    Quote_Email: function Quote_Email() {
      this.email.to = this.quote.client_email;
      this.email.Quote_Ref = this.quote.Ref;
      this.email.client_name = this.quote.client_name;
      this.SendEmail();
    },
    SendEmail: function SendEmail() {
      var _this3 = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      var id = this.$route.params.id;
      axios.post("quotations_send_email", {
        id: id,
        to: this.email.to,
        client_name: this.email.client_name,
        Ref: this.email.Quote_Ref
      }).then(function (response) {
        // Complete the animation of the  progress bar.
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
        _this3.makeToast("success", _this3.$t("Send.TitleEmail"), _this3.$t("Success"));
      })["catch"](function (error) {
        // Complete the animation of the  progress bar.
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
        _this3.makeToast("danger", _this3.$t("SMTPIncorrect"), _this3.$t("Failed"));
      });
    },
    //---------SMS notification
    Quote_SMS: function Quote_SMS() {
      var _this4 = this;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      var id = this.$route.params.id;
      axios.post("quotations_send_sms", {
        id: id
      }).then(function (response) {
        // Complete the animation of the  progress bar.
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
        _this4.makeToast("success", _this4.$t("Send_SMS"), _this4.$t("Success"));
      })["catch"](function (error) {
        // Complete the animation of the  progress bar.
        setTimeout(function () {
          return nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        }, 500);
        _this4.makeToast("danger", _this4.$t("sms_config_invalid"), _this4.$t("Failed"));
      });
    },
    //-------------------------------------------- Delete Quotation -------------------------\\
    Remove_Quote: function Remove_Quote() {
      var _this5 = this;
      var id = this.$route.params.id;
      this.$swal({
        title: this.$t("Delete.Title"),
        text: this.$t("Delete.Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete.cancelButtonText"),
        confirmButtonText: this.$t("Delete.confirmButtonText")
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("quotations/" + id).then(function () {
            _this5.$swal(_this5.$t("Delete.Deleted"), _this5.$t("Delete.QuoteDeleted"), "success");
            _this5.$router.push({
              name: "index_obreport"
            });
          })["catch"](function () {
            _this5.$swal(_this5.$t("Delete.Failed"), _this5.$t("Delete.Therewassomethingwronge"), "warning");
          });
        }
      });
    }
  },
  //end Methods

  //----------------------------- Created function-------------------

  created: function created() {
    this.Get_Details();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=template&id=b4f745ec&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=template&id=b4f745ec& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "main-content"
  }, [_c("breadcumb", {
    attrs: {
      page: _vm.$t("Detail OBReport"),
      folder: _vm.$t("ListOBReport")
    }
  }), _vm._v(" "), _vm.isLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _vm._e(), _vm._v(" "), !_vm.isLoading ? _c("b-card", [_c("b-row", [_c("b-col", {
    staticClass: "mb-5",
    attrs: {
      md: "12"
    }
  }, [_c("button", {
    staticClass: "btn-sm btn btn-info ripple btn-icon m-1",
    on: {
      click: function click($event) {
        return _vm.Quote_Email();
      }
    }
  }, [_c("i", {
    staticClass: "i-Envelope-2"
  }), _vm._v("\n          " + _vm._s(_vm.$t("Email")) + "\n        ")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-secondary btn-icon ripple btn-sm",
    on: {
      click: function click($event) {
        return _vm.Quote_SMS();
      }
    }
  }, [_c("i", {
    staticClass: "i-Speach-Bubble"
  }), _vm._v("\n          SMS\n        ")]), _vm._v(" "), _c("button", {
    staticClass: "btn-sm btn btn-light ripple btn-icon m-1",
    on: {
      click: function click($event) {
        return _vm.Quote_PDF();
      }
    }
  }, [_c("i", {
    staticClass: "i-File-TXT"
  }), _vm._v(" PDF\n        ")]), _vm._v(" "), _c("button", {
    staticClass: "btn-sm btn btn-warning ripple btn-icon m-1",
    on: {
      click: function click($event) {
        return _vm.print();
      }
    }
  }, [_c("i", {
    staticClass: "i-Billing"
  }), _vm._v("\n          " + _vm._s(_vm.$t("print")) + "\n        ")])])], 1), _vm._v(" "), _c("div", {
    staticClass: "invoice",
    attrs: {
      id: "print_Invoice"
    }
  }, [_c("div", {
    staticClass: "invoice-print"
  }, [_c("b-row", {
    staticClass: "justify-content-md-center"
  }, [_c("h4", {
    staticClass: "font-weight-bold"
  }, [_vm._v(_vm._s(_vm.$t("Detail OBReport")) + " : " + _vm._s(_vm.quote.Ref))])]), _vm._v(" "), _c("hr"), _vm._v(" "), _c("b-row", {
    staticClass: "mt-5"
  }, [_c("b-col", {
    staticClass: "mb-4",
    attrs: {
      md: "4"
    }
  }, [_c("h5", {
    staticClass: "font-weight-bold"
  }, [_vm._v(_vm._s(_vm.$t("Client_Info")))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.quote.client_name))])]), _vm._v(" "), _c("b-col", {
    staticClass: "mb-4",
    attrs: {
      md: "4"
    }
  }, [_c("h5", {
    staticClass: "font-weight-bold"
  }, [_vm._v(_vm._s(_vm.$t("Company_Info")))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.company.CompanyName))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.company.email))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.company.CompanyPhone))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.company.CompanyAdress))])]), _vm._v(" "), _c("b-col", {
    staticClass: "mb-4",
    attrs: {
      md: "4"
    }
  }, [_c("h5", {
    staticClass: "font-weight-bold"
  }, [_vm._v(_vm._s(_vm.$t("Reporter Info")))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.$t("Occurence Subject")) + " : " + _vm._s(_vm.quote.subject))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.quote.reporter_name))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.quote.reporter_id))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.quote.phone))]), _vm._v(" "), _c("div", [_vm._v(_vm._s(_vm.$t("date")) + " : " + _vm._s(_vm.quote.date))])])], 1), _vm._v(" "), _c("b-row", {
    staticClass: "mt-3"
  }), _vm._v(" "), _c("hr", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.quote.note,
      expression: "quote.note"
    }]
  }), _vm._v(" "), _c("b-row", {
    staticClass: "mt-4"
  }, [_c("h5", {
    staticClass: "font-weight-bold",
    attrs: {
      md: "12"
    }
  }, [_vm._v(_vm._s(_vm.$t("Occurence Details")))]), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("p", [_vm._v(_vm._s(_vm.quote.note))])])], 1)], 1)])], 1) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/src/views/app/pages/obreport/detail_obreport.vue":
/*!********************************************************************!*\
  !*** ./resources/src/views/app/pages/obreport/detail_obreport.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _detail_obreport_vue_vue_type_template_id_b4f745ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail_obreport.vue?vue&type=template&id=b4f745ec& */ "./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=template&id=b4f745ec&");
/* harmony import */ var _detail_obreport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail_obreport.vue?vue&type=script&lang=js& */ "./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _detail_obreport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_obreport_vue_vue_type_template_id_b4f745ec___WEBPACK_IMPORTED_MODULE_0__.render,
  _detail_obreport_vue_vue_type_template_id_b4f745ec___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/obreport/detail_obreport.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_obreport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail_obreport.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_obreport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=template&id=b4f745ec&":
/*!***************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=template&id=b4f745ec& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_obreport_vue_vue_type_template_id_b4f745ec___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_obreport_vue_vue_type_template_id_b4f745ec___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_obreport_vue_vue_type_template_id_b4f745ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail_obreport.vue?vue&type=template&id=b4f745ec& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/detail_obreport.vue?vue&type=template&id=b4f745ec&");


/***/ })

}]);