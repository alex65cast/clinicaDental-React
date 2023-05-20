
import React from 'react';
import './CharacterCard.css';

export const CharacterCard = ({name, status, species, gender, image}) => {

    return (
        <div className='cardDesign'>
            <div>{name}</div>
            <div>{status}</div>
            <div>{species}</div>
            <div>{gender}</div>
            <div>
                <img className='imageAvatarDesign' src={image} alt={name}/>
            </div>

        </div>
    )
}