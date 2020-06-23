import React from "react";

function App() {
  return (
    <>
      <header>
        <div class="hero-text">
          <h1>Discover and Search Your Favourite Movies</h1>
          <input type="search" placeholder="Search for a movie"></input>
          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </header>
      <main>
        <ul>
          <li>
            <img src="https://via.placeholder.com/300" alt="movie one" />
          </li>
          <li>
            <img src="https://via.placeholder.com/300" alt="movie two" />
          </li>
          <li>
            <img src="https://via.placeholder.com/300" alt="movie one" />
          </li>
          <li>
            <img src="https://via.placeholder.com/300" alt="movie two" />
          </li>
        </ul>
      </main>
    </>
  );
}

export default App;
