<template>
  <div>
    <FonlineConsultation>
      <template slot="pops">
          <pops :pos="'left'" :type="'message'" :content="'卧槽你妈'"></pops>
      </template>
    </FonlineConsultation>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style>
</style>