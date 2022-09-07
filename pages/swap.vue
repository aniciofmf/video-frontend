<template>
    <div class="container mt-5">
        <h5>Cambiar plan</h5><hr/>

        <template v-if="fetchingPlans">
            <div class="d-flex justify-content-center mb-3 mt-4">
                <b-spinner variant="primary" style="width: 4rem; height: 4rem;"></b-spinner>
            </div>
        </template>

        <template v-else>
            <b-alert show v-if="errors.plan" variant="danger">
                {{ errors.plan[0] }}
            </b-alert>

            <template v-if="plansFiltered.length">
                <div v-for="plan in plansFiltered" :key="plan.slug" class="d-flex align-items-center">
                    <input class="mr-3" type="radio" :name="plan.slug" :id="plan.slug" v-model="form.plan" :value="plan.slug">
                    <label :for="plan.slug" class="w-100">
                        <AppPlan :plan="plan" :clickable="false" />
                    </label>
                    </div>
                </template>

                <template v-else>
                    <div>
                    Usted actualmente no puede cambiarse de plan porque esta usando el plan con mas capacidad y excede el uso de almacenamiento de los planes con menos capacidad, si desea regresar a otro plan por favor elimine videos.
                    </div>
                </template>

                <div class="mt-4">
                    <b-button 
                        variant="primary" 
                        @click.prevent="swapPlan" 
                        :disabled="!plansFiltered.length || swapingPlanRequest">
                        <template v-if="swapingPlanRequest">
                            <b-spinner small type="grow"></b-spinner>
                            Cambiando plan...
                        </template>   
                        <template v-else>
                        Cambiar plan
                        </template>
                </b-button>
            </div>
        </template>
        
    </div>
</template>

<script>
import AppPlan from "@/components/AppPlan";
export default {
    head: {
        title: "Cambiar plan"
    },
    middleware: ['auth', 'canviewswappage'],
    components: {
        AppPlan
    },
    data () {
        return {
            plans: [],
            form: {
                plan: null
            },
            errors: {},
            swapingPlanRequest: false,
            fetchingPlans: true
        }
    },
    computed: {
        plansFiltered() {
            return this.plans.filter(plan => plan.can_downgrade && plan.slug !== this.$auth.user.plan.slug)
        }
    },
    methods: {
        async swapPlan() {
            try {
                this.errors = {};
                this.swapingPlanRequest = true;
                await this.$axios.$patch('/api/subscriptions/swap', this.form);
                this.$auth.fetchUser();
                this.$router.replace({ name: "dashboard" });
            } catch(error) {
                this.errors = error.response.data.errors;
                this.swapingPlanRequest = false;
            }
        }
    },
    async mounted () {
        const plans = await this.$axios.$get('/api/subscriptions/plans');
        this.plans = plans.data;
        this.fetchingPlans = false;
    }
}
</script>