// pages/home/home.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    view: 0,
    // 前置摄像头 ‘front’ 后置‘back’
    isPosition: true,
    // 拍照的路径
    imgSrc: '',
    isShowPic: false,
    faceInfos: {},
    isFlag: false
  },
  // 翻转拍照角度
  reverse() {
    this.setData({
      isPosition: !this.data.isPosition
    })
  },
  // 拍照事件
  camera() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          imgSrc: res.tempImagePath
        }, () => {
          this.getFaceFun()
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
  album() {
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      sourceType: 'album',
      success: res => {
        res.tempFilePaths.length && this.setData({
          imgSrc: res.tempFilePaths[0]
        }, () => {
          this.getFaceFun()
        })
        // tempFilePath可以作为img标签的src属性显示图片
      },
      fail: () => {
        wx.showToast({
          title: '相册读取失败'
        })
      }
    })
  },
  reChooseHandle() {
    this.setData({
      isShowPic: false
    })
  },
  // 测试颜值函数
  getFaceFun() {
    wx.showLoading()
    const token = app.globalData.access_token
    if (!token) {
      return wx.showToast({
        title: '鉴权失败'
      })
    }
    // 文件管理器
    const {
      readFileSync
    } = wx.getFileSystemManager();
    const imgBase64 = readFileSync(this.data.imgSrc, 'base64')
    wx.request({
      method: 'post',
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=' + app.globalData.access_token,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        image: imgBase64,
        image_type: 'BASE64',
        face_field: 'age,beauty,expression,gender,glasses,emotion'
      },
      success: ({data}) => {
        const info = data.result
        console.log(data)
        if (!info) {
          wx.hideLoading()
          wx.showToast({
            title: '检测失败'
          })
          return
        }
        this.setData({
          faceInfos: data.result.face_list[0],
          isShowPic: true
        })
        wx.hideLoading()
        console.log(this.data.faceInfos)
      },
      fail: (err) => {
        err
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      view: systemInfo.windowHeight
    })
    wx.hideLoading()
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