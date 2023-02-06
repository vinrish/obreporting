<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
      ref="myData"
      class="sidebar-left rtl-ps-none ps scroll"
    >
      <div>
        <ul class="navigation-left">
            <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'obreport' }"
            class="nav-item"
            data-item="obreport"
            :data-submenu="true"
          >
            <router-link tag="a" class="nav-item-hold" to="/app/obreport">
              <i class="nav-icon i-Library"></i>
              <span class="nav-text">{{ $t("OB Reports") }}</span>
            </router-link>
          </li>

          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('Customers_view')
                        ||currentUserPermissions.includes('Suppliers_view')
                        ||currentUserPermissions.includes('users_view'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'People' }"
            class="nav-item"
            data-item="People"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Business-Mens"></i>
              <span class="nav-text">{{$t('People')}}</span>
            </a>
            <div class="triangle"></div>
          </li>

          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('setting_system')
                        || currentUserPermissions.includes('sms_settings')
                        || currentUserPermissions.includes('pos_settings')
                        || currentUserPermissions.includes('payment_gateway')
                        || currentUserPermissions.includes('mail_settings')
                        || currentUserPermissions.includes('warehouse')
                        || currentUserPermissions.includes('backup')
                        || currentUserPermissions.includes('currency')
                        || currentUserPermissions.includes('permissions_view'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'settings' }"
            class="nav-item"
            data-item="settings"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="nav-text">{{$t('Settings')}}</span>
            </a>
            <div class="triangle"></div>
          </li>

        </ul>
      </div>
    </vue-perfect-scrollbar>

    <vue-perfect-scrollbar
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      class="sidebar-left-secondary ps rtl-ps-none"
    >
      <div ref="sidebarChild">

        <ul
          class="childNav d-none"
          data-parent="obreport"
          :class="{ 'd-block': selectedParentMenu == 'obreport' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Quotations_add')"
          >
            <router-link tag="a" class to="/app/obreport/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">{{$t('Add Report')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Quotations_view')"
          >
            <router-link tag="a" class to="/app/obreport/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('List OB Reports')}}</span>
            </router-link>
          </li>
        </ul>

         <!-- People -->
        <ul
          class="childNav d-none"
          data-parent="People"
          :class="{ 'd-block': selectedParentMenu == 'People' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Customers_view')"
          >
            <router-link tag="a" class to="/app/People/Customers">
              <i class="nav-icon i-Administrator"></i>
              <span class="item-name">{{$t('Customers')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Suppliers_view')"
          >
            <router-link tag="a" class to="/app/People/Suppliers">
              <i class="nav-icon i-Administrator"></i>
              <span class="item-name">{{$t('Suppliers')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('users_view')"
          >
            <router-link tag="a" class to="/app/People/Users">
              <i class="nav-icon i-Administrator"></i>
              <span class="item-name">{{$t('Users')}}</span>
            </router-link>
          </li>
        </ul>

        <ul
          class="childNav d-none"
          data-parent="settings"
          :class="{ 'd-block': selectedParentMenu == 'settings' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('setting_system')"
          >
            <router-link tag="a" class to="/app/settings/System_settings">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="item-name">{{$t('SystemSettings')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('sms_settings')"
          >
            <router-link tag="a" class to="/app/settings/sms_settings">
              <i class="nav-icon i-Speach-Bubble"></i>
              <span class="item-name">{{$t('sms_settings')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('pos_settings')"
          >
            <router-link tag="a" class to="/app/settings/pos_settings">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="item-name">{{$t('pos_settings')}}</span>
            </router-link>
          </li>

            <!-- <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('setting_system')"
          >
            <router-link tag="a" class to="/app/settings/update_settings">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="item-name">{{$t('update_settings')}}</span>
            </router-link>
          </li> -->

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('payment_gateway')"
          >
            <router-link tag="a" class to="/app/settings/payment_gateway">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="item-name">{{$t('payment_gateway')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('mail_settings')"
          >
            <router-link tag="a" class to="/app/settings/mail_settings">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="item-name">{{$t('mail_settings')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('permissions_view')"
          >
            <router-link tag="a" class to="/app/settings/permissions">
              <i class="nav-icon i-Key"></i>
              <span class="item-name">{{$t('GroupPermissions')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('warehouse')"
          >
            <router-link tag="a" class to="/app/settings/Warehouses">
              <i class="nav-icon i-Clothing-Store"></i>
              <span class="item-name">{{$t('Warehouses')}}</span>
            </router-link>
          </li>
          <!-- <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('currency')"
          >
            <router-link tag="a" class to="/app/settings/Currencies">
              <i class="nav-icon i-Dollar-Sign"></i>
              <span class="item-name">{{$t('Currencies')}}</span>
            </router-link>
          </li> -->

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('backup')"
          >
            <router-link tag="a" class to="/app/settings/Backup">
              <i class="nav-icon i-Data-Backup"></i>
              <span class="item-name">{{$t('Backup')}}</span>
            </router-link>
          </li>

        </ul>

      </div>
    </vue-perfect-scrollbar>
    <div
      @click="removeOverlay()"
      class="sidebar-overlay"
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
    ></div>
  </div>
  <!--=============== Left side End ================-->
</template>

<script>
import Topnav from "./TopNav";
import { isMobile } from "mobile-device-detect";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Topnav
  },

  data() {
    return {
      isDisplay: true,
      isMenuOver: false,
      isStyle: true,
      selectedParentMenu: "",
      isMobile
    };
  },
  mounted() {
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
  },

  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
    window.removeEventListener("resize", this.handleWindowResize);
  },

  computed: {
    ...mapGetters(["getSideBarToggleProperties", "currentUserPermissions"])
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSecondarySidebarPropertiesViaMenuItem",
      "changeSecondarySidebarPropertiesViaOverlay",
      "changeSidebarProperties"
    ]),

    handleWindowResize() {
      if (window.innerWidth <= 1200) {
        if (this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
        if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
          this.changeSecondarySidebarProperties();
        }
      } else {
        if (!this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
      }
    },
    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter(x => x !== "")[1];
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "obreport";
      }
    },
    toggleSubMenu(e) {
      let hasSubmenu = e.target.dataset.submenu;
      let parent = e.target.dataset.item;

      if (hasSubmenu) {
        this.selectedParentMenu = parent;

        this.changeSecondarySidebarPropertiesViaMenuItem(true);
      } else {
        this.selectedParentMenu = parent;
        this.changeSecondarySidebarPropertiesViaMenuItem(false);
      }
    },

    removeOverlay() {
      this.changeSecondarySidebarPropertiesViaOverlay();
      if (window.innerWidth <= 1200) {
        this.changeSidebarProperties();
      }
      this.toggleSelectedParentMenu();
    },
    returnSelectedParentMenu() {
      if (!this.isMenuOver) {
        this.toggleSelectedParentMenu();
      }
    },

    toggleSidebarDropdwon(event) {
      let dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");

      event.currentTarget.classList.toggle("open");

      dropdownMenus.forEach(dropdown => {
        dropdown.classList.remove("open");
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>

