import React, { Component } from "react";
import Header from "./Component/Header";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from "./Component/Footer";
import { Container } from "react-bootstrap";
import Homescreen from './Screens/HomeScreen'
import Productscreen from './Screens/Productscreen'
import Cart from './Screens/Cart'
import Whislist from "./Screens/Whislist";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";

export default class App extends Component {

  render() {

    return (
      <Router>
        <Header />
        <Container>
          <main>
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={Productscreen} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/wishlist" component={Whislist} />
            <Route path="/" component={Homescreen} exact />
          </main>
        </Container>
        <Footer />
      </Router>

    );
  }
}
