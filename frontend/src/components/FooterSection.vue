<template>
    <div class="footer-main">
        <ul class="pages">
            <li class="page"
                v-bind:key="index"
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
        background: #111111;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .pages {
        list-style: none;
        display: flex;
        justify-content: space-around;
        margin: 20px 15%;
        padding: 0;
    }

    .page {
        width: 30px;
        height: 30px;
        border: 1px solid white;
        color: #EE7B5D;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
    }

    .page:hover:not(.selected){
        cursor: pointer;
        background: #555555;
        color: #F19279;
    }
    
    .page.selected {
        border: none;
        background: none;
    }

    .selected {
        color: white;
        font-weight: bold;
    }

    .selected:hover {
        cursor: default;
    }

    @media screen and (min-width: 1024px){
        .pages {
            width: 20%;
        }
    }
</style>