<template>
  <section class="navigation">
    <div class="navigation-brand">
      <img height="160px" src="../assets/basicLogo.png" alt="logo">
    </div>
    <div class="navigation-menu">
      <ul class="navigation-menu-list">
        <li>About me</li>
        <li>GitHub</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped>
.navigation
  background: #333
  display: flex
  flex-direction: column
  justify-content: space-around
  align-items: center
  .navigation-brand  
    margin: 20px auto
  .navigation-menu
    width: 100%
.navigation-menu-list
  list-style: none
  padding: 0
  display: flex
  margin: 0
  color: white
  li
    width: 50%
    text-align: center
    background: #555
    padding: 10px 0
    cursor: pointer
    transition: background 300ms ease-in-out
    &:first-of-type
      border-bottom: 5px solid #222
    &:hover
      background: #333
</style>