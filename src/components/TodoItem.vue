<template>
  <div
    :class="TodoItemClass"
    :id="todo.id"
    @click="CompleteChange(todo)"
    @touchstart="PressIn(todo.id)"
    @touchend="PressOut(todo.id)"
    @mousedown="PressIn(todo.id)"
    @mouseup="PressOut(todo.id)"
  >
  <input v-focus type="text" v-model.trim="edit" v-if="edit!=null" class="editbox"  @keyup.enter="submitHandler(todo)" @keyup.esc="cancelHandler" @blur="cancelHandler">
  <template v-else>
    <p>
          <input type="checkbox" @change="CompleteChange(todo)" :checked="todo.completed" />
          <label>
            {{todo.title}}
            <span @click="Delete(todo.id)"></span>
          </label>
          <a @click="Edit(todo)" class="edit-button"><i class="fas fa-pen"></i></a>
    </p>
  </template>
    
  </div>
</template>

<script>
// import axios from 'axios'
import {  mapGetters,mapActions } from "vuex";

export default {
  name: "TodoItem",
  props: ["todo"],
  data() {
    return {
      dbClick: false,
      TodoItemClassList: [
        "todo-item",
        "todo-item completed",
        "todo-item del-block"
      ],
      edit:null,
      pressTime:0,
      interval:null,
    };
  },
  computed: {
    ...mapGetters({result:'delBlockResult',clean:'cleanClass'}),
    TodoItemClass: function() {
      if (this.todo.completed) {
        //开启完成样式
        return this.TodoItemClassList[1];
      } else {
        return this.TodoItemClassList[0];
      }
    }
  },
  methods: {
    ...mapActions(["changeTodo", "deleteTodo","updateTodo"]),
    //编辑
    Edit(todo) {
      this.edit=todo.title//开启编辑
    },
    submitHandler(todo){
      if(this.edit=='') this.Delete(todo.id)//edit传入空白时删除
      else if(this.edit!==todo.title){//更改时呼叫update传入阵列
        this.updateTodo([todo,this.edit])
      }
      this.edit=null//没更改关闭
    },
    cancelHandler(){
      if(this.edit==null)return //当edit为null关闭
      else if(this.edit!=this.todo.title){//edit有更改summit
        this.submitHandler(this.todo)
      }
      this.edit=null//没更改关闭
    },
    //双击完成
    CompleteChange(todo) {
      if (this.dbClick) {
        this.changeTodo(todo);
      }
      this.dbClick = true;
      setTimeout(() => {
        this.dbClick = false;
      }, 300);
    },
    //长按跳出删除匡
    PressIn(id) {
      this.interval = setInterval(() => {
        this.pressTime++
        if (this.pressTime >= 5){
          clearInterval(this.interval);
        }
      }, 1000)
      this.$store.commit('ResetDelete',id)
    },
    PressOut(id) {
      this.$store.commit('SetDelete',id)
      clearInterval(this.interval); // stop the interval
      if (this.pressTime >= 1) {
        this.pressTime = 0
        this.$store.commit('OpenDelete', id)
      }
    },
    Delete(id){
      this.deleteTodo(id)//删除
    },
  },
  watch: {
    result: {//偵測被長按的ID是否改變
      deep: true,
      handler(){
        if(this.result=='')return
        let str={}
        str.id=("#"+this.result)
        document.querySelector(str.id).setAttribute('class',"todo-item del-block")
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todo-item {
  position: relative;
  width: 100%;
  height: 80px;
  color: #233;
  background-color: #add;
  padding: 10px;
  border-radius: 5px;
  border-bottom: 2px solid #dee;
  box-sizing: border-box;
  user-select: none;
  touch-action: auto;
  p{
    padding: 5px 0;
  }
  span{
    position: absolute;
    opacity: 0;
    top: 0%;
    left: 0%;
    z-index: -999;
    padding: 0;
    padding: 30px 120px; 
    background-color:transparent;
  }
  &::after {
    content: "DELETE";
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    width: 0;
    opacity: 0;
    z-index: -1;
    height: 100%;
    color: #fff;
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 5px;
    background-color: #daa;
    transition: 0.8s;
  }
  .editbox{
    text-align: center;
    width: 80%;
    padding: 20px 0;
    transform: translateX(10%);
  }
}
  input {
    position: relative;
    float: left;
  }
  input::before {
    position: absolute;
    content: "";
    /* opacity: 0; */
    height: 15px;
    width: 15px;
    border-radius: 20%;
    background-color: #fff;
  }
  input:after {
    position: absolute;
    text-align: center;
    content: "v";
    color: #fff;
    opacity: 0;
    height: 15px;
    width: 15px;
    border-radius: 20%;
    background-color: #088;
  }
  input:checked::after {
    opacity: 0.8;
  }
  .completed {
    background-color: #acc;
    color: #888;
    text-decoration: line-through;
  }
  .edit-button {
    position: relative;
    display: block;
    text-align: center;
    float: right;
    padding: 3px 6px;
    border: none;
    background-color: none;
    .fas{
      color: #3aa;
      &:hover{
        color: #0dd;
      }
    }
    

  }
  .del-block {
    span{
      opacity: 1;
      z-index: 10;
    }
    &::after {
      width: 100%;
      opacity: 1;
      z-index: 1;
    }
  }
</style>

