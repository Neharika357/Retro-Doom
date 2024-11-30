let canvas=document.querySelector("canvas");
let c=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//sounds
var sound = new Audio("hit-someting-6037.mp3");
sound.preload = 'auto';
sound.load();

function playSound(volume) {
  var click=sound.cloneNode();
  click.volume=volume;
  click.play();
}

//Score
let scoreEle=document.querySelector("#score");
let score=0;

//timer
let timer=document.querySelector("#timer");
let time=30;
let timerid;
function gametime(){
  if(time>=0){
  timer.innerText=time;
  time--;
  timerid=setTimeout(gametime, 1000);
  }
  if(time===-1){
    lastd(timerid,animation);
  }
}
gametime(); 


//gameover  
function lastd(timerid){
  clearTimeout(timerid);
  cancelAnimationFrame(animation);
  document.querySelector("#displaytext").innerText="Game Over";
  if(bullet1<=0 && bullet2<=0){
    document.querySelector("#displaytext").innerText="Out Of Bullets";
  }
  // let nayaele=document.createElement("button");
  // let nayama=document.createTextNode("Play Again");
  // nayaele.appendChild(nayama);
  // body.appendChild(nayaele);
  // nayaele.addEventListener('click',()=>{
  //   animate();
  // })
}

//background image
class background{
  constructor(imageSrc){
    this.image=new Image();
    this.image.src=imageSrc;
  }
  draw(){
    c.drawImage(this.image,0,0,canvas.width,canvas.height);
  }
}
let back=[];
back.push(new background('neet background a148bce9-9b99-4e00-8910-6cd4ca0c4daf.png'));
let fireback=[];
fireback.push(new background('pngtree-game-castle-horror-scene-illustration-background-image_2158156.jpg'));

//enemy1
class sprite1{
  constructor({position,velocity,scale=1}){
    this.position=position;
    this.velocity=velocity;
    this.scale=scale;
    this.framecurrent=0;
    this.totalframes=3;
    this.framesElapsed=0;
    this.framesHold=10;
    this.health=100;

    const image=new Image();
    image.src='Untitled_Export-tMpI5yL64.png';
    this.image=image;
  }
  draw(){
    c.drawImage(
      this.image,
      (this.image.width/3)*this.framecurrent,
      0,
      this.image.width/3,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width/3)*this.scale,
      (this.image.height)*this.scale)

      c.fillStyle='red';
      c.fillRect(this.position.x+100,this.position.y+40,50,20);
      c.fillStyle='black';
      c.fillRect(this.position.x+100,this.position.y+40,50*(this.health/100),20);
}
update(){
  this.draw();
  
  if(this.position.x>=canvas.width || this.position.x<=0){
    this.velocity.x=-this.velocity.x;
  }
  if(this.position.y>=canvas.height || this.position.y<=0){
    this.velocity.y=-this.velocity.y;
  }
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;

  this.framesElapsed++;
  
  if(this.framesElapsed % this.framesHold===0){
  if(this.framecurrent<this.totalframes-1){
    this.framecurrent++;
  }
  else{
    this.framecurrent=0;
  }
}}}

const ene1=[]
ene1.push(new sprite1({
  position:{
  x:Math.random()*window.innerWidth,
  y:Math.random()*window.innerHeight
  },
  velocity:{
  x:7,
  y:4
  }
}))


//enemy2
let x2=Math.random()*window.innerWidth;
class sprite2{
  constructor({position,velocity,scale=1}){
    this.position=position;
    this.velocity=velocity;
    this.scale=scale;
    this.framecurrent=0;
    this.totalframes=3;
    this.framesElapsed=0;
    this.framesHold=10;
    this.health=100;

    const image=new Image();
    image.src='Untitled_Export-7qcEfnEOl.png';
    this.image=image;
  }
  draw(){
    c.drawImage(
      this.image,
      (this.image.width/3)*this.framecurrent,
      0,
      this.image.width/3,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width/3)*this.scale,
      (this.image.height)*this.scale)

      c.fillStyle='red';
      c.fillRect(this.position.x+100,this.position.y+40,50,20);
      c.fillStyle='black';
      c.fillRect(this.position.x+100,this.position.y+40,50*(this.health/100),20);
}
  update(){
    this.draw();
    
    // if(this.position.x>=canvas.width || this.position.x<=0){
    //   this.velocity.x=-this.velocity.x;
    // }
    // if(this.position.y>=canvas.height || this.position.y<=0){
    //   this.velocity.y=-this.velocity.y;
    // }
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;

    this.framesElapsed++;

  if(this.framesElapsed % this.framesHold===0){
    if(this.framecurrent<this.totalframes-1){
      this.framecurrent++;
    }
    else{
      this.framecurrent=0;
    }

    if(this.position.x<=0){
      
      this.position.x=1300;
    }

    
}}}

const ene2=[]
ene2.push(new sprite2({
  position:{
    x:x2,
    y:0
  },
  velocity:{
    x:-5,
    y:0
  }
}))

//zombie
class sprite{
  constructor({position,velocity,imageSrc,tf,scale=0.75}){
    this.position=position;
    this.velocity=velocity;
    this.scale=scale;
    this.framecurrent=0;
    this.totalframes=tf;
    this.framesElapsed=0;
    this.framesHold=10;

    this.image=new Image();
    this.image.src=imageSrc;
  }
  draw(){
    c.drawImage(
      this.image,
      (this.image.width/this.totalframes)*this.framecurrent,
      0,
      this.image.width/this.totalframes,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width/this.totalframes)*this.scale,
      this.image.height*this.scale)
}
  update(){
    this.draw();
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;
    this.framesElapsed++;
    if(this.framesElapsed%this.framesHold===0){
    if(this.framecurrent<this.totalframes-1){
      this.framecurrent++;
    }
    else{
      this.framecurrent=0;
    } 
    if(this.position.x<0){
      this.position.x=1500;
    }
  }}}
const zom1=[];
zom1.push(new sprite({
  position:{
    x:1000,
    y:50
  },
  velocity:{
    x:-4,
    y:0
  },
  imageSrc:'untitled-1 (2) (1).png',
  tf:4
}));

//player with gun
class player{
  constructor({position,velocity,imageSrc}){
    this.position=position;
    this.velocity=velocity;

    this.image=new Image();
    this.image.src=imageSrc;
  }
  draw(){
    c.drawImage(this.image,this.position.x,this.position.y,200,200);
}
  update(){
    this.draw();
    
    if(this.position.x>=canvas.width || this.position.x<=0){
      this.velocity.x=-this.velocity.x;
    }
    if(this.position.y>=canvas.height || this.position.y<=0){
      this.velocity.y=-this.velocity.y;
    }
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;
  }
}
const gun=[];
gun.push(new player({
  position:{
    x:700,
    y:630
  },
  velocity:{
    x:0,
    y:0
  },
  imageSrc:'stock-photo-a-hand-with-handgun-single-right-hand-style-view-from-above-isolated-on-white-background-644524798.png'
}))

class player1{
  constructor({position,velocity}){
    this.position=position;
    this.velocity=velocity; 

    const image=new Image();
    image.src='Untitled_Export-s4twR6FhUw - Copy.png';
    image.onload=()=>{
      this.image=image;
    }
  }
  draw(){
    if(this.image){
    c.drawImage(this.image,this.position.x+35,this.position.y,100,200);
  }
}
  update(){
    this.draw();
    
    if(this.position.x>=canvas.width || this.position.x<=0){
      this.velocity.x=-this.velocity.x;
    }
    if(this.position.y>=canvas.height || this.position.y<=0){
      this.velocity.y=-this.velocity.y;
    }
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;
  }
}
const gun2=[];
gun2.push(new player1({
  position:{
    x:700,
    y:630
  },
  velocity:{
    x:0,
    y:0
  }
  
}))
const shotgun=document.querySelector('#p3');


//square function
function square(number){
  return number*number;
}

//bullets
class projectile{
  constructor({position,velocity,imgSrc}){
    this.position=position;
    this.velocity=velocity;
    this.image=new Image();
    this.image.src=imgSrc;
  }
  collison(enemy){
    if(
      Math.sqrt(
        square(enemy.position.x - this.position.x) +
        square(enemy.position.y - this.position.y)
      )<=150
    ){
      console.log("Hit");
      return 1;
    }
    return 0;
  }
  draw(){
    c.drawImage(this.image,this.position.x,this.position.y,125,125);
  }
  update(){
  
    this.draw();
    
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;
  }
}
let projectiles= [];
let projectiles2=[];

let animation;

let frames=0;
let bullet1=25;
let bullet2=10;

// let plyr = 0;

//loop for animation
function animate(){

  animation=requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);

  
  back.forEach((forest)=>{
    forest.draw();
  })

  ene1.forEach((enemy)=>{
    enemy.update();
   })
  
  ene2.forEach((enemy)=>{
   enemy.update();
  })

  gun.forEach((position)=>{
    position.update();
  })
// gun[plyr].update();
  
  shotgun.addEventListener('click',()=>{
    twogun();
  })

  function twogun(){
    requestAnimationFrame(twogun);
    // c.clearRect(0,0,canvas.width,canvas.height);
    gun2.forEach((bu)=>{
      if(gun.length!=0){
        gun.splice(0,1);
      }
       bu.update();
  })
  }

  projectiles.forEach((bullet)=>{
    bullet.update();
  })

  projectiles2.forEach((bullet)=>{
    bullet.update();
  })

  projectiles.forEach((prjctile,i)=>{
    // if(prjctile.collison(ene2[0])){
    //   projectiles.splice(i,1);
    // }
    if(ene1.length !=0){
      ene1.forEach((enemy,i)=>{
        if(prjctile.collison(enemy)){
          console.log("hit detected");
          setTimeout(()=>{
            console.log("third hit");
            projectiles.splice(i,1);
            enemy.health-=50;
            console.log(enemy.health);
  
            if(enemy.health<=0){
              ene1.splice(i,1);
              score+=100;
            }
            
            scoreEle.innerText=score;
            });
        }
        
      })
      }
    

      if(ene2.length !=0){
        ene2.forEach((enemy,i)=>{
          if(prjctile.collison(enemy)){
            console.log("hit detected");
            setTimeout(()=>{
              console.log("third hit");
              projectiles.splice(i,1);
              enemy.health-=50;
              console.log(enemy.health);
    
              if(enemy.health<=0){
                ene2.splice(i,1);
                score+=100
              }
              
              scoreEle.innerText=score;
              });
          }
        })
        }
  })

  projectiles2.forEach((prjctile,i)=>{
    // if(prjctile.collison(ene2[0])){
    //   projectiles2.splice(i,1);
    // }
    // if(ene1.length !=0){
    //   if(prjctile.collison(ene1[0])){
    //     console.log("hit detected");
    //     setTimeout(()=>{
    //       console.log("first hit");
    //       projectiles.splice(i,1);
    //       ene1[0].health-=100;
    //       console.log(ene1[0].health);

    //       if(ene1[0].health<=0){
    //         ene1.splice(0,1);
    //       }
    //       score+=100;
    //         scoreEle.innerText=score;
    //       });
    //   }}

      if(ene1.length !=0){
        ene1.forEach((enemy,i)=>{
          if(prjctile.collison(enemy)){
            console.log("hit detected");
            setTimeout(()=>{
              console.log("third hit");
              projectiles2.splice(i,1);
              enemy.health-=100;
              console.log(enemy.health);
    
              if(enemy.health<=0){
                ene1.splice(i,1);
                score+=100;
              }
              
              scoreEle.innerText=score;
              });
          }
          
        })
        }

        if(ene2.length !=0){
          ene2.forEach((enemy,i)=>{
            if(prjctile.collison(enemy)){
              console.log("hit detected");
              setTimeout(()=>{
                console.log("third hit");
                projectiles2.splice(i,1);
                enemy.health-=100;
                console.log(enemy.health);
      
                if(enemy.health<=0){
                  ene2.splice(i,1);
                  score+=100
                }
                
                scoreEle.innerText=score;
                });
            }
          })
          }
  });


frames++;
if(frames%150===0){
  ene2.push(new sprite2({
    position:{
      x:Math.random()*innerWidth,
      y:Math.random()*innerHeight
    },
    velocity:{
      x:-6,
      y:0
    }
    }))
}

if(frames%300===0){
  ene1.push(new sprite1({
    position:{
      x:Math.random()*innerWidth,
      y:Math.random()*innerHeight
    },
    velocity:{
      x:6,
      y:5
    }
    }))
}
if(bullet1<=0 && bullet2<=0){
  lastd(timerid);   
}
}


animate();




let revolver=document.querySelector("#bullet1");
let shot_gun=document.querySelector("#bullet2");
//events for using keys to play
window.addEventListener('keydown',(event)=>{
  switch(event.key){
  case 's':
    gun[0].velocity.x=9;
    break;
  case 'a':
    gun[0].velocity.x=-9;
    break;
  case ' ':
    if(bullet1>=1){
      playSound(1);
    projectiles.push(new projectile({
      position:{
        x:gun[0].position.x+30,
        y:gun[0].position.y-90
      },
      velocity:{
        x:0,
        y:-10
      },
      imgSrc:'GettyImages-537173501.png'}));
        bullet1--;
        revolver.innerText=bullet1;
    } 
    break;

  case 'b':
    if(bullet2>=1){
      playSound(1);
    projectiles2.push(new projectile({
      position:{
        x:gun2[0].position.x+30,
        y:gun2[0].position.y-90
      },
      velocity:{
        x:0,
        y:-10
      },
      imgSrc:'GettyImages-537173501.png'   }));
      bullet2--;
      shot_gun.innerText=bullet2;
    }
    break;
}})
window.addEventListener('keyup',(event)=>{
  switch(event.key){
    case 's':
      gun[0].velocity.x=0;
      break;
    case 'a':
      gun[0].velocity.x=0;
      break;
  }
})




/*if((prjctile.position.y - prjctile.image.height) <= (ene4[0].position.y + ene4[0].image.height)  
&&(prjctile.position.y + prjctile.image.height)>= (ene4[0].position.y - ene4[0].image.height)    
&& (prjctile.position.x + prjctile.image.width) >= (ene4[0].position.x)
&& (prjctile.position.x - prjctile.image.width) <= (ene4[0].position.x))*/

/*(prjctile.position.y - (prjctile.image.height/2)) <= (ene3[0].position.y ) 
      && (prjctile.position.y - (prjctile.image.height/2)) >= (ene3[0].position.y + ene3[0].image.height)
      && (prjctile.position.x + (prjctile.image.width/2)) >= (ene3[0].position.x)
      && (prjctile.position.x + (prjctile.image.width/2)) <= (ene3[0].position.x+ene3[0].image.width)*/


      /*projectiles.forEach((prjctile,i)=>{
    if((prjctile.position.y) == (ene2[0].position.y ) 
    && (prjctile.position.x ) == (ene2[0].position.x)
    ){
      setTimeout(()=>{
        console.log("first hit");
        ene2.splice(0,1);
        projectiles.splice(i,1);
        score+=100;
          scoreEle.innerText=score;
        },0)
      }
      if((prjctile.position.y) == (ene3[0].position.y ) 
      && (prjctile.position.x ) == (ene3[0].position.x)){
        
          console.log("second hit");
          ene3.splice(0,1);
          projectiles.splice(i,1);
          score+=100;
          scoreEle.innerText=score;
         
        }
        if((prjctile.position.y) == (ene1[0].position.y ) 
        && (prjctile.position.x ) == (ene1[0].position.x)){
          setTimeout(()=>{
            console.log("third hit");
            ene1.splice(0,1);
            projectiles.splice(i,1);
            score+=100;
          scoreEle.innerText=score;
            },0)
          }
          if((prjctile.position.y) == (ene4[0].position.y ) 
          && (prjctile.position.x ) == (ene4[0].position.x)){
            setTimeout(()=>{
              console.log("fourth hit");
              ene4.splice(0,1);
              projectiles.splice(i,1);
              score+=100;
          scoreEle.innerText=score;
              },0)
            }
  })
}
animate(); */

