<template>
    <div>
        <b-container align-v="center">
            <h3>Planes disponibles</h3>

            <div class="mt-3">
                <b-card-group deck class="mb-3">
                    <b-card
                        borderVariant="default"
                        header="Gratis"
                        header-bg-variant="secondary"
                        header-text-variant="white"
                        align="center"
                        title="$0/mes"
                        class="mb-5 mt-2"
                    >
                        <b-card-text class="pt-2">
                            Prueba gratis iVideo, si te gusta nuestra plataforma mas adelante puedes cambiarte a un mejor plan
                        </b-card-text>
                        <b-list-group flush>
                            <b-list-group-item></b-list-group-item>
                            <b-list-group-item>500MB gratis de almacenamiento</b-list-group-item>
                            <b-list-group-item>Compartir videos</b-list-group-item>
                            <b-list-group-item></b-list-group-item>
                        </b-list-group>
                        <b-button variant="secondary" @click.prevent="$emit('cardClick')">Quiero probar</b-button>
                    </b-card>

                    <b-card
                        borderVariant="info"
                        header="Plata"
                        header-bg-variant="info"
                        header-text-variant="white"
                        align="center"
                        title="$5/mes"
                        class="mb-5 mt-2"
                    >
                        <b-card-text class="pt-2">
                            Este es el plan plata de iVideo
                        </b-card-text>
                        <b-list-group flush>
                            <b-list-group-item></b-list-group-item>
                            <b-list-group-item>50GB de almacenamiento</b-list-group-item>
                            <b-list-group-item>Compartir videos</b-list-group-item>
                            <b-list-group-item></b-list-group-item>
                        </b-list-group>
                        <b-button variant="info" @click.prevent="$emit('cardClick')">Comprar ya</b-button>
                    </b-card>

                    <b-card
                        borderVariant="primary"
                        header="Oro"
                        header-bg-variant="primary"
                        header-text-variant="white"
                        align="center"
                        title="$10/mes"
                        class="mb-5 mt-2"
                    >
                        <b-card-text class="pt-2">
                            Este es el plan Oro de iVideo
                        </b-card-text>
                        <b-list-group flush>
                            <b-list-group-item></b-list-group-item>
                            <b-list-group-item>500GB de almacenamiento</b-list-group-item>
                            <b-list-group-item>Compartir videos</b-list-group-item>
                            <b-list-group-item></b-list-group-item>
                        </b-list-group>
                        <b-button variant="primary" @click.prevent="$emit('cardClick')">Comprar ya</b-button>                        
                    </b-card>


                </b-card-group>
            </div>
        </b-container>
    </div>
</template>

<script>
    export default {
        
    }
</script>