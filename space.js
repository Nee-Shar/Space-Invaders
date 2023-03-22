//board
let tileSize=32;
let rows=16;
let columns=16;

let board;
let boardWidth=tileSize*columns;
let boardHeight=tileSize*rows;
let context;






let shipWidth=tileSize*2;
let shipHeight=tileSize;
let shipX=tileSize*columns/2-tileSize;

let shipY=tileSize*rows-tileSize*2;

let ship={
    x:shipX,
    y:shipY,
    width:shipWidth,
    height:shipHeight 
}


let shipImg;

//aliens
let shipVelocity=tileSize; //Vel is equal 1 tile /sec
let alienArray=[];
let alienWidth=tileSize*2;
let alienHeight=tileSize;
let alienX=tileSize;
let alienY=tileSize;
let alienImg;

alienImg=new Image();
alienImg.src="./alien-cyan.png"

let alienRows=2;
let alienColumns=3;
let alienCount=0; // No of ALiens to defeat
let alienVelocityX=3;
let cnt=1;



//bullets
let bulletArray=[];
let bulletVelocity=-10;//we're moving bullet up


let score=0;
let gameOver=false;











window.addEventListener('load',()=>{
    board=document.getElementById("board");
    board.width=boardWidth;
    board.height=boardHeight;
    context=board.getContext("2d");//used for drawing on board
    

    //draw initial ship
    // context.fillStyle="green";
    // context.fillRect(ship.x,ship.y,ship.width,ship.height);
//Load SHip
shipImg=new Image();
shipImg.src="./ship.png";





//Ship Can MOve only in X size











shipImg.addEventListener('load',()=>{    
context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height);
}

 );

createAliens();



requestAnimationFrame(update);
document.addEventListener("keydown",moveShip);

document.addEventListener("keyup",shoot);//key is released 
document.addEventListener("click",shoot);//key is released 


});


function update(){
requestAnimationFrame(update);
if(gameOver)
 { 
    document.getElementById("Sc").innerText=`Game Over: ${score}`;
    // document.getElementbyId("form").style.visibility="visible";
    
  document.getElementById("Hs").style.visibility="visible";
  
  document.getElementById("rec").style.visibility="visible";
    return;
}

context.clearRect(0,0,board.width,board.height);
//draw ship over and over again
context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height);

//Aliens

for(let i=0;i<alienArray.length;i++){
    let alien=alienArray[i];
    if(alien.alive){
        alien.x+=alienVelocityX;

//if ALien Touches border reverse direction of vel
if(alien.x+alien.width>=board.width || alien.x<=0){
alienVelocityX*=-1;
alien.x+=alienVelocityX*2;
cnt++;
if(cnt%2==0)alienImg.src="./alien-yellow.png";

else if(cnt%2!=0 && cnt%3!=0) alienImg.src="./alien-cyan.png";
else if(cnt%2!=0 && cnt%3==0) alienImg.src="./alien-magenta.png";
 for(let j=0;j<alienArray.length;j++){
    alienArray[j].y+=alienHeight;
}

}
        context.drawImage(alienImg,alien.x,alien.y,alien.width,alien.height);
if(alien.y>=ship.y) {
    
document.getElementById("Sc").innerText=`Game Over: ${score}`;
gameOver=true;
}
    }

}

//bullets
for(let i=0;i<bulletArray.length;i++){
    let bullet=bulletArray[i];
    bullet.y+=bulletVelocity;
    if(cnt % 2==0)
    context.fillStyle="white";
    else context.fillStyle="blue";

    context.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);
//bullet collioson
for(let j=0;j<alienArray.length;j++){
    let alien=alienArray[j ];
    if(!bullet.used && alien.alive && detectCollision(bullet,alien)){
        bullet.used=true;
        alien.alive=false;
        alienCount--;
        score+=50;
    }
}





}



//clear bullet
while(bulletArray.length>0 && (bulletArray[0].used|| bulletArray[0].y<0)){
bulletArray.shift();
}



//next level
if(alienCount==0){
    var audio = new Audio('level-up.mp3');
    audio.play();
    //inc the no of aliens in row and columns
    alienColumns=Math.min(alienColumns+1,columns/2-2);
    alienRows=Math.min(alienRows+1,rows-4);
   alienVelocityX+=0.2; //inc speed at each level
   alienArray=[];
   bulletArray=[];
   createAliens(); 
}
//score
document.getElementById("Sc").innerText=score;

context.fillStyle="white";
context.font="16px courier";
context.fillText(score,5,20);

}

function moveShip(e){
    if(gameOver) {
        
        document.getElementById("Sc").innerText=`Game Over: ${score}`;

        document.getElementById("Hs").style.visibility="visible";
        
  document.getElementById("rec").style.visibility="visible";


        return;
    }
    if(e.code=="ArrowLeft" && ship.x-shipVelocity>=0) {
        ship.x-=shipVelocity; //MOve one tile left
    }
    else if(e.code=="ArrowRight" && ship.x+shipVelocity+ship.width<=board.width) {
        ship.x+=shipVelocity;//,pve one right
    }
}

function createAliens(){
 
    
for(let c=0;c<alienColumns;c++){
    for(let r=0;r<alienRows;r++){
        let alien={alienImg,
        x:alienX+c*alienWidth,
        y:alienY+r*alienHeight,
        width:alienWidth,
        height:alienHeight,
        alive:true

        }
        alienArray.push(alien);
    }
}


alienCount=alienArray.length;


}

function shoot(e){
if(gameOver) {
 
       document.getElementById("Sc").innerText=`Game Over: ${score}`;
     
  document.getElementById("Hs").style.visibility="visible";
  
  document.getElementById("rec").style.visibility="visible";

    return;}

    if(e.code=="Space" || e.code=="Enter" || e.type=="click"){
        //shoot
        let bullet={
            x:ship.x+shipWidth*15/32,
            y:ship.y,
            width:tileSize/8,
            height:tileSize/2,
            used:false
        }

        bulletArray.push(bullet);
    }

}


function detectCollision(a,b){
    return(a.x<b.x+b.width && 
        a.x+a.width>b.x &&
        a.y<b.y+b.height &&
        a.y+a.height>b.y);

}



// document.getElementById("rec").addEventListener("click",()=>
// {
//     document.getElementById("table").style.visibility="visible";
// })
