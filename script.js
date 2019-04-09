const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

canvas.width  = innerWidth;
canvas.height = innerHeight;


const maxHeight = innerHeight;
const maxWidth  = innerWidth;

const friction = 0.96; // Y velocity diminutive
function randomInteger(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class Ball {

  constructor (x, y, dy, dx, gravity, radius, color) {

    this.x        = x;        // X position
    this.y        = y;        // Y position
    this.dy       = dy;       // Falling velocity
    this.dx       = dx;       // Horizontal move velocity
    this.gravity  = gravity;  // Y velocity magnifier 
    this.radius   = radius;   // Ball radius
    this.color    = color;

    // Drawing a circle
    this.draw = function() {
      ctx.beginPath(); 
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
      ctx.fillStyle = this.color;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fill();
    }

    // Moving a circle
    this.move = function() {
      if(this.y + this.radius + 2 + this.dy > maxHeight) 
      {
        this.dy = -this.dy * friction;
        
      } else {
        this.dy += this.gravity;
      }

      if(this.x + this.radius + 2 > canvas.width || this.x - this.radius - 2 < 0)
      {
        this.dx = -this.dx * friction;
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }

  }

}

let ballsArray = [];

function init(){
  ballsArray.length = 0;
  for(let i = 0; i < 300; i++) {
    let dy = randomInteger(1, 5);
    let dx = randomInteger(-4, 4);
    let radius = randomInteger(3, 30);
    let x = randomInteger(radius, canvas.width - radius*2 - 2);
    let y = randomInteger(radius, canvas.height - radius*2 - 2);
    let gravity = randomInteger(1, 3);
    let color = getRandomColor();
    ballsArray.push(new Ball(x, y, dy, dx, gravity, radius, color));
  }
}
init();
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < ballsArray.length; i++){
    ballsArray[i].move();
  }
  requestAnimationFrame(animate);
}
animate();

document.addEventListener('click',
  function(){
    init();
  });


  