import React from 'react'
import type { Apartment } from '../types/types'
import { Link } from 'react-router-dom'

interface AptCardProps extends Apartment {
    children?: React.ReactNode
}

const AptCard = ({id,name,description, size, capacity,pricePerDay, image, children}: AptCardProps) => {
  return (
    <div
            className="card border-2 border-slate-600 mt-5 flex w-[500px]"
            key={id}
          >
            <figure>
              <img src={image} alt={name} />
            </figure>
            <div className="card-body p-5 w-[500px]">
                <Link to={`/apartment/${id}`}>
              <p className="text-3xl">
                {name} - {pricePerDay}€/day
              </p></Link>
              <p className="text-2xl">
                Size: {size} m² - Capacity: {capacity} guests
              </p>
              <p className="text-2xl">{description}</p>
              {children}
            </div>
            
          </div>
  )
}

export default AptCard