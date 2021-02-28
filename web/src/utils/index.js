exports.initCanvas = (canvasRef, sendToChannel) => {
  const canvasCtx = canvasRef.current.getContext("2d");
  canvasCtx.fillStyle = "solid";
  canvasCtx.strokeStyle = "#ECD018";
  canvasCtx.lineWidth = 5;
  canvasCtx.lineCap = "round";

  var lastEvent;
  var mouseDown = false;
  const handleMousedown = (e) => {
    lastEvent = e;
    mouseDown = true;
    canvasCtx.beginPath();
    canvasCtx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    sendToChannel("drawstart", {
      mx: lastEvent.offsetX,
      my: lastEvent.offsetY,
    });
  };
  const handleMouseMove = (e) => {
    if (mouseDown) {
      canvasCtx.lineTo(e.offsetX, e.offsetY);
      canvasCtx.stroke();
      lastEvent = e;
      sendToChannel("draw", {
        lx: e.offsetX,
        ly: e.offsetY,
      });
    }
  };
  canvasRef.current.addEventListener("mousedown", (e) => {
    handleMousedown(e);
  });
  canvasRef.current.addEventListener("mousemove", (e) => {
    handleMouseMove(e);
  });
  canvasRef.current.addEventListener("mouseup", () => {
    mouseDown = false;
  });
  canvasRef.current.addEventListener("mouseleave", () => {
    mouseDown = false;
  });
  // mobile
  canvasRef.current.addEventListener("touchstart", (e) => {
    handleMousedown(e);
  });
  canvasRef.current.addEventListener("touchmove", (e) => {
    handleMouseMove(e);
  });
  canvasRef.current.addEventListener("touchend", () => {
    mouseDown = false;
  });
  canvasRef.current.addEventListener("touchcancel", () => {
    mouseDown = false;
  });
};

exports.createUUID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};
