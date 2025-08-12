import { createStore } from "vuex";
import api from "../axios_api.js"
import { endpoints } from "../axios_api.js";
const store = createStore({
  state() {
    return {
      tasks: [],
      admins: [],
      isAdmin: false
    }
  },
  getters: {
    getTask(state) {
      return state.tasks
    },
    getAdmin(state) {
      return state.admins
    }
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    ADD_ADMIN(state, admin) {
      state.admins.push(admin);
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
    async addAdmin({ commit }, newAdmin) {
      try {
        const response = await api.post(endpoints.admin, newAdmin);
        commit('ADD_ADMIN', response.data);
      } catch (error) {
        console.error("Error adding Admin:", error);
        throw error;
      }
    },

    async updateTaskOnServer({ commit }, updatedTask) {
      try {
        // Directly PUT updatedTask to server
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