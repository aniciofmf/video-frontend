<template>
    <div class="mt-4">
        <h6>Subscripción</h6><hr />
        <p>
            Actualmente estas subscrito al plan {{ $auth.user.plan.name }} <template v-if="$auth.user.ends_at">
                y tu subscripción vence el {{ $auth.user.ends_at }}
            </template>
        </p>
        <template v-if="$auth.user.subscribed">
            <NuxtLink to="/swap">Cambiar plan</NuxtLink>
        </template>
    </div>
</template>

<script>
export default {
    
}
</script>