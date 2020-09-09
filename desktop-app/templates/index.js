const child_process = require('child_process')

var countNext = 0;
let oldVideoPath;
let videoName;
let oldVideoName;
let videoPath;
var loading = 0


document.getElementById('sel-vid').onchange = function(e){
    var countNext = 0;
    let nextImg = document.querySelector('#next-bx img');
    let percImg = document.querySelector('#pre-bx img');
    let nextBtn = document.getElementById('cur-eff-r');
    let preBtn = document.getElementById('cur-eff-l');
    //get the path of the video
    try{
        videoPath = 'file://' + e.srcElement.files[0].path;
        videoName = e.srcElement.files[0].name;
        oldVideoPath = videoPath;
        oldVideoName = videoName;
    }
    //if error in the path so we will take the old selected video
    catch(err){
        videoPath = oldVideoPath;
        videoName = oldVideoName;
    }
    //show the video name and change the color of the next button
    document.getElementById("state-msg").innerText = e.srcElement.files[0]["name"];
    nextImg.src = './icon/next_blue.png';
    document.getElementById('cur-eff-r').style.visibility = "visible";
    //add click event to next button
    nextBtn.addEventListener('click',(ev) => {
        //first click next : show selected video
        if(countNext ==0){
            document.querySelector('.video-bx').innerHTML =`
            <video  width="300" controls>
                <source src="${videoPath}" >
                Your browser does not support HTML video.
            </video>
            `;
            nextImg.src = './icon/next_blue.png';
            document.getElementById('cur-eff-r').style.visibility = "visible";
            percImg.src = './icon/pre_blue.png';
            document.getElementById('cur-eff-l').style.visibility = "visible";
            document.getElementsByClassName('sub-mid-bx-2')[0].classList.add('display-none');
            document.getElementsByClassName('video-bx')[0].classList.remove('display-none');
            
            countNext++;
        }
        //second click next : show start detection button
        else if(countNext ==1){

            nextImg.src = './icon/next_black.png';
            document.getElementById('cur-eff-r').style.visibility = "hidden";
            percImg.src = './icon/pre_blue.png';
            document.getElementById('cur-eff-l').style.visibility = "visible";
            document.getElementsByClassName('video-bx')[0].classList.add('display-none');
            document.getElementsByClassName('start-bx')[0].classList.remove('display-none');
        }
        
        //add event to pre button
        preBtn.addEventListener('click',() => {
           if(countNext >0){
                document.getElementsByClassName('start-bx')[0].classList.add('display-none');
                document.getElementsByClassName('video-bx')[0].classList.add('display-none');
                document.getElementsByClassName('sub-mid-bx-2')[0].classList.remove('display-none');
                nextImg.src = './icon/next_blue.png';
                document.getElementById('cur-eff-r').style.visibility = "visible";
                percImg.src = './icon/pre_black.png';
                document.getElementById('cur-eff-l').style.visibility = "hidden";
                countNext--;
            }
        });
        
    });
}

document.querySelector('.start-bx input').addEventListener('click',() => {
    document.getElementsByClassName('loading-bx')[0].classList.remove('display-none');
    document.getElementsByClassName('start-bx')[0].classList.add('display-none');
    document.getElementsByClassName('sub-mid-bx-3')[0].classList.add('display-none');
    var load = setInterval(
        function(){
            if(loading == 0){
                document.getElementsByClassName('text')[0].textContent = 'Processing video please wait .';
                loading = 1;
            }else if(loading == 1){
                document.getElementsByClassName('text')[0].textContent = 'Processing video please wait ..';
                loading = 2;
            }else if(loading == 2){
                document.getElementsByClassName('text')[0].textContent = 'Processing video please wait ...';
                loading = 0;
            }
        }, 1000);
    fetch(`http://127.0.0.1:5000/testVideo?path_out=${__dirname.slice(0,-9)+'output/'+videoName.slice(0,videoName.indexOf('.'))+'_out.mp4'}&video_path=${videoPath.slice(7,videoPath.length)}`)
    .then(res => res.text()).then(data => {
        if(data == 'done'){
            clearInterval(load);
            document.getElementsByClassName('loading-bx')[0].classList.add('display-none');
            document.getElementsByClassName('sub-mid-bx-3')[0].classList.add('display-none');
            document.getElementsByClassName('sub-mid-bx-3')[1].classList.remove('display-none');
            document.getElementsByClassName('output-bx')[0].classList.remove('display-none');
        }
    });
    

});

document.querySelectorAll('.sub-mid-bx-3 input')[0].addEventListener('click',()=>{
    document.getElementsByClassName('start-bx')[0].classList.remove('display-none');
    document.getElementsByClassName('sub-mid-bx-3')[0].classList.remove('display-none');
    document.getElementsByClassName('sub-mid-bx-3')[1].classList.add('display-none');
    document.getElementsByClassName('output-bx')[0].classList.add('display-none');
});