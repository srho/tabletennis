import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';
import AddPlayer from './AddPlayer';
import MainNav from './MainNav';

/* Main Component */
class Main extends Component {

    constructor() {

        super();
        //Initialize the state in the constructor
        this.state = {
            players: [],
            currentPlayer: null

        }
        this.handleAddPlayer = this.handleAddPlayer.bind(this);
    }
    /*componentDidMount() is a lifecycle method
     * that gets called after the component is rendered
     */
    componentDidMount() {
        /* fetch API in action */
        fetch('/api/player')
            .then(response => {
            return response.json();
        })
        .then(players => {
                //Fetched player is stored in the state
                this.setState({ players });
        });
    }

    renderPlayers() {
        const listStyle = {
            listStyle: 'none',
            fontSize: '18px',
            lineHeight: '1.8em',
        }
        return this.state.players.map(player => {
                return (
            /* When using list you need to specify a key
             * attribute that is unique for each list item
            */
            <li style={listStyle} onClick={
        () =>this.handleClick(player)} key={player.id} >
        { player.name }
    </li>
    );
    })
    }

    handleClick(player) {

        //handleClick is used to set the state
        this.setState({currentPlayer:player});

    }

    handleAddPlayer(player) {

        //player.price = Number(player.price);
        /*Fetch API for post request */
        fetch( 'api/player/', {
            method:'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(player)
        })
            .then(response => {
            return response.json();
    })
    .then( data => {

            this.setState((prevState)=> ({
            players: prevState.players.concat(data),
            currentPlayer : data
        }))
    })
        //update the state of players and currentPlayer
    }

    render() {


        const mainDivStyle =  {

            display: "flex",
            flexDirection: "row"
        }

        const divStyle = {

            justifyContent: "flex-start",
            padding: '10px',
            width: '35%',
            background: '#f0f0f0',
            padding: '20px 20px 20px 20px',
            margin: '30px 10px 10px 30px'

        }

        return (

            <div>
            <MainNav></MainNav>
                <div style= {mainDivStyle}>
                    <div style={divStyle}>

                        <h3> players </h3>
                        <ul>
                            { this.renderPlayers() }
                        </ul>
                     </div>
                    <Player player={this.state.currentPlayer} />

                    <AddPlayer onAdd={this.handleAddPlayer} />
                </div>
            </div>
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component
 * on pages that have a div with an ID of "root";
 */

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}