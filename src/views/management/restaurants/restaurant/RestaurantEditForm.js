import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Axios from 'axios';
import{
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CFormCheck,
    CButton
} from '@coreui/react'

const RestaurantEditForm = () =>{

    const {restaurantId} = useParams();
    const [restaurantData, setRestaurantData] = useState({
        restaurantName: '',
        restaurantNit: '',
        restaurantAddress: '',
        restaurantPhone: '',
        cityId: 0
    });

    const[departments, setDepartments] = useState([]);
    const[selectedDepartment, setSelectedDepartment] = useState('');
    const[cities, setCities] = useState([]);
    const[selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const getDepartments = async () => {
            const response = await Axios({url:'http://localhost:1337/api/listdepartments'})
            const listDepartments = Object.keys(response.data).map(i=> response.data[i]);
            setDepartments(listDepartments.flat());
        }

        const getCities = async (departmentId) => {
            const response = await Axios({url:`http://localhost:1337/api/listcities/${departmentId}`}) 
            const listcities = Object.keys(response.data).map(i=> response.data[i]);
            setCities(listcities.flat());
        }
        const getRestaurant = async() =>{
            const response = await Axios({url:`http://localhost:1337/api/getrestaurant/${restaurantId}`}) 
            const restaurant = response.data.data
            setRestaurantData(restaurant);
        }

        getRestaurant();
        getDepartments();

        if(selectedDepartment !== "")
            getCities(selectedDepartment);
    },[selectedDepartment]);

    function handleSelectDepartments(event){
        setSelectedDepartment(event.target.value);
    }

    function handleSelectCities(event){
        setSelectedCity(event.target.value);
        setRestaurantData({
            ...restaurantData,
            cityId: event.target.value
        })
    }

    function handleChange(event){
        const {name, value} = event.target;
        setRestaurantData({
            ...restaurantData,
            [name]: value
        });
    }

    const handleSubmit = async()=>{
        try{
            const response = await Axios.post(`http://localhost:1337/api/updaterestaurant/${restaurantId}`, restaurantData);
            navigate('/restaurants/restaurant');
        }
        catch(e){
            console.log(e);
        }
    }

    function handleReturnUI(event){
        navigate('/restaurants/restaurant');
      
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="restaurantName" name="restaurantName" label="Name" value={restaurantData.restaurantName} onChange={handleChange}/>
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="restaurantNit" name="restaurantNit" label="Nit" value={restaurantData.restaurantNit} onChange={handleChange}/>
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="departmentOptions" lable="Department" value={selectedDepartment} onChange={handleSelectDepartments} >
                    <option value="">Select a department</option>
                    {departments.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>   
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="cityOptions" lable="City" value={selectedCity} onChange={handleSelectCities} >
                    <option value="">Select a city</option>
                    {cities.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>   
            </CCol>
            <CCol xs={4}>
                <CFormInput type="text" id="restaurantAddress" name="restaurantAddress" label="Address" value={restaurantData.restaurantAddress} onChange={handleChange}/>
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="restaurantPhone" name="restaurantPhone" label="Phone" value={restaurantData.restaurantPhone} onChange={handleChange}/>
            </CCol>
            <CCol xs={12}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: '10px' }}>
                    <CButton onClick={handleReturnUI} color="primary" type="submit"> Save </CButton>
                    <CButton onClick={handleReturnUI} color="primary" type="submit"> Cancel </CButton>
                </div>
            </CCol>
        </CForm>
    )
}

export default RestaurantEditForm