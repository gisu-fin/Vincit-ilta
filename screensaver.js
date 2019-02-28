// fork from http://prgreen.github.io/blog/2013/09/30/the-bouncing-dvd-logo-explained/

//edit these to change the screensaver size
const iconWidth = 80
const iconHeight = 120
const canwasWidth = 1024
const canvasHeight = 700

let hits = 0;

let poops_x = [];
let poops_y = [];

const add_poop = (x,y) => {
  poops_x.push(x);
  poops_y.push(y);
}

// main loop, vx, vy are velocities, x, y are positions
const animate = (x, y, vx, vy) => () => {
  const reqAnimFrame = window.requestAnimationFrame || window.msRequestAnimationFrame
  const animationSpeed = 3 // try changing this
  for (let i = 0; i < animationSpeed; i++) {
    x += vx
    y += vy
    let xhit = false;
    let yhit = false;
    if (x + iconWidth === canwasWidth){
      add_poop(x,y);
      vx = -vx;
      xhit = true;
    }
    if (y + iconHeight === canvasHeight) {
      add_poop(x,y);
      vy = -vy;
      yhit = true;
    }
    if (x === 0) {
      add_poop(x,y);
      vx = -vx;
      xhit = true;
    }
    if (y === 0) {
      add_poop(x,y);
      vy = -vy;
      yhit = true;
    }
    if (xhit && yhit) {
      hits ++;
    }
  }
  draw(x, y)
  reqAnimFrame(animate(x, y, vx, vy)) // renders a new frame
}

function draw (x, y) {
  const canvas = document.getElementById('screensaver')
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canwasWidth, canvasHeight)
  context.fillStyle = '#000000'
  context.fillRect(0, 0, canwasWidth, canvasHeight)
  const img = new Image()
  img.src = "iiro.png"
  context.drawImage(img, x, y, iconWidth, iconHeight);
  context.fillStyle = '#e73b2b'

  for (let i = 0; i < poops_x.length; i ++) {
    //context.fillRect(poops_x[i],poops_y[i],16,16);
    const img2 = new Image()
    img2.src = "kakka_1.png"
    context.drawImage(img2, poops_x[i],poops_y[i],50,50)
  }
  //context.drawImage(iiro,x,y,iconWidth,iconHeight);
  //context.fillRect(x, y, iconWidth, iconHeight)
  context.font="20px Comic Sans MS"
  //context.fillText("Hits: " + hits,20,20);
}

//window.onload = function() {
  //var img = document.createElement('image');
  //img.src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/pile-of-poo_1f4a9.png';

//};


const screensaverContext = document.getElementById('screensaver').getContext('2d')
screensaverContext.canvas.width = canwasWidth
screensaverContext.canvas.height = canvasHeight

//initial position
const initialXPosition = 0
const initialYPosition = 0
const initialXVelocity = 1
const initialYVelocity = 1
// start main loop
animate(initialXPosition, initialYPosition, initialXVelocity, initialYVelocity)()
