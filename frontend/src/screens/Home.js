import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const [search, setsearch] = useState("");
  const [foodItem, setfoodItem] = useState([]);
  const [foodCat, setfoodCat] = useState([]);

  const loaddata = async () => {
    const response = await fetch("http://localhost:5000/api/foodata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setfoodItem(json[0]);
    setfoodCat(json[1]);
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousal-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    {
                      setsearch(e.target.value);
                    }
                  }}
                />
                {/* <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?veg-burger"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?veg-pizza"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?spring-roll"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row">
                <div key={data._id} className="fs-3 m-3 ">
                  {data.CategoryName}
                  <hr />
                  {foodItem.length !== 0 ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div key={filterItems._id}>
                            <div className="col-sm">
                              <Card
                                foodname={filterItems.name}
                                options={filterItems.options[0]}
                                imgsrc={filterItems.img}
                              ></Card>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div>no such data found</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>No categories available</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
