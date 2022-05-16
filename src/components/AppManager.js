import '../App.css';
import Game from "./Game/Game";
import Players from "./Players/Players";
import Stats from "./Stats/Stats";
import AuthService from "../services/auth.service";
import SignIn from "./Login/SignIn";
import SignUp from "./Login/SignUp";
import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import { isDesktop } from "react-device-detect";

export default function AppManager() {
    const {showGame, setShowGame, showSignUp, setShowSignUp, currentUser, setCurrentUser} = useContext(AppContext);

    useEffect(() => {
        if (!currentUser || currentUser.username !== "guest") {
            const user = AuthService.getCurrentUser();
            if (user) {
                setCurrentUser(user);
                setShowGame(true);
            }
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        window.location.reload();
    };
    const signUp = () => {
        setShowSignUp(true);
    };

    return (
        <div className="App">
            <nav className="navbar nav-justified">
                <h1>Wordle Domination</h1>
                { currentUser && currentUser.username !== "guest" ? (
                    <span className="nav-user">
                        <div>
                            Player : {currentUser.username}
                        </div>
                        <a href="components/AppManager#" onClick={logOut}>
                            LogOut
                        </a>
                    </span>
                ) : (
                    <span>
                        { isDesktop? (
                            <div className="nav-user">
                                <div>Player : Guest</div>
                                <a href="components/AppManager#" onClick={signUp}>
                                    SignUp
                                </a>
                            </div>
                            ) : (
                            <div>
                                On Mobile
                            </div>
                            )}
                    </span>
                        )}
            </nav>
            { isDesktop ? (
                <div className="viewport">
                    <Players/>
                    { showGame ? <Game/> : showSignUp ? <SignUp/> : <SignIn/> }
                    <Stats/>
                </div>
            ) : (
                <div>
                    <br/>
                    <h2>The game is currently not supported on mobile... but here are the stats!</h2>
                    <br/>
                    <Players/>
                    <br/>
                    <Stats/>
                    <br/>
                </div>
            )
            }
        </div>

    );
};
