<template>
  <div class="col-12 col-md-9 px-5">
    <div class="row">
      <div class="d-flex mb-3">
        <span class="material-icons" style="font-size:70px;">account_circle</span>
        <div class="mx-3">
          <h2 v-if="password.nombreUsuario" class="" style="font-weight:bold; margin-bottom:0px;">{{password.nombreUsuario}}</h2>
          <h2 v-if="!password.nombreUsuario" class="" style="font-weight:bold; margin-bottom:0px;">Nombre usuario</h2>
          <p v-if="password.nickName" class="m-0 d-flex">{{password.nickName}}</p>
          <p v-if="!password.nickName" class="m-0 d-flex">NickName</p>
        </div>
      </div>
      <div class="col-6">
        <div class="d-flex">
          <label>Nombre</label>
        </div>
        <input type="text" v-model="password.nombreUsuario" v-on:keyup="generateNick" class="mb-2 form-control"/>
        <div class="d-flex">
          <label>NickName</label>
        </div>
        <input type="text" v-model="password.nickName" class="mb-2 form-control" readonly/>
        <div class="d-flex">
          <label>Contraseña</label>
        </div>
        <div class="position-relative">
          <input v-if="!showPassword" type="password" v-model="password.contrasena" class="mb-2 form-control"/>
          <input v-else type="text" v-model="password.contrasena" class="mb-2 form-control"/>
          <span v-if="!showPassword" v-on:click="showPass()" class="cursor-pointer style-icon-show material-icons">visibility</span>
          <span v-if="showPassword" v-on:click="showPass()" class="cursor-pointer style-icon-show material-icons">visibility_off</span>
        </div>
      </div>
      <div class="d-flex">
        <button class="btn btn-primary" v-on:click="generatePassword()">Generar</button>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <p class="mb-0 d-flex justify-content-end">
          <span>Fecha creado: </span>
          <span>{{password.fechaCreacion}}</span>
        </p>
        <p class="mb-0 d-flex justify-content-end">
          <span>Fecha última edición: </span>
          <span>{{password.fechaEdicion}}</span>
        </p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6 d-flex justify-content-end">
        <button v-if="!password.id" class="btn btn-primary mx-2" v-on:click="save()">Guardar</button>
        <button v-else class="btn btn-primary mx-2" v-on:click="update()">Actualizar</button>
        <button class="btn btn-danger" v-if="password.fechaCreacion" v-on:click="deletePass()">Eliminar</button>
      </div>
    </div>
  </div>
</template>
<script>
import {ip} from '../base-url.js'
import EventBus from '../event-bus.js'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Content',
  data:function(){
    return{
      showPassword: false,
      password:{
        nombreUsuario:"",
        nickName:"",
        contrasena:"",
        fechaCreacion:"",
        fechaEdicion:"",
      },
    }
  },
  mounted(){
    console.log("Fecha")
    console.log(moment().format('YYYY-MM-DD'))
  },
  created(){
    EventBus.$on('sendContent',(data)=>{
      this.password = data
      console.log("Recibe content")
      console.log(data)
    })
  },
  methods:{
    showPass(){
      this.showPassword = !this.showPassword
    },
    generatePassword(){
      var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var pass = "";
      var i = 0

      for (i=0; i < 10; i++){
        pass += characters.charAt(Math.floor(Math.random()*characters.length));
      }
      console.log(pass)
      this.password.contrasena = pass
    },
    generateNick(){
      var nick = this.password.nombreUsuario
      this.password.nickName = nick.replace(/\s/g,".")
      // console.log(event.key)
    },
    save(){
      if(this.password.nombreUsuario==""||this.password.contrasena==""){
        alert("no se permiten campos vacíos")
      }else{
        this.password.fechaCreacion = moment().format('DD-MM-YYYY')
        this.password.fechaEdicion = moment().format('DD-MM-YYYY')

        axios.post(ip+'passwords',this.password)
        .then(response=>{
          alert("Se guardó exitosamente")
          this.clearField()
          EventBus.$emit('actualizar',true)
          console.log(response)
        }).catch(error=>{
          console.log("Error catch 65sad42")
          console.log(error)
        })
      }
    },
    update(){
      if(this.password.nombreUsuario==""||this.password.contrasena==""){
        alert("no se permiten campos vacíos")
      }else{
        this.password.fechaEdicion = moment().format('DD-MM-YYYY')

        axios.patch(ip+'passwords/'+this.password.id,this.password)
        .then(response=>{
          alert("Se actualizó exitosamente")
          this.clearField()
          EventBus.$emit('actualizar',true)
          console.log(response)
        }).catch(error=>{
          console.log("Error catch 65sad42")
          console.log(error)
        })
      }
    },
    deletePass(){
      axios.delete(ip+'passwords/'+this.password.id)
      .then(response=>{
        alert("Se eliminó exitosamente")
        this.clearField()
        EventBus.$emit('actualizar',true)
        console.log(response)
      }).catch(error=>{
        console.log("Error catch 65sad42")
        console.log(error)
      })
    },
    clearField(){
      this.password = {
        nombreUsuario:"",
        nickName:"",
        contrasena:"",
        fechaCreacion:"",
        fechaEdicion:"",
      }
    }
  }
}
</script>
<style>
.cursor-pointer{
  cursor: pointer;
}
.style-icon-show{
  position: absolute;
  top: 7px;
  right: 4px;
  color: #717171;
  cursor: pointer;
}
</style>
