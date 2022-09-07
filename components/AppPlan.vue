<template>
    <b-list-group-item 
        @click="upgradePlan"
        class="d-flex justify-content-between align-items-center plan-item user-select-none">
        <div class="d-flex flex-column align-item-center">
            <span class="plan-name">{{ plan.name }}</span>
            <span class="plan-storage">{{ storageComputted }}</span>
        </div>
        <div class="plan-price">${{ plan.price / 100 }} / Mensuales</div>
    </b-list-group-item>
</template>

<script>
import filesize from 'filesize';
export default {
    props: {
        plan: {
            required: true,
            type: Object
        },
        clickable: {
            required: false,
            type: Boolean,
            default: true
        }
    },
    computed: {
        storageComputted() {
            return filesize(this.plan.storage)
        }
    },
    methods: {
        upgradePlan() {
            if (!this.clickable) {
                return;
            }
            this.$router.push({ name: 'checkout', query: { plan: this.plan.slug } })
        }
    },
}
</script>

<style scoped>
    .plan-item {
        cursor: pointer;
        
    }

    .plan-name {
        font-size: 1.6rem;
        font-weight: 500;
        color: #007bff;
    }

    .plan-storage {
        font-size: .9rem;
        color: #555;
    }

    .plan-price {
        font-weight: 600;
        color: #444;
    }
</style>