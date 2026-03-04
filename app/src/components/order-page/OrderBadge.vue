<template>
  <span
    class="inline-flex items-center px-4 py-2 rounded-lg text-sm"
    :class="badgeClass(type)"
  >
    {{ type }}
  </span>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
});

const badgeClass = (type) => {
  const map = {
    "In Progress": "bg-blue-50 text-blue-700 ring-1 ring-blue-600/30",
    Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/30",
    Failed: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/30",
    Paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/30",
    Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/30",
  };

  return map[type] || "bg-slate-50 text-slate-700 ring-1 ring-slate-600/20";
};
</script>
