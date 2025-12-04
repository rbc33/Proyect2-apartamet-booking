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
    <div className="container mx-auto px-4 pb-10">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Apartment</h1>
      {apartment && (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label" htmlFor="name">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    className="input input-bordered"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="description">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label" htmlFor="capacity">
                      <span className="label-text">Capacity</span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label" htmlFor="pricePerDay">
                      <span className="label-text">Price per Day</span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="number"
                      id="pricePerDay"
                      name="pricePerDay"
                      value={pricePerDay}
                      onChange={(e) => setPricePerDay(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="size">
                    <span className="label-text">Size (m²)</span>
                  </label>
                  <input
                    className="input input-bordered"
                    type="number"
                    id="size"
                    name="size"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="image">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    className="input input-bordered"
                    type="text"
                    id="image"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary mt-4" type="submit">
                  Save Changes
                </button>
              </form>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-center">Preview</h2>
            <div className="sticky top-4">
              <AptCard apartment={{ ...apartment, name, description, capacity, pricePerDay, size, image }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditApartment;
