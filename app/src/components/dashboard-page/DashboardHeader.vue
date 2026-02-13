<!-- components/dashboard/DashboardHeader.vue -->
<script setup>
import { ref } from "vue";

const search = ref("");
const showNotifications = ref(false);
</script>

<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-lg">W</span>
            </div>
            <span class="font-semibold text-slate-800 text-lg">WordWell</span>
          </div>

          <nav class="hidden md:flex items-center gap-1">
            <a
              href="#"
              class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >Dashboard</a
            >
            <a
              href="#"
              class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >Orders</a
            >
            <a
              href="#"
              class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >Writers</a
            >
            <a
              href="#"
              class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >Clients</a
            >
          </nav>
        </div>

        <!-- Right Side: Search, Notifications, Profile -->
        <div class="flex items-center gap-4">
          <!-- Search Bar -->
          <div class="relative hidden md:block">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="search"
              type="text"
              placeholder="Search..."
              class="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all w-64 text-sm"
            />
          </div>

          <!-- Notifications -->
          <div class="relative">
            <button
              @click="showNotifications = !showNotifications"
              class="p-2 hover:bg-slate-100 rounded-xl transition-colors relative"
            >
              <svg
                class="w-5 h-5 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              ></span>
            </button>

            <!-- Notifications Dropdown -->
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50"
            >
              <div class="px-4 py-2 border-b border-slate-100">
                <h3 class="font-semibold text-slate-700">Notifications</h3>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <a
                  href="#"
                  class="block px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <p class="text-sm text-slate-600">
                    New order #10245 received
                  </p>
                  <p class="text-xs text-slate-400 mt-1">2 minutes ago</p>
                </a>
                <a
                  href="#"
                  class="block px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <p class="text-sm text-slate-600">
                    Order #10234 marked as completed
                  </p>
                  <p class="text-xs text-slate-400 mt-1">1 hour ago</p>
                </a>
              </div>
            </div>
          </div>

          <!-- Profile -->
          <div class="flex items-center gap-3 pl-2 border-l border-slate-200">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-medium text-slate-700">Admin User</p>
              <p class="text-xs text-slate-500">admin@wordwell.com</p>
            </div>
            <div
              class="w-9 h-9 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold"
            >
              A
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
