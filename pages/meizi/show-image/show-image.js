// pages/meizi/show-image/show-image.js
Page({
  data: {
    isImageShow: false,
    imageUrl: '',
    fromWhere: 'meizi',
    alradySave: false,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.showToast('loading', 'loading', 5000);
    var imageUrl = options.imageUrl;
    this.setData({ imageUrl: imageUrl });
    this.setData({ fromWhere: options.fromWhere });
    console.log(imageUrl);
  },

  onBindError: function () {

  },
  onBindLoad: function () {
    wx.hideToast();
    this.setData({ isImageShow: true });
  },

  onLongTap: function () {
    if (!this.data.isImageShow) {
      return;
    }
    var that = this;
    var fromWhere = this.data.fromWhere;
    if (fromWhere == 'meizi') {
      wx.showActionSheet({
        itemList: ['保存图片', '收藏图片'],
        success: function (res) {
          switch (res.tapIndex) {
            case 0:
              that.saveImage();
              break;
            case 1:
              that.collectImage();
              break;
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    } else if (fromWhere == 'collected') {
      wx.showActionSheet({
        itemList: ['保存图片'],
        success: function (res) {
          switch (res.tapIndex) {
            case 0:
              that.saveImage();
              break;
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }

  },
  //收藏图片
  collectImage: function () {
    if (!this.data.isImageShow) {
      return;
    }
    var that = this;
    var imageUrl = this.data.imageUrl;
    var app = getApp();
    var key = app.globalData.COLLECT_IMAGE_KEY;
    var collectedImages = [];
    wx.getStorage({
      key: key,
      success: function (res) {
        // success
        console.log('success');
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i] == imageUrl) {
            that.setData({ alradySave: true });
            break;
          }
        }
        collectedImages = res.data.concat(imageUrl);
      },
      fail: function () {
        // fail
        console.log('fail');
        collectedImages = collectedImages.concat(imageUrl);
      },
      complete: function () {
                    console.log(that.data.alradySave);
        if (that.data.alradySave) {
          that.showToast('请勿重复收藏', 'success', 1500);
          return;
        }
        wx.setStorage({
          key: key,
          data: collectedImages,
          success: function (res) {
            // success
            that.showToast('收藏成功', 'success', 1500);
          },
          fail: function () {
            // fail
            that.showToast('收藏失败', 'success', 1500);
          },
          complete: function () {
            // complete
          }
        })
      }
    })
  },
  //保存图片
  saveImage: function () {
    if (!this.data.isImageShow) {
      return;
    }

    wx.downloadFile({
      url: this.data.imageUrl,
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function (res) {
            // var savedFilePath = res.savedFilePath
            wx.showToast({
              title: '保存成功',
              icon: 'success',
            })
          }
        })
      }
    })
  },
  onShareAppMessage: function () {
    if (!this.data.imageUrl) {
      return;
    }
    return {
      title: '分享图片',
      desc: '妹子-.-',
      path: this.data.imageUrl,
    }
  },
  showToast: function (title, icon, duration) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration,
    })
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})