import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogNav = () => {
  return (
    <Navbar
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{ backgroundColor: "#A3C1D4" }}
    >
      <Navbar.Brand href="/" style={{ color: "white", marginLeft: "10px" }}>
        Blog Post App
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="d-flex justify-content-end"
      >
        <Nav>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link
            to="/create-blog"
            style={{ color: "white", textDecoration: "none" }}
          >
            Create Blog
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link
            to="/edit-blog"
            style={{ color: "white", textDecoration: "none" }}
          >
            Edit Blog
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BlogNav;
