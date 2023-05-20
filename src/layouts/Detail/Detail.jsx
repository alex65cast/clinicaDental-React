
import React, { useEffect } from 'react';
import "./Detail.css";

import { useSelector } from 'react-redux';
import { detailData } from '../detailSlice';
 
export const Detail = () => {

    //Instancio Redux en modo lectura

    const detailRdxData = useSelector(detailData);

    useEffect(()=> {
        console.log(detailRdxData)
    },[]);

     return (
         <div className='detailDesign'>{detailRdxData.data.name}</div>
     )
}
