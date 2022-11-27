<template>
  <div>
    <RemoteData />
    <LocalData />
  </div>
</template>

<script>
import RemoteData from './components/RemoteData'
import LocalData from './components/LocalData'

export default {
  components: {
    RemoteData,
    LocalData
  }
}
</script>

<style></style>
