// pages/meizi/meizi.js
Page({
  data: {
    meizi: {},
    page: 1,
    isLoadMore: false,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.refreshData();
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
  },

  onImageTap: function (event) {
    var imageIndex = event.currentTarget.dataset.imageIndex;
    var imageUrl=this.data.meizi.results[imageIndex].url;
    wx.navigateTo({
      url: '/pages/meizi/show-image/show-image?imageUrl='+imageUrl+'&fromWhere=meizi',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  onReachBottom: function () {
    this.loadMoreData();
  },
  loadMoreData: function (event) {
    if (this.data.isLoadMore) {
      return;
    }
    this.setData({ isLoadMore: true });
    var that = this;
    var page = this.data.page + 1;
    wx.request({
      url: 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/' + page,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var meizi = res.data;
        var thisMeizi = that.data.meizi;
        console.log(meizi);
        if (!meizi.error) {
          thisMeizi.results = thisMeizi.results.concat(meizi.results);
          that.setData({
            meizi: thisMeizi
          });
        }
        wx.stopPullDownRefresh()
        that.setData({
          page: that.data.page + 1
        });
      },
      fail: function () {

      },
      complete: function () {
        that.setData({ isLoadMore: false });
      }

    })
  },

  onPullDownRefresh: function () {
    this.refreshData();
  },
  refreshData: function () {
    var that = this;
    wx.request({
      url: 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var meizi = res.data;
        console.log(meizi);
        that.setData({
          meizi: meizi.error ? {} : meizi
        });
      },
      fail: function () {

      },
      complete: function () {
        wx.stopPullDownRefresh()
      }

    })
  }
})