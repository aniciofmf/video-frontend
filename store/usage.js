export const state = () => ({
    usage: 0
});

export const mutations = {
    SET_USAGE (state, usage) {
        state.usage = usage;
    },
    INCREMENT_USAGE(state, filesize) {
        state.usage = state.usage + filesize;
    },
    DECREMENT_USAGE(state, filesize) {
        state.usage = state.usage - filesize;
    }
};

export const getters = {
    usage(state) {
        return state.usage;
    }
};

export const actions = {
    async getUsage({commit}) {
        const response = await this.$axios.$get('/api/user/usage');
        commit('SET_USAGE', response.data.usage);
    }
};