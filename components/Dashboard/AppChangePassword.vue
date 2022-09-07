<template>
    <div>
        <b-row>
            <b-col class="px-2 mt-4" lg="4" offset-lg="4" md="6" offset-md="3" sm="10" offset-sm="1">
                
                <h5>Cambiar Contraseña</h5><hr />
                <b-form @submit.prevent="changePassword">
                    <b-form-group label="Contraseña actual" label-for="password">
                        <b-form-input  
                        v-model="form.password"                      
                        id="password"
                        type="password"                        
                        :state="!errors.password && null"                     
                        >
                        </b-form-input>
                        <b-form-invalid-feedback v-if="errors.password">{{ errors.password[0] }}</b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Contraseña nueva" label-for="new_password">
                        <b-form-input
                        v-model="form.new_password"
                        id="new_password"
                        type="password"    
                        :state="!errors.new_password && null"                      
                        >
                        </b-form-input>
                        <b-form-invalid-feedback v-if="errors.new_password">{{ errors.new_password[0] }}</b-form-invalid-feedback>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Cambiar Contraseña</b-button>
                </b-form>

                <div class="mt-3">
                    <b-alert variant="success" :show="changedPassword" >La contraseña ha sido cambiada</b-alert>
                </div>

            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                password: "",
                new_password: ""
            },
            errors: {},
            changedPassword: false
        }
    },
    methods: {
        async changePassword() {
            try {
                this.errors = {};
                this.changedPassword = false;
                const response = await this.$axios.$patch('/api/changepassword', this.form);
                this.form.password = "";
                this.form.new_password = "";
                this.changedPassword = true;
            }catch(error) {
                this.errors = error.response.data.errors;
            }
        }
    }
}
</script>