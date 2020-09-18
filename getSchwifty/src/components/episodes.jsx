import React from "react";
import axios from "axios";
import Slider from "./slider";

import seasonOneImage from "../assets/seasonOne.jpg";
import seasonTwoImage from "../assets/seasonTwo.jpeg";
import seasonThreeImage from "../assets/seasonThree.jpg";
import seasonFourImage from "../assets/seasonFour.jpg";

export default class episodeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodeList: [],
      seasonOne: [],
      seasonTwo: [],
      seasonThree: [],
      seasonFour: [],
      sliderOptions: {
        freeScroll: true,
        freeScrollFriction: 0.1,
        imagesLoaded: true,
        percentPosition: false,
        pageDots: false,
        prevNextButtons: false,
        cellAlign: "left"
      }
    };
    this.fetchApiData = this.fetchApiData.bind(this);
    this.seperateSeasons = this.seperateSeasons.bind(this);
  }
  componentDidMount() {
    this.fetchApiData(`https://rickandmortyapi.com/api/episode`);
  }

  render() {
    return (
      <div className="container">
        <p className="seasonTitle">Season One</p>
        <Slider className="slider" options={this.state.sliderOptions}>
          {this.state.seasonOne.map((episode, index) => (
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
        <p className="seasonTitle">Season Two</p>
        <Slider options={this.state.sliderOptions}>
          {this.state.seasonTwo.map((episode, index) => (
            <div className="seasonOne" key={index}>
              <img
                className="seasonImage"
                src={seasonTwoImage}
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
        <p className="seasonTitle">Season Three</p>
        <Slider options={this.state.sliderOptions}>
          {this.state.seasonThree.map((episode, index) => (
            <div className="seasonOne" key={index}>
              <img
                className="seasonImage"
                src={seasonThreeImage}
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
        <p className="seasonTitle">Season Four</p>
        <Slider options={this.state.sliderOptions}>
          {this.state.seasonFour.map((episode, index) => (
            <div className="seasonOne" key={index}>
              <img
                className="seasonImage"
                src={seasonFourImage}
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
        <br />
        <br />
        <br />
      </div>
    );
  }

  // utility functions

  fetchApiData(url) {
    axios.get(url).then((res) => {
      const episodeList = res.data.results;
      this.setState((prevState) => ({
        episodeList: prevState.episodeList.concat(episodeList)
      }));
      if (res.data.info.next) {
        this.fetchApiData(res.data.info.next);
      } else {
        this.seperateSeasons();
      }
    });
  }

  seperateSeasons() {
    this.state.episodeList.forEach((RMEpisode) => {
      if (RMEpisode.episode.includes("S01")) {
        this.setState((prevState) => ({
          seasonOne: prevState.seasonOne.concat(RMEpisode)
        }));
      } else if (RMEpisode.episode.includes("S02")) {
        this.setState((prevState) => ({
          seasonTwo: prevState.seasonTwo.concat(RMEpisode)
        }));
      } else if (RMEpisode.episode.includes("S03")) {
        this.setState((prevState) => ({
          seasonThree: prevState.seasonThree.concat(RMEpisode)
        }));
      } else if (RMEpisode.episode.includes("S04")) {
        this.setState((prevState) => ({
          seasonFour: prevState.seasonFour.concat(RMEpisode)
        }));
      } else return;
    });
  }
}
