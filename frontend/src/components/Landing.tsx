import { useNavigate } from "react-router-dom"
import { Button } from "./Button";

export const Landing = () => {
    
    const navigate = useNavigate();

    return (
        <div className="pt-20 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-8">
                {/* Chess Board Image */}
                <div>
                    <img
                        src="ChessBoard.png" // Replace with the actual chessboard image path
                        alt="Chess Board"
                        className="w-full"
                    />
                </div>
                {/* Right Panel */}
                <div className="flex flex-col justify-center text-white">
                    <h1 className="text-3xl font-bold">Play Chess Online on the #3 Site!</h1>
                    <div className="mt-6">
                        <Button onClick={() => navigate('/game')}>
                            <div>Play Online</div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}