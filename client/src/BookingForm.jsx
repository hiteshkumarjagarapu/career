
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './BookingForm.css'


function BookingForm() {
    const [area, setArea]=useState([])
    const[selectarea,setSelectarea]=useState('')
    const [time,setTime]=useState('')
    const [mentor,setMentor]=useState('')
    const[mlist,setMlist]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:8080/api/areas')
        .then(res=>{
            setArea(res.data);
        })
        .catch(err=>console.log(err))

    },[area])

    useEffect(()=>{
        axios.get('http://localhost:8080/api/mentors')
        .then(res=>{
            setMlist(res.data);
        })
        .catch(err=>console.log(err))

    },[mlist])

    useEffect(()=>{
        axios.get('http://localhost:8080/usersList')
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    },[])


    const handler=(e)=>{
        e.preventDefault();
        setSelectarea(e.target.value)
    }



    const dataDone=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/userDetails',{selectarea,time,mentor})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }


  return (
    <div className='bg vh-100  text-center p-5'>
        <h1 className='text-white'>Book Your Schedule</h1>
   
    <div className='text-center  p-4 d-flex justify-content-center align-items-center  '>
        
        
        <div className='w-50 border rounded-4 fw-bold Roboto text-center  form-control bg-transparent '>
            <form onSubmit={dataDone}> 
                <label className='text-white' htmlFor='area'>Area of Interest:</label>
                <br/>
                    <select id='area' onChange={handler}>
                        
                        {area.map(option =>( 
                            
                        <option key={option.id} value={option.id} >{option.area_of_interest}
                        </option>
                        ))}
                    </select>
                    <br/>
                    <br/>

                    
                    <label className='text-white' htmlFor='dt'>Time</label>
                    <br/>
                    <input id='td' type='time' value={time} onChange={(e)=>setTime(e.target.value)}/>
                        <br/>
                        <br/>


                    <label className='text-white' htmlFor='mentor'>Mentors List: </label>
                    <br/>
                    <select id='mentor' onChange={(e)=>setMentor(e.target.value)}>
                        {mlist.map(option =>( 
                        <option key={option.id} value={option.id} >{option.name}
                        </option>
                        ))}
                    </select>
                    <br/>
                    <br/>
                    <button type='submit' className='btn btn-success'>Submit</button>
                               
        </form>
        </div>
        
    </div>
    </div>
  )
}

export default BookingForm
