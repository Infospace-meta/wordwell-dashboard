<template>
  <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold text-slate-700">Top Performing Writers</h3>
      <span class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
        This week
      </span>
    </div>

    <div class="space-y-4">
      <div v-for="writer in writers" :key="writer.name" class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
            :class="writer.avatarBg"
          >
            {{ writer.initials }}
          </div>
          <div>
            <p class="font-medium text-slate-700">{{ writer.name }}</p>
            <p class="text-xs text-slate-500">{{ writer.orders }} orders completed</p>
          </div>
        </div>
        <span class="text-emerald-600 font-semibold">{{ writer.earnings }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  writers: {
    type: Array,
    default: () => [
      {
        name: "John Doe",
        initials: "JD",
        avatarBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        orders: 12,
        earnings: "$1,240"
      },
      {
        name: "Sarah Smith",
        initials: "SS",
        avatarBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        orders: 8,
        earnings: "$980"
      },
    ]
  }
});
</script>