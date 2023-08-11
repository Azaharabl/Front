// de donde saco los datod de la api 
const API = "https://api.github.com/users/";
// tiempo de espera para la busqueda 20 seg
const timeRecuest = 20000;

const app = Vue.createApp({
    data() {
      return {
        git: "pon el git a buscar",
        datos:"",
        result: null,
        error: null,
        favoritos: new Map(),
      };
    },
    created(){
        const favoritos = window.localStorage.getItem("favoritos")
        if(favoritos){
            this.favoritos = new Map(JSON.parse(favoritos))
        }
    },
    computed:{
        isFavorito(){
            if (this.result) {
                const temp = this.favoritos.has(this.result.login.toUpperCase());
                console.log("es favorito = " + temp);
                return temp;
              }
              return false; // O cualquier otro valor predeterminado que desees
            }
        
       
    },
    methods: { 
        async obtenerGit() {
            //lo buscamos en favoritos 
            console.log("buscado en la cache")
            if(this.favoritos.get(this.git.toUpperCase())){
                //esta en favoritos
                console.log("encontrado en la cache")
                //comprobamos el tiempo
                if(Date.now() - this.favoritos.get(this.git.toUpperCase()).lastRecuestTime < timeRecuest){
                    //hace poco tiempo
                    console.log("encontrado en la cache y no hace mucho")
                    this.result = this.favoritos.get(this.git.toUpperCase())
                    this.error = false
                    this.git = ""
                    console.log("fin busqueda")
                }else{
                    //hace mucho tiempo
                    console.log("encontrado en la cache pero se guardo hace mucho, buscamos de nuevo")
                    this.obtenerGitDeApi()
                    console.log("eliminar de favoritos")
                    this.clickEliminarDeFavoritos()
                    console.log("actualizando datos")
                    this.clickFavoritos()
                   
                }
            }else{
                //no está en favoritos
                console.log("No encontrado en la cache")
                this.obtenerGitDeApi()
                
            }
        },


        async obtenerGitDeApi() {        
            
            console.log("obtener de api")
            //obtendo datos de una API
            const resp = await fetch(API + this.git)
            const data = await resp.json()
            
            //si datos son correctos result false error null
            if(resp.ok){
                console.log("respuesta de busqueda ok")
                this.result = data
                this.error = false
                this.git = ""
            
            }
            //si datos son erroneos result false error true
            if(!resp.ok){
                console.log("respuesta de busqueda error")
                this.result = false
                this.error = true
                this.git = ""
            }
            console.log("fin busqueda")
        },
            
        clickFavoritos(){
        //meter en la lista esos datos
            if(this.result){
                //guardamos el momento de la ultima busqueda
                this.result.lastRecuestTime = Date.now()
                this.favoritos.set(this.result.login.toUpperCase(), this.result)
                this.updateMemory()
                console.log("guardado en favoritos")
            }    
        },

        clickEliminarDeFavoritos(){
            //sacar de la lista esos datos
            if(this.result){
                this.favoritos.delete(this.result.login.toUpperCase())
                this.updateMemory()
                console.log("eliminado de favoritos")
            } 
        },

        mostrarUnFavoritos(favorito){
            this.result = favorito
        },

        updateMemory(){
            window.localStorage.setItem("favoritos", JSON.stringify(Array.from(this.favoritos)))
        },

        checkFavorite(l) {
            return this.result?.login === l
        },
        
    }
});

