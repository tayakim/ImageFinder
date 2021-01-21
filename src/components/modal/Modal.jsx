import React, { Component, createRef } from "react";
import styles from "../modal/modal.module.css";
import { createPortal } from "react-dom";

const modal_root = document.querySelector("#modal-root");

export default class Modal extends Component {
  backdrop = createRef();

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    console.log(e);
    if (e.code !== "Escape") {
      return;
    }

    this.props.onClose();
  };

  onHandleBackdropClick = (e) => {
    if (this.backdrop.current && e.target !== this.backdrop.current) {
      return;
    }
    this.props.onClose();
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div
        className={styles.Overlay}
        ref={this.backdrop}
        onClick={this.props.onClose}
        role="presentation"
      >
        <div className={styles.Modal}>
          <img src="" alt="" />
          {children}
        </div>
      </div>,
      modal_root
    );
  }
}
