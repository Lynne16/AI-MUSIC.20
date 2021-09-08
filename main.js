song1="";
song2="";
rightWristx=0;
leftWristx=0;
rightWristy=0;
leftWristy=0;
leftWristscore=0;
rightWristscore=0;
song1_status="";
song2_status="";

function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.position(400,200);

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('poseNet is loaded');
}

function draw(){
    image(video,0,0,600,500);

    song1_status=song1.isPlaying();

    if(leftWristscore > 0.2){
        fill("lavender");
        stroke("black");
        circle(leftWristx,leftWristy,10);
        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById("song_name").innerHTML="Harry Potter Remix";
        }
    }

    song2_status=song2.isPlaying();

    if(rightWristscore > 0.2){
        fill("purple");
        stroke("black");
        circle(rightWristx,rightWristy,10);
        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("song_name").innerHTML="Peter Pan";
        }
    }
}

function gotPoses(results){

    if(results.length > 0){
        console.log(results);

    leftWristscore=results[0].pose.keypoints[9].score;
    rightWristscore=results[0].pose.keypoints[10].score;

    rightWristx=results[0].pose.rightWrist.x;
    leftWristx=results[0].pose.leftWrist.x;

    rightWristy=results[0].pose.rightWrist.y;
    leftWristy=results[0].pose.leftWrist.y; 

    console.log("Right Wrist X "+rightWristx+" Left Wrist X "+leftWristx);
    console.log("Left Wrist Y "+leftWristy+" Right Wrist Y "+rightWristy);
    }
}