wx.ajax = function (url,data, isPost) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method: isPost ? 'post' : 'get',
      success: resolve,
      fail: reject
    })
  })
} 