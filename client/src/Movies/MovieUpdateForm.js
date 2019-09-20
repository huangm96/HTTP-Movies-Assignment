import React, { useState } from "react";
import axios from "axios";
const MovieUpdateForm = props => {
  console.log(props);
  const { title, director, metascore, stars } = props.movie;

  const [form, setForm] = useState({
    id: parseInt(props.match.params.id),
    title: title,
    director: director,
    metascore: metascore,
    stars: stars
  });
  console.log(form);
  const [starsList, setStarsList] = useState(stars);
  const [newStar, setNewStar] = useState("");

  const handleChange = e => {
    e.preventDefault();
    if (e.target.name !== "metascore") {
      setForm({ ...form, [e.target.name]: e.target.value });
    } else {
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
    }
  };

  const handleStarChange = e => {
    e.preventDefault();
    setNewStar(e.target.value);
    console.log(newStar);
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, form)
      .then(res => {
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="info-input-container">
          <label>Title: </label>
          <input
            className="info-input"
            onChange={handleChange}
            type="text"
            name="title"
            value={form.title}
          />
        </div>
        <div className="info-input-container">
          <label>Director: </label>
          <input
            className="info-input"
            onChange={handleChange}
            type="text"
            name="director"
            value={form.director}
          />
        </div>
        <div className="info-input-container">
          <label>Metascore: </label>
          <input
            className="info-input"
            onChange={handleChange}
            type="number"
            name="metascore"
            value={form.metascore}
          />
        </div>
        <div className="stars-info-input-container">
          <div className="info-input-container">
            <label>Stars: </label>

            <div className="stars-list">
              {starsList.map(star => {
                return (
                  <input
                    className="info-input"
                    onChange={handleStarChange}
                    type="text"
                    name="star"
                    value={star}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <button className="button-edit" type="submit">
          Edit
        </button>
      </form>
    </>
  );
};

export default MovieUpdateForm;
