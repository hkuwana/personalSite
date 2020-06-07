<template>
    <section class="navigation">
        <div class="navigation-logo">
            <img src="../assets/basicLogo.png" alt="my-logo">
        </div>
        <div class="navigation-menu">
            <ul class="navigation-menu-list">
                <li class="navigation-list-item">About me</li>
                <li class="navigation-list-item">Project</li>
                <li class="navigation-list-item">Blog</li>
                <li onclick="location.href = 'https://github.com/hkuwana';" class="navigation-list-item">Github</li>

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
    position: fixed
    left: 0
    top: 0 
    bottom: 0
    background: #333
    display: flex
    flex-direction: column
    align-items: center
    width: 20vw
    .my-logo
        margin: 200px
        height: auto
    .navigation-menu
        color: white

.navigation-menu-list
    list-style: none
    padding: 0
    .navigation-list-item
        background: #222
        padding: 10px 20px
        text-align: center
        margin: 10px auto
        cursor: pointer
        &:hover
            width: 100%
</style>