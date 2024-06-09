// setting.js
const app = getApp();
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  data: {
    avatarUrl: '/image/default-avatar.png', // 默认头像
    nickName: '去登录', // 默认显示“去登录”
    lognum:0,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,

    vibison: false,
    iosDialog2: false,
    avatarUrl: defaultAvatarUrl,
    appId: "wx8abaf00ee8c3202e",   
    topTips: false,
    tophide: false,
    musicIndex: 0,
    music: ["静音", "林间", "卡农", "城南", "浮光", "下雨"],
    musicUrl:[
      'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_55670028&response=res&type=convert_url&', 
      'http://music.163.com/song/media/outer/url?id=478507889.mp3',
      'http://music.163.com/song/media/outer/url?id=468176711.mp3',
      'http://music.163.com/song/media/outer/url?id=1394601255.mp3',
      'http://music.163.com/song/media/outer/url?id=1999615733.mp3',
    ],
    musicCoverUrl:'https://s3.ax1x.com/2021/03/12/6NLUV1.jpg',
    extraData: {
      id: "144958",
      customData: {
        clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
        imei: '7280BECE2FC29544172A2B858E9E90D0'
      }
    }
  },
  onLoad(){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  // 5.30
  onLoad: function() {

    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        const userInfo = res.data;
        this.setData({
          avatarUrl: userInfo.avatarUrl || '/image/touxiang.jpeg', // 使用传回来的头像或默认头像
          nickName: userInfo.account || '去登录' // 使用传回来的账号名作为昵称
        });
      },
      fail: () => {
        // 如果未登录，保持默认值
      }
    });

    // 获取 lognum 的值
    let lognum = app.globalData.lognum || wx.getStorageSync('lognum') || 0;
    this.setData({ lognum: lognum });
  },
  // 点击打卡后跳转
  handleTap: function() {
    wx.navigateTo({
      url: `/pages/clockin/clockin?lognum=${this.data.lognum}`
    });
  },

  navigateToLogin: function() {
    wx.navigateTo({
      url: '/pages/loginin/loginin'
    });
  },

  checkUserInfo: function() {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        const userInfo = res.data;
        this.setData({
          avatarUrl: userInfo.avatarUrl || '/image/touxiang.jpeg', // 使用传回来的头像或默认头像
          nickName: userInfo.account || '去登录' // 使用传回来的账号名作为昵称
        });
      },
      fail: () => {
        // 如果未登录，保持默认值
      }
    });
  },

  onShow() {
    this.checkUserInfo();
    let lognum = app.globalData.lognum || wx.getStorageSync('lognum') || 0;
    this.setData({ lognum: lognum });
    wx.setNavigationBarTitle({
      title: '专注时钟'
    })
    wx.setNavigationBarColor({
      backgroundColor: '#ffffff',
      frontColor: '#000000',
    })
    this.setData({
      workTime: wx.getStorageSync('workTime'),
      restTime: wx.getStorageSync('restTime'),
      vibison: wx.getStorageSync('vibison')
    })
  },

  close() {
    this.setData({
      iosDialog2: false,
    });
  },
  openIOS2() {
    this.setData({
      iosDialog2: true,
    });
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

  gotucao: function (e) {
    Tucao.init(this, {
      productId: 1368
    }).go();
  },
  changemusic: function (e) { //音乐
    this.setData({
      musicIndex: e.detail.value
    })
    if (e.detail.value == 0) {
      wx.getBackgroundAudioPlayerState({
        success (res) {if(res.status== 2){}else{wx.stopBackgroundAudio()}}
      })
    } else if (e.detail.value == 1) {
      wx.stopBackgroundAudio()
      const music1 = wx.getBackgroundAudioManager()
      music1.title = this.data.music[1]
      music1.singer = '专注时钟'
      music1.coverImgUrl = this.data.musicCoverUrl
      music1.src = this.data.musicUrl[0]    // 设置了 src 之后会自动播放
      music1.onEnded(()=>{music1.src = this.data.musicUrl[0]})  //监听播放完毕，重新赋地址，单曲循环
    } else if (e.detail.value == 2) {
      wx.stopBackgroundAudio()
      const music2 = wx.getBackgroundAudioManager()
      music2.title = this.data.music[2]
      music2.singer = '专注时钟'
      music2.coverImgUrl = this.data.musicCoverUrl
      music2.src =this.data.musicUrl[1]
      music2.onEnded(()=>{music2.src = this.data.musicUrl[2]})
    } else if (e.detail.value == 3) {
      wx.stopBackgroundAudio()
      const music3 = wx.getBackgroundAudioManager()
      music3.title = this.data.music[3]
      music3.singer = '专注时钟'
      music3.coverImgUrl = this.data.musicCoverUrl
      music3.src = this.data.musicUrl[2]
      music3.onEnded(()=>{music3.src = this.data.musicUrl[2]})
    }else if (e.detail.value == 4) {
      wx.stopBackgroundAudio()
      const music3 = wx.getBackgroundAudioManager()
      music3.title = this.data.music[4]
      music3.singer = '专注时钟'
      music3.coverImgUrl = this.data.musicCoverUrl
      music3.src = this.data.musicUrl[3]
      music3.onEnded(()=>{music3.src = this.data.musicUrl[3]})
    }else if (e.detail.value == 5) {
      wx.stopBackgroundAudio()
      const music3 = wx.getBackgroundAudioManager()
      music3.title = this.data.music[5]
      music3.singer = '专注时钟'
      music3.coverImgUrl = this.data.musicCoverUrl
      music3.src = this.data.musicUrl[4]
      music3.onEnded(()=>{music3.src = this.data.musicUrl[4]})
    }
    
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      return {
        title: '管理时间，保持专注！一起来提高学习工作效率。',
        path: '/pages/index/index',
        imageUrl: '/image/about.png' //不设置则默认为当前页面的截图
      }
    }
  },
  onShareTimeline: function (res) {
    return {
      title: '管理时间，保持专注，让自律成为习惯！',
      query: {
        // key: 'value' //要携带的参数 
      },
      imageUrl: '/image/about.png'
    }
  }


})
