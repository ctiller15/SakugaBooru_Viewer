<template>
    <div>
        <div>footer section...</div>
        <ul class="pages">
            <li v-bind:key="index"
                v-for="(n, index) in searchDataLength"
                v-on:click="updatePage(index)">{{ n }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "FooterSection",
        props: {
            searchDataLength: Number,
        },
        methods: {
            updatePage(pageNum) {
                console.log("Updating!");
                this.$emit("page-updated", pageNum);
            }
        }
    };

</script>

<style scoped>
    .pages {
        list-style: none;
        display: flex;
        justify-content: space-around;
        margin: 20px 15%;
        padding: 0;
    }
</style>