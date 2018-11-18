function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return {
    width: srcWidth * ratio,
    height: srcHeight * ratio
  };
}

function getImgResizeValue(file) {
  return new Promise(function(resolve, reject) {
    let img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function() {
      let width = img.naturalWidth;
      let height = img.naturalHeight;

      resolve(calculateAspectRatioFit(width, height, 320, 240));
    };
  });
}

export const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise(function(resolve, reject) {
    getImgResizeValue(file).then(newSize => {
      const fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const elem = document.createElement("canvas");
            elem.width = newSize.width;
            elem.height = newSize.height;
            const ctx = elem.getContext("2d");
            // img.width and img.height will give the original dimensions
            ctx.drawImage(img, 0, 0, newSize.width, newSize.height);
            ctx.canvas.toBlob(
              blob => {
                const file = new File([blob], fileName, {
                  type: "image/jpeg",
                  lastModified: Date.now()
                });
                resolve(file);
              },
              "image/jpeg",
              1
            );
          };
          reader.onerror = error => console.log(error);
      };
    });
  });
};
