import ajax from "@/tool/index.js";
//登录
export const loginAPI = (name, pwd) => {
  try {
    return ajax({
      method: 'post',
      url: "/api/login",
      data: {
        method: "login",
        logintype:"SPLogin",
        name,
        pwd,
      }
    })
  } catch (error) {
    return error.message
  }
}

//按照发布时间
export const getbbslistfortimeAPI = (id) => {
  try {
    return ajax({
      method: 'post',
      url: "/bbs/Bbs/time",
      data: {
        id,
      }
    })
  } catch (error) {
    return error.message
  }
}
// 按照回复时间
export const responseTimeAPI = (id) => {
  try {
    return ajax({
      method: 'post',
      url: "/bbs/Bbs/reply",
      data: {
        id,
      }
    }).catch()
  } catch (error) {
    return error.message
  }
}
//根据id获取贴子具体
export const getpostallAPI = (count, id, cmid) => {
  try {
    return ajax({
      method: "post",
      url: "/bbs/gettail",
      data: {
        count,
        id,
        cmid,
        filterType: "desc",
      }
    }).catch()
  } catch (error) {
    return error.message
  }
}
//点赞
export const likeAPI = (count, id, cid) => {
  //console.log(count, id);
  try {
    return ajax({
      method: 'post',
      url: "/bbs/like",
      data: {
        count,
        id,
        cid
      }
    }).catch()
  } catch (error) {
    return error.message
  }
}
//对帖子评论
export const commentsAPI = (type, id, cmContent, picturePath, ititle) => {
  return ajax({
    method: 'post',
    url: "bbs/postReply",
    data: {
      type,
      id,
      cmContent,
      picturePath,
      ititle,
    }
  })
}
//获取用户基本资料
export const userinfoAPI = (count, pageCode, id) => {
  try {
    return ajax({
      method: 'post',
      url: "bbs/getUser",
      data: {
        count,
        pageCode,
        id,
      }
    }).catch()
  } catch (error) {
    return error.message
  }
}
//uploadAnImage
export const uploadAnImageAPI = (type, imgdata) => {

  try {
    return ajax({
      method: 'post',
      url: "/bbs/makefriends",
      data: {
        type,
        imgdata
      }
    }).catch()
  } catch (error) {
    return error.message
  }
}
//发布图片帖子
export const sendAnImagePostAPI = (type, data) => {
  try {
    return ajax({
      method: 'post',
      url: "/bbs/imagePost",
      data: {
        type,
        ...data,
      }
    }).catch()
  } catch (error) {
    return Promise.reject(error)
  }
}
// demo

export const demoAPI = (file) => {
  try {
    return ajax({
      method: 'post',
      url: "/uploadmt/mp4",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: {
        mp4: file
      },
    }).catch()
  } catch (error) {
    return Promise.reject(error)
  }
}


