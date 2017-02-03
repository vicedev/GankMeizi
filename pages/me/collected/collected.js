Page({
  data: {
    collectedImages: [],
    left: 25,
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var app = getApp();
    var key = app.globalData.COLLECT_IMAGE_KEY;
    var that = this;
    wx.getStorage({
      key: key,
      success: function (res) {
        // success
        that.setData({ collectedImages: res.data });
        console.log(res.data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onLongImageTap: function (event) {
    console.log('long');
    var that = this;
    wx.showModal({
      title: '删除该收藏',
      content: '确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var imageUrl = event.currentTarget.dataset.imageUrl;
          var collectedImages = that.data.collectedImages;
          for (var i = 0; i < collectedImages.length; i++) {
            if (collectedImages[i] == imageUrl) {
              collectedImages.splice(i, 1);
              break;
            }
          }
          that.setData({ collectedImages: collectedImages });
          var app = getApp();
          var key = app.globalData.COLLECT_IMAGE_KEY;
          wx.setStorage({
            key: key,
            data: collectedImages,
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
        }
      }
    })

  },
  onImageTap: function (event) {
    var imageUrl = event.currentTarget.dataset.imageUrl;
    wx.navigateTo({
      url: '/pages/meizi/show-image/show-image?imageUrl=' + imageUrl + '&fromWhere=collected',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  showToast: function (title, icon, duration) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration,
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
})