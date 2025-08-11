import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
    state(){
        return {
            tasks : []
            // userData : [
            //     {
            //         id : 'wali',
            //         name : 'wali', 
            //         email : "wali@gmail.com",
            //         password : "test123"
            //     },
            //     {
            //         id : 'wali',
            //         name : 'faizan', 
            //         email : "faizan@gmail.com",
            //         password : "test123"
            //     }
            // ],
            // admin : {
            //     id : 'muneeb',
            //     name : 'muneeb',
            //     email : "muneeb@gmail.com",
            //     password : "test123",
            //     confirmPassword : "test123"
            // },
            // tasks : [
            //     {
            //         id : "t1",
            //         task : 'complete project',
            //         status : 'panding ',
            //         user : "wali"
            //     },
            //     {
            //         id : "t2",
            //         task : 'Check project',
            //         status : 'panding ',
            //         user : "faizan"
            //     },
            //     {
            //         id : "t3",
            //         task : 'Check project',
            //         status : 'panding ',
            //         user : "faizan"
            //     },
            //     {
            //         id : "t4",
            //         task : 'Check project',
            //         status : 'panding ',
            //         user : "faizan"
            //     },
            //     {
            //         id : "t5",
            //         task : 'Check project',
            //         status : 'panding ',
            //         user : "faizan"
            //     },
            //     {
            //         id : "t6",
            //         task : 'Check project',
            //         status : 'panding ',
            //         user : "faizan"
            //     },
            // ]
        }
    },
    getters :{
       async getTask(state){
            const res =await axios.get("http://localhost:5000/tasks")
            console.log(res.data)
            localStorage.setItem("res", JSON.stringify(res.data))
            state.tasks = await res.data
            console.log(state.tasks)
        }
    },
 mutations: {
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
     UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    }
  },
  actions: {
    deleteTask({ commit }, id) {
      commit('DELETE_TASK', id);
    },
     updateTask({ commit }, updatedTask) {
      commit('UPDATE_TASK', updatedTask);
    }
  }

})
export default store