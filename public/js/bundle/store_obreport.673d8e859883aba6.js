"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["store_obreport"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: {
    title: "Create OB Report"
  },
  data: function data() {
    return {
      focused: false,
      timer: null,
      //   search_input:'',
      //   product_filter:[],
      isLoading: false,
      SubmitProcessing: false,
      //   Submit_Processing_detail:false,
      //   warehouses: [],
      //   units: [],
      //   clients: [],
      //   products: [],
      //   details: [],
      //   detail: {},
      //   quotations: [],
      quote: {
        id: "",
        // statut: "pending",
        notes: "",
        date: new Date().toISOString().slice(0, 10),
        client_name: "",
        reporter_name: "",
        reporter_id: "",
        subject: "",
        phone: ""
      }
      //   total: 0,
      //   GrandTotal: 0,
      //   product: {
      //     id: "",
      //     code: "",
      //     stock: "",
      //     quantity: 1,
      //     discount: "",
      //     DiscountNet: "",
      //     discount_Method: "",
      //     sale_unit_id:"",
      //     fix_stock:"",
      //     fix_price:"",
      //     name: "",
      //     unitSale: "",
      //     Net_price: "",
      //     Total_price: "",
      //     Unit_price: "",
      //     subtotal: "",
      //     product_id: "",
      //     detail_id: "",
      //     taxe: "",
      //     tax_percent: "",
      //     tax_method: "",
      //     product_variant_id: "",
      //     is_imei: "",
      //     imei_number:"",
      //   },
      // //   symbol: ""
    };
  },

  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)(["currentUser"])),
  methods: {
    handleFocus: function handleFocus() {
      this.focused = true;
    },
    handleBlur: function handleBlur() {
      this.focused = false;
    },
    //--- Submit Validate Create Quotation
    Submit_Quotation: function Submit_Quotation() {
      var _this = this;
      this.$refs.create_quote.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", _this.$t("Please_fill_the_form_correctly"), _this.$t("Failed"));
        } else {
          _this.Create_Quotation();
        }
      });
    },
    //---Submit Validation Update Detail
    // submit_Update_Detail() {
    //   this.$refs.Update_Detail_quote.validate().then(success => {
    //     if (!success) {
    //       return;
    //     } else {
    //       this.Update_Detail();
    //     }
    //   });
    // },
    //---Validate State Fields
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
        validated = _ref.validated,
        _ref$valid = _ref.valid,
        valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    //------ Toast
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    //---------------------- get_units ------------------------------\\
    // get_units(value) {
    //   axios
    //     .get("get_units?id=" + value)
    //     .then(({ data }) => (this.units = data));
    // },
    //------ Show Modal Update Detail Product
    // Modal_Updat_Detail(detail) {
    //   NProgress.start();
    //   NProgress.set(0.1);
    //   this.detail = {};
    //   this.get_units(detail.product_id);
    //   this.detail.detail_id = detail.detail_id;
    //   this.detail.sale_unit_id = detail.sale_unit_id;
    //   this.detail.name = detail.name;
    //   this.detail.Unit_price = detail.Unit_price;
    //   this.detail.fix_price = detail.fix_price;
    //   this.detail.fix_stock = detail.fix_stock;
    //   this.detail.stock = detail.stock;
    //   this.detail.tax_method = detail.tax_method;
    //   this.detail.discount_Method = detail.discount_Method;
    //   this.detail.discount = detail.discount;
    //   this.detail.quantity = detail.quantity;
    //   this.detail.tax_percent = detail.tax_percent;
    //   this.detail.is_imei = detail.is_imei;
    //   this.detail.imei_number = detail.imei_number;
    //   setTimeout(() => {
    //     NProgress.done();
    //     this.$bvModal.show("form_Update_Detail");
    //   }, 1000);
    // },
    //------ Submit Update Detail Product
    // Update_Detail() {
    //   NProgress.start();
    //   NProgress.set(0.1);
    //   this.Submit_Processing_detail = true;
    //   for (var i = 0; i < this.details.length; i++) {
    //     if (this.details[i].detail_id === this.detail.detail_id) {
    //       // this.convert_unit();
    //        for(var k=0; k<this.units.length; k++){
    //           if (this.units[k].id == this.detail.sale_unit_id) {
    //             if(this.units[k].operator == '/'){
    //               this.details[i].stock       = this.detail.fix_stock  * this.units[k].operator_value;
    //               this.details[i].unitSale    = this.units[k].ShortName;
    //             }else{
    //               this.details[i].stock       = this.detail.fix_stock  / this.units[k].operator_value;
    //               this.details[i].unitSale    = this.units[k].ShortName;
    //             }
    //           }
    //         }
    //         if (this.details[i].stock < this.details[i].quantity) {
    //           this.details[i].quantity = this.details[i].stock;
    //         } else {
    //           this.details[i].quantity =1;
    //         }
    //       this.details[i].Unit_price = this.detail.Unit_price;
    //       this.details[i].tax_percent = this.detail.tax_percent;
    //       this.details[i].tax_method = this.detail.tax_method;
    //       this.details[i].discount_Method = this.detail.discount_Method;
    //       this.details[i].discount = this.detail.discount;
    //       this.details[i].sale_unit_id = this.detail.sale_unit_id;
    //       this.details[i].imei_number = this.detail.imei_number;
    //       if (this.details[i].discount_Method == "2") {
    //         //Fixed
    //         this.details[i].DiscountNet = this.details[i].discount;
    //       } else {
    //         //Percentage %
    //         this.details[i].DiscountNet = parseFloat(
    //           (this.details[i].Unit_price * this.details[i].discount) / 100
    //         );
    //       }
    //       if (this.details[i].tax_method == "1") {
    //         //Exclusive
    //         this.details[i].Net_price = parseFloat(
    //           this.details[i].Unit_price - this.details[i].DiscountNet
    //         );
    //         this.details[i].taxe = parseFloat(
    //           (this.details[i].tax_percent *
    //             (this.details[i].Unit_price - this.details[i].DiscountNet)) /
    //             100
    //         );
    //       } else {
    //         //Inclusive
    //         this.details[i].Net_price = parseFloat(
    //           (this.details[i].Unit_price - this.details[i].DiscountNet) /
    //             (this.details[i].tax_percent / 100 + 1)
    //         );
    //         this.details[i].taxe = parseFloat(
    //           this.details[i].Unit_price -
    //             this.details[i].Net_price -
    //             this.details[i].DiscountNet
    //         );
    //       }
    //       this.$forceUpdate();
    //     }
    //   }
    //   this.Calcul_Total();
    //   setTimeout(() => {
    //     NProgress.done();
    //     this.Submit_Processing_detail = false;
    //     this.$bvModal.hide("form_Update_Detail");
    //   }, 1000);
    // },
    // Search Products
    // search(){
    //   if (this.timer) {
    //         clearTimeout(this.timer);
    //         this.timer = null;
    //   }
    //   if (this.search_input.length < 1) {
    //     return this.product_filter= [];
    //   }
    //   if (this.quote.warehouse_id != "" &&  this.quote.warehouse_id != null) {
    //     this.timer = setTimeout(() => {
    //       const product_filter = this.products.filter(product => product.code === this.search_input || product.barcode.includes(this.search_input));
    //         if(product_filter.length === 1){
    //             this.SearchProduct(product_filter[0])
    //         }else{
    //             this.product_filter=  this.products.filter(product => {
    //               return (
    //                 product.name.toLowerCase().includes(this.search_input.toLowerCase()) ||
    //                 product.code.toLowerCase().includes(this.search_input.toLowerCase()) ||
    //                 product.barcode.toLowerCase().includes(this.search_input.toLowerCase())
    //                 );
    //             });
    //         }
    //     }, 800);
    //   } else {
    //     this.makeToast(
    //       "warning",
    //       this.$t("SelectWarehouse"),
    //       this.$t("Warning")
    //     );
    //   }
    // },
    //------------- get Result Value Search Product ----------------------\\
    // getResultValue(result) {
    //   return result.code + " " + "(" + result.name + ")";
    // },
    //------------- Submit Search Product ----------------------\\
    // SearchProduct(result) {
    //   this.product = {};
    //   if (
    //     this.details.length > 0 &&
    //     this.details.some(detail => detail.code === result.code)
    //   ) {
    //     this.makeToast("warning", this.$t("AlreadyAdd"), this.$t("Warning"));
    //   } else {
    //     this.product.code = result.code;
    //     this.product.stock = result.qte_sale;
    //     this.product.fix_stock = result.qte;
    //     if (result.qte_sale < 1) {
    //       this.product.quantity = result.qte_sale;
    //     } else {
    //       this.product.quantity = 1;
    //     }
    //     this.product.product_variant_id = result.product_variant_id;
    //     this.Get_Product_Details(result.id);
    //   }
    //   this.search_input= '';
    //   this.$refs.product_autocomplete.value = "";
    //   this.product_filter = [];
    // },
    //---------------------- Event Select Warehouse ------------------------------\\
    // Selected_Warehouse(value) {
    //   this.search_input= '';
    //   this.product_filter = [];
    //   this.Get_Products_By_Warehouse(value);
    // },
    //------------------------------------ Get Products By Warehouse -------------------------\\
    // Get_Products_By_Warehouse(id) {
    //   // Start the progress bar.
    //     NProgress.start();
    //     NProgress.set(0.1);
    //   axios
    //     .get("get_Products_by_warehouse/" + id + "?stock=" + 1)
    //      .then(response => {
    //         this.products = response.data;
    //          NProgress.done();
    //         })
    //       .catch(error => {
    //       });
    // },
    //----------------------------------------- Add Product to order list-------------------------\\
    // add_product() {
    //   if (this.details.length > 0) {
    //     this.Last_Detail_id();
    //   } else if (this.details.length === 0) {
    //     this.product.detail_id = 1;
    //   }
    //   this.details.push(this.product);
    //   if(this.product.is_imei){
    //     this.Modal_Updat_Detail(this.product);
    //   }
    // },
    //-----------------------------------Verified QTY ------------------------------\\
    // Verified_Qty(detail, id) {
    //   for (var i = 0; i < this.details.length; i++) {
    //     if (this.details[i].detail_id === id) {
    //       if (isNaN(detail.quantity)) {
    //         this.details[i].quantity = detail.stock;
    //       }
    //       if (detail.quantity > detail.stock) {
    //         this.makeToast("warning", this.$t("LowStock"), this.$t("Warning"));
    //         this.details[i].quantity = detail.stock;
    //       } else {
    //         this.details[i].quantity = detail.quantity;
    //       }
    //     }
    //   }
    //   this.$forceUpdate();
    //   this.Calcul_Total();
    // },
    //-----------------------------------increment QTY ------------------------------\\
    // increment(detail, id) {
    //   for (var i = 0; i < this.details.length; i++) {
    //     if (this.details[i].detail_id == id) {
    //       if (detail.quantity + 1 > detail.stock) {
    //         this.makeToast("warning", this.$t("LowStock"), this.$t("Warning"));
    //       } else {
    //         this.formatNumber(this.details[i].quantity++, 2);
    //       }
    //     }
    //   }
    //   this.$forceUpdate();
    //   this.Calcul_Total();
    // },
    //-----------------------------------decrement QTY ------------------------------\\
    // decrement(detail, id) {
    //   for (var i = 0; i < this.details.length; i++) {
    //     if (this.details[i].detail_id == id) {
    //       if (detail.quantity - 1 > 0) {
    //         if (detail.quantity - 1 > detail.stock) {
    //           this.makeToast(
    //             "warning",
    //             this.$t("LowStock"),
    //             this.$t("Warning")
    //           );
    //         } else {
    //           this.formatNumber(this.details[i].quantity--, 2);
    //         }
    //       }
    //     }
    //   }
    //   this.$forceUpdate();
    //   this.Calcul_Total();
    // },
    //---------- keyup OrderTax
    // keyup_OrderTax() {
    //   if (isNaN(this.quote.tax_rate)) {
    //     this.quote.tax_rate = 0;
    //   } else if(this.quote.tax_rate == ''){
    //      this.quote.tax_rate = 0;
    //     this.Calcul_Total();
    //   }else {
    //     this.Calcul_Total();
    //   }
    // },
    //---------- keyup Discount
    // keyup_Discount() {
    //   if (isNaN(this.quote.discount)) {
    //     this.quote.discount = 0;
    //   } else if(this.quote.discount == ''){
    //     this.quote.discount = 0;
    //     this.Calcul_Total();
    //   } else {
    //     this.Calcul_Total();
    //   }
    // },
    //---------- keyup Shipping
    // keyup_Shipping() {
    //   if (isNaN(this.quote.shipping)) {
    //     this.quote.shipping = 0;
    //    } else if(this.quote.shipping == ''){
    //     this.quote.shipping = 0;
    //     this.Calcul_Total();
    //   } else {
    //     this.Calcul_Total();
    //   }
    // },
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
    //-----------------------------------------Calcul Total ------------------------------\\
    // Calcul_Total() {
    //   this.total = 0;
    //   for (var i = 0; i < this.details.length; i++) {
    //     var tax = this.details[i].taxe * this.details[i].quantity;
    //     this.details[i].subtotal = parseFloat(
    //       this.details[i].quantity * this.details[i].Net_price + tax
    //     );
    //     this.total = parseFloat(this.total + this.details[i].subtotal);
    //   }
    //   const total_without_discount = parseFloat(
    //     this.total - this.quote.discount
    //   );
    //   this.quote.TaxNet = parseFloat(
    //     (total_without_discount * this.quote.tax_rate) / 100
    //   );
    //   this.GrandTotal = parseFloat(
    //     total_without_discount + this.quote.TaxNet + this.quote.shipping
    //   );
    //   var grand_total =  this.GrandTotal.toFixed(2);
    //   this.GrandTotal = parseFloat(grand_total);
    // },
    //-----------------------------------Delete Detail Product ------------------------------\\
    // delete_Product_Detail(id) {
    //   for (var i = 0; i < this.details.length; i++) {
    //     if (id === this.details[i].detail_id) {
    //       this.details.splice(i, 1);
    //       this.Calcul_Total();
    //     }
    //   }
    // },
    // verified Qty If Null || 0
    // verifiedForm() {
    //   if (this.details.length <= 0) {
    //     this.makeToast(
    //       "warning",
    //       this.$t("AddProductToList"),
    //       this.$t("Warning")
    //     );
    //     return false;
    //   } else {
    //     var count = 0;
    //     for (var i = 0; i < this.details.length; i++) {
    //       if (
    //         this.details[i].quantity == "" ||
    //         this.details[i].quantity === 0
    //       ) {
    //         count += 1;
    //       }
    //     }
    //     if (count > 0) {
    //       this.makeToast("warning", this.$t("AddQuantity"), this.$t("Warning"));
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }
    // },
    //--------------------------------- Create Quotation -------------------------\\
    Create_Quotation: function Create_Quotation() {
      var _this2 = this;
      //   if (this.verifiedForm()) {
      this.SubmitProcessing = true;
      // Start the progress bar.
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      axios.post("quotations", {
        date: this.quote.date,
        client_name: this.quote.client_name,
        reporter_name: this.quote.reporter_name,
        reporter_id: this.quote.reporter_id,
        phone: this.quote.phone,
        notes: this.quote.notes,
        subject: this.quote.subject
        // TaxNet: this.quote.TaxNet?this.quote.TaxNet:0,
        // Discount: this.quote.discount?this.quote.discount:0,
        // shipping: this.quote.shipping?this.quote.shipping:0,
        // details: this.details
      }).then(function (response) {
        // Complete the animation of theprogress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this2.makeToast("success", _this2.$t("Create.TitleOBreport"), _this2.$t("Success"));
        _this2.SubmitProcessing = false;
        _this2.$router.push({
          name: "index_obreport"
        });
      })["catch"](function (error) {
        // Complete the animation of theprogress bar.
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this2.makeToast("danger", _this2.$t("InvalidData"), _this2.$t("Failed"));
        _this2.SubmitProcessing = false;
      });
      //   }
    } //-------------------------------- Get Last Detail Id -------------------------\\
    // Last_Detail_id() {
    //   this.product.detail_id = 0;
    //   var len = this.details.length;
    //   this.product.detail_id = this.details[len - 1].detail_id + 1;
    // },
    //---------------------------------Get Product Details ------------------------\\
    // Get_Product_Details(product_id) {
    //   axios.get("products/" + product_id).then(response => {
    //     this.product.discount = 0;
    //     this.product.DiscountNet = 0;
    //     this.product.discount_Method = "2";
    //     this.product.product_id = response.data.id;
    //     this.product.name = response.data.name;
    //     this.product.Net_price = response.data.Net_price;
    //     this.product.Unit_price = response.data.Unit_price;
    //     this.product.fix_price = response.data.fix_price;
    //     this.product.taxe = response.data.tax_price;
    //     this.product.tax_method = response.data.tax_method;
    //     this.product.tax_percent = response.data.tax_percent;
    //     this.product.unitSale = response.data.unitSale;
    //     this.product.sale_unit_id = response.data.sale_unit_id;
    //     this.product.is_imei = response.data.is_imei;
    //     this.product.imei_number = '';
    //     this.add_product();
    //     this.Calcul_Total();
    //   });
    // },
    //--------------------------------------- Get Elements ------------------------------\\
    // GetElements() {
    //   axios
    //     .get("quotations/create")
    //     .then(response => {
    //       this.clients = response.data.clients;
    //       this.warehouses = response.data.warehouses;
    //       this.isLoading = false;
    //     })
    //     .catch(response => {
    //       setTimeout(() => {
    //         this.isLoading = false;
    //       }, 500);
    //     });
    // }
  },
  //----------------------------- Created function-------------------
  created: function created() {
    // this.GetElements();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=template&id=6ea8fb82&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=template&id=6ea8fb82& ***!
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
      page: _vm.$t("Create OB Report"),
      folder: _vm.$t("All OB Reports")
    }
  }), _vm._v(" "), _vm.isLoading ? _c("div", {
    staticClass: "loading_page spinner spinner-primary mr-3"
  }) : _vm._e(), _vm._v(" "), !_vm.isLoading ? _c("validation-observer", {
    ref: "create_quote"
  }, [_c("b-form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.Submit_Quotation.apply(null, arguments);
      }
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      lg: "12",
      md: "12",
      sm: "12"
    }
  }, [_c("b-card", [_c("b-row", [_c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "date",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("date") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "date-feedback",
            type: "date"
          },
          model: {
            value: _vm.quote.date,
            callback: function callback($$v) {
              _vm.$set(_vm.quote, "date", $$v);
            },
            expression: "quote.date"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "OrderTax-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 360094787)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "client_name",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Client Name") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Name-feedback",
            type: "text",
            placeholder: _vm.$t("Enter_Name_Client")
          },
          model: {
            value: _vm.quote.client_name,
            callback: function callback($$v) {
              _vm.$set(_vm.quote, "client_name", $$v);
            },
            expression: "quote.client_name"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Name-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 965087184)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "subject",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Occurence Subject") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Name-feedback",
            type: "text",
            placeholder: _vm.$t("Enter Occurence subject")
          },
          model: {
            value: _vm.quote.subject,
            callback: function callback($$v) {
              _vm.$set(_vm.quote, "subject", $$v);
            },
            expression: "quote.subject"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Name-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 847123341)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "reporter_name",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Reporter Name") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Name-feedback",
            type: "text",
            placeholder: _vm.$t("Enter_Name_Reporter")
          },
          model: {
            value: _vm.quote.reporter_name,
            callback: function callback($$v) {
              _vm.$set(_vm.quote, "reporter_name", $$v);
            },
            expression: "quote.reporter_name"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Name-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 554142192)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "Phone",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Reporter Phone Number") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Phone-feedback",
            label: "Phone",
            placeholder: _vm.$t("Phone Number")
          },
          model: {
            value: _vm.quote.phone,
            callback: function callback($$v) {
              _vm.$set(_vm.quote, "phone", $$v);
            },
            expression: "quote.phone"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Phone-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 1787585251)
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-3",
    attrs: {
      lg: "4",
      md: "4",
      sm: "12"
    }
  }, [_c("validation-provider", {
    attrs: {
      name: "reporter_id",
      rules: {
        required: true
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(validationContext) {
        return [_c("b-form-group", {
          attrs: {
            label: _vm.$t("Reporter ID") + " " + "*"
          }
        }, [_c("b-form-input", {
          attrs: {
            state: _vm.getValidationState(validationContext),
            "aria-describedby": "Phone-feedback",
            label: "Reporter ID",
            placeholder: _vm.$t("Reporter ID")
          },
          model: {
            value: _vm.quote.reporter_id,
            callback: function callback($$v) {
              _vm.$set(_vm.quote, "reporter_id", $$v);
            },
            expression: "quote.reporter_id"
          }
        }), _vm._v(" "), _c("b-form-invalid-feedback", {
          attrs: {
            id: "Phone-feedback"
          }
        }, [_vm._v(_vm._s(validationContext.errors[0]))])], 1)];
      }
    }], null, false, 1567720997)
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: _vm.$t("Occurence Details")
    }
  }, [_c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.quote.notes,
      expression: "quote.notes"
    }],
    staticClass: "form-control",
    attrs: {
      rows: "4",
      placeholder: _vm.$t("Afewwords")
    },
    domProps: {
      value: _vm.quote.notes
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.quote, "notes", $event.target.value);
      }
    }
  })])], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      md: "12"
    }
  }, [_c("b-form-group", [_c("b-button", {
    attrs: {
      variant: "primary",
      disabled: _vm.SubmitProcessing
    },
    on: {
      click: _vm.Submit_Quotation
    }
  }, [_vm._v(_vm._s(_vm.$t("submit")))]), _vm._v(" "), _vm.SubmitProcessing ? _vm._m(0) : _vm._e()], 1)], 1)], 1)], 1)], 1)], 1)], 1)], 1) : _vm._e()], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "typo__p"
  }, [_c("div", {
    staticClass: "spinner sm spinner-primary mt-3"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/src/views/app/pages/obreport/create_obreport.vue":
/*!********************************************************************!*\
  !*** ./resources/src/views/app/pages/obreport/create_obreport.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _create_obreport_vue_vue_type_template_id_6ea8fb82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create_obreport.vue?vue&type=template&id=6ea8fb82& */ "./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=template&id=6ea8fb82&");
/* harmony import */ var _create_obreport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create_obreport.vue?vue&type=script&lang=js& */ "./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _create_obreport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_obreport_vue_vue_type_template_id_6ea8fb82___WEBPACK_IMPORTED_MODULE_0__.render,
  _create_obreport_vue_vue_type_template_id_6ea8fb82___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/obreport/create_obreport.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_obreport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_obreport.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_obreport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=template&id=6ea8fb82&":
/*!***************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=template&id=6ea8fb82& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_obreport_vue_vue_type_template_id_6ea8fb82___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_obreport_vue_vue_type_template_id_6ea8fb82___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_create_obreport_vue_vue_type_template_id_6ea8fb82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_obreport.vue?vue&type=template&id=6ea8fb82& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/obreport/create_obreport.vue?vue&type=template&id=6ea8fb82&");


/***/ })

}]);