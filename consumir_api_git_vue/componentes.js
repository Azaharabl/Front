app.component(
    //como se llama
    "vista",{ 
        //que valores necesita
        props: ['result','is-favorito'],
        //que metodos necesita
        methods: {
        
            clickFavoritos() {
                  this.$emit('add-favorite')
             },
             clickEliminarDeFavoritos() {
                   this.$emit('remove-favorite')
             }
         },
        //el código en si
        template:`<div class="result_ok">
                <h2>{{result.name}}</h2>
                <h3>favoritos en hijo es = {{is-favorito}}</h3>
             
                <!-- imagenes -->
                <img class=".result__avatar" v-bind:src="result.avatar_url" alt="foto de perfil">
                <hr>
                <!-- vinculos -->
                <a v-bind:href="result.html_url" target="_blank">{{result.html_url}}</a>
                <!-- texto -->
                <h3>Bio: {{result.bio}}</h3>
                <!-- favoritos -->
               
                <a href="#" v-if="is-favorito" @click="clickEliminarDeFavoritos()">Eliminar de Favoritos 💖</a>
               <!-- <h1>Guardados en favoritos : {{lista}}</h1>  -->

            </div>`
        })