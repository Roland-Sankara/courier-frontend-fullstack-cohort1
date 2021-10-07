import React,{ useEffect, useState} from 'react'
// import axios from 'axios';
import './Section.css'
import {Link} from 'react-router-dom';

const Section = () => {

    const [infor, setInfor] = useState(null);

    useEffect(() => {
       const baseURL = `https://courier-backend-fullstack1.herokuapp.com/api/v1/parcels/user/${localStorage.getItem('userID')}`;
       
       fetch(baseURL,{
           headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
           }
       })
        .then((res)=>{
            console.log(res)
            if(!res.ok){
                throw new Error('Authorization Failed . . .');
            }
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            setInfor(data);
        })
        .catch((err)=>{
            console.log(err);
        })
       
    }, 
    []
    )
    

  const remove= (e)=>{
    let orderID = e.target.dataset.orderid;
    console.log(orderID)
    let apiUrl = `https://courier-backend-fullstack1.herokuapp.com/api/v1/parcels/${orderID}`;
    fetch(apiUrl,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((res)=>{
        if(!res.ok){
            throw new Error('Failed to Delete Order');
        }
        return res.json();
    })
    .then((result)=>{
        console.log(result)
    })
    .catch((err)=>{
        console.log(err)
    })
}

    return (
        <>
        {infor ?   
                infor.length ? 
                <div className = "section">
                    <h1>My Orders</h1>

                    <div className = "order-section">
                    <div className = "titles">

                            <p>Itemname</p>
                            <p>Sender</p>
                            <p>Sender's no</p>
                            <p>Receiver</p>
                            <p>Receiver's no</p>
                            <p>Reciver's location</p>
                            <p>Action</p>
                    </div>
                    <ul className = "list">
                            <li >
                                {infor.map(order=>{
                                    return(
                                        <div>
                                            <div key = {order._id} className ="item">
                                                <p>{order.itemname}</p>
                                                <p>{order.sendersname}</p>
                                                <p>{order.senderscontact}</p>
                                                <p>{order.receiversname}</p>
                                                <p>{order.receiverscontact}</p>
                                                <p>{order.receiverslocation}</p>
                                                <div className="list-icons">
                                                    <Link to= "/CreateOrder" className="icon" ><i className="fas fa-edit icon"></i></Link >
                                                
                                                    <i className="fas fa-trash-alt icon" data-orderID={order._id} onClick ={remove}></i>
                                                    {/* <i className="fas fa-trash-alt icon" ></i> */}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                })}
                                
                            </li>
                    </ul> 
                    
                    <button className ="button"><Link to= "/CreateOrder">New Order</Link></button>
                    </div>
                
                </div>

                : <div>
                    <h3 style={{margin:'30px',fontFamily:'monospace', fontSize:'2rem',color:'teal'}}>You dont have any Orders Placed</h3>
                    <button className ="button"><Link to= "/CreateOrder">New Order</Link></button>
                  </div>

            : <div>
                <h3 style={{margin:'30px',fontFamily:'monospace', fontSize:'2rem'}}>Loading</h3>
              </div>
        }
    </>
       
    )
}


export default Section
