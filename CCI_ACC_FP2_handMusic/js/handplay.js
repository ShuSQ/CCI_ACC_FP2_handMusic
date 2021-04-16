const modelParams = { // 導入handtrack默認的參數模型
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.9, // confidence threshold for predictions.
};

const genres = {  // 生成對象
  middle: {
    filter: "blur",
    source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  right: {
    filter: "brightness",
    source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  left: {
    filter: "contrast",
    source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
};

// 獲取頁面元素
const video = document.getElementsByTagName("video")[0];
const audio = document.getElementsByTagName("audio")[0];
const canvas = document.getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");
let model;

function loadModel() {
  handTrack.load().then((_model) => { // 載入模型之後初始化介面
    // Initial interface after model load.
    // Store model in global model variable
    model = _model;
    model.setModelParameters(modelParams);
    
    runDetection();
    document.getElementById("loading").remove();
  });
}

// 返回一個promise Returns a promise
handTrack.startVideo(video).then(function (status) {
  if (status) { // 載入視頻成功後，加載模型
    loadModel()
  } else {  // else，提示開啟攝像頭
    console.log("Please enable camera");
  }
});

function applyFilter(filterType) {  // 移除原濾鏡並添加新css濾鏡
  if (canvas.classList.length > 0) canvas.classList.remove(canvas.classList[0]);
  canvas.classList.add(filterType);
}

function drawText(text, x, y) { // 繪製文本
  const color = "#4d375d";
  const font = "1.2rem Monoton";

  context.font = font;
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function runDetection() { // 檢測函數，並把手勢檢測渲染到canvas上
  model.detect(video).then((predictions) => {
    //Render hand predictions to be displayed on the canvas
    model.renderPredictions(predictions, canvas, context, video);

    //Add genres to canvas
    drawText("Left 🤚🏻", 25, 50);
    drawText("Middle ✊🏻", 250, 50);
    drawText("Right ✋🏻", 525, 50, "");

    requestAnimationFrame(runDetection);

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
        audio.play();
      }
    }
  });
}
