<template>
    <div class="container mt-5">
        <div class="d-flex flex-column align-items-center" v-if="file && !error">
            <h4 class="mb-4">{{  file.name }} - ({{  filesizeFormatted }})</h4>
            <b-button @click.prevent="download" variant="primary">Descargar video</b-button>
        </div>

        <div v-if="error" class="text-center">
            <h5>Lo sentimos, el video no esta disponible</h5>
        </div>
    </div>
</template>

<script>
    import filesize from 'filesize';
export default {
    head: {
        title: "Descargar video"
    },
    data() {
        return {
            uuid: "",
            token: "",
            file: null,
            metadata: null,
            error: false
        }
    },
    computed: {
        filesizeFormatted() {
            return filesize(this.file.size);
        }
    },
    methods: {
        download () {
            const element = document.createElement("a");
            element.href = this.metadata.url;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },

        async getFile () {
            try {
                const response = await this.$axios.$get(`/api/file/${this.uuid}/download?token=${this.token}`);
                this.file = response.data;
                this.metadata = response.metadata;
            } catch(error) {
                this.error = true;
            }
        }

    },
    mounted() {
        this.uuid = this.$route.params.uuid;
        this.token = this.$route.query.token;

        this.getFile();
    }
}
</script>