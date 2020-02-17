import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import NewUser from "./NewUser";
import { getPokemon, getMoves } from "../services/api_helper";
import ShowPokemon from "./ShowPokemon";
import Pokedex from "./Pokedex";
import Battle from "./battle";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownPokemon: null,
      id: ""
    };
  }

  greetings = greet => {
    this.props.greetings(greet);
  };

  componentDidMount = async () => {
    console.log("CHECK!!!!");
    this.setState({ id: this.props.id });
    console.log(localStorage.getItem("id"));
    let ownPokemon = await getPokemon(localStorage.getItem("id"));
    this.setState({ ownPokemon });
    if (ownPokemon.length !== 0 && ownPokemon) {
      this.props.history.push("/profile");
    } else {
      this.props.history.push("/newuser");
    }
  };

  render() {
    return (
      <div className="main">
        <main>
          <Route
            path="/pokedex"
            render={() => (
              <Pokedex
              // greetings={() => this.greetings()}
              />
            )}
          />
          <Route
            path="/newuser"
            render={() => (
              <NewUser
              // greetings={() => this.greetings()}
              />
            )}
          />
          <Route
            path="/profile"
            render={() => (
              <ShowPokemon
                // greetings={() => this.greetings()}
                Pokemon={this.state.ownPokemon}
              />
            )}
          />
          <Route path="/battle" render={() => <Battle />} />
        </main>
      </div>
    );
  }
}

export default withRouter(Main);
