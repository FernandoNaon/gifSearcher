import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import "./Gifs.css";

const Gif = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "Y3cprhPq3uC7dX7TRUTpMcmwR6lFrA3W",
            limit: 100,
          },
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setError(true);
        setTimeout(() => setError(false), 4000);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const renderGifs = () => {
    if (loading) {
      return <Loader />;
    }
    return data.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} alt="Gif" />
        </div>
      );
    });
  };
  const renderError = () => {
    if (error) {
      return (
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Technical difficulties, please try in a few minutes.
        </div>
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "Y3cprhPq3uC7dX7TRUTpMcmwR6lFrA3W",
          q: search,
          limit: 100,
        },
      });
      setData(results.data.data);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 4000);
    }

    setLoading(false);
  };
  return (
    <div>
      <div>{renderError()}</div>
      <form className="form">
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search..."
          className="input"
        />
        <button onClick={handleSubmit} type="submit" className="btn">
          GO!
        </button>
      </form>
      <div className="container">
        <h3 className="gifs">{renderGifs()}</h3>
      </div>
    </div>
  );
};

export default Gif;
