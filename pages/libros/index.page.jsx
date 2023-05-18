import { Fragment, useEffect, useState } from "react";
import axios from "axios";
const Page = () => {
  const [libros, setLibros] = useState([]);
  const [loadData, setLoadData] = useState();
  const [currentId, setCurrentId] = useState("");

  const [libro, setlibro] = useState({
    titulo: "",
    desc: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setlibro({
      ...libro,
      [name]: value,
    });
  };

  const UpdateLibro = async () => {
    if (currentId !== "") {
      const URL = "http://localhost:7000/actualizar";
      axios
        .post(URL, {
          uuid: currentId,
          titulo: libro.titulo,
          description: libro.desc,
        })
        .then(function (response) {
          return console.log(response.data);
        })
        .catch(function (error) {
          return console.log(error);
        });
    }

  };


  const sendData = () => {
    if (libro.titulo !== "" && libro.desc !== "") {
      const URL = "http://localhost:7000/insertar";
      axios
        .post(
          URL,
          {
            titulo: libro.titulo,

            description: libro.desc,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          return console.log(response.data);
        })
        .catch(function (error) {
          return console.log(error);
        });
    }

    return console.log("camos empty");
  };

  const getData = () => {
    const URL = "http://localhost:7000/select";
    axios
      .get(URL)
      .then(function (response) {
        setLibros(response.data.data);
      })
      .catch(function (error) {
        return console.log(error);
      });
  };

  const getOneData = async (id) => {
    if (id !== "") {
      const URL = "http://localhost:7000/select/one";
      axios
        .post(URL, {
          id: id,
        })
        .then(function (response) {
          setlibro({
            ...libro,
            titulo: response.data.data.titulo,
            desc: response.data.data.description,
          });
        })
        .catch(function (error) {
          return console.log(error);
        });
    }
  };



  const [st, setSt] = useState([]);

  const deleteData = (id) => {
    const URL = "http://localhost:7000/eliminar";
    axios
      .post(URL, {
        id: id,
      })
      .then(function (response) {
        console.log(response.data);
        // getData();
        setSt(response.data);
      })
      .catch(function (error) {
        return console.log(error);
      });
  };


  useEffect(() => {
    getOneData(currentId);
  }, [currentId]);

  useEffect(() => {
    getData();
  }, [st]);

  useEffect(() => {
    getData();
  }, []);

  console.log(currentId);
  return (
    <>
      <div className="form">
        <label>titulo</label>
        <br />
        <input
          value={libro.titulo}
          name="titulo"
          type="text"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="escribe algo"
        />
        <br />
        <br />
        <label htmlFor="">titulo</label>
        <br />
        <input
          value={libro.desc}
          name="desc"
          onChange={(e) => {
            handleChange(e);
          }}
          type="text"
          placeholder="escribe algo"
        />
        <br />
        <br />
        <button
          type="button"
          onClick={() => {
            sendData();
          }}
        >
          Registrar
        </button>
        <button type="button" onClick={() => UpdateLibro()}>
          Actualizar
        </button>
      </div>

      <div>
        {libros.length > 0
          ? libros.map((libro, index) => {
            return (
              <div key={index}>
                <p> {libro.Uuid} </p>
                <p> {libro.titulo} </p>
                <p> {libro.description} </p>
                <button

                  onClick={() => {

                    setCurrentId(libro.Uuid);
                  }}
                >
                  editar
                </button>
                <button
                  onClick={() => {

                    deleteData(libro.Uuid);
                  }}
                >
                  eliminar
                </button>
              </div>
            );
          })
          : "No regist"}
      </div>
    </>
  );

}
export { Page };
