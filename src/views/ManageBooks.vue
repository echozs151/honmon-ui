<template>
  <div class="">
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="blue"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="p-2">
      <v-tab-item v-for="item in items" :key="item">
        <v-card>
          
            <template v-if="item == 'Options'">
                <manage-book-options></manage-book-options>
            </template>

            <template v-if="item == 'Books'">
                <manage-book-list></manage-book-list>
            </template>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import ManageBookList from "@/components/manage/ManageBookList.vue";
import ManageBookOptions from "@/components/manage/ManageBookOptions.vue";
export default {
  components: {
    ManageBookList,
    ManageBookOptions,
  },
  data() {
    return {
      tab: null,
      items: ["Books", "Collections", "Categories", "Tags", "Options"],
    };
  },
};
</script>

<style>
.p-2 {
  padding: 15px;
}
</style>