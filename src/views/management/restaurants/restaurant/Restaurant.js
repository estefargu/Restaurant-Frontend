import React, {useEffect, useState} from 'react';
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
    render: (text, record) => (
      <div>

      </div>

    ),
  }
]

  return (
    <div>
      <CButton onClick={handleCreateRestaurant}> New Restaurant </CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key= {index}> {column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {restaurantData.map((restaurant, index)=>(
            <CTableRow key={index}>
              {columns.map((column, columnIndex) =>(
                <CTableDataCell key={columnIndex}> {restaurant[column.dataIndex]} </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>

  )
}

export default Restaurant
