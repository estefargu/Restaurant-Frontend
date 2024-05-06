import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell
} from '@coreui/react'
import { object } from 'prop-types'

const Restaurant = () => {

  const[restaurantData, setRestaurantData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const getRestaurants = async() =>{
      const response = await Axios({
        url: 'http://localhost:1337/api/listrestaurant'
      });
      const listrestaurant = Object.keys(response.data).map(i=> response.data[i])
      setRestaurantData(listrestaurant.flat()); //flat convierte la matriz en un array
    }
    getRestaurants();
  },[]);

function handleCreateRestaurant(event){
  navigate('/restaurants/restaurantform');
}

function handleEdit(restaurantId){
  navigate(`/restaurants/restauranteditform/${restaurantId}`)
}

const handleDisable = async(restaurantId) =>{
  try{
    var url = "http://localhost:1337/api/disablerestaurant/"+restaurantId;
    const response = await Axios.put(url);
    window.location.reload();
  }
  catch(e){
    console.log(e);
  }
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'restaurantName'
  },
  {
    title: 'NIT',
    dataIndex: 'restaurantNit'
  },
  {
    title: 'Address',
    dataIndex: 'restaurantAddress'
  },
  {
    title: 'Phone',
    dataIndex: 'restaurantPhone'
  },
  {
    title: 'City',
    dataIndex: 'cityId'
  },
  {
    title: 'Options',
    dataIndex: 'Options'
  }
]

return (
  <div>
    <CButton onClick={handleCreateRestaurant} > New Restaurant </CButton>
    <CTable>
      <CTableHead>
        <CTableRow>
          {columns.map((column, index) => (
            <CTableHeaderCell key= {index}>{column.title}</CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>
      <CTableBody>
          {restaurantData.map((restaurant, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}> 
                  {column.dataIndex === 'Options' ? (
                    <>
                      <CButton onClick={() => handleEdit(restaurant.restaurantId)} color="primary">Edit</CButton>
                      <CButton onClick={() => handleDisable(restaurant.restaurantId)} color="secondary">Disable</CButton>
                    </>
                  ):(
                    restaurant[column.dataIndex]
                  )}  
               </CTableDataCell>
              ))}
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  </div>
)

}

export default Restaurant
