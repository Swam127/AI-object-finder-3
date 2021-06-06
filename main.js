status = "";
objects = [];

function setup()
{
    canvas =  createCanvas(480, 380);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 380);
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("objects").value;
}

function modelLoaded()
{
    console.log("COCOSSD is Initialized !");
    status = true;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if (status != "")
    {
       objectDetector.detect(video, gotResult);
       for (i = 0; i < objects.length; i++)
       {
           document.getElementById("status").innerHTML = "Status : Object/s Detected";
           document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+objects.length;

           fill("#FF0000");
           PERCENT = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + PERCENT + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

           if(objects[i].label == object_name)
           {
             video.stop();
             objectDetector.detect(gotResult);
             document.getElementById("number_of_objects").innerHTML = object_name + " Found";
             synth = window.speechSynthesis;
             utterThis = new SpeechSynthesisUtterance(object_name + "Found");
             synth.speak(utterThis);
           }
           else
           {
             document.getElementById("number_of_objects").innerHTML = object_name + " Not Found";
           }     
       }
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}