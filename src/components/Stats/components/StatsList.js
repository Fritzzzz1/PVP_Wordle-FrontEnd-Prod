import React, { Component } from "react";
import { Table } from "reactstrap";

class GameList extends Component {
    render() {
        const games = this.props.games;
        const players = this.props.players;

        return (
            <Table className="home-tables">
                <thead>
                <tr className="home-tables-head">
                    <th>Player</th>
                    <th className="home-tables-row">Secret</th>
                    <th className="home-tables-row">Guessed?</th>
                    <th className="home-tables-row">Score</th>
                </tr>
                </thead>
                <tbody>
                {!games || games.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>L O A D I N G . . . </b>
                        </td>
                    </tr>
                ) : (
                    games.map(game =>
                        <tr key={game.id} className="home-tables-body">
                            <td>{players[game.player]}</td>
                            <td className="home-tables-row secret-word">{game.secret}</td>
                            <td className={game.won ? "win home-tables-row" : "loss home-tables-row"}>
                                {game.won ? "V" : "-"}</td>
                            <td className={game.won ? "home-tables-row win" : "home-tables-row"}>{game.score}</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        );
    }
}

export default GameList;