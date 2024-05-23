function unit(value: any) {
  return String(value).endsWith("%") ? "" : "px";
}

export default {
  display: {
    mounted(el: any, binding: any) {
      if (binding.value) {
        el.style.display = binding.value;
      }
    },
    updated(el: any, binding: any) {
      if (binding.value) {
        el.style.display = binding.value;
      }
    },
    unmounted(el: any) {
      el.style.display = null;
    },
  },
  width: {
    mounted(el: any, binding: any) {
      if (binding.value) {
        el.style.width = binding.value + unit(binding.value);
      }
    },
    updated(el: any, binding: any) {
      if (binding.value) {
        el.style.width = binding.value + unit(binding.value);
      }
    },
    unmounted(el: any) {
      el.style.width = null;
    },
  },
  height: {
    mounted(el: any, binding: any) {
      if (binding.value) {
        el.style.height = binding.value + unit(binding.value);
      }
    },
    updated(el: any, binding: any) {
      if (binding.value) {
        el.style.height = binding.value + unit(binding.value);
      }
    },
    unmounted(el: any) {
      el.style.height = null;
    },
  },
  margin: {
    mounted(el: any, binding: any) {
      if (binding.value) {
        el.style.margin = binding.value + unit(binding.value);
      }
    },
    updated(el: any, binding: any) {
      if (binding.value) {
        el.style.margin = binding.value + unit(binding.value);
      }
    },
    unmounted(el: any) {
      el.style.margin = null;
    },
  },
  padding: {
    mounted(el: any, binding: any) {
      if (binding.value) {
        el.style.padding = binding.value + unit(binding.value);
      }
    },
    updated(el: any, binding: any) {
      if (binding.value) {
        el.style.padding = binding.value + unit(binding.value);
      }
    },
    unmounted(el: any) {
      el.style.padding = null;
    },
  },
  font: {
    mounted(el: any, binding: any) {
      if (binding && binding.value) {
        el.style.fontSize = `${binding.value}px`;
      }
    },
    updated(el: any, binding: any) {
      if (binding && binding.value) {
        el.style.fontSize = `${binding.value}px`;
      }
    },
    unmounted(el: any) {
      el.style.fontSize = null;
    },
  },
  color: {
    mounted(el: any, binding: any) {
      if (binding.value) {
        el.style.color = binding.value;
      }
    },
    updated(el: any, binding: any) {
      if (binding.value) {
        el.style.color = binding.value;
      }
    },
    unmounted(el: any) {
      el.style.color = null;
    },
  },
  bgColor: {
    mounted(el: any, binding: any) {
      if (binding.value) {
        el.style.backgroundColor = binding.value;
      }
    },
    updated(el: any, binding: any) {
      if (binding.value) {
        el.style.backgroundColor = binding.value;
      }
    },
    unmounted(el: any) {
      el.style.backgroundColor = null;
    },
  },
};
