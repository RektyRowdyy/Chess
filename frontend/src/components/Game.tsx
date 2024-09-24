import { Button } from "./Button"
import { ChessBoard } from "./ChessBoard"
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over"

export const Game = () => {

    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
                    console.log(`Game Initialized`);
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log(`Move made`);
                    break;
                case GAME_OVER:
                    break;
            }
        }
    }, [socket]);
    if (!socket) return <div>Connecting.....</div>

    return (
        <div className="flex justify-center ">
            <div className="pt-8 w-full">
                <div className="grid grid-cols-2">
                    <div className="w-full flex justify-center">
                        <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
                    </div>
                    <div className="mr-32 bg-stone-700 rounded-lg">
                        <div className="mt-60 space-y-10 p-20">
                            {!started && <Button onClick={() => {
                                socket.send(JSON.stringify({
                                    type: INIT_GAME
                                }))
                            }} >
                                <div>Start Game</div>
                            </Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}