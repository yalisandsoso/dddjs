const DDD = require("../src/index.ts");

// canvas-->image
function convertCanvasToImage(canvas) {
  //新Image对象,可以理解为DOM;
  var image = new Image();
  //canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
  //指定格式PNG
  image.src = canvas.toDataURL("image/jpeg");
  return image;
}

var mycanvas = document.getElementById('my_Canvas');
var client = new DDD.UICanvas(mycanvas, {
  preserveDrawingBuffer: true
})
var camera = new DDD.UICamera();
var render = new DDD.UIRender(client, camera);


var pickBtn = document.getElementById('pick');
var continer = document.getElementById('convertedImg');
pickBtn.addEventListener('click', function () {
  var img = convertCanvasToImage(mycanvas);
  continer.appendChild(img)
})

var colorMaterial = new DDD.UIMaterial({});
var mapMaterial = new DDD.UITextureMaterial({
  image: "assets/miao256.jpg",
});

var obj = new DDD.Plane();
// obj.scaling(0.2, 0.2, 1.0);
// obj.setPosition(-.8, .8, 0)
obj._material = new DDD.UIVideoMaterial({
  dynamic: true,
  autoPlay: true,
  video: "assets/vedio.mp4",
});
// render.addRenderObject(obj);

var videoBtn = document.getElementById('video')
videoBtn.addEventListener('click', function () {
  if (obj._material._videoPausing) {
    obj._material.play();
  } else {
    obj._material.pause();
  }
})

var center = new DDD.Shape(1, 1, .1, .1, "_cener_");
center._material = colorMaterial;
center.add(obj);
// render.addRenderObject(center)
var scene = new DDD.UIScene();
scene.add(center)


var box = new DDD.Box('box');
box.scaling(0.2, 0.2, 0.2)
// box.rotateX(0.25)
// box.rotateY(0.25)
box.setPosition(.8, .8, 0)
// box.lookAt(.8, .8, 1)
box._material = new DDD.UIMaterial({});
// render.addRenderObject(box);
// box._material.isLineMode = false;

var cubeMap = new DDD.UIShaderMaterial({});
var box5 = new DDD.Box('box5');
box5._material = cubeMap
box5.scaling(0.2, 0.2, 0.2);
// box5.rotateX(0.25);
// box5.rotateY(0.25);
box5.setPosition(-.8, -.8, 0)
// box5.lookAt(-.8, -.8, 1)

new DDD.ImagesLoaded([
  'assets/xneg.jpg',
  'assets/xneg.jpg',
  'assets/xpos.jpg',
  'assets/ypos.jpg',
  'assets/zneg.jpg',
  'assets/zpos.jpg',
]).onLoad((images) => {
  cubeMap.config['u_Sampler'] = DDD.GLTools.createCubeTexture(client.gl, images, {});
  // render.addRenderObject(box5);
})


var box2 = new DDD.Box('box2');
box2.scaling(0.2, 0.2, 0.2);
// box2.rotateX(0.25);
// box2.rotateY(0.25);
box2.setPosition(-.8, 0, 0)
// box2.lookAt(-.8, 0, 1)
box2._material = new DDD.UICubeTextureMaterial({
  images: [
    'assets/right.jpg',
    'assets/left.jpg',
    'assets/top.jpg',
    'assets/bottom.jpg',
    'assets/back.jpg',
    'assets/front.jpg',
  ],
});


var box3 = new DDD.Box('box3');
box3.scaling(0.2, 0.2, 0.2);
// box3.rotateX(0.25);
// box3.rotateY(0.25);
box3.setPosition(0, -.8, 0)
box3._material = mapMaterial;


var ball = new DDD.Ball();
ball.scaling(0.2, 0.2, 0.2)
// ball.setPosition(.8, -.8, 0)
ball.rotateX(0.25);
ball.rotateY(0.25);

ball._material = colorMaterial;


var obj1 = new DDD.Plane();
obj1._material = new DDD.UIMultiTexturesMaterial({
  texture0: "assets/miao256.jpg",
  texture1: "assets/circle.gif",
});
obj1.scaling(0.2, 0.2, 1.0);
obj1.setPosition(0, .8, 0)
// obj1.lookAt(0, .8, 1)


var axis = new DDD.AxesHelper();
axis._material = new DDD.UIMaterial({});
axis._material.isLineMode = true;

var axis1 = new DDD.AxesHelper('a1');
axis1.scaling(2, 2, 2)
axis1._material = new DDD.UIMaterial({});
axis1._material.isLineMode = true;

var axis2 = new DDD.AxesHelper('a2');
axis2.scaling(2, 2, 2)
axis2._material = new DDD.UIMaterial({});
axis2._material.isLineMode = true;

var axis3 = new DDD.AxesHelper('a3');
axis3.scaling(2, 2, 2)
axis3._material = new DDD.UIMaterial({});
axis3._material.isLineMode = true;

var axis4 = new DDD.AxesHelper();
axis4.scaling(2, 2, 2)
axis4._material = new DDD.UIMaterial({});
axis4._material.isLineMode = true;

box2.add(axis1);
box5.add(axis2);
box3.add(axis3);

// var texture = new DDD.UITexture(client.gl);
// console.log(texture)


var obj3 = new DDD.Plane();
obj3._material = new DDD.UIAudioMaterial({
  audio: 'assets/SuperMario.mp3',
});
obj3.scaling(0.2, 0.2, 1.0);
obj3.setPosition(0, .8, 0)
// obj1.lookAt(0, .8, 1)

var audioBtn = document.getElementById('audio')
audioBtn.addEventListener('click', function () {
  if (obj3._material._audioPausing) {
    obj3._material.play();
  } else {
    obj3._material.pause();
  }
})

var animation = new DDD.Animation(true)
animation._duration = 20000;
animation._repeatCount = 40;
animation._startOffset = 1000;
animation._repeatMode = 'reverse'
animation._fillBefore = false;
animation._fillAfter = true;
animation.applyTransformation = (interpolatedTime) => {
  // console.log('...', interpolatedTime * 2 - 1, interpolatedTime * 2 - 1)
  // obj.setPosition(interpolatedTime * 2 - 1, interpolatedTime * 2 - 1, 0)
  // obj.setPosition(0, 0, interpolatedTime * 2 - 1)
  // box3.followAt(obj)
}

animation.registerAnimationStartListener((ani) => {
  // console.log('start...')
}).registerAnimationEndListener((ani) => {
  // console.log('end...', ani._oneMoreTime, ani._started, ani._ended, ani._more)
}).registerAnimationRepeatListener((ani) => {
  // console.log('repeat...', ani._repeated)
}).registerAnimationProgressListener((ani, progress) => {
  // console.log('animation', progress)
  ball.setPosition(0, 0, (progress * 2 - 1.0) * 10)
  // box3.followAt(ball)
})

box3.lookAt(0, 0, 0)

animation.start()

let ani = new DDD.ValueAnimation();
ani.valueFrom = 2;
ani.valueTo = 52;
ani._duration = 2000;
ani._startOffset = 2000;
// ani._repeatCount = 200;
ani._fillEnabled = true;
ani._fillBefore = false;
ani._fillAfter = false;
ani.setInterpolator(new DDD.BounceInterpolator());
ani
  .registerAnimationStartListener((ani) => {
    // console.log('start...')
  }).registerAnimationProgressListener((ani, progress) => {
    // console.log('value animation', progress * 2 - 1.0, ani.getValue() * 2.0 / 52.0 - 1, 0)
    var pointer = new DDD.Ball();
    pointer.scaling(0.01, 0.01, 0.01)
    pointer._material = colorMaterial;
    pointer.setPosition(progress * 2 - 1.0, ani.getValue() * 2.0 / 52.0 - 1, 0)

    box5.lookAt(progress * 2 - 1.0, ani.getValue() * 2.0 / 52.0 - 1, 2)
    // box5.followAt(pointer)



    center.add(pointer)
  });
ani.start()

center.add(axis)
center.add(box)
center.add(box2)
center.add(box3)
center.add(box5)
center.add(ball)
center.add(obj)
center.add(obj1)
center.add(obj3)





var animate = function (time) {
  render.renderScene(scene)
  // obj.rotateZ(-0.01)
  // box.rotateZ(-0.01)
  box2.rotateY(-0.01)
  // box5.rotateZ(-0.01)
  ball.rotateZ(-0.01)

  // camera.rotateZ(.01);
  // camera.translateZ(.01);
  // center.rotateZ(-0.1)
  animation.updateAnimation();
  ani.updateAnimation();
  window.requestAnimationFrame(animate);
}
animate(0);

mycanvas.addEventListener('webgl', (e) => {
  // console.log(e.webglX, e.webglY, e.webgldrag)
  if (e.webgldrag) {
    obj.lookAt(e.webglX, e.webglY, 2)
    obj1.lookAt(e.webglX, e.webglY, 2)
    box.lookAt(e.webglX, e.webglY, 2)
    box2.lookAt(e.webglX, e.webglY, 2)
    box3.lookAt(e.webglX, e.webglY, 2)
    // box5.lookAt(e.webglX, e.webglY, 2)
    box5.lookAt(box2.position.x, box2.position.y, box2.position.z)
  }
  // if(e.webglke)
  if (e.webglkeydown) {
    // console.log(e.webglkeyCode, e.webglkey)
    switch (e.webglkey.toLocaleLowerCase()) {
      case 'arrowleft':
      case 'a':
        {
          box2.translateX(-0.1)
        }
        break;
      case 'arrowdown':
      case 's':
        {
          box2.translateZ(-0.1)
        }
        break;
      case 'arrowright':
      case 'd':
        {
          box2.translateX(0.1)
        }
        break;
      case 'arrowup':
      case 'w':
        {
          box2.translateZ(0.1)
        }
        break;
    }
  }

})
// }