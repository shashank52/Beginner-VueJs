<template>
  <div id="app">
    <header>
      <div>
      <h1>quizTime</h1>
      </div>
      <h3>Score: {{ solved}} / {{ total }}</h3>
    </header>
    <Options v-if="!url" @fetchQuestions="saveUrl"/>
    <Play v-else :url="url" @increment="increment" /> 
    <!-- <component :is="currentComponent" @fetchQuestion="saveUrl"></component> -->
  </div>
</template>

<script>
import Options from './components/options.vue'
import Play from './components/play.vue'
export default {
  name: 'app',
  components: {
    Options,
    Play,
  },
  methods :{
    saveUrl(url)
    {
      this.url=url;
      console.log(this.url);
    },
    increment(isCorrect){
      if(isCorrect)
        this.solved++;
      this.total++;
    },
  },
  data(){
    return{
      solved: 0,
      total: 0,
      url: null,
      currentComponent: 'Options',
    }
  },
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body{
  margin: 0;
  background-image: url(cool-background.png);
  background-size: cover;
  background-repeat: no-repeat; 
}
h1 {
  font-weight: 600;
}

header{
  display: flex;
  flex-direction: column;
  background-color:whitesmoke;
  width: 100%;
  border-bottom: 5px solid black; 
 
}

@media (min-width: 675px) {
  header{
    flex-direction: row;
    justify-content: space-around;
  }
  h3 {
    align-self: center;
  }
}
</style>
