<template>
    <div>
        <template v-for="action of actions">
            <v-btn
                v-if="!action.isLink"
                v-bind:key="action.key"
                v-on="action.onClick ? {click: action.onClick} : {}"
                class="ma-2"
                text
                icon
                color="blue">
                <v-icon>{{action.icon}}</v-icon>
            </v-btn>
            
        </template>
    </div>
</template>

<script>
export default {
    name: "PageActions",
    props: {
        actions: Array
    }
}
</script>

<style>

</style>