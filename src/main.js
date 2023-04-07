import Vue from 'vue';
import router from '@/router/index';
import App from '@/App';
import Moment from 'moment';
import ElementUI from 'element-ui';
import Http from '@/utils/request';
import _ from 'lodash';
import 'xe-utils';
import { VXETable } from 'vxe-table';
import { tableFormats as TableFormats } from '@/utils/tableFormats';
import store from '@/stores';
import tool from '@/utils/tool';
import 'element-ui/lib/theme-chalk/index.css';
import 'vxe-table/lib/index.css';
import '@/assets/style/app.scss';

Vue.http = Vue.prototype.$http = new Http();
Vue.moment = Vue.prototype.$moment = Moment;
Vue._ = Vue.prototype._ = _;
Vue.tool = Vue.prototype.$tool = tool;

Vue.use(ElementUI).use(VXETable);

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV !== 'production';
Vue.config.devtools = true;

VXETable.formats.mixin(TableFormats);
