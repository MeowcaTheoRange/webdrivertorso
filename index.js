kaboom({
	width: 640,
	height: 360,
	background: [255,255,255]
})
loadSound("tone", "tone.wav")
var i = -1;

var count = add([
	text("space to start", {
		font: "sink",
		size: 8,
		width: width() - 32
	}),
	color(BLACK),
	z(4),
	origin("botleft"),
	pos(16, height() - 16)
])

function RandomTorso(col) {
	destroyAll("TORSO" + col.r);
	var wd = randi(0, width());
	var ht = randi(0, height());
	var posx = randi(0, width() - wd);
	var posy = randi(0, height() - ht);
	add([
		rect(wd, ht),
		pos(posx, posy),
		color(col),
		"TORSO" + col.r
	])
}

var isStarted = false;
var tone;
onKeyPress("space", () => {
  tone = play("tone", {
    loop: true
  });
	if (!isStarted) loop(1, () => {
    tone.detune(randi(-1200, 1200));
		RandomTorso(BLUE);
		RandomTorso(RED);
		i++;
		count.text = "kaboom.js - slide " + i.toString().padStart(4, "0");
	})
  isStarted = true;
})

onKeyPress("e", () => {
	window.open(screenshot(), '_blank').focus();
})

var isRecording = false;
var record;
onKeyPress("r", () => {
	if (isRecording) {
		record.download();
		isRecording = false;
		return;
	}
	record = record();
	isRecording = true;
})