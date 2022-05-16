import React, {Component} from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../constants";

import GameList from "./components/StatsList";


class Stats extends Component {
    state = {
        games: [],
        players: []
    };
    componentDidMount() {
        this.resetState();
    }

    getGames = () => {
        axios.get(API_URL + "games/").then
        (res => this.setState({ games: res.data[1], players: res.data[0]}));
    };

    resetState = () => {
        this.getGames();
    };

    render() {
        return (
            <div className="data">
                <Container>
                    <Row>
                        LATEST GAMES
                    </Row>
                    <Row>
                        <Col>
                            <GameList
                                games={this.state.games}
                                players={this.state.players}
                                resetState={this.resetState}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Stats;