export const state = () => ({
    files: [],
    isFetchingFiles: false
});

export const mutations = {
    SET_FILES(state, files) {
        state.files = files;
    },
    ADD_FILE(state, file) {
        state.files = [file, ...state.files];
    },
    REMOVE_FILE(state, uuid) {
        state.files = state.files.filter(file => file.uuid !== uuid);
    },
    SET_IS_FETCHING_FILES(state, value) {
        state.isFetchingFiles = value;
    },
};

export const getters = {
    files(state) {
        return state.files;
    },
    isFetchingFiles(state) {
        return state.isFetchingFiles;
    }
};

export const actions = {
    async getFiles({ commit }) {
        commit('SET_IS_FETCHING_FILES', true);

        const response = await this.$axios.$get('/api/files');

        commit('SET_FILES', response.data);

        commit('SET_IS_FETCHING_FILES', false);

    },

    async deleteFile({commit}, uuid) {
        await this.$axios.$delete(`/api/files/${uuid}`);

        commit('REMOVE_FILE', uuid);
    }
};