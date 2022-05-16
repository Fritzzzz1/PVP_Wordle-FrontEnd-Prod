import React, { Component } from "react";
import { Table } from "reactstrap";


class PlayerList extends Component {
    render() {
        const players = this.props.players;
        return (
            <Table className="home-tables">
                <thead>
                <tr className="home-tables-head">
                    <th>Player</th>
                    <th className="home-tables-row">Games</th>
                    <th className="home-tables-row">Score</th>
                </tr>
                </thead>
                <tbody>
                {!players || players.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>L O A D I N G . . . </b>
                        </td>
                    </tr>
                ) : (
                    players.map(player =>
                        <tr key={player.pk} className="home-tables-body leaderboard-body">
                            <td>{player.username}</td>
                            <td className="home-tables-row">{player.games}</td>
                            <td className="home-tables-row">{player.score}</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        );
    }
}

export default PlayerList;