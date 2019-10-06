<template>
    <div class="container">
        <p v-if="index===9 && answered ">Loading the main screen in 5 secs</p>
        <div v-if="questions.length" class = "container-option">
            <p>{{ questions[index].question }}</p>
            <ul>
                <li v-for="(answer,index) in answers" :key="index" @click="selectIndex(index+1)"
                :class="answerClass(index)">
                    {{ answer }}</li>
            </ul>
            <button :disabled="notSelected" @click="submitAnswer" class="submit">Submit</button>
            <button @click="next" :disabled="disableButton" class="next">Next</button>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'Play',
    data() {
        return{
            questions:[],
            index: 0,
            selectedIndex: null,
            correctIndex:null,
            shuffleAnswers:[],
            answered: null,
            restart: null
        }
    },
    methods :{
        next(){
            this.index++;
            this.answered=null,
            this.selectedIndex=null;  
        },
        selectIndex(index) {
            this.selectedIndex= index;
        },
        submitAnswer(){
            let isCorrect = false;
            if(this.shuffleAnswers[this.selectedIndex-1]==this.questions[this.index].correct_answer)
                isCorrect=true;
            this.answered = true;
            this.$emit('increment',isCorrect);
            if(this.answered && this.index==9)
                setTimeout(function(){window.location.reload(1)},5000);
        },
        answerClass(index){
            let answer=''

            if(!this.answered && this.selectedIndex-1===index)
                answer = 'selected';
            else if(this.answered && this.correctIndex===index)
                answer = 'correct';
            else if(this.answered && this.selectedIndex-1===index && this.correctIndex !== index)
                answer = 'wrong';
            return answer;
        }
    },
     mounted(){
        fetch(this.url,{
            method: 'get'
        }).then((response) => {
            return response.json()
        }).then((jsonData) =>{
            this.questions= jsonData.results;
        })
    },computed :{
        disableButton(){
                return !(this.index<9) || !this.answered;
        },
        answers(){
            let answers = [...this.questions[this.index].incorrect_answers];
            answers.push(this.questions[this.index].correct_answer);
            
            this.shuffleAnswers = _.shuffle(answers);
            this.correctIndex = this.shuffleAnswers.indexOf(this.questions[this.index].correct_answer);
            return this.shuffleAnswers;
        },
        notSelected(){
            return !this.selectedIndex || this.answered;
        }
    },
    props : [ 'url'],
   
}
</script>
<style  scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.container-option {
  display: flex;
  justify-content: center;
  width: 80%;
  flex-direction: column;
  margin: 60px auto;
  padding: 10px 10px;
  border: 2px solid whitesmoke;
  border-radius: 5px;
  color: whitesmoke;
}
ul{
    list-style-type: none;
    padding-inline-start: 0px;
}
li{
    margin: 5px 0;
    padding-top:10px;
    padding-bottom: 10px;
    border: 1px solid #f0f0f0;
    background-color: #f6f6f6;
    color:black;
}
li:hover{
    background-color:#EEE;
    cursor: pointer;
}

.selected {
    background-color: lightskyblue;
}

.correct {
    background-color: lightgreen;
}

.wrong {
    background-color: #FF9999;
}
button{
  width: 60%;
  align-self: center;
  margin: 1em 1em;
  border-radius: 15px;
  padding: 5px 5px;
  cursor: pointer;
 
}
button:disabled{
     background-color: Transparent;
    background-repeat:no-repeat;
    cursor:pointer;
    overflow: hidden;
    color:black;
    overflow: hidden;
}
button:disabled:hover{
     background-color: Transparent;
    background-repeat:no-repeat;
    cursor:pointer;
    overflow: hidden;
    color:black;
    overflow: hidden;
    cursor: auto;
}
.submit {
    background-color: #00009d;
    color:whitesmoke;
}
.submit:hover{
    background-color: #000076;
}
.next {
    background-color:#006600;
    color: whitesmoke;
}
.next:hover{
    background-color: #003300;
}
@media (min-width:675px) {
  .container-option {
  display: flex;
  justify-content: center;
  width: 50%;
  flex-direction: column;
  margin: 100px auto;
  padding: 10px 10px;
  border: 2px solid whitesmoke;
  border-radius: 5px;
  color: whitesmoke;
}
button {
    width:50%;
}
}
</style>