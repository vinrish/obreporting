<template>
    <div class="auth-layout-wrap">
      <div class="auth-content">
        <div class="card o-hidden">
          <div class="row">
            <div class="col-md-12">
              <div class="p-4">
                <h1 class="mb-3 text-18">{{$t('Sign Up')}}</h1>
                <validation-observer ref="submit_login">
                  <b-form @submit.prevent="Submit_Login">
                    <validation-provider
                        name="Firstname"
                        :rules="{ required: true , min:3 , max:30}"
                        v-slot="validationContext"
                    >
                      <b-form-group :label="$t('Firstname') + ' ' + '*'" class="text-12">
                        <b-form-input
                          :state="getValidationState(validationContext)"
                          class="form-control"
                          aria-describedby="Firstname-feedback"
                        label="Firstname"
                        v-model="user.firstname"
                        :placeholder="$t('Firstname')"
                        firstname
                        ></b-form-input>
                        <b-form-invalid-feedback id="Firstname-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>

                    <validation-provider
                        name="lastname"
                        :rules="{ required: true , min:3 , max:30}"
                        v-slot="validationContext"
                    >
                      <b-form-group :label="$t('lastname') + ' ' + '*'" class="text-12">
                        <b-form-input
                          :state="getValidationState(validationContext)"
                          class="form-control"
                          aria-describedby="lastname-feedback"
                        label="lastname"
                        v-model="user.lastname"
                        :placeholder="$t('lastname')"
                        lastname
                        ></b-form-input>
                        <b-form-invalid-feedback id="lastname-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>

                    <validation-provider
                        name="username"
                        :rules="{ required: true , min:3 , max:30}"
                        v-slot="validationContext"
                    >
                      <b-form-group :label="$t('username') + ' ' + '*'" class="text-12">
                        <b-form-input
                          :state="getValidationState(validationContext)"
                          class="form-control"
                          aria-describedby="username-feedback"
                        label="username"
                        v-model="user.username"
                        :placeholder="$t('username')"
                        username
                        ></b-form-input>
                        <b-form-invalid-feedback id="username-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>

                    <validation-provider
                        name="Phone"
                        :rules="{ required: true}"
                        v-slot="validationContext"
                    >
                      <b-form-group :label="$t('Phone') + ' ' + '*'" class="text-12">
                        <b-form-input
                          :state="getValidationState(validationContext)"
                          class="form-control"
                          aria-describedby="Phone-feedback"
                        label="Phone"
                        v-model="user.phone"
                        :placeholder="$t('Phone')"
                        phone
                        ></b-form-input>
                        <b-form-invalid-feedback id="Phone-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>

                    <validation-provider
                    name="Email Address"
                    :rules="{ required: true}"
                    v-slot="validationContext"
                  >
                    <b-form-group :label="$t('Email_Address')" class="text-12">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        aria-describedby="Email-feedback"
                        class="form-control"
                        v-model="user.email"
                        email
                      ></b-form-input>
                      <b-form-invalid-feedback id="Email-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="email_exist !=''"
                       >{{email_exist}}</b-alert>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    name="role"
                    :rules="{ required: true}"
                  >
                    <b-form-group slot-scope="{ valid, errors }" :label="$t('RoleName') + ' ' + '*'">
                        <b-form-select
                        :class="{'is-invalid': !!errors.length}"
                        :state="errors[0] "
                        v-model="user.role_id"
                        :reduce="label => label.value"
                        :placeholder="$t('Choose_Method')"
                        :options="options"
                      />
                    <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                  </validation-provider>

                    <validation-provider
                      name="Password"
                      :rules="{ required: true}"
                      v-slot="validationContext"
                    >
                      <b-form-group :label="$t('password')" class="text-12">
                        <b-form-input
                          :state="getValidationState(validationContext)"
                          aria-describedby="Password-feedback"
                          class="form-control"
                          type="password"
                          v-model="user.password"
                        ></b-form-input>
                        <b-form-invalid-feedback
                          id="Password-feedback"
                        >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>

                    <b-button
                      type="submit"
                      tag="button"
                      class="btn-rounded btn-block mt-2"
                      variant="primary mt-2"
                      :disabled="loading"
                    >{{$t('Sign Up')}}</b-button>
                    <div v-once class="typo__p" v-if="loading">
                      <div class="spinner sm spinner-primary mt-3"></div>
                    </div>
                  </b-form>
                </validation-observer>
              </div>
              <b-button
                type="button"
                tag="button"
                class="btn-block mt-2"
                variant="primary mt-2"
                onclick="location.href='/login'"
          >{{$t('Already Registered? Sign In')}}
          </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { mapGetters, mapActions } from "vuex";
  import NProgress from "nprogress";

  export default {
    metaInfo: {
      title: "SignUp"
    },
    data() {
      return {
        isLoading: true,
        SubmitProcessing:false,
        email_exist:"",
        data: new FormData(),
        options: [
          {value: 2, text: 'STAFF'},
          {value: 3, text: 'CUSTOMER'}
        ],
        user:{
            firstname: "",
            lastname: "",
            username: "",
            phone: "",
            email: "",
            password: "",
            role_id: 2,
        }
      };
    },
    computed: {
      ...mapGetters(["isAuthenticated", "error"])
    },

    methods: {
      //------------- Submit Form login
      Submit_Login() {
        this.$refs.submit_login.validate().then(success => {
          if (!success) {
            this.makeToast(
              "danger",
              this.$t("Please_fill_the_form_correctly"),
              this.$t("Failed")
            );
          } else {
            this.Login();
          }
        });
      },

      getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
      },

    //   Get_Roles(page) {
    //   // Start the progress bar.
    //   NProgress.start();
    //   NProgress.set(0.1);
    // //   this.setToStrings();
    //   axios
    //     .get("roles")
    //     .then(response => {
    //     //   this.users = response.data.users;
    //       this.roles = response.data.roles;
    //     //   this.warehouses = response.data.warehouses;
    //       this.totalRows = response.data.totalRows;

    //       // Complete the animation of theprogress bar.
    //       NProgress.done();
    //       this.isLoading = false;
    //     })
    //     .catch(response => {
    //       // Complete the animation of theprogress bar.
    //       NProgress.done();
    //       setTimeout(() => {
    //         this.isLoading = false;
    //       }, 500);
    //     });
    // },

      Login() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      this.SubmitProcessing = true;
      this.data.append("firstname", this.user.firstname);
      this.data.append("lastname", this.user.lastname);
      this.data.append("username", this.user.username);
      this.data.append("email", this.user.email);
      this.data.append("password", this.user.password);
      this.data.append("phone", this.user.phone);
      this.data.append("role", this.user.role_id);
    //   self.data.append("is_all_warehouses", self.user.is_all_warehouses);
    //   self.data.append("avatar", self.user.avatar);

      // append array assigned_warehouses
    //   if (self.assigned_warehouses.length) {
    //     for (var i = 0; i < self.assigned_warehouses.length; i++) {
    //       self.data.append("assigned_to[" + i + "]", self.assigned_warehouses[i]);
    //     }
    //   }else{
    //     self.data.append("assigned_to", []);
    //   }

      axios
        .post("/register", self.data)
        .then(response => {
          self.SubmitProcessing = false;
          NProgress.done();
        //   Fire.$emit("Event_User");

          this.makeToast(
            "success",
            this.$t("Create.TitleUser"),
            this.$t("Success")
          );

        //   this.$router.push({
            window.location.href='/login';
        //   });
        })
        .catch(error => {
          self.SubmitProcessing = false;
          NProgress.done();
          if (error.errors.email.length > 0) {
            self.email_exist = error.errors.email[0];
          }
          this.makeToast("danger", this.$t("InvalidData"), this.$t("Failed"));
        });
    },

      //------ Toast
      makeToast(variant, msg, title) {
        this.$root.$bvToast.toast(msg, {
          title: title,
          variant: variant,
          solid: true
        });
      }
    },
}
  </script>
