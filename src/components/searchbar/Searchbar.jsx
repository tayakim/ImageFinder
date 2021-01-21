import React, { Component } from "react";
import styles from "../searchbar/searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    search: "",
  };

  onHandleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.search);
    this.setState({ search: "" });
  };
  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.onHandleSubmit}>
          <button type="submit" className={styles.SearchForm_button}>
            <span className={styles.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onHandleChange}
            name="search"
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}
