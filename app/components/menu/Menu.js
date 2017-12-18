import Vue from 'vue';
import _ from 'lodash';
// import {breakpointController, BREAKPOINT_UPDATED} from '../../utils/controllers/BreakpointController.js';
import { TweenMax } from 'gsap'


export default Vue.component('MenuView',{
    name: 'MenuView',
    data: function() {
        return {
            isMobile: false,
            isTablet: false,
            isDesktop: false,
            isInit: false
        };
    },
    watch: {
        $route: 'routechanged'
    },

    created(){
        // breakpointController.addEventListener(BREAKPOINT_UPDATED,this.breakpointUpdated);
    },

    mounted(){
        console.log('menu_component::init')
    },

    beforeDestroy() {
        // breakpointController.removeEventListener(BREAKPOINT_UPDATED,this.breakpointUpdated);
    },
    methods: {
        routechanged() {
            console.log('route changed!');
        },

        breakpointUpdated: function(breakpoint) {
            this.isMobile = breakpoint.indexOf('mobile') !== -1 ? true : false ;
            this.isTablet = breakpoint.indexOf('tablet') !== -1 ? true : false ;
            this.isDesktop = ( !this.isMobile && !this.isTablet) ? true : false;
        }
    }
});
