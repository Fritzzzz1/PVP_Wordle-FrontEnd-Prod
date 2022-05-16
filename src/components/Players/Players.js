import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../constants";

import PlayerList from "./components/PlayerList";

class Players extends Component {
    state = {
        players: []
    };

    componentDidMount() {
        this.resetState();
    }

    getPlayers = () => {
        axios.get(API_URL + "players/").then(res => this.setState({ players: res.data }));
    };

    resetState = () => {
        this.getPlayers();
    };

    render() {
        return (
            <div className="leaderboard">
                <Container>
                    <Row>
                        LEADERBOARDS
                    </Row>
                    <Row>
                        <Col>
                            <PlayerList
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

export default Players;