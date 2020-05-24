<template>
    <div class="todo">
        <h3>Todo List</h3>
        <addtodo />
        <selectstate />
        <ul>
            <li v-for="todo in allTodos" :key="todo.id">
                <todoitem :todo="todo" />
            </li>
        </ul>
        <div class="load" :style="loading?'displpay:block':'display:none'"></div>
    </div>
</template>

<script>
import todoitem from './TodoItem';
import addtodo from './AddTodo';
import selectstate from './SelectState';
import { mapGetters, mapActions } from 'vuex'


export default {
    name: 'Todo',
    data() {
        return {
            loading:true
        }
    },
    components: {
        todoitem,
        addtodo,
        selectstate,
    },
    methods: {
        ...mapActions(['fetchTodos']),
    },
    computed: mapGetters(['allTodos','cleanClass','picked']),
    created(){
        this.fetchTodos().then(res=>this.loading=res)
    },
    watch: {
    cleanClass:function(clean){//監聽是否有其他元素被點選
        if(clean){
            const els=document.querySelectorAll('.todo-item')//回傳所有.todo-item的元素陣列
            els.forEach(item=>{
                // console.log(item.id)
                if(item.id!=this.picked)item.classList.remove('del-block')//逐一移除del-block
                this.$store.commit("CleanResult")
            })
        }
      }
     }
}
</script>

<style scoped>

.todo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
h3 {
    color: #0aa;
    font-size: 35px;
    margin: 40px 0 0;
}
ul {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap:0.5em;
    width: 75%;
    list-style-type: none;
    padding: 0;
}
li {
    position: relative;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.load{
    margin: 80px;
    width:50px;
	height:50px;
	border-radius:50%;
	background-size:50% 50%;
	background-position:
		left top,left top,left top,
		right top,right top,right top,
		right bottom,right bottom,right bottom,
		left bottom,left bottom,left bottom;
	background-repeat:no-repeat;
	background-image:
		-moz-linear-gradient(60deg, #ff0000 36%,rgba(255,0,0,0) 36% ),
		-moz-linear-gradient(30deg, #ff8000 64%,rgba(255,128,0,0) 64% ),
		-moz-linear-gradient(0deg, #ffff00 100%,rgba(255,255,0,0) 100% ),
		-moz-linear-gradient(-30deg, #80ff00 36%,rgba(128,255,0,0) 36%),
		-moz-linear-gradient(-60deg, #00ff80 64%,rgba(0,255,128,0) 64% ),
		-moz-linear-gradient(0deg, #00ffff 100%,rgba(0,255,255,0) 100% ),
		-moz-linear-gradient(-120deg, #3097ff 36%,rgba(48,151,255,0) 36%),
		-moz-linear-gradient(-150deg, #3071ff 64%,rgba(48,113,255,0) 64% ),
		-moz-linear-gradient(0deg, #3e30ff 100%,rgba(62,48,128,0) 100% ),
		-moz-linear-gradient(150deg, #5f3b9d 36%,rgba(95,59,157,0) 36% ),
		-moz-linear-gradient(120deg, #803198 64%,rgba(128,49,152,0) 64% ),
		-moz-linear-gradient(0deg, #ff0080 100%,rgba(255,0,128,0) 100% );
	background-image:
		-webkit-linear-gradient(60deg, #ff0000 36%,rgba(255,0,0,0) 36% ),
		-webkit-linear-gradient(30deg, #ff8000 64%,rgba(255,128,0,0) 64% ),
		-webkit-linear-gradient(0deg, #ffff00 100%,rgba(255,255,0,0) 100% ),
		-webkit-linear-gradient(-30deg, #80ff00 36%,rgba(128,255,0,0) 36%),
		-webkit-linear-gradient(-60deg, #00ff80 64%,rgba(0,255,128,0) 64% ),
		-webkit-linear-gradient(0deg, #00ffff 100%,rgba(0,255,255,0) 100% ),
		-webkit-linear-gradient(-120deg, #3097ff 36%,rgba(48,151,255,0) 36%),
		-webkit-linear-gradient(-150deg, #3071ff 64%,rgba(48,113,255,0) 64% ),
		-webkit-linear-gradient(0deg, #3e30ff 100%,rgba(62,48,128,0) 100% ),
		-webkit-linear-gradient(150deg, #5f3b9d 36%,rgba(95,59,157,0) 36% ),
		-webkit-linear-gradient(120deg, #803198 64%,rgba(128,49,152,0) 64% ),
		-webkit-linear-gradient(0deg, #ff0080 100%,rgba(255,0,128,0) 100% );
		-webkit-animation:mymy 1s infinite linear;
		-moz-animation:mymy 1s infinite linear;
}
@media (max-width: 800px) {
    ul {
        grid-template-columns: 1fr;
    }
}
@-webkit-keyframes mymy{
	0%{ transform:rotate(0);}
	100%{transform:rotate(360deg);}
}
@-moz-keyframes mymy{
	0%{ transform:rotate(0);}
	100%{transform:rotate(360deg);}
}
</style>
