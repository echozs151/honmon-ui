<template>
  <div>
      <p>Test management</p>
      <div class="button-parade">
      <v-btn elevation="2" to="manage/books">Manage Books</v-btn>
      <v-btn elevation="2" to="manage/application">Manage Application</v-btn>
      <v-btn elevation="2" to="manage/server">Manage Server</v-btn>
      </div>
  </div>
</template>

<script>
export default {
    name: "Manage"
}
</script>

<style>
.button-parade {
    display: flex;
    gap: 0.8em;
}
</style>