import { Fragment, useEffect, useState } from "react";
import axios from "axios";
const Page = () => {

  const [libros, setLibros] = useState([]);
  const [libro, setlibro] = useState({
    titulo: "",
    desc: "",
  })

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setlibro({
      ...libro,
      [name]: value
    })
  }
  console.log("titulo", libro.titulo)
  console.log("desc", libro.desc)
  const sendData = () => {
    if (libro.titulo !== "" && libro.desc !== "") {
      const URL = "http://localhost:7000/insertar"
      axios.post(URL, {
        titulo: libro.titulo,

        description: libro.desc,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(function (response) {
        return console.log(response.data);
      }).catch(function (error) {
        return console.log(error)
      })
    }

    return console.log("camos empty")
  };

  const getData = () => {
    const URL = "http://localhost:7000/select"
    axios.get(URL)
      .then(function (response) {

        setLibros(response.data.data);
      }).catch(function (error) {
        return console.log(error)
      })
  }

  const [st, setSt] = useState([])

  const deleteData = (id) => {
    const URL = "http://localhost:7000/eliminar"
    axios.post(URL, {
      id: id
    }).then(function (response) {
      console.log(response.data);
      // getData();
      setSt(response.data);
    }).catch(function (error) {
      return console.log(error)
    })


  }


  // const getEditData = (uuid) => {
  //   const URL = "http://localhost:7000/editar"
  //   axios.post(URL, {
  //     uuid: uuid
  //   }).then(function (response) {
  //     // return console.log(response.data);
  //     // getData();
  //     setSt(response.data);
  //   }).catch(function (error) {
  //     return console.log(error)
  //   })
  // }

  useEffect(() => {
    getData();
  }, [st])




  useEffect(() => {
    getData();
  }, [])

  console.log("Libros db", libros);

  return (
    <>
      <div className="form">
        <label>titulo</label>
        <br />
        <input name="titulo" type="text" onChange={(e) => {
          handleChange(e)

        }
        } placeholder="escribe algo" />
        <br /><br />
        <label htmlFor="">titulo</label>
        <br />
        <input
          // value={} 
          name="desc"
          onChange={(e) => {
            handleChange(e)
          }} type="text" placeholder="escribe algo" />
        <br /><br />
        <button type="button" onClick={() => {
          sendData();
        }
        }>Registrar</button>
      </div>


      <div>
        {
          libros.length > 0 ?
            libros.map((libro, index) => {
              return (
                <div key={index}>
                  <p> {libro.Uuid} </p>
                  <p> {libro.titulo} </p>
                  <p> {libro.description} </p>
                  <button onClick={() => {
                    console.log("editar", libro.uuid)
                  }
                  }>editar</button>
                  <button onClick={() => {
                    console.log("eliminar", libro.Uuid)

                    deleteData(libro.Uuid)
                  }
                  }>eliminar</button>
                </div>
              )
            })
            :
            "No regist"
        }
      </div>

    </>
  )

};


export { Page };
