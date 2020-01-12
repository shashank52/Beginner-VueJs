<template>
  <div id="app">
    <nav>
      <img src="https://fontmeme.com/permalink/200112/31d8ba71aab4459ed520d0ca75f80a75.png" alt="">
      <img id ="pokeball" src="../src/assets/pokeball.png">
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
nav{
  display: flex;
  justify-content: center;
  background-color: #b20000;
  padding: 0;
  margin: 0;
  color:azure;
  font-weight: bold;
  padding: 10px 0;
}
#pokeball{
  width: 30px;
  height: 30px;;
}
</style>
