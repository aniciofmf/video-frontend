<template>
    <div class="container mt-5">
        <h4>Comprar plan ({{ plan }})</h4><hr/>
        <b-row>
            <b-col class="px-2" lg="6" offset-lg="3" md="8" offset-md="2" sm="10" offset-sm="1">
                <template v-if="loadingForm">
                    <div class="d-flex justify-content-center mb-3 mt-4">
                        <b-spinner variant="primary" style="width: 4rem; height: 4rem;"></b-spinner>
                    </div>
                </template>
                <template v-else>
                    <b-alert :show="paymentError" variant="danger">
                        Ha ocurrido un error al procesar el pago, por favor intente nuevamente
                    </b-alert>
                    <b-form @submit.prevent="submit">
                        <b-form-group label="Nombre" label-for="name">
                            <b-form-input
                            v-model="form.name"
                            id="name"
                            type="text"
                            placeholder="e.g. Jonathan"   
                            >
                            </b-form-input>                        
                        </b-form-group>
    
                        <div class="mb-4">
                            <label>Tarjeta de credito:</label>
                            <div id="card" ref="card"></div>
                        </div>

                        <b-button type="submit" variant="primary" :disabled="processingPayment">
                            <template v-if="processingPayment">
                                <b-spinner small type="grow"></b-spinner>
                                Pagando...
                            </template>
                            <template v-else>
                                Pagar
                            </template>
                        </b-button>

                    </b-form>
                </template>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
export default {
    head: {
        title: "Pagar"
    },
    middleware: ['auth'],
    data () {
        return {
            plan: "",
            form: {
                name: ""
            },
            stripe: null,
            cardElement: null,
            intentClientSecret: null,
            loadingForm: true,
            processingPayment: false,
            paymentError: false
        }
    },
    methods: {
        async submit() {
            this.paymentError = false;
            this.processingPayment = true;
            const { setupIntent, error } = await this.stripe.confirmCardSetup(this.intentClientSecret, {
                payment_method: {
                    card: this.cardElement,
                    billing_details: { name: this.form.name }
                }
            });

            if (error) {
                this.processingPayment = false;
                this.paymentError = true;
            } else {
                this.createSubscription(setupIntent.payment_method);
            }
        },

        async createSubscription(token) {
            try {
                const response = await this.$axios.$post('/api/subscriptions', {
                    plan: this.plan,
                    token
                })

                this.$auth.fetchUser();
                this.$router.replace({ 'name': 'dashboard' });
            } catch(error) {
                this.processingPayment = false;
                this.paymentError = true;
            }   
        }
    },
    async mounted() {
        this.plan = this.$route.query.plan;
        const stripeKey = this.$config.stripeKey;

        try {
            const response = await this.$axios.$get('/api/subscriptions/intent');
            this.intentClientSecret = response.data.client_secret;
        } catch(error) {
            this.paymentError = true;
        }        

        this.loadingForm = false;

        // inicializar stripe
        this.stripe = await loadStripe(stripeKey);
        const elements= this.stripe.elements();
        this.cardElement = elements.create("card");
        this.cardElement.mount(this.$refs.card);
    }
}
</script>