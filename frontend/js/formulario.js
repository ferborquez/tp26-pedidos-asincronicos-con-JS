window.onload = () => {

    let $ = (e) => document.querySelector(e)

  /*   let url = window.location.href
    console.log(url); */


    const getMovie = async () => {
        try {
          let urlMovies =' http://localhost:3031/api/movies/17'
          let response =  await fetch(urlMovies)
          let result = await response.json()
          traePeli(result.data)
          eliminarPeli(result.data.id)
          crearPeli(result.data.id)
          editarPeli(result.data.id)
        } catch (error) {
          console.log(error);
        }
      }
      
      let formulario = $('form')
      let titulo = $('#title')
      let calificacion = $('#rating')
      let premios = $('#awards')
      let fechaCreacion = $('#release_date')
      let duracion = $('#length')

      let botonEditar= $('#btn-editar')
      let botonCrear = $('#btn-crear')
      let botonEliminar = $('#btn-eliminar')

      const traePeli = async (data) => {
         
        let fecha = data.release_date
        let nueva = fecha.substring(0,10)
        console.log(nueva);


          titulo.value = data.title
          calificacion.value = data.rating
          premios.value = data.awards
          fechaCreacion.value = nueva
          duracion.value = data.length
      }

    const eliminarPeli = async (id) => {
        let urlEliminar =`http://localhost:3031/api/movies/delete/${id}`
        botonEliminar.addEventListener('click',  async (e) => {
            e.preventDefault()
            console.log('clickeaste',id);
           let pregunta = confirm('Estas seguro de eliminar la peli?')
           console.log(pregunta);
           if (pregunta) {

            let eliminarPelicula = await fetch (urlEliminar,{
                method : 'DELETE'
            })
            let result = await eliminarPelicula.data
             alert('Peli eliminada ' + result)
            }
        })
    }        

    const crearPeli = async () => {
     
        
        botonCrear.addEventListener('click', async (e) => {
            e.preventDefault()

            let peliculas = {
                title : titulo.value,
                rating : calificacion.value,
                awards : premios.value,
                release_date : new Date,
                length : duracion.value,
                genre_id : 1
            }
             let urlCrear = `http://localhost:3031/api/movies/create`
            console.log('Has creado una nueva peli!');
            let pregunta = confirm('Estas seguro de crear esta peli? ' + peliculas.title)
            if (pregunta) {
                console.log(urlCrear);
                let crearPelicula = await fetch (urlCrear,{
                    method : 'POST',
                    body : JSON.stringify(peliculas),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                let result = await crearPelicula.data
                 alert('Peli creada ' + result)
                }
            }

        )
    }

    const editarPeli = async (id) => {
        botonEditar.addEventListener('click', async (e) => {
            e.preventDefault()

            let peliculas = {
                title : titulo.value,
                rating : calificacion.value,
                awards : premios.value,
                release_date : new Date,
                length : duracion.value,
                genre_id : 1
            }
             let urlEditar = `http://localhost:3031/api/movies/update/${id}`
            console.log('Has editado la peli!');
            let pregunta = confirm('Estas seguro de editar esta peli? ' + peliculas.title)
            if (pregunta) {
                console.log(urlEditar);
                let editarPelicula = await fetch (urlEditar,{
                    method : 'PUT',
                    body : JSON.stringify(peliculas),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                let result = await editarPelicula.data
                 alert('Peli editada ' + result)
                }
            }

        )
    }

    getMovie();

}







          
          



