<template>
  <div class="about-me">
    <div class ="title">
      <img height="200px" src="../assets/selfPortrait.jpeg" alt="self-photo" class="self-photo">
      <div class="title-text-content">
        <p>About me</p>
        <br>
        <h2>Hiroyuki Kuwana</h2>
      </div>
    </div>
    <div class="main-content">
      <p>I'm working on learning front-end development during COVID-19. This is the first iteration of my site, and hope all will go well! 
      </p>
      <table width = "100%">
        <tr>
          <th>Requirement</th>
          <th>Solution</th>
        </tr>
        <tr>
          <td>Front-end</td>
          <td>Vue.js, HTML, CSS, JavaScript</td>
        </tr>
        <tr>
          <td>Back-end</td>
          <td>Python, Firebase</td>
        </tr>
        <tr>
          <td>Education</td>
          <td>Brown University '21</td>
        </tr>
        <tr>
          <td>Hobbies</td>
          <td>Add hobbies here</td>
        </tr>
      </table>
      <p>Add here about what I like to do </p>
      <br>
      <p> One of the largest thoughts on my mind is how we interact as humans. My hope is that we can become better at working on compassion and understanding each of our expereinces. 
      </p>
    </div>
  </div>
</template>


<style lang="sass" scoped>
  .about-me
    min-height: calc(100vh - 150px)
    background: #333
    padding: 3em
    border-radius: 10px
    color: white
    .title
      display: flex
      align-items: center
      background: #222
      border-radius: 10px
      .self-photo
        border: 1px solid rgba(255,255, 255, 0.4)
        border-radius: 50%
        margin: 0 3em
    .title-text-content
      p 
        marrgin-bottom: 0
        rgb(210,210,210)
      h2 
        margin-top: 0
  .main-content
    p
      line-height: 1.5
      margin: 30 px auto

  table
    border-spacing: 0 px
    margin: 50px auto
    tr th, tr td
      border: 1px solid white
      border-top: none
      padding: 10px
      text-align: center
      &:first-of-type
        border-left: none
      &:nth-of-type(2)
        border-right: none
</style>