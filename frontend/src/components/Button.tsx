import React from "react"

export const Button = ({onClick, children}: {onClick: () =>  void, children: React.ReactElement}) => {
    return (
        <button className="w-full bg-green-500 py-3 font-mono text-2xl text-white font-bold rounded-md hover:bg-green-600" onClick={onClick}>
            {children}
        </button>
    )
}