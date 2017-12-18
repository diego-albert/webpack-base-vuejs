import _ from 'lodash';
import EventDispatcher from '../core/EventDispatcher.js';

export const BREAKPOINT_UPDATED = 'breakpoint_updated';

class BreakpointController extends EventDispatcher {

    constructor(){
        super();

        this._DEBOUNCE_DELAY = 200; // ms
        this._timeout = null;
        this._debounce = _.debounce( _.bind( function(){
            this._updateBreakpoint();
        }, this), this._DEBOUNCE_DELAY);

        this.prevBreakpoint = "";
        console.log("BreakpointController :: init");
    }

    startWatching(){
        window.addEventListener('resize', this._debounce );
        this._updateBreakpoint();
    }

    stopWatching(){
        if(this._debounce){
            this._debounce.cancel();
        }
        window.removeEventListener('resize', this._debounce );
    }

    _updateBreakpoint(){
        var breakpoint = this.getBreakpoint();
        if(this.prevBreakpoint !== breakpoint){
            // console.log('BreakpointController :: updateBreakpoint', breakpoint);
            this.dispatchEvent(BREAKPOINT_UPDATED, breakpoint);
        }
    }

    getBreakpoint() {
        var breakpoint = window.getComputedStyle(document.body, ':after').getPropertyValue('content');

        // Remove all quotes
        if(!_.isUndefined(breakpoint) && !_.isNull(breakpoint)){
            breakpoint = breakpoint.replace(/["']/g, "");
        }

        //return breakpoint;
        return breakpoint;
    }
}

export let breakpointController = new BreakpointController();
