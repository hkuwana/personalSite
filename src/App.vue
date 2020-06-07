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
  //Script from posthog
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('[your-token]', {api_host: 'https://[your-instance]'})
  
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
