<template>
  <div :class="$style.header">
    Hello {{ message }}!!
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'World'
    }
  }
}
</script>

<style lang="scss" module>
@import './shared-styles/variables';

.header {
  color: $favoriteColor;
  font-size: 24pt;
}
</style>


