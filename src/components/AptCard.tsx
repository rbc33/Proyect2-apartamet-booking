import React from 'react'
import type { Apartment } from '../types/types'
import { Link } from 'react-router-dom'

interface AptCardProps {
  apartment: Apartment
  children?: React.ReactNode
}

const AptCard = ({ apartment, children }: AptCardProps) => {
  const { id, name, description, size, capacity, pricePerDay, image } = apartment
  return (
    <div className="card border-2 border-slate-600 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg">
      <figure>
        {id ? (
          <Link to={`/apartment/${id}`} className="w-full h-64 overflow-hidden">
            {(image && name) && <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />}
          </Link>
        ) : (
          <div className="w-full h-64 overflow-hidden">
            {(image && name) && 
<img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />}
          </div>
        )}
      </figure>
      <div className="card-body">
        {id ? (
          <Link to={`/apartment/${id}`}>
            <h2 className="card-title hover:text-primary transition-colors">
              {name}
              <div className="badge badge-secondary">{pricePerDay}€/day</div>
            </h2>
          </Link>
        ) : (
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">{pricePerDay}€/day</div>
          </h2>
        )}
        <div className="flex gap-2 text-sm text-base-content/70">
          <span>Size: {size} m²</span>
          <span>•</span>
          <span>Capacity: {capacity} guests</span>
        </div>
        <p className="line-clamp-3">{description}</p>
        {children && <div className="card-actions justify-end mt-4">{children}</div>}
      </div>
    </div>
  )
}

export default AptCard