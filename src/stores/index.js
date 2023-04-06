import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: false,

    plugins: [
        persistedState({
            key: 'manual-segmentation',
            reducer(state) {
                return {
                    common: state.common
                };
            }
        })
    ],

    modules: {
        common
    }
});

export default store;
