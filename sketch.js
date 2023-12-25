
var face_colors = "cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff".split("-").map(a=>"#"+a)
var eye_colors = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)
//var pos_x=[200,500]
//var pos_y=[400,600]
//var sizes=[0.6,0.2]
//var colors=["#c8b6ff","#b8c0ff"]

var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_y=[]
var v_x=[]
var txts
var face_move_var = false
var lang = navigator.language  
var myRec = new p5.SpeechRec(lang)
var face_Rot_var = false
var sound1
function preload(){
  sound1 = loadSound("mixkit-raising-me-higher-34.mp3") //先把音樂檔載入到sound1程式碼中
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  inputElement = createInput()
  inputElement.position(10,10)
  inputElement.size(140,40)//文字框的寬高
  inputElement.style("font-size","20px")//文字框內的文字大小
  inputElement.style("color","#ffd100")//文字框內的文字顏色
  inputElement.style("background","#52b69a")//文字框的背景顏色
  inputElement.style("border","10")//設定文字框有沒有框線
  

btnMoveElement = createButton("移動")
btnMoveElement.position(170,10)
btnMoveElement.size(80,40) //文字框的寬高
btnMoveElement.style("font-size","20px")//文字框內的文字大小
btnMoveElement.style("color","#ffd100")//文字框內的文字顏色
btnMoveElement.style("background","#52b69a")//文字框的背景顏色
btnMoveElement.mousePressed(face_move)



btnStopElement = createButton("暫停")
btnStopElement.position(270,10)
btnStopElement.size(80,40)
btnStopElement.style("font-size","20px")
btnStopElement.style("color","#ffd100")
btnStopElement.style("background","#52b69a")
btnStopElement.mousePressed(face_stop)

radioElement = createRadio()
radioElement.option("暫停")
radioElement.option("旋轉")
radioElement.option("移動")
radioElement.position(370,10)
radioElement.size(200,40)
radioElement.style("font-size","20px")
radioElement.style("color","#ffd100")
radioElement.style("background-color","#52b69a")

btnVoiceElement = createButton("語音")
btnVoiceElement.position(600,10) //接鈕的位置
btnVoiceElement. size (80,40)//按鈕的寬與高
btnVoiceElement. style("font-size", "20px")//按鈕F
btnVoiceElement. style("color", "#fff")//按鈕內的
btnVoiceElement. style("background", "#2f3e46")
btnVoiceElement. mousePressed (voice_go)

music_btn=createButton("音樂")
music_btn.position(700,10)
music_btn. size(80,40)
music_btn. style("background",'color' ,"#2f3e46")
music_btn. style("font-size", "20px")
music_btn. style('color', 'white');
music_btn. mousePressed (music_btn_pressed)

  //for(var i=0;i<20;i=i+1){
    //drawface(face_colors[int(random(face_colors.length))],eye_colors[int(random(eye_colors.length))])
 }  
//}
function music_btn_pressed(){
  song.stop()
  song.play()
  songIsplay=true
  mouseIsplay=falseamp=new p5.Amplitude()
}
  push()
function draw() {
   background("#f5cac3");
   var mode = radioElement.value()
  for(var i=0;i<pos_x.length;i=i+1){
push()
txts = inputElement.value();
translate(pos_x[i],pos_y[i])
if(mode=="旋轉" || face_Rot_var){
  rotate(sin(frameCount/10*v_y[i]))
}  
  drawface(colors[i],0,sizes[i])
pop()
if(face_move_var){
pos_y[i] = pos_y[i] + v_y[i]
}
if(pos_y[i]>height ||  pos_y[i]<0)
{
  pos_x.splice(i,1)
  pos_y.splice(i,1)
  sizes.splice(i,1)
  colors.splice(i,1)
  v_y.splice(i,1)
  

}
}
}


function drawface(face_clr=255,eye_clr=0,size=1){
  let eyeSize = 20;
  let leftEyeX = 185;
  let leftEyeY = 190;
  let rightEyeX = 215;
  let rightEyeY = 190;
  
push()
//translate(random(width),random(height))  //原點(0,0)移動到(200,200)
scale(size)
fill(0)
textSize(50)
text(txts,100,400)

  // 身體
  fill(face_clr);
  ellipse(200, 300, 150, 100);

  // 頭部
  fill(face_clr);
  ellipse(200, 200, 120, 120);

  // 眼睛
  fill(200);
  ellipse(leftEyeX, leftEyeY, eyeSize, eyeSize);
  ellipse(rightEyeX, rightEyeY, eyeSize, eyeSize);

  // 跟隨滑鼠移動的眼球
   //fill(0);
 // let leftEyeBallX = constrain(mouseX, leftEyeX - 5, leftEyeX + 5);
 // let leftEyeBallY = constrain(mouseY, leftEyeY - 5, leftEyeY + 5);
   //ellipse(leftEyeBallX, leftEyeBallY, 8, 8);

  //let rightEyeBallX = constrain(mouseX, rightEyeX - 5, rightEyeX + 5);
  //let rightEyeBallY = constrain(mouseY, rightEyeY - 5, rightEyeY + 5);
 // ellipse(rightEyeBallX, rightEyeBallY, 8, 8);

  // 更新眼睛位置
  leftEyeX += (mouseX - leftEyeX) * 0.05;
  leftEyeY += (mouseY - leftEyeY) * 0.05;
  rightEyeX += (mouseX - rightEyeX) * 0.05;
  rightEyeY += (mouseY - rightEyeY) * 0.05;

  // 鼻子
  fill(0);
  ellipse(200, 210, 5, 5);

  // 嘴巴
  fill(face_clr);
  arc(200, 220, 30, 50, 0, PI);
  arc(200, 220, 30, 20, 0, PI);

  // 耳朵
  fill(255, 204, 153);
  triangle(160, 150, 130, 100, 180, 120);
  triangle(240, 150, 270, 100, 220, 120);
  pop()
}
function mousePressed(){
  
  pos_x.push(mouseX)
  pos_y.push(mouseY)
  sizes.push(random(0.3,1))
  colors.push(face_colors[int(random(face_colors.length))])
  v_y.push(random(-1,1))
  

  }
  function face_move(){
   face_move_var =true


  }


  function face_stop(){
    face_move_var =false



    
  }
  function voice_go(){
    myRec.onResuit = showResuit
    myRec.start()
  }
function showResuit(){
  if(myRec.resultValue == true)
  {
    print(myRec.resultString)
    let lowStr = myRec.resultString.toLowerCase();
    let mostrecentword = lowStr.split(' ').pop();
    if(myRec.resultString.indexOf("走") !==-1)  {
    face_move_var =true
  }
  if(myRec.resultString.indexOf("停") !==-1)  {
  face_move_var = false
  face_Rot_var = false
}
if(myRec.resultString.indexOf("轉")!==-1)  {
  face_Rot_var = true
}
}
}
function music_btn_pressed(){
  if(sound1.isPlaying()){
    sound1.stop();
  }
  else{
    sound1.play();

  }
}



