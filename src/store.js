import { createStore } from "vuex";
import api from "../axios_api.js"
import { endpoints } from "../axios_api.js";
const store = createStore({
  state() {
    return {
      tasks: [],
      userData: [],
    }
  },
  getters: {
    getTask(state) {
      return state.tasks
    },
    getUser(state) {
      return state.userData
    }
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    ADD_USERS(state, user) {
      state.userData.push(user);
    },

    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    SET_TASK(state, tasks) {
      state.tasks = tasks;
    },
    SET_USER(state, userData) {
      state.userData = userData;
    }
  },
  actions: {
    async addTask({ commit }, newTask) {
      try {
        const response = await api.post(endpoints.tasks, newTask);
        // After successful post, add task to local state
        commit('ADD_TASK', response.data);
        
      } catch (error) {
        console.error("Error adding task:", error);
        throw error;
      }
    },
    async addUser({ commit }, newUser) {
      try {
        const response = await api.post(endpoints.userData, newUser);
        commit('ADD_USERS', response.data);
        state.users = response.data
      } catch (error) {
        console.error("Error in Adding User:", error);
        throw error;
      }
    },
    async getUser ({commit}){
    const response = await api.get(endpoints.userData)
    commit("SET_USER", response.data)
  
},
    async updateTaskOnServer({ commit }, updatedTask) {
      try {
        const response = await api.post(endpoints.tasks`/${updatedTask.id}`, updatedTask);

        // Update Vuex state
        commit('UPDATE_TASK', response.data);
      } catch (error) {
        console.error('Error updating task:', error);
        throw error;
      }
    },

    async getTask({ commit }) {
      const res = await api.get(endpoints.tasks)
      commit("SET_TASK", res.data)
    },
    async deleteTask({ commit }, id) {
      try {
        await api.delete(endpoints.tasks + `/${id}`)
        commit('DELETE_TASK', id);
      } catch (error) {
        alert('Failed to delete task', error)
      }
    }
  }

})
export default store