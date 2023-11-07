import React from 'react'
import { useState } from 'react'
import { gethistory } from '../services/allapi'
import { useEffect } from 'react'

function Watchhistory() {


    const [history,sethistory]=useState([])
   
    const getWatchhistory=async()=>{

        const {data}  =  await gethistory()

        sethistory(data)

    }
    console.log(history);

    useEffect(()=>{

        getWatchhistory()

    }, [])

    
  return (
    <div>
        
        
        <h1>Watchhistory</h1>

        <table className='table shadow m-3 rounded border'>
            <thead>

                <tr>
                    <th>ID</th>
                    <th>CardName</th>
                    <th>URL</th>
                    <th>Date</th>
                </tr>

            </thead>

            <tbody >
                {
                    history?.map((item,index)=>(
                    

                        <tr>
                        <td>{index+1}</td>
                        <td>{item?.cardName}</td>
                        <td>{item?.url}</td>
                        <td>{item?.date}</td>
                    </tr>

                    ))
                }

               
            </tbody>
        </table>
        
        
        
        </div>
  )
}

export default Watchhistory