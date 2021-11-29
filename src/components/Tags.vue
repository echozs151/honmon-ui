<template>
    <span>
      <v-chip v-for="item of items" :key="item[_keyField]">
          {{item[value]}}
      </v-chip>
    </span>
</template>

<script>
export default {
    name: "Tags",
    props: {
        items: [],
        keyField: null,
        value: null
    },
    computed: {
        _keyField: () => this.keyField ?? "id",
        _value: () => this.value ?? "value"
    }
}
</script>

<style>

</style>