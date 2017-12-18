import "babel-polyfill";

import Vue from 'vue';
import Vuex from 'vuex';
import store from './utils/vuex/store';
import router from './utils/router';
import _ from 'lodash';
import { breakpointController, BREAKPOINT_UPDATED } from './utils/controllers/BreakpointController.js';
import AppComponent from './main/index.vue';

// Add CSS
import './scss/main.scss';

let appStarted = false;
var vueapp; //Vue app reference

// Performance polyfill. Otherwise iOS 8 triggers an error on each render tick
if (!window.performance) {
  window.performance = Date;
}

function startApp() {

  if (appStarted) return;

  appStarted = true;
  breakpointController.startWatching();
  createVue();

}

function createVue() {
  console.log("CREATING VUE APP...");
  vueapp = new Vue({
    el: '#main',
    store,
    router,
    components: {
      appc: AppComponent,
    },
    data() {
      return {

      };
    },
    render: h => h('appc'),
    mounted: function (value) {

      breakpointController.addEventListener(BREAKPOINT_UPDATED, this.breakpointUpdated);
      _.delay(() => {
        breakpointController._updateBreakpoint();
      }, 50);

      // Check if screen has touch events to enable or not hover state on buttons
      if (!this.hasTouch()) {
        document.body.classList.add('hasHover');
      }

    },
    beforeDestroy: function(){
      breakpointController.removeEventListener(BREAKPOINT_UPDATED, this.breakpointUpdated);
    },
    methods: {

      hasTouch: function () {
        return 'ontouchstart' in document.documentElement
          || navigator.maxTouchPoints > 0
          || navigator.msMaxTouchPoints > 0;
      },

      breakpointUpdated: function(breakpoint) {
        // update vuex breakpoints
        store.commit('updateBreakpoints', breakpoint);
      }

    }
  });
}

startApp();