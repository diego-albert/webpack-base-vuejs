import _ from 'lodash';
import { breakpointController, BREAKPOINT_UPDATED } from '../utils/controllers/BreakpointController.js';
import MenuView from '../components/menu/index.vue';

export default {
  name: 'App',
  components: {
    MenuView
  },
  data() {
    return {}
  },
  beforeMount: function(){
    
  },
  mounted: function(){

    _.delay(()=>{
      breakpointController._updateBreakpoint();
    },50);
      


  },
  methods: {
    
  }
}