import { useState } from "react";

// ctrl + shift + k | delete 1 line

// harus huruf capital awalnya
// value dari squares
// setiap mau lifting state up taro di parimeter
// kalau lebih dari 1 pakai {}




function Square ({value , onSquareClick}) {



  return <button className="square" onClick={onSquareClick}>{value}</button>
}



 function Board({xIsNext , squares , onPlay}) {


function handleClick(i) {
// slice tanpa parimeter membuat array yang sama persis .slice(mulai,akhir)
  const nextSquares = squares.slice()
  if (squares[i] || calculateWinner(squares)) return

  if (xIsNext){
  nextSquares[i] = 'X'
}else{
  nextSquares[i] = 'O'
}
onPlay(nextSquares)
}

// display winner
const winner = calculateWinner(squares)
let status = ""
if (winner){
  status = winner + " is the Winner"
}else{
  status = "STATUS : now " + (xIsNext ? 'X' : 'O') + " turn"
}


// kalau function dikasih ( ) maka akan dieksekusi saat dibuka applikasinya
// agar tidak memakai () harus dimasukan ke function agar singkat memakai arrow function
// immutablelity dianjurkan membuat array baru untuk menyimpan data yang baru
  return ( 
<>
<div className="status">{status}</div>
  <div className="board">
  <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
  <Square value={squares[1]}  onSquareClick={() => handleClick(1)}/>
  <Square value={squares[2]}  onSquareClick={() => handleClick(2)}/>
  <Square value={squares[3]}  onSquareClick={() => handleClick(3)}/>
  <Square value={squares[4]}  onSquareClick={() => handleClick(4)}/>
  <Square value={squares[5]}  onSquareClick={() => handleClick(5)}/>
  <Square value={squares[6]}  onSquareClick={() => handleClick(6)}/>
  <Square value={squares[7]}  onSquareClick={() => handleClick(7)}/>
  <Square value={squares[8]}  onSquareClick={() => handleClick(8)}/>
  </div>
  </>
  )
}

export default function Game () {
  const [history,setHistory] = useState([Array(9).fill(null)])
  const [currentMove , setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0
function jumpTo (nextMove){
  setCurrentMove(nextMove)
}




  function handlePlay(nextSquares) {

    const nextHistory = [ ...history.slice(0,currentMove + 1),nextSquares]

    setHistory(nextHistory)
    setCurrentMove(nextHistory.length -1 )
  }

const moves = history.map((squares,move)=> {
  let description = ''
  if(move > 0 ){
    description = "Moves #" + move
  }else{
    description = "RESTART"
  }

  return ( 
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  )
})

  return (
    <>
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
   
    </>
  )
}

// squares yang diambil dari board
function calculateWinner (squares) {

const lines = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
for (let i = 0 ;i < lines.length ; i++ ){
  // destructuring
  const [a,b,c] = lines[i]

  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
    return squares[a]
  }
  
  // const a = lines[i][0]
  // const b = lines[i][1]
  // const c = lines[i][2]
  // 
}

return false

}

