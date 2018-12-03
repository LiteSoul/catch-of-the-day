import React from "react";

export default function EditFishForm({ fish, fishId,updateFish,deleteFish }) {
  const handleChange = e => {
    console.log(e.currentTarget.value);
    //update that fish
    //1. take a copy of the current fish
    const updatedFish = {
      ...fish,
      [e.currentTarget.name]: e.currentTarget.value
    };
		const updatedFullFish = { [fishId]: updatedFish }
		updateFish(updatedFullFish)
  };

  return (
    <div className="fish-edit">
      <input
        type="text"
        name="name"
        value={fish.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        value={fish.price}
        onChange={handleChange}
      />
      <select name="status" value={fish.status} onChange={handleChange}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" value={fish.desc} onChange={handleChange} />
      <input
        type="text"
        name="image"
        value={fish.image}
        onChange={handleChange}
      />
      <button onClick={()=>deleteFish(fishId)}>Delete Fish</button>
    </div>
  );
}
