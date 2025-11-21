import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Apartment } from "../types/types";
import { BASE_URL } from "./NewBooking";
import AptCard from "../components/AptCard";

const EditApartment = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [apartment, setApartment] = useState<Apartment | undefined>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [size, setSize] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchApt = async () => {
      const response = await fetch(BASE_URL + `/apartments/${id}`);
      const data = await response.json();
      console.log(data);
      setApartment(data);
      setName(data.name);
      setDescription(data.description);
      setCapacity(data.capacity);
      setPricePerDay(data.pricePerDay);
      setSize(data.size);
      setImage(data.image);
    };
    fetchApt();
  }, [id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apartment) return;
    const updatedApartment = {
      ...apartment,
      name,
      description,
      capacity,
      pricePerDay,
      size,
      image,
    };
    try {
      const response = await fetch(BASE_URL + `/apartments/${apartment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApartment),

      });
      if (response.ok) {
        const data = await response.json();
        console.log("Apartment updated successfully:", data);
        navigate(`/apartment/${apartment.id}`)
      } else {
        console.error("Failed to update apartment");
      }
    } catch (error) {
      console.error("Error updating apartment:", error);
    }
    
  };
  return (
    <>
      {apartment && (
        <div className="flex gap-40">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start  gap-2">
              <label htmlFor="name">Name:</label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start  gap-2">
              <label htmlFor="description">Description:</label>
              <textarea
                className="textarea"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start  gap-2">
              <label htmlFor="capacity">Capacity:</label>
              <input
                className="input"
                type="number"
                id="capacity"
                name="capacity"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col items-start  gap-2">
              <label htmlFor="pricePerDay">Price per Day:</label>
              <input
                className="input"
                type="number"
                id="pricePerDay"
                name="pricePerDay"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col items-start  gap-2">
              <label htmlFor="size">Size (m²):</label>
              <input
                className="input"
                type="number"
                id="size"
                name="size"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col items-start  gap-2">
              <label htmlFor="image">Image URL:</label>
              <input
                className="input"
                type="text"
                id="image"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <button className="btn btn-primary mt-5" type="submit">
              Save Changes
            </button>
          </form>
        <AptCard id={apartment.id} name={name} description={description} size={size} capacity={capacity} pricePerDay={pricePerDay} image={image} />
        </div>
      )}
    </>
  );
};

export default EditApartment;
