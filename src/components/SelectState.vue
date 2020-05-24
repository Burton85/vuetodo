<template>
        <div class="select">
            <span class="option" @click="Filte('all')">All</span>
            <span class="option" @click="Filte('completed')">Completed</span>
            <span class="option" @click="Filte('uncompleted')">Uncompleted</span>
        </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'AddTodo',
    data() {
        return {
            title: '',
        };
    },
    methods: {
        ...mapActions(['completeFilter']),
        Filte(option){
            this.completeFilter(option)
        }
    },
};
</script>

<style scoped lang='scss'>
.select{
    padding: 20px 0;
    .option{
        padding:0 10px;
        color: #888;
        font-weight: 600;
        border-left:2px solid #ccc;
        &:first-child{
            border: none;
        }
        &:hover,&:active{
            color: #0aa;
        }
    }
}

</style>
