import React, { useState, useEffect } from "react";
import { app } from "./fb";
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from "./fb";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
import './App.css';
import './Logueo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const MySwal = withReactContent(Swal)


const Home = () => {
  const [user, setUser] = useState(null);
  //1 - configuramos los hooks
  const [products, setProducts] = useState( [] )

  //2 - referenciamos a la DB firestore
  const productsCollection = collection(db, "products")

  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async ()   => {
   const data = await getDocs(productsCollection)
   //console.log(data.docs)
   setProducts(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(products)
  }

  useEffect(() => {
    getProducts();
    const currentUser = app.auth().currentUser;
    if (currentUser) {
      setUser(currentUser.email);
    }
  }, []);

  const cerrarSesion = () => {
    app.auth().signOut();
  };

  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
   const productDoc = doc(db, "products", id)
   await deleteDoc(productDoc)
   getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteProduct(id)               
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })    
  }

  return (

    <div>
      <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-secondary mt-2 mb-2 btlarge'>Create</Link>    
          </div>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { products.map( (product) => (
                <tr key={product.id}>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>
                  <Link to={`/edit/${product.id}`} className="btn btn-light"><FontAwesomeIcon icon={faPencilAlt} /></Link>
                  <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <button className="myButton" onClick={cerrarSesion}>Cerrar Sesión</button>
    </div>
  );
};

export default Home;