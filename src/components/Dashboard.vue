<template>
  <div>
    <div class="col-12 shadow-sm">
      <h1 class="py-3">Gestor de contraseñas</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <Sidebar />
        <Content />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from './Sidebar.vue'
import Content from './Content.vue'
import {ip} from '../base-url.js'
import axios from 'axios'
import EventBus from '../event-bus.js'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    Content,
  },
  data:function() {
    return{
      ip:ip,
      passwords: [],
    }
  },
  mounted(){
    this.loadInfo()
  },
  created(){
    EventBus.$on('sendDashboard',(data)=>{
      EventBus.$emit('sendContent',data)
    }),
    EventBus.$on('actualizar',(data)=>{
      if(data==true){
        this.loadInfo()
      }
    }),
    EventBus.$on('ordenar',(data)=>{
      this.ordenar(data)
    }),
    EventBus.$on('sendSearch',(data)=>{
      if(data==""){
        this.busqueda(data)
      }else{
        this.busqueda(data.target.value)
      }
    })
  },
  methods: {
    ordenar(data){
      // Ordenar: 1 - asc, 2 - desc
      if(data==1){
            this.passwords.sort(function (a, b) {
              a = new Date(a.fechaCreacion)
              b = new Date(b.fechaCreacion)
              if(a < b){
                return -1;
              }
              if(a > b){
                return 1;
              }
              // if (a.fechaCreacion < b.fechaCreacion) {
              //   return -1;
              // }
              // if (a.fechaCreacion > b.fechaCreacion) {
              //   return 1;
              // }
              // a must be equal to b
              return 0;
            });
      }else{
        this.passwords.sort(function (a, b) {
          a = new Date(a.fechaCreacion)
          b = new Date(b.fechaCreacion)
          if(a > b){
            return -1;
          }
          if(a < b){
            return 1;
          }
          // if (a.fechaCreacion < b.fechaCreacion) {
          //   return -1;
          // }
          // if (a.fechaCreacion > b.fechaCreacion) {
          //   return 1;
          // }
          // a must be equal to b
          return 0;
        });
      }
    },
    busqueda(data){
      console.log(data)
      var texto = data
      if(data==""){
        // var text = ""
        // text = data

        const newData = this.passwords.filter(function(data){
          const itemDataName = data.nombreUsuario.toUpperCase()
          const textData = texto.toUpperCase()

          const resName = itemDataName.indexOf(textData) > -1
          const resName2 = itemDataName.indexOf(textData) > -1
          var res = false
          if (resName||resName2) {
            res = true
          }
          return res
        })
        console.log(newData)
        EventBus.$emit('listarSidebar',newData)

      }else{
        // var text = ""
        // text = data

        const newData = this.passwords.filter(function(data){
          const itemDataName = data.nombreUsuario.toUpperCase()
          const textData = texto.toUpperCase()

          const resName = itemDataName.indexOf(textData) > -1
          const resName2 = itemDataName.indexOf(textData) > -1
          var res = false
          if (resName||resName2) {
            res = true
          }
          return res
        })

        console.log(newData)
        EventBus.$emit('listarSidebar',newData)
      }
    },
    loadInfo(){
      axios.get(ip+'passwords')
      .then(response=>{
        console.log("Respuesta")
        this.passwords = response.data
        console.log(response.data)

        EventBus.$emit('listarSidebar',this.passwords)

      }).catch(error=>{
        console.log("Error catch 89465")
        console.log(error)
      })
    }
  }
}
</script>
