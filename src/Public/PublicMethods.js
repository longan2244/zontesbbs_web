import { likeAPI } from "@/API/bbs/index"
import { uploadAnImageAPI } from "@/API/bbs/index";
//0对贴子  1对评论
export const likeMH = (type, ID) => {

  return likeAPI(type, ID);
}


// 图片ba64压缩
export const ZIPimg = function (file) {
  let imgBase64 = []
  let data = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < file.length; i++) {
      let canvas = document.createElement("canvas");
      // 获取对应的CanvasRenderingContext2D对象(画笔)
      let context = canvas.getContext("2d");
      // 创建新的图片对象
      let img = new Image();
      // 指定图片的DataURL(图片的base64编码数据)
      img.src = file[i].content;
      // 监听浏览器加载图片完成，然后进行绘制
      img.onload = () => {
        // 指定canvas画布大小，该大小为最后生成图片的大小
        canvas.width = 400;
        canvas.height = 300;
        /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。*/
        /* 如果不指定缩小的像素，图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后得到的图片就是张局部图。图片小于画布就会有黑边。*/
        context.drawImage(img, 0, 0, 400, 300);
        // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
        file[i].content = canvas.toDataURL(file[i].file.type, 0.92);
        imgBase64.push(file[i].content.split("data:image/jpeg;base64,")[1]);
        resolve()
      };
    }
  }).then(() => {
    return imgBase64
  })

}

// ba64ToLink
export const ba64ToLink = async function (imgBase64) {
  let Links = ""
  for (let i = 0; i < imgBase64.length; i++) {
    let { data: Link } = await uploadAnImageAPI(2, imgBase64[i]);
    Links += Link.fileName + ";"
  }
  let okurl = Links.slice(0, Links.length - 1)
  return okurl
}
//发送评论

// fileName
// :
// "20221118182458_9355.jpg"
// fileUrl
// :
// "https://www.sharpon.com/Tayoimg/GX/Friend/20221118182458_9355.jpg"
// isLogin
// :
// "False"
// result
// :
// "success"