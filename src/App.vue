<template>
  <div id="app">
   <desktop-navigation id = "desktop-navigation"/>
   <mobile-navigation id="mobile-navigation"/>
    <div class="view-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import desktopNavigation from '@/components/desktopNavigation'
import mobileNavigation from '@/components/mobileNavigation'

export default {
  components: {
    desktopNavigation,
    mobileNavigation
  }
}
</script>

<style lang="sass" scoped>
.view-container
  width: 79vw
  padding: 1.5em
  margin-left: 20vw
  box-sizing: border-box
  min-height: 100vh

#mobile-navigation
  display: none

@media screen and (max-width: 500px)
  .view-container
    width: 100%
    margin-left: 0
  #desktop-navigation
    display: none
  #mobile-navigation
    display: flex

  
</style>
