import { Trash2 } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {addhistory, deleteVideo } from '../services/allapi';
import { v4 as uuidv4 } from 'uuid';



function Videocard({ card , handledeleteStatus,insidecategory}) {



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async () => {setShow(true);

        const uid=uuidv4();
        console.log(uid);

        let cardTime=new Date()
        console.log(cardTime);

        // backend destructure
        const {caption,url}=card

        // Check

        if(uid!=""&&caption!=""&&url!=""&&cardTime!=""){

            const body={

                id:uid,
                cardName:caption,
                url,
                date:cardTime

            }

           const response =  await addhistory(body)
           console.log(response);
        }
    
    }

    // video remove

    const removeItem=async(id)=>{
        // make call to all api

       let response=  await deleteVideo(id)
    //    console.log(response);
    if(response.status>=200&&response.status<=300){

        handledeleteStatus(true)

    }

    }
   

    // grag started 

        const dragStarted=(e,id)=>{
            console.log("Drag started & source card id:",id);
            e.dataTransfer.setData("cardId",id)
        }
    return (
        <>
            <div>

                <Card draggable onDragStart={e=>dragStarted(e,card?.id)} 
               
                 className='shadow' style={{ cursor: 'pointer' }}>
                    <Card.Img onClick={handleShow} variant="top" height={'300px'} style={{ objectFit: "cover" }} src={card.thumbnail} />
                    <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Card.Title style={{ marginBottom: '0px' }}>{card?.caption}</Card.Title>
                      {
                        insidecategory?"":
                       <Trash2 onClick={()=>removeItem(card?.id)} color='red' />
                    }
                    </Card.Body>
                </Card>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{card.caption}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe width="100%" height="400px" src={ `${card.url}?autoplay=1`} title="LEO - Badass Lyric | Thalapathy Vijay | Lokesh Kanagaraj | Anirudh Ravichander" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Modal.Body>
                </Modal>

            </div>
        </>
    )
}

export default Videocard
