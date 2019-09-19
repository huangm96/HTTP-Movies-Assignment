import React, { useState } from "react";
import axios from "axios";
const MovieUpdateForm = props => {
  console.log(props);
  const { title, director, metascore, stars } = props.movie;

  const [form, setForm] = useState({
    id: props.match.params.id,
    title: title,
    director: director,
    metascore: metascore,
    stars: stars
  });
  console.log(form);
  const [star, setStar] = useState("");
  const [newStar, setNewStar] = useState("");
  const handleChange = e => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //   const handleStarsChange = e => {
  //       e.preventDefault();
  //       setStar( e.target.value);

  //       //setForm({ ...form, stars: [...form.stars, star] });
  //   };
  //   const addMoreStars = e => {
  //     e.preventDefault();
  //     setForm({ ...form, stars: [...form.stars, star] });

  //     setStar('');

  //     console.log(form.stars);
  //   };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("form info", form);

    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, form)
        .then(res => {
           props.history.push(
            "/"
           );
        })
      .catch(err => console.log(err.response));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="info-input">
          <label>Title</label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            value={form.title}
          />
        </div>
        <div className="info-input">
          <label>Director</label>
          <input
            onChange={handleChange}
            type="text"
            name="director"
            value={form.director}
          />
        </div>
        <div className="info-input">
          <label>Metascore</label>
          <input
            onChange={handleChange}
            type="number"
            name="metascore"
            value={form.metascore}
          />
        </div>
        {/* <div className="info-input">
                  <label>Stars</label>
                  {stars.map(s => {
                     return <input
            onChange={handleChange}
            type="text"
            name="star"
            value= {s}
          />
                  })}
          
         
        </div> */}
        <button type="submit">Edit</button>
      </form>
    </>
  );
};

export default MovieUpdateForm;
