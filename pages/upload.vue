<template>
    <b-container class="mt-5">
        <div v-if="errors.size">
            <b-alert variant="danger" show>
                {{ errors.size[0] }}
            </b-alert>
        </div>
        <div class="mb-4">
            <AppUploader 
                @onprocessfile="storeFile"
                @validation="setValidationErrors"
             />
        </div>
        <div>
            <h4>Tus videos</h4>
            <hr>
            <template v-if="isFetchingFiles">
                <div class="d-flex justify-content-center mb-3 mt-4">
                    <b-spinner variant="primary" style="width: 4rem; height: 4rem;"></b-spinner>
                </div>
            </template>
            <template v-else>
                <b-list-group v-if="files.length">
                    <AppFile v-for="file in files" :key="file.uuid" :file="file"/>
                </b-list-group>   
            </template>    
            <p v-if="!isFetchingFiles && files.length === 0">No tienes ningun video</p>
        </div>
    </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import AppFile from '@/components/Files/AppFile';
import AppUploader from '@/components/Files/AppUploader';

export default {
    head: {
        title: "Subir videos"
    },
    middleware: 'auth',
    data () {
        return {
            errors: {}
        }
    },
    components: {
        AppFile,
        AppUploader
    },
    methods: {
        ...mapActions({
            getFiles: 'files/getFiles'
        }),
        ...mapMutations({
            addFile: 'files/ADD_FILE',
            incrementUsage: 'usage/INCREMENT_USAGE'
        }),
        async storeFile(file) {
            const response = await this.$axios.$post("api/files", {
                name: file.filename,
                size: file.fileSize,
                path: file.serverId
            });

            this.addFile(response.data);
            this.incrementUsage(file.fileSize);
        },
        setValidationErrors(errors) {
            this.errors = errors;
        }
    },
    computed: {
        ...mapGetters({
            files: 'files/files',
            isFetchingFiles: 'files/isFetchingFiles'
        })
    },
    mounted() {
        this.getFiles();
    }
}
</script>