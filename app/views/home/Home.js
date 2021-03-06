import Vue from 'vue';
import _ from 'lodash';
import {TweenMax} from "gsap";

export default Vue.extend({
    name: 'Home',
    data: function () {
        return {
            isMobile: false,
            isTablet: false,
            isDesktop: false
        };
    },
    computed: {
        count() {
            return this.$store.state.breakpoints
        }
    },

    created() {
    },

    mounted() {
        console.log('home_view::init', this.$store.state.breakpoints.isDesktop );
    },

    beforeDestroy() {
    },

    methods: {
        // count(val) {
        //     console.log(val);
        // }
    }
});
