<template>
  <div class="main-content">
    <breadcumb :page="$t('Detail OBReport')" :folder="$t('ListOBReport')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <b-card v-if="!isLoading">
      <b-row>
        <b-col md="12" class="mb-5">
          <!-- <router-link
            v-if="currentUserPermissions && currentUserPermissions.includes('Quotations_edit')"
            title="Edit"
            class="btn-sm btn btn-success ripple btn-icon m-1"
            :to="{ name:'edit_quotation', params: { id: $route.params.id } }"
          >
            <i class="i-Edit"></i>
            <span>{{$t('EditQuote')}}</span>
          </router-link> -->
          <!-- <router-link
            v-if="quote.statut && currentUserPermissions && currentUserPermissions.includes('Quotations_edit')"
            title="Create"
            class="btn-sm btn btn-primary ripple btn-icon m-1"
            :to="{ name:'change_to_sale', params: { id:$route.params.id } }"
          >
            <i class="i-Add"></i>
            <span>{{$t('CreateSale')}}</span>
          </router-link> -->
          <!-- <button @click="Quote_Email()" class="btn-sm btn btn-info ripple btn-icon m-1">
            <i class="i-Envelope-2"></i>
            {{$t('Email')}}
          </button>
          <button @click="Quote_SMS()" class="btn btn-secondary btn-icon ripple btn-sm">
            <i class="i-Speach-Bubble"></i>
            SMS
          </button> -->
          <button @click="Quote_PDF()" class="btn-sm btn btn-light ripple btn-icon m-1">
            <i class="i-File-TXT"></i> PDF
          </button>
          <button @click="print()" class="btn-sm btn btn-warning ripple btn-icon m-1">
            <i class="i-Billing"></i>
            {{$t('print')}}
          </button>
          <!-- <button
            v-if="currentUserPermissions && currentUserPermissions.includes('Quotations_delete')"
            @click="Remove_Quote()"
            class="btn btn-danger btn-icon icon-left btn-sm m-1"
          >
            <i class="i-Close-Window"></i>
            {{$t('Del')}}
          </button> -->
        </b-col>
      </b-row>
      <div class="invoice" id="print_Invoice">
        <div class="invoice-print">
          <b-row class="justify-content-md-center">
            <h4 class="font-weight-bold">{{$t('Detail OBReport')}} : {{quote.Ref}}</h4>
          </b-row>
          <hr>
          <b-row class="mt-5">
            <b-col md="4" class="mb-4">
              <h5 class="font-weight-bold">{{$t('Client Info')}}</h5>
              <div>{{$t('Client Name')}} : {{quote.client_name}}</div>
              <div>{{$t('Reported Branch')}} : {{quote.branch}}</div>
            </b-col>
            <b-col md="4" class="mb-4">
              <h5 class="font-weight-bold">{{$t('Report Info')}}</h5>
              <div>{{$t('Reference No.')}} : {{quote.Ref}}</div>
              <div>{{$t('Occurence Subject')}} : {{quote.subject}}</div>
              <div>{{$t('(Client) Personel Involved')}} : {{quote.client_personel}}</div>
              <div>{{$t('(Inovet) Personel Involved')}} : {{quote.personel}}</div>
              <div>{{$t('Escalated To')}} : {{quote.escalate}}</div>
            </b-col>
            <b-col md="4" class="mb-4">
              <h5 class="font-weight-bold">{{$t('Reporter Info')}}</h5>
              <div>{{$t('Reporter Name')}} : {{quote.reporter_name}}</div>
              <div>{{$t('Reporter ID')}} : {{quote.reporter_id}}</div>
              <div>{{$t('Reporter Cell No')}} : {{quote.phone}}</div>
              <div>{{$t('date')}} : {{quote.date}}</div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
          </b-row>

           <hr v-show="quote.note">
          <b-row class="mt-4">
            <h5 class="font-weight-bold" md="12">{{$t('Occurence Details')}}</h5>
           <b-col md="12">
             <p>{{quote.note}}</p>
           </b-col>
        </b-row>
        </div>
      </div>
    </b-card>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";

export default {
  computed: mapGetters(["currentUserPermissions", "currentUser"]),
  metaInfo: {
    title: "Detail OBReport"
  },

  data() {
    return {
      isLoading: true,
      quote: {},
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
    print() {
       this.$htmlToPaper('print_Invoice');
    },

    //----------------------------------- Print Quotation -------------------------\\
    Quote_PDF() {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      let id = this.$route.params.id;

       axios
        .get(`quote_pdf/${id}`, {
          responseType: "blob", // important
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "OBReport" + this.quote.Ref + ".pdf");
          document.body.appendChild(link);
          link.click();
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
        })
        .catch(() => {
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
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
    Get_Details() {
      let id = this.$route.params.id;
      axios
        .get(`obreports/${id}`)
        .then(response => {
          this.quote = response.data.quote;
        //   this.details = response.data.details;
          this.company = response.data.company;
          this.isLoading = false;
        })
        .catch(response => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

      //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    //------------------------------------ Form Send Quotation in Email -------------------------\\
    Quote_Email() {
      this.email.to = this.quote.client_email;
      this.email.Quote_Ref = this.quote.Ref;
      this.email.client_name = this.quote.client_name;
      this.SendEmail();
    },
    SendEmail() {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      let id = this.$route.params.id;
      axios
        .post("quotations_send_email", {
          id: id,
          to: this.email.to,
          client_name: this.email.client_name,
          Ref: this.email.Quote_Ref
        })
        .then(response => {
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
          this.makeToast(
            "success",
            this.$t("Send.TitleEmail"),
            this.$t("Success")
          );
        })
        .catch(error => {
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
          this.makeToast("danger", this.$t("SMTPIncorrect"), this.$t("Failed"));
        });
    },

    //---------SMS notification

     Quote_SMS() {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      let id = this.$route.params.id;
      axios
        .post("quotations_send_sms", {
          id: id,
        })
        .then(response => {
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
          this.makeToast(
            "success",
            this.$t("Send_SMS"),
            this.$t("Success")
          );
        })
        .catch(error => {
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
          this.makeToast("danger", this.$t("sms_config_invalid"), this.$t("Failed"));
        });
    },

    //-------------------------------------------- Delete Quotation -------------------------\\
    Remove_Quote() {
      let id = this.$route.params.id;
      this.$swal({
        title: this.$t("Delete.Title"),
        text: this.$t("Delete.Text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("Delete.cancelButtonText"),
        confirmButtonText: this.$t("Delete.confirmButtonText")
      }).then(result => {
        if (result.value) {
          axios
            .delete("quotations/" + id)
            .then(() => {
              this.$swal(
                this.$t("Delete.Deleted"),
                this.$t("Delete.QuoteDeleted"),
                "success"
              );
              this.$router.push({ name: "index_obreport" });
            })
            .catch(() => {
              this.$swal(
                this.$t("Delete.Failed"),
                this.$t("Delete.Therewassomethingwronge"),
                "warning"
              );
            });
        }
      });
    }
  }, //end Methods

  //----------------------------- Created function-------------------

  created: function() {
    this.Get_Details();
  }
};
</script>
