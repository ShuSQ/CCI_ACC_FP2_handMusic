# CCI_ACC_FP2_handMusic

> Introduction: This is a simple demo work that uses handtrack.js and Tone.js; by capturing the position of the hand, it can switch the background music and change the simple filter of the canvas; similarly, a simple drums created loops by Tone.js, you can simply mix different sounds together.

![](https://miro.medium.com/max/1080/1*kHUqRSIohRfpMvcba9f7yA.gif)

You can try my online demo:

**CodeSandbox:** https://ggddh.csb.app

You can also watch the demo video online:

**YouTube:** https://youtu.be/8Pg5hY85aWA

You can find this project in my code repository:

**Github:** https://github.com/ShuSQ/CCI_ACC_FP2_handMusic

### 0.Why did I do this project? 🧐

When I was a high school student, I tried audio production software like fruitloops, and I was very interested in audio production methods. At that time, I thought about whether users can control the audio through some interactive methods of the body. I have come into contact with TensorFlow this semester, and I decided to explore and experiment in this direction.

![仪器型号](https://ashishdubey.xyz/static/6f2d2cab57f53c45fc61b8c6f9e68b07/fcda8/mapping-model.png)

Image from：[34.4.magnusson.pdf](http://sro.sussex.ac.uk/id/eprint/46868/1/34.4.magnusson.pdf)



### 1.Handtrack  🖐🏼

First, I need to find a way to recognize the hand and control it through the video information collected by the webcam. Among the available technical tools, we have many choices, such as TensorFlow, openCV and MediaPipe, etc. Finally, I chose Handtrack.js as the technical solution for finding hands.

**What is Handtrack.js?**

Handtrack.js is a library for prototyping realtime hand detection (bounding box), directly in the browser. It frames handtracking as an object detection problem, and uses a trained convolutional neural network to predict bounding boxes for the location of hands in an image.

**Why I choose Handtrack.js?**

Because I am more familiar with JavaScript, and it is easier to obtain the case-study of Handtrack.js on the Internet; of course, in terms of calculation speed and accuracy, it is not as good as the Python+MediaPipe solution. Considering the scale of the project, the current Performance is also acceptable.

Other, we can also detect the image information collected by the webcam through JavaScript, compare each frame, and then detect the motion information. This is a clever method, and it can also generate its own style of video.

![](https://miro.medium.com/max/1080/1*wx5wylcIlu_jCUBRbpbCbw.gif)

You can learn more from this code repository here:

https://github.com/jasonmayes/JS-Motion-Detection


![测试图片](https://miro.medium.com/max/1080/1*puQvJePTArhZpAt2xZpd2g.png)

*Testing the technical solutions of tensorflow.js and fingerpose is great, but we don’t need it at the moment*

Handtrack.js is very convenient to use, we can quickly configure parameters:

```javascript
const modelParams = { // 導入handtrack默認的參數模型
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.9, // confidence threshold for predictions.
};
```

![](https://miro.medium.com/max/700/1*OvllYVN9J5saV7IToG3b6Q.gif)

I learned a lot from these materials:

* [Real Time AI GESTURE RECOGNITION with Tensorflow.JS](https://www.youtube.com/watch?v=9MTiQMxTXPE)
* [Handtrack.js: Hand Tracking Interactions in the Browser using Tensorflow.js](https://towardsdatascience.com/handtrackjs-677c29c1d585)
* [Controlling 3D Objects with Hands](https://dev.to/xenoxdev/javascript-quickies-controlling-3d-objects-with-hands-498n)
* [Machine learning for everyone: How to implement pose estimation in a browser using your webcam](https://thenextweb.com/syndication/2020/02/01/machine-learning-for-everyone-how-to-implement-pose-estimation-in-a-browser-using-your-webcam/?utm_term=Autofeed&utm_campaign=campaign&utm_medium=Social&utm_source=Facebook&Echobox=1580661626)
* [Teachable Machine](https://teachablemachine.withgoogle.com/)
* [Air guitar tutorial](https://www.youtube.com/watch?v=VD2bIMBu2y8)
* [A modern approach for Computer Vision on the web](https://trackingjs.com/)
* [Motion Tracking & Music in < 100 lines of JavaScript](https://blog.alyssaholland.me/motion-tracking-and-music-in-less-100-lines-of-javascript)
* [MediaPipe in JavaScript](https://google.github.io/mediapipe/getting_started/javascript.html)



### 2.Binding with audio player

Create an empty audio tag in `.html`:

```html
<audio></audio>
```

We need to get the page elements in handplay.js:

```javascript
const audio = document.getElementsByTagName("audio")[0];
```

Through the length of predictions, `bbox` is the coordinate of the box that stores the recognition result. We can read the xy coordinate information of the handbook through bbox[0] and bbox[1], and then divide it into 3 recognition areas:

```javascript
if (predictions.length > 0) {
  let x = predictions[0].bbox[0];
  let y = predictions[0].bbox[1];

  // 匹配位置並播放音源
  if (y <= 100) {
    if (x <= 150) {
      //Left
      audio.src = genres.left.source;
      applyFilter(genres.left.filter);
    } else if (x >= 250 && x <= 350) {
      //Middle
      audio.src = genres.middle.source;
      applyFilter(genres.middle.filter);
    } else if (x >= 450) {
      //Right
      audio.src = genres.right.source;
      applyFilter(genres.right.filter);
    }
    //Play the sound
    audio.volume = 1;
    audio.play();	// 播放audio
  }
}
```

The following articles are very helpful  for me:

* [Magenta - Make Music and Art Using Machine Learning](https://magenta.tensorflow.org/)

* [React-music](https://github.com/FormidableLabs/react-music)

* [Making Music In A Browser: Recreating Theremin With JS And Web Audio API](https://www.smashingmagazine.com/2016/06/make-music-in-the-browser-with-a-web-audio-theremin/)

* [Building a web-based musical instrument](https://ashishdubey.xyz/web-digital-instrument.html)

* [How To Create A Responsive 8-Bit Drum Machine Using Web Audio, SVG And Multitouch](https://www.smashingmagazine.com/2016/08/how-to-create-a-responsive-8-bit-drum-machine-using-web-audio-svg-and-multitouch/)

* [Dear diary ai](https://github.com/StephenHaney/dear-diary-ai)

* [Live Coding with Machine Learning (Magenta.js)](https://in-thread.sonic-pi.net/t/live-coding-with-machine-learning-magenta-js/4462)

* [Making music with magenta.js](https://hello-magenta.glitch.me/)

* [**JavaScript Systems Music**](https://teropa.info/blog/2016/07/28/javascript-systems-music.html)

* [Machine Learning in Sound+Music](https://medium.com/@mheavers/machine-learning-in-sound-music-6f0715320d49)

  



### 3.Add simple filter effects

In addition to switching music with gestures, I also considered adding simple filters to change the effect of the video, mainly through the filter attribute of CSS, using the three effects of `blur` `brightness` `contrast`, and initially considered implementing similar to TensorFlow The effect of NST (Neural Style Transfer), considering the performance of the browser and the implementation cost, chose a more convenient filter solution.

![](https://miro.medium.com/max/1000/1*R68J0NlGmZwAARcD3YHHfQ.png)

![](https://miro.medium.com/max/1000/1*QgHAtnhriYKtdvnIVEtbeg.png)

![](https://miro.medium.com/max/1000/1*i1xyScWB4uOfetCFVoM65Q.png)

### 4.Create loops by Tone.js

*Tone*.*js* is a Web Audio framework for creating interactive music in the browser. Earlier, Tone.js and magenta.js were compared. There are many similarities between the two, and magenta.js is okay. Through MusicRNN and MusicVAE to complete machine learning, I really want to do this, let the ambient sound, background sound and Samples mix! However, there are not enough materials for making music with Magenta.js on the Internet. After learning, I found that I could not achieve it in a short time, so I chose Tone.js. To achieve this, Tone.js loads audio samples and sets the scheduleRepeat() poetry selection loop effect, and sets the playback step through the `<input type="checkbox">` tag.

```html
// .HTML
...
<div class="kick">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
</div>
...
```

```javascript
function sequencer() { //載入音頻
  ...
	const kick = new Tone.Player('src/kick-electro01.wav').toMaster();
	...
}
```

```javascript
  function repeat() {	// 實現單個drums的播放
    ...
    let kickInputs = document.querySelector(
      `.kick input:nth-child(${step + 1})`
    ...
    );
    
    ...
    if (kickInputs.checked) {
      kick.start();
    ...
    }
```

In addition, because the browser prohibits the automatic playback of audio, we need to add resume() to skip this:

```javascript
document.documentElement.addEventListener(
  "mousedown", function(){
    mouse_IsDown = true;
    if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }})
```

![](https://miro.medium.com/max/1080/1*a_SrmyMXFTW8_xuoxQMHnQ.gif)

I learned a lot from these materials:

* [Tone.js](https://github.com/Tonejs/Tone.js)

* [Making sounds with React and Tone.js](https://react.christmas/2020/15)
* [Tutorial: Let’s Make Music with JavaScript and Tone.js](https://medium.com/dev-red/tutorial-lets-make-music-with-javascript-and-tone-js-f6ac39d95b8c)

### 5. Can do more

After the whole demo is finished, I have a better understanding of webaudio and webcam, but I also have more things to enrich, such as:

1. Rich musicmachine GUI elements, you can control the step and volume, and choose more drums types;
2. Consider using a track library with better performance to achieve more detailed interaction, such as using fingers to play audio sources and click checkboxes;
3. Do more experiments on the filter effect, and have parameter conduction with the mixed audio;
4. Use MusicRNN, MusicVAE, etc. to convolve the audio, you can mix the audio through more modes.
5. Consider tracking targets other than hands, such as facemesh, etc.

![](https://miro.medium.com/max/480/1*rHce9kr6p_xB5I04X5Vssw.png)
