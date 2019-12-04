// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view: 0,
    // 前置摄像头 ‘front’ 后置‘back’
    isPosition: true,
    // 拍照的路径
    imgSrc: ''
  },
  // 翻转拍照角度
  reverse() {
    this.setData({
      isPosition: !this.data.isPosition
    })
  },
  // 拍照处理时间
  camera() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          imgSrc: res.tempImagePath
        })
      },
      fail: () => {
        this.setData({
          imgSrc: ''
        })
      }
    })
  },
  // 选择照片
  album () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: res => {
        res.tempFilePaths.length && this.setData({
          imgSrc: res.tempFilePaths
        })
        // tempFilePath可以作为img标签的src属性显示图片
      },fail: () => {
        wx.showToast({
          title: '相册读取失败'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo);
    this.setData({
      view: systemInfo.windowHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})