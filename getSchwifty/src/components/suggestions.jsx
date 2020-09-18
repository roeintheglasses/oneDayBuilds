import React from "react";
import Slider from "./slider";
import seasonOneImage from "../assets/seasonOne.jpg";

const sliderOptions = {
  freeScroll: true,
  freeScrollFriction: 0.1,
  imagesLoaded: true,
  percentPosition: false,
  pageDots: false,
  prevNextButtons: false,
  cellAlign: "left"
};

function Suggestions(props) {
  return (
    <div className="container">
      <Slider options={sliderOptions}>
        {props.results.map((episode, index) => (
          <div className="seasonOne" key={index}>
            <img
              className="seasonImage"
              src={seasonOneImage}
              alt="season one cover"
            />
            <div className="text">
              <p>
                {episode.episode} : {episode.name}
              </p>
              <p> Air Date : {episode.air_date}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Suggestions;
