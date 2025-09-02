import { createStore } from "vuex";
import api from "../axios_api.js"
import { endpoints } from "../axios_api.js";
const store = createStore({
  state() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      tasks: [],
      drawer: 'default',
      userData: [],
      session: localStorage.getItem('session') || 'session_ended',
      login: "Login",
      projectTasks:{}
    }
  },

  getters: {
    getProjectTasks(state) {
      return state.projectTasks
    },
    getTask(state) {
      return state.tasks
    },
    getUser(state) {
      return state.userData
    },
    login(state) {
      return state.login
    },
    currentTheme: state => state.theme,
    getDrawer: state => state.drawer
  },
  mutations: {
    updateTaskStatus(state, updatedTask) {
    const index = state.tasks.findIndex(t => t.id === updatedTask.id)
    if (index !== -1) {
      state.tasks[index].status = updatedTask.status
    }
  },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    ADD_USERS(state, user) {
      state.userData.push(user);
    },
    setSession(state, value) {
      state.session = value;
      localStorage.setItem('session', value);
    },
    LOGIN_TO_LOGOUT(state) {
      if (state.login === "Login") {
        state.login = "Logout"
      } else {
        state.login = "Login"
      }
    },
     SET_PROJECT_TASKS(state, projectTasks) {
      state.projectTasks = projectTasks;
    },
    SET_THEME(state, theme) {
      state.theme = theme
      localStorage.setItem('theme', theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
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
    },
    setDrawer(state, value) {
      state.drawer = value;
    }
  },
  actions: {
    async updateStatusOnServer({ commit }, { id, status }) {
    const response = await api.patch(`${endpoints.tasks}/${id}`, { status })
    commit("updateTaskStatus", response.data) 
  },
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      commit('SET_THEME', newTheme)
    },
    initializeTheme({ commit }) {
      const savedTheme = localStorage.getItem('theme') || 'light'
      commit('SET_THEME', savedTheme)
    },
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
      } catch (error) {
        console.error("Error in Adding User:", error);
        throw error;
      }
    },
    async getUser({ commit }) {
      const response = await api.get(endpoints.userData)
      commit("SET_USER", response.data)

    },
     async getProjectTasks({ commit }) {
      try {
        const response = await api.get(endpoints.projectTasks); 
        commit('SET_PROJECT_TASKS', response.data);
      } catch (error) {
        console.error("Failed to fetch projectTasks:", error);
      }
    },
    async updateTaskOnServer({ commit }, updatedTask) {
      try {
        const response = await api.patch(`${endpoints.tasks}/${updatedTask.id}`, updatedTask);
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
        await api.delete(`${endpoints.tasks}/${id}`);
        commit('DELETE_TASK', id);
      } catch (error) {
        alert('Failed to delete task', error);
      }
    },
    setDrawer({ commit }, value) {
      commit("setDrawer", value)
    },
  },
})
export default store