<template>
  <div class="page-container">
    <div class="page-container__content">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~styles/_helpers';

.page-container {
  &__content {
    padding: $spacer;
  }
}
</style>
