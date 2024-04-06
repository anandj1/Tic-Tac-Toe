const boxes= document.querySelectorAll(".box");
const gamesinfo= document.querySelector(".info");
const newbtn= document.querySelector(".btn");
// declaration of variables that will be used further

let currentPlayer;
let gameGrid;     // helps to know the position of element in the grid
const winposition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// initialise the game
// grid=empty,x player's turn,new game btn hidden
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText="";

    });
    boxes.forEach((box,index)=>{
        box.innerText ="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`;
    });
    newbtn.classList.remove("active");
    gamesinfo.innerText= `Current Player -${currentPlayer}`;
}
initGame();

function swap(){
    if(currentPlayer==="X"){
        currentPlayer= "O";
    }
    else{
        currentPlayer="X";
    }
    gamesinfo.innerText = `Current Player -${currentPlayer}`;
}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        swap();
        boxes[index].style.pointerEvents="none";
        checkGameover();

    }

}
function checkGameover(){
    let answer ="";
    winposition.forEach((position) => {
        if((gameGrid[position[0]] !== ""|| gameGrid[position[1]]!==""||gameGrid[position[2]] !=="")
           && (gameGrid[position[0]]===gameGrid[position[1]])&& (gameGrid[position[1]]===gameGrid[position[2]])){

            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else
               answer="O";
    
               // to disable pointer events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }




    });
    if(answer!==""){
        gamesinfo.innerText =`Winner Player -${answer}`;
        newbtn.classList.add("active");
        return;
    }


    let fill =0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fill+=1;
        }
    });

    if(fill===9){
        gamesinfo.innerText ="Game Tied";
        newbtn.classList.add("active");
    }

 
}

boxes.forEach((box , index) => {
    box.addEventListener("click",function(){
        handleClick(index);

    })

});
newbtn.addEventListener("click",initGame);