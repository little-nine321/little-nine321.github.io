var isStart = false;
var white = false;
var speed = 10;
var clock = null;

function start(){
    if(!isStart){
        init();
        isStart = true;
    }else{
        alert("游戏已经开始，请勿多次点击");
    }
}
function creatediv(className){
    var div = document.createElement("div");
    div.className = className;
    return div;
}

function createrowarr(){
    var arr = ["cell","cell","cell","cell"];
    var num = Math.floor(Math.random()*4);/*获取0到3的随机整数*/
    arr[num] = "cell black";
    return arr;
}

function createrow(){
    var wrapper= document.getElementById("wrapper-123");
    var row = creatediv("row clearfix");
    var arr = createrowarr();
    for(var i = 0;i < arr.length;i++){
        var cell = creatediv(arr[i]);
        row.appendChild(cell);
    }
    if(wrapper.firstChild == null){
        wrapper.appendChild(row);
    }else{
        wrapper.insertBefore(row,wrapper.firstChild);
    }
}

function deleterow(){
    var wrapper = document.getElementById("wrapper-123");
    if(wrapper.children.length == 6){
        wrapper.removeChild(wrapper.lastChild);
    }
}

var btn = document.getElementById("start");

btn.onclick = start;

function score(){
    var newScore = parseInt(document.getElementById("score").innerHTML) + 1;
    document.getElementById("score").innerHTML = newScore;
    if(newScore % 10 == 0){
        speedup();
    }
}

function init(){
    var wrapper = document.getElementById("wrapper-123");
    for(var i = 0;i < 4;i++){
        createrow();
    }
    wrapper.onclick = function(event){
        if(event.target.className.indexOf("black") !== -1){/*点击了黑块*/
            event.target.parentNode.pass = 1;
            event.target.className = "cell";
            score();
        }else if(event.target.className.indexOf("cell") !== -1){
            white = true;
        }
    };
    clock = window.setInterval('move()', 30);
}

function judge(){/*判断是否失误，指点击白块或者黑块触底 */
    var wrapper= document.getElementById("wrapper-123");
    if(white){
        fail();
    }
    if(wrapper.children.length == 5 && wrapper.lastElementChild.pass !== 1){
        fail();
    }
}

function fail(){
    clearInterval(clock);
    isStart = false;
    white = false;
    var replay = confirm('你的最终得分为 ' + parseInt(document.getElementById("score").innerHTML) + "，是否重玩？？");
    if(replay){
        alert("菜逼，再怎么玩也超不过50分");
    }else{
        alert("怂");
    }
    var wrapper = document.getElementById("wrapper-123");
    wrapper.innerHTML = '';
    document.getElementById("score").innerHTML = 0;
    wrapper.style.top = '-408px';
    speed = 10;
}

function move(){
    var wrapper = document.getElementById("wrapper-123");
    var top = parseInt(window.getComputedStyle(wrapper,null)["top"]);
    if(top + speed > 0){
        top = 0;
    }else{
        top += speed;
    }
    wrapper.style.top = top + "px";
    judge();
    if(top == 0){
        createrow();
        wrapper.style.top = "-102px";
    }
    deleterow();
}

function speedup(){
    speed += 2;
    if(speed == 20){
        alert("你超神了！！！");
    }
    if(speed == 30){
        alert("🐄🍺");
    }
}