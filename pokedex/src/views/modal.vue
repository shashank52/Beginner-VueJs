<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            <img :src="pokemons.sprites.front_default" />
            <h1>{{pokemons.name}}</h1>
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <p><b>Height:</b> {{pokemons.height}}</p>
            <p><b>Moves:</b> {{moves}}</p>
            <p><b>Types:</b> {{types}}</p>
            <p><b>Abilities:</b> {{abilities}}</p>
            <p><b>Weight:</b> {{pokemons.weight}}</p>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            
            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              Close!
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name:'modal',
    props: ['pokemon'],
    data(){
        return{
            pokemons: this.pokemon,
            moves:null,
            types:null,
            abilities:null
        }
    },
    methods:{
        close() {
        this.$emit('close');
      },
    },
    mounted(){
        for(let i=0;i<this.pokemons.moves.length&&i<5;i++)
        {
            if(this.moves==null)
                this.moves=this.pokemons.moves[i].move.name+" ";
            else
                this.moves+=this.pokemons.moves[i].move.name+" ";
        }
        for(let i=0;i<this.pokemons.types.length;i++)
        {
            if(this.types==null)
                this.types = this.pokemons.types[i].type.name+" ";
            else
                this.types += this.pokemons.types[i].type.name+" ";            
        }
        for(let i=0;i<this.pokemons.abilities.length;i++)
        {
            if(this.abilities==null)
                this.abilities = this.pokemons.abilities[i].ability.name+" ";
            else
                this.abilities += this.pokemons.abilities[i].ability.name+" ";
        }
    },
}
</script>
<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 1px 1px 1px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #e50000;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #e50000;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #e50000;
    border: 1px solid #e50000;
    border-radius: 2px;
  }
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>