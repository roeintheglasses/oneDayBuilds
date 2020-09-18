import React, { Component } from "react";
import axios from "axios";
import Suggestions from "./suggestions";

const API_URL = "https://rickandmortyapi.com/api/episode/?name=";

class Search extends Component {
  state = {
    query: "",
    results: [],
    error: false,
    searchEmpty: true
  };

  getInfo = () => {
    axios
      .get(`${API_URL}${this.state.query}`)
      .then(({ data }) => {
        this.setState({
          results: data.results
        });
      })
      .catch((err) => {
        this.setState({
          error: true
        });
        this.setState({
          results: []
        });
      });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        } else {
          this.setState({
            results: [],
            error: false
          });
        }
      }
    );
  };

  render() {
    return (
      <div className="container">
        <label className="search-label" htmlFor="search-input">
          <input
            placeholder="Search for episodes here"
            ref={(input) => (this.search = input)}
            onChange={this.handleInputChange}
          />
          <i className="fa fa-search search-icon" />
        </label>
        {this.state.results && <Suggestions results={this.state.results} />}
        {this.state.error && <p className="error">Opps, Nothing found!</p>}
      </div>
    );
  }
}

export default Search;
