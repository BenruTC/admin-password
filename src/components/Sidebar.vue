<template>
  <div class="col-12 col-md-3">
    <!-- <h1 class="py-3">Sidebar</h1> -->
    <div class="position-relative">
      <input type="text" class="form-control" v-model="buscar" v-on:keyup="search" placeholder="Buscar..."/>
      <div>
        <span v-if="buscar!=''" v-on:click="clearSearch()" class="material-icons style-clear-search">close</span>
      </div>
    </div>
    <div class="col-12 mt-4">
      <div class="d-flex mx-0 align-items-center">
        <p class="mb-0">Ordenar por fecha: </p>
        <button class="btn btn-light mx-2 shadow" v-on:click="ordenar(1)">Asc</button>
        <button class="btn btn-light shadow" v-on:click="ordenar(2)">Desc</button>
      </div>
    </div>
    <div v-if="passwords.length > 0" class="col-12 mt-4">
      <div class="row mx-0" v-for="password in passwords" v-bind:key="password.id">
        <div v-bind:class="idPassword==password.id ? 'card py-2 card-password-click':'card py-2 card-password'" v-on:click="loadContent(password,password.id)">
          <div class="row">
            <div class="col-3 d-flex align-items-center justify-content-center">
              <span class="material-icons" style="font-size:45px;">account_circle</span>
            </div>
            <div class="col-9">
              <p class="d-flex m-0" style="font-size:17px; font-weight:bold;">
                {{password.nombreUsuario}}
              </p>
              <p class="d-flex m-0">
                {{password.nickName}}
              </p>
              <p class="d-flex m-0" style="color:#9e9e9e;">
                {{password.fechaCreacion}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="col-12 mt-4">
      <div class="row mx-0">
        <p class="mb-0">No se encontraron resultados</p>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '../event-bus.js'

export default {
  name: 'Sidebar',
  data:function() {
    return{
      buscar:"",
      passwords:[],
      idPassword:"",
    }
  },
  created(){
    EventBus.$on('listarSidebar',(data)=>{
      this.passwords = data
    })
  },
  methods:{
    ordenar(id){
      // Ordenar: 1 - asc, 2 - desc
      EventBus.$emit('ordenar',id)
    },
    search(event){
      EventBus.$emit('sendSearch',event)
    },
    clearSearch(){
      this.buscar = ""
      EventBus.$emit('sendSearch',"")
    },
    loadContent(data,id){
      this.idPassword = id
      EventBus.$emit('sendDashboard',data)
    }
  }
}
</script>
<style>
.style-clear-search{
  position: absolute;
  top: 7px;
  right: 4px;
  color: #717171;
  cursor: pointer;
}
.style-sidebar{
  overflow: auto;
}
.card-password{
  cursor: pointer;
  background-color: white;
}
.card-password-click{
  cursor: pointer;
  background-color: #2c3e50;
  color:white;
}
.card-password:hover{
  cursor: pointer;
  background-color: #2c3e50;
  color:white;
}
</style>
