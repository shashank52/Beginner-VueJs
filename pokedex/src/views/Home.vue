<template>
  <div class="home">
    <div class = "modify">
      <input type="text" v-model="searchItem" placeholder="Search by name" id="search"/>
      <select v-model="filteredItem" placeholder="Filter by type" id = "filter">
        <option disabled value="">Select one pokemon type</option>
        <option v-for="(type,ind) in types" :key="ind">
          {{ type }}
        </option>
      </select>
      <button @click="resetFilter">ClearFilter</button>
    </div>
    <div class="list">
      <div v-infinite-scroll = "loadMore" :infinite-scroll-disabled = "busy" :infinite-scroll-distance = "limit" class = "row">
      <div v-for="(pokemon,index) in resultedList" :key="index" class = "main" >
        <div class = "main-image"><img :src="pokemon.sprites.front_default" @click="showModal(pokemon)"></div>
        <div class = "main-content">
          <h3>{{pokemon.name}}</h3>
          <p>Type : {{pokemon.types[0].type.name}}</p>
          </div>   
      </div>
      <modal v-if="isModalVisible" :pokemon="activePokemon" @close="closeModal"/>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import modal from '../views/modal.vue'
export default {
  name: 'home',
  components:{
    modal,
  },
  data(){
    return {
    pokemon:[],
    url:'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
    limit: 20,
    busy: false,
    isModalVisible: false,
    activePokemon:null,
    searchItem:null,
    types:[],
    filteredItem:null,
  }},
  methods:{
    getData(){
      axios.get(this.url).then(response=>{
        for(let res=0; res< response.data.results.length;res++)
        {
          this.getWrapper(response.data.results[res].url);
        }
        this.url = response.data.next;
      })
    },
    getWrapper(url)
    {
      axios.get(url).then(response =>{
        this.pokemon.push(response.data);
        this.fetchTypes(response.data);
      })
    },
    loadMore(){
      if(this.url!=null){
        this.busy = true;
        setTimeout(() =>{
          this.getData();
          this.busy = false;
        },2000)
      }
      else
        console.log("Response is over")
    },
    fetchTypes(p){
       const t = p.types[0].type.name;
       if(!this.types.includes(t))
         this.types.push(t);
    },
    showModal(po){
      this.activePokemon = po;
      //console.log(po);
      this.isModalVisible = true;
    },
    closeModal(){
      this.isModalVisible = false;
      this.activePokemon = null;
    },
    resetFilter(){
      this.filteredItem=null;
    }
  },
  mounted(){
    this.getData();
  },
  computed:{
    resultedList(){
      if(this.searchItem==null&&this.filteredItem==null)
        return this.pokemon;
      else
      {
        if(this.searchItem!=null&&this.filteredItem==null)
          return this.pokemon.filter((item)=>{
            return item.name.includes(this.searchItem);
          })
        else if(this.filteredItem!=null&&this.searchItem==null)
          return this.pokemon.filter((item)=>{
            return item.types[0].type.name.includes(this.filteredItem);
          })
        else
        {
          return this.pokemon.filter((item)=>{
            return item.name.includes(this.searchItem);
          }).filter((item)=>{
            return item.types[0].type.name.includes(this.filteredItem);
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.modify{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.row{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.main{
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  border: 1px outset;
  margin: 1% 1%;
  padding: 1% 1%;
  background-color: #FAEBD7;
}
.main-image{
  align-self: center;
  height: 100%;
  border-top: 1px inset red;
  border-left: 1px inset red;
  margin: 1% 1%;
  padding: 1% 1%;
  width:auto;
}
.main-content{
  align-self: flex-start;
  height: 100%;
  margin: 1% 1%;
  padding: 1% 1%;
  width:auto;
  border-right: 1px outset red;
  border-bottom: 1px outset red;
  transition: box-shadow .9s;
 
}
.main-image:hover{
  cursor: pointer;
  box-shadow: 3px 4px #808080;
  background-color: #ff8989;
   -webkit-transition: background-color .5s ease-out;
    -moz-transition: background-color .5s ease-out;
    -o-transition: background-color .5s ease-out;
    -ms-transition: background-color .5s ease-out;
    transition: background-color .5s ease-out;
}
input[type=text]
{
  padding: 12px 20px;
  /* margin: 8px 0; */
  box-sizing: border-box;
  outline: none;
}
input[type=text]:focus {
  border: 3px solid #ff8989;
}
select{
  outline: none;
}
select:focus{
  border: 3px solid #ff8989;
}
#search{
  width: 40%;
  margin-right: 10px;
}
#filter{
  width:40%;
  margin-right: 10px;
}
button{
  border-radius: 10px;
  background-color: #ff8989;
  color: whitesmoke;
  outline: none;
}
button:hover{
  cursor: pointer;
  background-color: #e50000;
}
</style>
