// Vuex global storage

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 1,
        breakpoints : {
            isMobile: false,
            isTablet: false,
            isDesktop: false
        }        
    },
    mutations: {
        increment: (state) => { 
            state.count++ 
        },
        reset: (state) => {
            state.count = 1 
        },
        updateBreakpoints: (state, breakpoint) => {
            state.breakpoints.isMobile = breakpoint.indexOf('mobile') !== -1 ? true : false;
            state.breakpoints.isTablet = breakpoint.indexOf('tablet') !== -1 ? true : false;
            state.breakpoints.isDesktop = (!state.breakpoints.isMobile && !state.breakpoints.isTablet) ? true : false;
        }
     }
})
