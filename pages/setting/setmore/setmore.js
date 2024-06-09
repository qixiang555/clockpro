// pages/setmore/setmore.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      workTime: 25,   // 默认工作时间
      restTime: 5,    // 默认休息时间
      vibison: false, // 默认振动关闭
      soundOn: false, // 默认音效关闭
      appId: "wx8abaf00ee8c3202e",   
      topTips: false,
      tophide: false,
    },

    changeWorkTime: function (e) {
        wx.setStorage({
          key: 'workTime',
          data: e.detail.value
        })
      },
      changeRestTime: function (e) {
        wx.setStorage({
          key: 'restTime',
          data: e.detail.value
        })
      },
      changevib: function (e) { //震动控制
        wx.setStorage({
          key: 'vibison',
          data: e.detail.value
        })
    if(e.detail.value==true){
      this.setData({
        topTips: true
    });
    setTimeout(() => {
      this.setData({
        tophide: true
    });
    setTimeout(() => {
        this.setData({
            topTips: false,
            tophide: false,
        });
    }, 300);
    }, 1200);
    }
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
          workTime: wx.getStorageSync('workTime') || this.data.workTime,
          restTime: wx.getStorageSync('restTime') || this.data.restTime,
          vibison: wx.getStorageSync('vibison') || this.data.vibison,
          soundOn: wx.getStorageSync('soundOn') || this.data.soundOn
      });
  },
    changeSound: function (e) { // 音效控制
      wx.setStorage({
          key: 'soundOn',
          data: e.detail.value
      });
      this.setData({
          soundOn: e.detail.value
      });
  },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.setNavigationBarTitle({
          title: '设置'
        })
        this.setData({
          workTime: wx.getStorageSync('workTime'),
          restTime: wx.getStorageSync('restTime'),
          vibison: wx.getStorageSync('vibison')
        })

      },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})