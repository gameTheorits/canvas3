var database
var drawing = [];
var cp =[];
var isDraw = false
var canvas
var save;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.mousePressed(sp)
 canvas.mouseReleased(ep)
 canvas.parent("canvascontainer")
  database = firebase.database();
  saveButton = createButton("save");
  saveButton.mousePressed(saveDraw);
    clearButton = createButton("clear");
  clearButton.mousePressed(clearDrawing);
  var ref = database.ref('drawings')
  ref.on('value',gotData,errData);
 
}
function sp(){
  isDraw = true
  cp = []
  drawing.push(cp);
}
function ep(){
  isDraw = false
}
function clearDrawing(){
  drawing = [];
}

function draw() {
  background(0);
  if(isDraw === true){
    var point = {
      x : mouseX,
      y : mouseY
    };
    cp.push(point);
  }
 
  
  stroke("teal");
  strokeWeight(4);
  noFill();
  
  for(i = 0;i < drawing.length;i++){
    var line = drawing[i];
    beginShape();
    for(j = 0;j < line.length;j++){

    
    vertex(line[j].x,line[j].y);
    }
    endShape();
  }
  
}

function saveDraw(){
  var ref = database.ref('drawings');
  var data = {
    name : "your Drawing",
    drawing : drawing
  }
  var result = ref.push(data,sent);
  console.log(result.key);
  function sent(err,status){
    console.log(status);
  }
}
function gotData(data){
   var drawings = data.val();
   var keys = Object.keys(drawings);
   for(var i;i < keys.length;i++){
     var key = keys[i];
     //console.log(keys);
     var li = createElement("li",'');
     var ahref = createA("#",key);
     ahref.mousePressed(showDrawing);
     ahref.parent(li);
     li.parent('drawingList')
   }
}
function errData(err){
   console.log("hello world")
}
function showDrawing(){
  var key = this.html();
  var ref  = database.ref('drawings/'+ key);
  ref.on('value',oneDraw,errData);
  function oneDraw(data){
    var bddrawing = data.val();
   drawing = bddrawing.drawing;
  }
}
