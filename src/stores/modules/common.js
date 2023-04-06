const data = {
    ssid: '',
    dataDictionary: [],
};

export default {
    namespaced: true,
    state: data,
    mutations: {
        update(state, { key, value, rootState, modules }) {
            rootState[modules][key] = value;
        },

        init(state) {
            for (let i in data) {
                state[i] = data[i];
            }
        }
    },
    actions: {
        setData({ commit, rootState }, object) {
            object = { ...object, ...{ rootState } };
            commit('update', object);
        },

        loop({ dispatch }, array) {
            array.forEach(item => {
                dispatch('setData', item);
            });
        }
    }
};
