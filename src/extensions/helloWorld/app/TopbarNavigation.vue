<template>
  <div class="header">
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

<style lang="sass">
$myColor: #333333;

.header {
  color: $myColor;
  font-size: 24pt;
}
</style>


