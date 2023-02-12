<template>
  <div class="main-content">
    <breadcumb :page="$t('Create OB Report')" :folder="$t('All OB Reports')"/>
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <validation-observer ref="create_quote" v-if="!isLoading">
        <b-form @submit.prevent="Submit_Quotation">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            <b-card>
              <b-row>
                 <!-- date  -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                    name="date"
                    :rules="{ required: true}"
                    v-slot="validationContext"
                  >
                    <b-form-group :label="$t('date') + ' ' + '*'">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        aria-describedby="date-feedback"
                        type="date"
                        v-model="quote.date"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="OrderTax-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <!-- Customer -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                  name="client_name"
                  :rules="{ required: true}"
                  v-slot="validationContext">
                    <b-form-group :label="$t('Client Name') + ' ' + '*'">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        aria-describedby="Name-feedback"
                        type="text"
                        :placeholder="$t('Enter_Name_Client')"
                        v-model="quote.client_name"
                      ></b-form-input>
                      <b-form-invalid-feedback
                      id="Name-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Customer -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                  name="branch"
                  :rules="{ required: true}"
                  v-slot="validationContext">
                    <b-form-group :label="$t('Reporting Branch') + ' ' + '*'">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        aria-describedby="Name-feedback"
                        type="text"
                        :placeholder="$t('Enter Branch')"
                        v-model="quote.branch"
                      ></b-form-input>
                      <b-form-invalid-feedback
                      id="Name-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Subject -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                  name="subject"
                  :rules="{ required: true}"
                  v-slot="validationContext">
                    <b-form-group :label="$t('Occurence Subject') + ' ' + '*'">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        aria-describedby="Name-feedback"
                        type="text"
                        :placeholder="$t('Enter Occurence subject')"
                        v-model="quote.subject"
                      ></b-form-input>
                      <b-form-invalid-feedback
                      id="Name-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Customer -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                  name="reporter_name"
                  :rules="{ required: true}"
                  v-slot="validationContext">
                    <b-form-group :label="$t('Reporter Name') + ' ' + '*'">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        aria-describedby="Name-feedback"
                        type="text"
                        :placeholder="$t('Enter_Name_Reporter')"
                        v-model="quote.reporter_name"
                      ></b-form-input>
                      <b-form-invalid-feedback
                      id="Name-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- ID Number -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                  name="reporter_id"
                  :rules="{ required: true}"
                  v-slot="validationContext">
                  <b-form-group :label="$t('Reporter ID') + ' ' + '*'">
                  <b-form-input
                    :state="getValidationState(validationContext)"
                    aria-describedby="Phone-feedback"
                    label="Reporter ID"
                    v-model="quote.reporter_id"
                    :placeholder="$t('Reporter ID')"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Phone-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Phone -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                  name="Phone"
                  :rules="{ required: true}"
                  v-slot="validationContext">
                  <b-form-group :label="$t('Reporter Cell Number') + ' ' + '*'">
                  <b-form-input
                    :state="getValidationState(validationContext)"
                    aria-describedby="Phone-feedback"
                    label="Phone"
                    v-model="quote.phone"
                    :placeholder="$t('Phone Number')"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Phone-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- ID Number -->
                <b-col lg="4" md="4" sm="12" class="mb-3">
                  <validation-provider
                  name="escalate"
                  :rules="{ required: true}"
                  v-slot="validationContext">
                  <b-form-group :label="$t('Escalated To') + ' ' + '*'">
                  <b-form-input
                    :state="getValidationState(validationContext)"
                    aria-describedby="Name-feedback"
                    label="escalate"
                    v-model="quote.escalate"
                    :placeholder="$t('Escalated To')"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Name-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                  </validation-provider>
                </b-col>

                <b-col lg="4" md="4" sm="12" class="mb-3">
                    <h5>Client</h5>
                  <validation-provider
                  name="client_personel"
                  :rules="{ required: true}"
                  v-slot="validationContext">
                  <b-form-group :label="$t('Personel Involved') + ' ' + '*'">
                  <b-form-input
                    :state="getValidationState(validationContext)"
                    aria-describedby="Name-feedback"
                    label="client_personel"
                    v-model="quote.client_personel"
                    :placeholder="$t('Personel Involved')"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Name-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                  </validation-provider>
                </b-col>

                <b-col lg="4" md="4" sm="12" class="mb-3">
                    <h5>Inovet</h5>
                  <validation-provider
                  name="personel"
                  :rules="{ required: true}"
                  v-slot="validationContext">
                  <b-form-group :label="$t('Personel Involved') + ' ' + '*'">
                  <b-form-input
                    :state="getValidationState(validationContext)"
                    aria-describedby="Name-feedback"
                    label="personel"
                    v-model="quote.personel"
                    :placeholder="$t('Personel Involved')"
                  ></b-form-input>
                  <b-form-invalid-feedback id="Name-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                  </validation-provider>
                </b-col>

                <b-col md="12">
                  <b-form-group :label="$t('Occurence Details')">
                    <textarea
                      v-model="quote.notes"
                      rows="4"
                      class="form-control"
                      :placeholder="$t('Afewwords')"
                    ></textarea>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group>
                    <b-button variant="primary" @click="Submit_Quotation" :disabled="SubmitProcessing">{{$t('submit')}}</b-button>
                    <div v-once class="typo__p" v-if="SubmitProcessing">
                      <div class="spinner sm spinner-primary mt-3"></div>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Create OB Report"
  },
  data() {
    return {
      focused: false,
      timer:null,
      isLoading: false,
      SubmitProcessing:false,
      quote: {
        id: "",
        notes: "",
        branch: "",
        escalate: "",
        client_personel: "",
        personel: "",
        date: new Date().toISOString().slice(0, 10),
        client_name: "",
        reporter_name: "",
        reporter_id: "",
        subject: "",
        phone: "",
      },

    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },

  methods: {

     handleFocus() {
      this.focused = true
    },

    handleBlur() {
      this.focused = false
    },


    //--- Submit Validate Create Quotation
    Submit_Quotation() {
      this.$refs.create_quote.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.$t("Please_fill_the_form_correctly"),
            this.$t("Failed")
          );
        } else {
          this.Create_Quotation();
        }
      });
    },

    //---Validate State Fields
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    //--------------------------------- Create Quotation -------------------------\\
    Create_Quotation() {
    //   if (this.verifiedForm()) {
        this.SubmitProcessing = true;
        // Start the progress bar.
        NProgress.start();
        NProgress.set(0.1);
        axios
          .post("obreports", {
            date: this.quote.date,
            client_name: this.quote.client_name,
            branch: this.quote.branch,
            escalate: this.quote.escalate,
            personel: this.quote.personel,
            client_personel: this.quote.client_personel,
            reporter_name: this.quote.reporter_name,
            reporter_id: this.quote.reporter_id,
            phone: this.quote.phone,
            notes: this.quote.notes,
            subject: this.quote.subject,
          })
          .then(response => {
            // Complete the animation of theprogress bar.
            NProgress.done();
            this.makeToast(
              "success",
              this.$t("Create.TitleOBreport"),
              this.$t("Success")
            );

            this.SubmitProcessing = false;
            this.$router.push({ name: "index_obreport" });
          })
          .catch(error => {
            // Complete the animation of theprogress bar.
            NProgress.done();
            this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
            this.SubmitProcessing = false;
          });
    //   }
    },

  },

  //----------------------------- Created function-------------------
  created() {
    // this.GetElements();
  }
};
</script>
