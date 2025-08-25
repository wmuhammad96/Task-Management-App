import { reactive } from "vue";

const state = reactive({
  show: false,
  message: "",
  type: "info",
  duration: 3000
});

function triggerToast(message, type = "info", duration = 1000) {
  state.message = message;
  state.type = type;
  state.duration = duration;
  state.show = true;

  setTimeout(() => {
    state.show = false;
  }, duration);
}

export function useToast() {
  return {
    state,
    success: (msg, duration) => triggerToast(msg, "success", duration),
    error: (msg, duration) => triggerToast(msg, "error", duration),
    info: (msg, duration) => triggerToast(msg, "info", duration),
    warning: (msg, duration) => triggerToast(msg, "warning", duration)
  };
}