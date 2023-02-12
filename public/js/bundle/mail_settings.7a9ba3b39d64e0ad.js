"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[855],{14638:(e,r,t)=>{t.r(r),t.d(r,{default:()=>u});var a=t(20629),s=t(74865),n=t.n(s);function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){d(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function d(e,r,t){return(r=function(e){var r=function(e,r){if("object"!==i(e)||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var a=t.call(e,r||"default");if("object"!==i(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string");return"symbol"===i(r)?r:String(r)}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}const c={metaInfo:{title:"Mail Settings"},data:function(){return{isLoading:!0,server:{host:"",port:"",username:"",password:"",encryption:"",sender_name:"",mail_mailer:""}}},methods:l(l({},(0,a.nv)(["refreshUserPermissions"])),{},{Submit_config_mail:function(){var e=this;this.$refs.form_config_mail.validate().then((function(r){r?e.Update_config_mail():e.makeToast("danger",e.$t("Please_fill_the_form_correctly"),e.$t("Failed"))}))},makeToast:function(e,r,t){this.$root.$bvToast.toast(r,{title:t,variant:e,solid:!0})},getValidationState:function(e){var r=e.dirty,t=e.validated,a=e.valid;return r||t?void 0===a?null:a:null},Update_config_mail:function(){var e=this;n().start(),n().set(.1),axios.put("update_config_mail/"+this.server.id,{mail_mailer:this.server.mail_mailer,host:this.server.host,port:this.server.port,sender_name:this.server.sender_name,username:this.server.username,password:this.server.password,encryption:this.server.encryption}).then((function(r){Fire.$emit("Event_Smtp"),e.makeToast("success",e.$t("Successfully_Updated"),e.$t("Success")),n().done()})).catch((function(r){n().done(),e.makeToast("danger",e.$t("InvalidData"),e.$t("Failed"))}))},get_config_mail:function(){var e=this;axios.get("get_config_mail").then((function(r){e.server=r.data.server,e.isLoading=!1})).catch((function(r){e.isLoading=!1}))}}),created:function(){var e=this;this.get_config_mail(),Fire.$on("Event_Smtp",(function(){e.get_config_mail()}))}};const u=(0,t(51900).Z)(c,(function(){var e=this,r=e._self._c;return r("div",{staticClass:"main-content"},[r("breadcumb",{attrs:{page:e.$t("mail_settings"),folder:e.$t("Settings")}}),e._v(" "),e.isLoading?r("div",{staticClass:"loading_page spinner spinner-primary mr-3"}):e._e(),e._v(" "),e.isLoading?e._e():r("validation-observer",{ref:"form_config_mail"},[r("b-form",{on:{submit:function(r){return r.preventDefault(),e.Submit_config_mail.apply(null,arguments)}}},[r("b-row",{staticClass:"mt-5"},[r("b-col",{attrs:{lg:"12",md:"12",sm:"12"}},[r("b-card",{attrs:{"no-body":"",header:e.$t("mail_settings")}},[r("b-card-body",[r("b-row",[r("b-col",{attrs:{lg:"4",md:"4",sm:"12"}},[r("validation-provider",{attrs:{name:"MAIL_MAILER",rules:{required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){return[r("b-form-group",{attrs:{label:"MAIL_MAILER *"}},[r("b-form-input",{attrs:{state:e.getValidationState(t),"aria-describedby":"MAIL_MAILER-feedback",label:"MAIL_MAILER",placeholder:"MAIL_MAILER"},model:{value:e.server.mail_mailer,callback:function(r){e.$set(e.server,"mail_mailer",r)},expression:"server.mail_mailer"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"MAIL_MAILER-feedback"}},[e._v(e._s(t.errors[0]))])],1),e._v(" "),r("p",{staticClass:"text-danger"},[e._v('Supported: "smtp", "sendmail", "mailgun", "ses","postmark", "log"')])]}}],null,!1,182575745)})],1),e._v(" "),r("b-col",{attrs:{lg:"4",md:"4",sm:"12"}},[r("validation-provider",{attrs:{name:"HOST",rules:{required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){return[r("b-form-group",{attrs:{label:"MAIL_HOST *"}},[r("b-form-input",{attrs:{state:e.getValidationState(t),"aria-describedby":"HOST-feedback",label:"HOST",placeholder:"MAIL_HOST"},model:{value:e.server.host,callback:function(r){e.$set(e.server,"host",r)},expression:"server.host"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"HOST-feedback"}},[e._v(e._s(t.errors[0]))])],1)]}}],null,!1,2154685413)})],1),e._v(" "),r("b-col",{attrs:{lg:"4",md:"4",sm:"12"}},[r("validation-provider",{attrs:{name:"PORT",rules:{required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){return[r("b-form-group",{attrs:{label:"MAIL_PORT *"}},[r("b-form-input",{attrs:{state:e.getValidationState(t),"aria-describedby":"PORT-feedback",label:"PORT",placeholder:"MAIL_PORT"},model:{value:e.server.port,callback:function(r){e.$set(e.server,"port",r)},expression:"server.port"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"PORT-feedback"}},[e._v(e._s(t.errors[0]))])],1)]}}],null,!1,2677611045)})],1),e._v(" "),r("b-col",{attrs:{lg:"4",md:"4",sm:"12"}},[r("validation-provider",{attrs:{name:"sender",rules:{required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){return[r("b-form-group",{attrs:{label:"Sender Name *"}},[r("b-form-input",{attrs:{state:e.getValidationState(t),"aria-describedby":"sender-feedback",label:"Sender",placeholder:"Sender Name"},model:{value:e.server.sender_name,callback:function(r){e.$set(e.server,"sender_name",r)},expression:"server.sender_name"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"sender-feedback"}},[e._v(e._s(t.errors[0]))])],1)]}}],null,!1,1175008349)})],1),e._v(" "),r("b-col",{attrs:{lg:"4",md:"4",sm:"12"}},[r("validation-provider",{attrs:{name:"Username",rules:{required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){return[r("b-form-group",{attrs:{label:"MAIL_USERNAME *"}},[r("b-form-input",{attrs:{state:e.getValidationState(t),"aria-describedby":"Username-feedback",label:"Username",placeholder:"MAIL_USERNAME"},model:{value:e.server.username,callback:function(r){e.$set(e.server,"username",r)},expression:"server.username"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"Username-feedback"}},[e._v(e._s(t.errors[0]))])],1)]}}],null,!1,2612387141)})],1),e._v(" "),r("b-col",{attrs:{lg:"4",md:"4",sm:"12"}},[r("validation-provider",{attrs:{name:"Password",rules:{required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){return[r("b-form-group",{attrs:{label:"MAIL_PASSWORD *"}},[r("b-form-input",{attrs:{state:e.getValidationState(t),"aria-describedby":"Password-feedback",label:"Password",placeholder:"MAIL_PASSWORD"},model:{value:e.server.password,callback:function(r){e.$set(e.server,"password",r)},expression:"server.password"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"Password-feedback"}},[e._v(e._s(t.errors[0]))])],1)]}}],null,!1,3181211589)})],1),e._v(" "),r("b-col",{attrs:{lg:"4",md:"4",sm:"12"}},[r("validation-provider",{attrs:{name:"encryption",rules:{required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){return[r("b-form-group",{attrs:{label:"MAIL_ENCRYPTION *"}},[r("b-form-input",{attrs:{state:e.getValidationState(t),"aria-describedby":"encryption-feedback",label:"encryption",placeholder:"MAIL_ENCRYPTION"},model:{value:e.server.encryption,callback:function(r){e.$set(e.server,"encryption",r)},expression:"server.encryption"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{id:"encryption-feedback"}},[e._v(e._s(t.errors[0]))])],1)]}}],null,!1,1149673509)})],1),e._v(" "),r("b-col",{attrs:{md:"12"}},[r("b-form-group",[r("b-button",{attrs:{variant:"primary",type:"submit"}},[e._v(e._s(e.$t("submit")))])],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports}}]);