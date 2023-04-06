import Components from './components';

const install = Vue => {
    Components.map(component => {
        Vue.component(component.name, component);
    });
};

export default {
    install
};
