<template>
  <div class="p-2">
    <v-text-field prepend-icon="mdi-book-open" v-model="importPath" name="importPath" label="Import Path" ></v-text-field>
    <v-btn>Import</v-btn>
  </div>
</template>

<script>
export default {
  name: "ManageBookOptions",  
  data() {
    return {
      importPath: null
    }
  }
}
</script>

<style>

</style>