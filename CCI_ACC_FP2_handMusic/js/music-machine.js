// var buffer = new Tone.Buffer("src/kick-electro01.wav");
// var buffer2 = new Tone.Buffer("src/snare-lofi02.wav");


function sequencer() {

  const kick = new Tone.Player('src/kick-electro01.wav').toMaster();
  const snare = new Tone.Player('src/snare-lofi02.wav').toMaster();
  const clap = new Tone.Player('src/clap-tape.wav').toMaster();
  const cowbell = new Tone.Player('src/cowbell-808.wav').toMaster();
  const hihat = new Tone.Player('src/hihat-plain.wav').toMaster();
  const perc = new Tone.Player('src/perc-laser.wav').toMaster();

  let index = 0;

  Tone.Transport.scheduleRepeat(repeat, "8n");
  Tone.Transport.start();

  function repeat() {
    let step = index % 8;
    let kickInputs = document.querySelector(
      `.kick input:nth-child(${step + 1})`
    );
    let snareInputs = document.querySelector(
      `.snare input:nth-child(${step + 1})`
    );
    let clapInputs = document.querySelector(
      `.clap input:nth-child(${step + 1})`
    );
    let cowbellInputs = document.querySelector(
      `.cowbell input:nth-child(${step + 1})`
    );
    let hihatInputs = document.querySelector(
      `.hihat input:nth-child(${step + 1})`
    );
    let percInputs = document.querySelector(
      `.perc input:nth-child(${step + 1})`
    );
    if (kickInputs.checked) {
      kick.start();
    }
    if (snareInputs.checked) {
      snare.start();
    }
    if (clapInputs.checked) {
      clap.start();
    }
    if (cowbellInputs.checked) {
      cowbell.start();
    }
    if (hihatInputs.checked) {
      hihat.start();
    }
    if (percInputs.checked) {
      perc.start();
    }
    index++;
  }
}

document.documentElement.addEventListener(
  "mousedown", function(){
    mouse_IsDown = true;
    if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }})

sequencer();
