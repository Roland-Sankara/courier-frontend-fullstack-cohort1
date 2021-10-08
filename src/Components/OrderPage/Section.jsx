import React,{ useEffect, useState} from 'react'
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
        console.log(result);
        alert(result);
        window.location.pathname = '/OrderPage';
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
                                        <div key={order._id+10}>
                                            <div key={order._id} className ="item">
                                                <p key={order._id+1}>{order.itemname}</p>
                                                <p key={order._id+2}>{order.sendersname}</p>
                                                <p key={order._id+3}>{order.senderscontact}</p>
                                                <p key={order._id+4}>{order.receiversname}</p>
                                                <p key={order._id+5}>{order.receiverscontact}</p>
                                                <p key={order._id+6}>{order.receiverslocation}</p>
                                                <div key={order._id+7} className="list-icons">
                                                    <Link key={order._id+8} to= "/CreateOrder" className="icon" ><i className="fas fa-edit icon"></i></Link >
                                                
                                                    <i key={order._id+9} className="fas fa-trash-alt icon" data-orderid={order._id} onClick ={remove}></i>
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
