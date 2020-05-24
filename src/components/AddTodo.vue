<template>
        <form @submit="AddTodo" class="add">
            <input type="text" v-model="title" name="title" placeholder="Add todo...." />
            <input type="submit" value="ADD" />
        </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapActions } from 'vuex'

export default {
    name: 'AddTodo',
    data() {
        return {
            title: '',
        };
    },
    methods: {
        ...mapActions(['addTodo']),
        AddTodo(e) {
            e.preventDefault();
            if (this.title !== '') {
                const newTodo = {
                    id: 'todo'+uuidv4(),
                    title: this.title,
                    completed: false,
                };
                this.addTodo(newTodo)
                this.title = '';
            } else {
                alert('Nothing Added');
            }
        },
    },
};
</script>

<style scoped>
.add {
    padding: 50px 10px;
    display: flex;
    flex-direction: row;
    width: 50%;
    box-sizing: border-box;
}
input[type='text'] {
    padding: 10px;
    flex: 10;
    outline: none;
}
input[type='submit'] {
    flex: 4;
    border: none;
    color: #eee;
    background-color: #5aa;
    outline: none;
}
@media screen and (max-width:500px) {
    .add{
        width: auto;
    }
}
</style>