import React, { Component } from "react";
import { getPokemon, update } from "../services/api_helper";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Pokemon: null,
      formData: {
        current_health: null
      }
    };
  }

  heal = current_health => {
    this.setState(prevState => ({
      formData: { ...prevState.current_health, current_health }
    }));
  };


  handleSubmit = async e => {
    e.preventDefault();
    let id = this.state.Pokemon[0].id;
    let health = this.state.Pokemon[0].health;
    let formData = this.state.formData;

    this.heal(health);

    let resp = await update(id, formData);
  };

  componentDidMount = async () => {
    let Pokemon = await getPokemon(localStorage.getItem("id"));
    this.setState({ Pokemon });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        {this.state.Pokemon && (
          <div className="pokemon">
            {this.state.Pokemon.map(pokemon => (
              <>
                <h1>{pokemon.name}</h1>
                <div className="pokemonContainer">
                  <div className="pokemonDetails">
                    <img src={pokemon.frontimage} />
                    <h4>LV: {pokemon.level}</h4>
                    <h4>
                      HP: {pokemon.current_health}{" "}
                      {pokemon.health > pokemon.current_health && (
                        <img
                          className="potion"
                          src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Potion-512.png"
                          onClick={e => this.handleSubmit(e)}
                        />
                      )}
                    </h4>
                  </div>
                  <div className="pokemonMoves">
                    {pokemon.moves.map(move => (
                      <h4>
                        {move.name}:{move.power}
                      </h4>
                    ))}
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Profile);

// import React, { Component } from "react";
// import { update } from "../services/api_helper";
// import { withRouter } from "react-router-dom";

// class Profile extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       formData: {
//         current_health: 340
//       }
//     };
//   }

//   change = current_health => {
//     this.setState({
//       broke: current_health,
//       formData: {
//         ...this.state.formData,
//         current_health
//       }
//     });
//   };

//   onClick = async props => {
//     let id = this.props.Pokemon[0].id;
//     let health = this.props.Pokemon[0].health;
//     console.log(health);
//     let formData = this.state.formData;
//     this.change(health);
//     console.log(this.state.formData.current_health);
//     let resp = await update(id, formData);

//     this.props.history.push("/main");
//   };

//   componentDidMount() {

//   }

//   render() {
//     return (
//       <div>
//         {this.props.Pokemon && (
//           <div className="pokemon">
//             {this.props.Pokemon.map(pokemon => (
//               <>
//                 <h1>{pokemon.name}</h1>
//                 <div className="pokemonContainer">
//                   <div className="pokemonDetails">
//                     <img src={pokemon.frontimage} />
//                     <h4>LV: {pokemon.level}</h4>
//                     <h4>
//                       HP: {pokemon.current_health}{" "}
//                       {pokemon.health > pokemon.current_health && (
//                         <img
//                           className="potion"
//                           src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Potion-512.png"
//                           onClick={() => this.onClick()}
//                         />
//                       )}
//                     </h4>
//                   </div>
//                   <div className="pokemonMoves">
//                     {pokemon.moves.map(move => (
//                       <h4>
//                         {move.name}:{move.power}
//                       </h4>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default withRouter(Profile);