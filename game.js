let canvas;
let context;
let request_id;
let floor;
let fpsInterval=1000/30; // the denominator is frames per second
let now;
let then=Date.now();
let lives=3;
let score=0;
let xhttp;
let player={
    x: 0,
    y: 0,
    width:48,
    height:48,
    frameX:0,
    frameY:0,
    xChange:0,
    yChange:0,
    size:10

     
};
let power_ups=[];
let background=[
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 790, 791, -1, -1, -1, -1, -1, -1],
    [-1, 403, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 790, 791, -1, -1, -1, -1, -1, -1],
    [-1, 440, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 790, 791, -1, -1, -1, -1, -1, -1],
    [-1, 403, 174, 175, 176, 403, -1, -1, -1, -1, 75, 76, 76, 77, -1, -1, -1, -1, -1, -1, -1, 594, -1, -1, 790, 791, -1, -1, -1, -1, -1, -1],
    [-1, 440, 211, 212, 213, 440, -1, -1, -1, -1, 186, 187, 187, 188, -1, -1, 845, 846, -1, -1, -1, 631, -1, -1, 790, 791, -1, -1, -1, -1, -1],
    [-1, -1, 248, 249, 250, -1, -1, -1, -1, -1, 186, 617, 187, 188, -1, -1, 882, 883, -1, -1, -1, 668, -1, -1, 790, 791, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 186, 187, 583, 188, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 701, 886, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, 430, 431, 435, 436, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, 465, 466, 465, 466, -1, -1, -1, -1, -1, -1, -1, -1, 623, 624, 625, -1, -1, -1, -1, -1, -1, 993, 994, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, 572, 573, 572, 573, -1, -1, -1, -1, -1, -1, -1, -1, 660, 661, 662, -1, -1, -1, -1, -1, -1, 1030, 1031, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 593, -1, -1, -1],
    [594, -1, -1, -1, -1, -1, -1, -1, -1, -1, 91, 92, 93, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 630, -1, -1, -1],
    [631, -1, -1, -1, -1, -1, -1, -1, -1, -1, 190, 191, 192, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 667, -1, -1, -1],
    [668, -1, -1, -1, -1, -1, -1, -1, -1, -1, 190, 694, 192, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 790, 791, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 790, 791, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 800, 790, 791, 800, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 790, 791,  -1,  0,  0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 800, 790, 791, 800, -1, -1, -1, -1, -1],
    [ 17, 17, 17, -1, 790, 791, -1,  0,  0, 0,  -1,  -1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  -1,  800,  790,  791,  800,  -1,  1,  1,  1,  1],
    [ 17, 17, 17, -1, -1, -1, -1,  0,  0, 0,  -1,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7]
];
let cops=[];
let tokens=[];
let IMAGES={player:"static/player.png", background:"static/city.png", cop:"static/cop.png"};
let moveLeft=false;
let moveUp=false;
let moveRight= false;
let moveDown=false;
let tilesPerRow=37;
let tileSize=17;

document.addEventListener("DOMContentLoaded", init, false); //This makes the browser wait for the canvas to be loaded before we can do anything
function init() {
    canvas=document.querySelector("canvas");
    context=canvas.getContext("2d");
    //score=document.querySelector("#score")
    //window.setInterval(update_liked_count, 600)
    floor=canvas.height-27;
    player.x=canvas.width/2;
    player.y=canvas.height/2;
    // window.setTimeout(change_position, 10000)
    window.addEventListener("keydown", activate, false)
    window.addEventListener("keyup", deactivate, false)
    
    load_images(draw);
}
function draw() {
    request_id=window.requestAnimationFrame(draw);
    let now=Date.now();
    
    let elapsed=now-then;
    if (elapsed<=fpsInterval){
        return;
    }
    then=now-(elapsed % fpsInterval);
    if (tokens.length<10){
        // for (let i=0; i<30; i+=1){
        let token={
            x:randint(0, canvas.width-10),
            y:randint(0, canvas.height-10),
            width:16,
            height:16,
            xChange:0,
            yChange:0, 
            frameX:0,
            frameY:0,
            size:10
        }
        tokens.push(token);
    // }
    }
    
    if (cops.length<7){
        let cop={
            x:randint(0, canvas.width-10),
            y:randint(0, canvas.height-10),
            width:48,
            height:48,
            xChange:-1,
            yChange:1, 
            frameX:0,
            frameY:0,
            size:10
            };
        cops.push(cop);
        }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle="#808080";
    context.fillRect(0, 0, canvas.width, canvas.height);  
    for (let r=0; r<20; r+=1){
        for (let c=0; c<32; c+=1){
            let tile=background[r][c];
            if (tile>=0){
                let tileRow=Math.floor(tile / tilesPerRow);
                let tileCol=Math.floor(tile % tilesPerRow);
                context.drawImage(IMAGES.background, 
                    tileCol*tileSize, tileRow*tileSize, tileSize, tileSize, 
                    c*tileSize, r*tileSize, tileSize, tileSize);
                }
            }
        }
    
    context.drawImage(IMAGES.player, 
                        player.frameX, player.frameY*player.height, 100, 122.25,
                        player.x, player.y, player.width, player.height );
    // context.fillStyle="red";
    //     context.fillRect(player.x, player.y, player.size, player.size)
    if (moveLeft || moveRight){
        player.frameX= (player.frameX+1)%4;
    }
    for (let cop of cops){
        context.drawImage(IMAGES.cop, 
                        cop.frameX, cop.frameY*cop.height, 64, 64,
                        canvas.width-cop.x, canvas.height-cop.y, cop.width, cop.height );
        // context.fillStyle="blue";
        // context.fillRect(cop.x, cop.y, cop.size, cop.size)
        cop.x=cop.x+cop.xChange;
        cop.y=cop.y+cop.yChange;
        }
    
       
    
    
    for (let token of tokens){
        if (player_collides_coin(token)===false){
            context.fillStyle="yellow";
            context.fillRect(token.x, token.y, token.size, token.size)
            // context.drawImage(coinImage, 
            //     token.frameX, token.frameY, 16, 16,
            //     canvas.width-token.x, canvas.height-token.y, token.width, token.height );
            }
        // }
    }
    
    for (let cop of cops){
        if (player_collides(cop)){
            console.log(player, cop)
            // context.fillStyle="green";
            // context.fillRect(cop.x, cop.y, cop.size, cop.size)
            stop("You've Lost!");
            return;
                                   
        };
    };
    
    for (let token of tokens){
        if (player_collides_coin(token)){
            //context.clearRect(token.x, token.y, token.size, token.size)
            //setInterval(draw(token), 1000);
            // context.fillStyle="#87cefa";
            // context.fillRect(token.x, token.y, token.size, token.size);   
            //setTimeout(change_position(token), 2000)
            change_position(token)
            score+=1;
            console.log(score)
            
        }
    }
    let score_element=document.querySelector("#score");
    score_element.innerHTML="Score: " + score;
    
    
    
    if (moveLeft){
        player.xChange=-2;
        player.frameY=3;
    }
    if (moveRight){
        player.xChange=2;
        player.frameY=6;
    }
    if (moveUp){
        player.yChange=-2;
        player.frameY=9;
    }
    if (moveDown){
        player.yChange=2;
        player.frameY=0;
    }  
    
    player.x=player.x+player.xChange
    player.y=player.y+player.yChange
    
    player.xChange=player.xChange*0.9;
    player.yChange=player.yChange*0.9;
    
    if (player.x<0){
        player.x=0.01;
    }
    if (player.y<0){
        player.y=0.01;
    }
    if (player.x+player.width>=canvas.width){
        player.x=canvas.width-player.width;
    }
    if (player.y+player.height>=canvas.height){
        player.y=canvas.height-player.height;
    }
    // if (player_collides_tile(tile)){
    //     stop("end")
    // }
    for (let cop of cops){
        // if (activate())
        if (cop.x<0){
            cop.xChange=cop.xChange * -1;
           
        //    cop.yChange=0;
        //    cop.x=cop.x-cop.xChange;
        //    cop.y=cop.y-cop.yChange;
           
        }else if (cop.y<0){
            
            cop.yChange=cop.yChange * -1;

        }else if (cop.x+cop.size>=canvas.width){
            //cop.x=canvas.width;
            cop.xChange=cop.xChange * -1;


        }else if (cop.y+cop.size>=canvas.height){
             //cop.y=canvas.height-cop.size;
            cop.yChange=cop.yChange * -1;
            // cop.xChange=cop.xChange*-0.9;
            // cop.yChange=cop.yChange*0.9;
        }
        cop.x=cop.x+cop.xChange;
        cop.y=cop.y+cop.yChange
    }
}



function activate(event){
    let key=event.key;
    if (key==="ArrowLeft"){
        moveLeft=true;
    }else if (key==="ArrowUp"){
        moveUp=true;
    }else if(key==="ArrowRight"){
        moveRight=true;
    }else if(key==="ArrowDown"){
        moveDown=true;
    }
}
function deactivate(event){
    let key=event.key;
    if (key==="ArrowLeft"){
        moveLeft=false;
    }else if (key==="ArrowUp"){
        moveUp=false;
    }else if(key==="ArrowRight"){
        moveRight=false;
    }else if(key==="ArrowDown"){
        moveDown=false;
    }
}
function randint(min, max){
    return Math.round(Math.random()*(max-min))+min;
}; 
function player_collides(cop){
    if (player.x + player.size< cop.x ||
        cop.x +cop.size<player.x ||
        player.y>cop.y+cop.size ||
        cop.y> player.y+player.size){
        return false;
    }else {
        
        return true;
    }
}
function player_collides_coin(token){
    if (player.x + player.width< token.x ||
        token.x +token.width<player.x ||
        player.y>token.y+token.height ||
        token.y> player.y+player.height){
        return false;
    }else {
        // score+=1
        return true;
    }
}
// function player_collides_tile(tile){
//     if (player.x + player.width< tile.x ||
//         tile.x + tile.width<player.x ||
//         player.y>tile.y+tile.height ||
//         tile.y> player.y+player.height){
//         return false;
//     }else {
//         return true;
//     }
// }

function change_position(token){
    token.x=randint(0, canvas.width-10);
    token.y=randint(0, canvas.height-10)
}
function stop(message){
    window.removeEventListener("keydown", activate, false)
    window.removeEventListener("keyup", activate, false)
    window.cancelAnimationFrame(request_id)
    let outcome_element=document.querySelector("#outcome");
    outcome_element.innerHTML=message;
    // let score_element=document.querySelector("#score");
    // score_element.innerHTML=score;
    let data=new FormData();
    data.append("score", score);

    xhttp=new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_response, false);
    xhttp.open("POST", "/store_score", true);
    xhttp.send(data);
}
function handle_response(){
    if (xhttp.readyState===4){
        if (xhttp.status===200){

            if (xhttp.response==="success"){

            }else{

            }
        }
    }
}
function load_images(callback){
    let num_images=Object.keys(IMAGES).length;
    let loaded=function(){
        num_images=num_images-1;
        if (num_images===0){
            callback();
        }
    };
    for (let name of Object.keys(IMAGES)){
        let img=new Image();
        img.addEventListener("load", loaded, false);
        img.src=IMAGES[name];
        IMAGES[name]=img;
    }
}
