<template>
    <div class="footer-main">
        <div>footer section...</div>
        <ul class="pages">
            <li v-bind:key="index"
                v-bind:class="{selected: n === selectedPage}"
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
            selectedPage: Number,
        },
        methods: {
            updatePage(pageNum) {
                this.$emit("page-updated", pageNum);
            }
        }
    };

</script>

<style scoped>
    .footer-main{
        position: fixed;
        bottom: 0;
        height: 60px;
        width: 100%;
        background: white;
    }

    .pages {
        list-style: none;
        display: flex;
        justify-content: space-around;
        margin: 20px 15%;
        padding: 0;
    }

    .selected {
        color: red;
    }
</style>