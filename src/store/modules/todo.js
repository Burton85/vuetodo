import axios from "axios";

const state = {
  data: [], //原始资料
  todos: [], //显示资料
  delBlock: "", //显示del-block的id
  clean: false, //true时清除delblock
  picked: "", //正在点选的id
};

const getters = {
  allTodos: (state) => state.todos,
  delBlockResult: (state) => state.delBlock,
  cleanClass: (state) => state.clean,
  picked: (state) => state.picked,
};

const actions = {
  async fetchTodos({ commit }) {
    const res = await axios.get("https://intense-cliffs-03280.herokuapp.com/data");
    state.data = res.data;
    commit("SetTodos", res.data);
  },
  async addTodo({ commit }, newTodo) {
    const res = await axios.post("https://intense-cliffs-03280.herokuapp.com/data", newTodo);
    commit("NewTodo", res.data);
  },
  async changeTodo({ commit }, todo) {
    const res = await axios.patch(`https://intense-cliffs-03280.herokuapp.com/data/${todo.id}`, {
      completed: !todo.completed,
    });
    commit("ChangeTodo", res.data);
  },
  // async setEdit({ commit }, todo) {
  //     commit('SetEdit', todo)
  // },
  async updateTodo({ commit }, todoedit) {
    const res = await axios.patch(
      `https://intense-cliffs-03280.herokuapp.com/data/${todoedit[0].id}`,
      { title: todoedit[1] }
    );
    commit("UpdateTodo", res.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://intense-cliffs-03280.herokuapp.com/data/${id}`);
    commit("RemoveTodo", id);
  },
  //侦测长按 input?start:end
  // async pressIn({ commit },id) {
  //     state.interval = setInterval(() => {
  //         state.pressTime++
  //         if (state.pressTime >= 5){
  //             clearInterval(state.interval);
  //         }
  //     }, 1000)
  //     commit('ResetDelete',id)
  // },
  // async pressOut({ commit }, id) {
  //     state.clean=false
  //     clearInterval(state.interval); // stop the interval
  //     if (state.pressTime >= 1) {
  //         state.pressTime = 0
  //         commit('OpenDelete', id)
  //     }
  // },
  async completeFilter({ commit }, option) {
    if (option == "all") {
      state.todos = state.data;
    } else if (option == "completed") {
      state.todos = state.data.filter((todo) => todo.completed == true);
    } else {
      state.todos = state.data.filter((todo) => todo.completed == false);
    }
    commit("FilteTodos");
  },
};

const mutations = {
  SetTodos: (state, todos) => (state.todos = todos),
  NewTodo: (state, todo) => {
    state.data.unshift(todo);
    state.todos = state.data;
  },
  ChangeTodo: (state, todo) =>
    state.todos.forEach((t) => {
      if (t.id == todo.id) {
        t.completed = todo.completed;
      }
    }),
  // SetEdit:(state, todo) => (state.edit=todo.title),
  UpdateTodo: (state, todo) => {
    state.data.forEach((t) => {
      if (t.id == todo.id) {
        t.title = todo.title;
      }
    });
    state.todos = state.data;
  },
  RemoveTodo: (state, id) => {
    state.data = state.data.filter((todo) => todo.id !== id);
    state.todos = state.data;
  },
  OpenDelete: (state, id) => (state.delBlock = id),
  SetDelete: (state, id) => {
    state.picked = id;
    state.clean = false;
  },
  ResetDelete: (state, id) => {
    state.picked = id;
    state.clean = true;
  },
  FilteTodos: () => {},
  CleanResult: () => (state.delBlock = ""),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
