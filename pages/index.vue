<template>
  <div>
    <b-jumbotron
      fluid
      header="iVideo"
      lead="Sube tus videos, compartelos y descargalos"
    >
    <b-button variant="primary" @click.prevent="handleClickEvent">Comienza ya</b-button>
  </b-jumbotron>
  <PlansList @cardClick="handleClickEvent" />
  </div>
</template>

<script>
  import PlansList from '@/components/PlansList';
  export default {
    components: {
      PlansList
    },
    methods: {
      handleClickEvent () {
        if (!this.$auth.loggedIn) {
          this.$router.push({'name': 'register'});
        }
      }
    }
  }
</script>