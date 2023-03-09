objects = [];
status = "";
input_box = "";
video = "";
results = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : objects Detected";
    
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == input_box)
            {
               video.stop();
               document.getElementById("object_status").innerHTML = input_box + " Found"; 
               objectDetector.detect(gotResult);
               

            }
            else
            {
                document.getElementById("object_status").innerHTML = input_box + " Not Found";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_box = document.getElementById("input_box").value;

}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    if(results)
    {
        console.log(results);
        objects = results;  
    }
}