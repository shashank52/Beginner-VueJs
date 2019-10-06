<template>
  <div class="container">
  <form class = "container-option" @submit.prevent="getUrl">
    <label>Categories :</label>
    <select v-model="catId" >
        <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
                {{ categorie.name }}</option>
    </select>
    <label>Difficulty :</label>
    <select v-model="diff">
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="difficulty">Difficulty</option>
    </select>
    <button :disabled="disableButton">Submit</button>        
  </form>
  </div>
</template>

<script>
export default {
  name: 'Options',
  data(){
    return{
      categories: [],
      catId: null,
      diff: null,
      url: null
    }
  },
  methods : {
    getUrl(){
      this.url='https://opentdb.com/api.php?amount=10&categorie='+this.catId+'&difficulty='+this.diff;
      this.$emit('fetchQuestions',this.url);
    }
  },
  computed : {
    disableButton(){
      return !( this.catId && this.diff)
    }
  },
  mounted(){
    fetch('https://opentdb.com/api_category.php',{
            method: 'get'
        }).then((response) => {
            return response.json()
        }).then((jsonData) =>{
            this.categories= jsonData.trivia_categories;
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.container-option {
  display: flex;
  justify-content: center;
  width: 70%;
  flex-direction: column;
  margin: 100px auto;
  padding: 10px 10px;
  border: 2px solid whitesmoke;
  border-radius: 5px;
  color: whitesmoke;
}
label {
  font-size: 1.2em;
}
select{
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 2em 2em;
  width: 90%;
  background-color: Transparent;
    background-repeat:no-repeat;
    cursor:pointer;
    overflow: hidden;
    color: whitesmoke;
    overflow: hidden;
    border-radius: 15px;
}
option {
  color: black;
  text-align: center;
}
button{
  width: 40%;
  align-self: center;
  margin-top: 1em;
  border-radius: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: Transparent;
    background-repeat:no-repeat;
    cursor:pointer;
    overflow: hidden;
    color:whitesmoke;
    overflow: hidden;
}
button:hover{
  background-color:green;
}
button:disabled{
  background-color: black;
}

@media (min-width:675px) {
  .container-option {
  display: flex;
  justify-content: center;
  width: 40%;
  flex-direction: column;
  margin: 100px auto;
  padding: 10px 10px;
  border: 2px solid whitesmoke;
  border-radius: 5px;
  color: whitesmoke;
}
}

</style>
