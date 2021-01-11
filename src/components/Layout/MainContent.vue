<template>
  <a-layout-content
    :style="{
      margin: 0,
      minHeight: '280px'
    }"
  >
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </a-layout-content>
</template>
