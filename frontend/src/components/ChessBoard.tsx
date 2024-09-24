import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "./Game";

export const ChessBoard = ({ board, socket, setBoard, chess }:
    { board: ({ square: Square; type: PieceSymbol; color: Color; } | null)[][]; socket: WebSocket; setBoard: any; chess: any; }) => {

    const [from, setFrom] = useState<null | Square>(null);

    return (
        <div className="text-white">
            {board.map((row, i) => {
                return (
                    <div key={i} className="flex">
                        {row.map((square, j) => {
                            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
                            return (
                                <div onClick={() => {
                                    if (!from) setFrom(squareRepresentation);
                                    else {
                                        socket.send(JSON.stringify({
                                            type: MOVE,
                                            payload: {
                                                move: {
                                                    from,
                                                    to: squareRepresentation
                                                }
                                            }
                                        }))
                                        setFrom(null);
                                        chess.move({
                                            from,
                                            to: squareRepresentation
                                        });
                                        setBoard(chess.board());
                                        console.log(`From`, from);
                                        console.log(`To`, squareRepresentation);
                                    }
                                }} key={j} className={`w-24 h-24 text-black ${(i + j) % 2 == 0 ? 'bg-orange-100' : 'bg-green-800'}`}>
                                    <div className="w-full h-full flex justify-center items-center">
                                        {square ? <img className="w-14" 
                                                       src={` ChessPieces/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} Copy`}.png`} /> : null
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}