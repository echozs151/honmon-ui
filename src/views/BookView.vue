<template>
    <v-container>
        <div class="page-header">
            <v-card class="page-header-card" elevation="4">
                <v-card-title>{{book.title ? book.title : ''}}</v-card-title>
                <v-card-text class="page-header-card-text">
                    <v-row>
                        <v-col class="flex-grow-0">
                            <div class="page-header-content book-preview">
                                <img :src="thumbnail" alt="preview"/>
                            </div>
                        </v-col>
                        <v-col>
                                <div class="flex-1 gap-1"><label class="mr-2">Type:</label><span>{{book.fileExtension}}</span></div>
                                <div class="flex-1 gap-1"><label class="mr-2">Progress:</label><span>{{book.progress}}</span></div>
                                <div class="flex-1 gap-1"><label class="mr-2">Category:</label><span>{{book.category}}</span></div>
                                <div class="flex-1 gap-1"><label class="mr-2">Tags:</label><span><tags :items="items"></tags></span></div>
                                
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="auto">
                            <div class="page-header-content book-description">
                                <p>{{book.description}}</p>
                            </div>
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>
        </div>
        

    </v-container>
</template>

<script>
import helpers from '../helpers.js';
import Tags from '@/components/Tags.vue'
export default {
    name: 'BookView',
    components: {
        Tags
    },
    mounted() {
        const id = this.$route.params.id
        let readAction = {key: 'read', icon: 'mdi-book-open', onClick: () => {window.open(this.$root.resourceUrl+'book-preview/'+id, '_blank')}};
        let downloadAction = {key: 'download', icon: 'mdi-download', onClick: () => this.downloadBook() };
        
        this.id = id;
        this.$root.$emit('resourceLoader', true)
        
        this.thumbnail = this.$root.resourceUrl+'book-thumbnail/'+id;
        helpers.makeRequest("books/"+id, "get").then(res => {
            this.book = res.data
            this.filename = this.book.book.filename;
            if (this.book.fileExtension == 'cbz' || this.book.fileExtension == 'epub') {
                readAction.onClick = () => {
                    let route = this.$router.resolve({ path: "/books/"+id+"/reader" });
                    window.open(route.href, '_blank')
                }
            }
            this.$root.$emit('setPageActions', [readAction, downloadAction])
            this.$root.$emit('resourceLoader', false)

        })

    },
    created() {
        
    },
    destroyed() {
        this.$root.$emit('setPageActions', [])
    },
    data() {
        return {
            id: null,
            filename: 'book',
            book: {},
            thumbnail: null,
            items: []
        }
    },
    methods: {
        downloadBook() {
            this.$root.$emit('resourceLoader', true)
            this.$root.$emit('notifyAlert', "Be right back!  .o0  ᕦ(⚆Ѡ⚆)ᕥ");
            helpers.makeRequest("books/download/"+this.id, "get", {responseType: 'blob'}).then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.filename); //or any other extension
                document.body.appendChild(link);
                link.click();
                this.$root.$emit('resourceLoader', false)
            })
        },
        loadThumbnail() {
            helpers.makeRequest('books/thumbnail/'+this.id, 'get', {
                headers: {
                    'Content-Type': 'image/*'
                }
            }).then(res => {
                this.thumbnail = "data:"+"image/png;base64,"+btoa(encodeURIComponent(res.data))
            })
        }
    }
}
</script>

<style scoped lang="scss">
.page-header-card {
    // height: 400px;
    .page-header-card-text {
        // display: flex;
        // flex-direction: row;
        gap: 20px;
        height: calc(100% - 64px);
        .page-header-content {
            flex: 1 1 100%;
            height: 100%;
        }
        .book-preview {
            min-width: 200px;
            flex: 0 0 240px;

            img {
                height: 100%;
                max-height: 320px;
                max-width: 200px;
                width: 100%;
                display: block;
            }
        }
    }
    
}
</style>