
import './Grid.css';
import {React, useState } from 'react';

const Grid = () => {

    const [turn, setTurn] = useState('X');

    const [boxes, setBoxes] = useState(Array(9).fill(""));

    const [winner, setWinner] = useState();

    const win = (squares) => {
        let patterns = {
            across:[
                [0,1,2],
                [3,4,5],
                [6,7,8],
            ],
            down:[
                [0,3,6],
                [1,4,7],
                [2,5,8],
            ],
            diagnol:[
                [0,4,8],
                [2,4,6],
            ]
        };

        for (let pattern in patterns) {
            patterns[pattern].forEach((pattern)=>{
                //we need this so it doesn't permentantly check which leads it to bug out
                if( squares[pattern[0]]==="" ||
                    squares[pattern[1]]==="" ||
                    squares[pattern[2]]===""
                ){

                } 
                
                else if(squares[pattern[0]]===squares[pattern[1]] &&
                            squares[pattern[1]]===squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]]);
                }
            });
        }
    }

    const handleRestart = () => {
        setWinner(null);
        setBoxes(Array(9).fill(""));
    }

    const handleClick = (num) => {

        if(boxes[num] !== ''){
            alert('Box already has an element. Play some where else!');
            let og = false;
            for (let box in boxes) {
                if(box===""){
                    og = true;
                }
            }
            console.log(og);
            if(og===false){
                setWinner("No one");
            }
            return;
        }

        let squares = [...boxes];

        if (turn === "X"){
            squares[num]="X";
            setTurn("O");
        }else{
            squares[num]="O";
            setTurn("X");
        }

        setBoxes(squares);
        win(squares);
    }

    const Box = ({num}) =>{
        return <td onClick={()=> handleClick(num)}>{boxes[num]}</td>
    }

  return (
    <div>
        <div>
            <h1>Simple Tic Tac Toe</h1>
            <h5>By: Owen</h5>
        </div>
        <div className='container'>
            <table>
                Turn: {turn}
                <tbody>
                    <tr>
                        <Box num={0}/>
                        <Box num={1}/>
                        <Box num={2}/>
                    </tr>
                    <tr>
                        <Box num={3}/>
                        <Box num={4}/>
                        <Box num={5}/>
                    </tr>
                    <tr>
                        <Box num={6}/>
                        <Box num={7}/>
                        <Box num={8}/>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            {
                winner && (
                    <div>
                        <h3>{winner} won the match!</h3>
                        <button className="restartButton" onClick={()=>handleRestart()}>Restart</button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Grid