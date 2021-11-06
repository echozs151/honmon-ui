<template>
    <div>
    <p>{{$route.params.id}}</p>
    <a @click="downloadBook">Download {{filename}}</a>
    </div>
</template>

<script>
import helpers from '../helpers.js';

export default {
    name: 'BookView',
    mounted() {
        const id = this.$route.params.id
        this.id = id;
        helpers.makeRequest("books/"+id, "get").then(res => {
            this.book = res.data
            console.log(this.book)
            this.filename = this.book.book.filename;
    })
    },
    data() {
        return {
            id: null,
            filename: null,
            book: null
        }
    },
    methods: {
        downloadBook() {
            helpers.makeRequest("books/download/"+this.id, "get", {responseType: 'blob'}).then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.filename); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
        }
    }
}
</script>