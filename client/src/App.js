import React, { useState } from "react";
import { Route} from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdateForm from "./Movies/MovieUpdateForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [editMovie, setEditMovie] = useState();
  const [deletedMovie, setDeletedMovie] = useState();

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  
  const getEditMovieInfo = movie => {
    setEditMovie(movie)
    console.log(movie)

  }
const getDeletedMovieInfo = movie => {
 setDeletedMovie(movie);
  console.log(movie);
};
  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route exact
        path="/movies/:id"
        render={props => {
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              getEditMovieInfo={getEditMovieInfo}
              getDeletedMovieInfo={getDeletedMovieInfo}
            />
          );
        }}
      />
      <Route
        exact
        path="/update-movie/:id"
        render={props => {
          return <MovieUpdateForm {...props} movie={editMovie}/>;
        }}
      />
    </>
  );
};

export default App;
