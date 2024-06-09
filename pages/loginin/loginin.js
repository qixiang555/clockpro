// pages/loginin/loginin.js
Page({
  data: {
    account: '',
    password: ''
  },

  // 获取用户输入的账号和密码
  onAccountInput: function(event) {
    this.setData({
      account: event.detail.value
    });
  },

  onPasswordInput: function(event) {
    this.setData({
      password: event.detail.value
    });
  },

  // 登录逻辑
  onLogin: function() {
    const { account, password } = this.data;

    // 检查账号和密码是否填写
    if (!account.trim() || !password.trim()) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none'
      });
      return;
    }

    // 从本地存储中获取保存的账号信息
    wx.getStorage({
      key: 'userAccount',
      success: (res) => {
        const savedAccount = res.data.account;
        const savedPassword = res.data.password;

        // 检查用户输入的账号是否已保存
        if (account === savedAccount) {
          if (password === savedPassword) {
            // 保存用户信息
            wx.setStorage({
              key: 'userInfo',
              data: {
                account: account,
                avatarUrl: '/image/touxiang.jpeg' // 设置头像路径
              },
              success: () => {
                // 跳转到用户界面
                wx.switchTab({
                  url: '/pages/setting/setting'
                });
              },
              fail: () => {
                wx.showToast({
                  title: '保存用户信息失败',
                  icon: 'none'
                });
              }
            });
          } else {
            wx.showToast({
              title: '账号或密码错误',
              icon: 'none'
            });
          }
        } else {
          wx.showToast({
            title: '请先进行账号注册',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请先进行账号注册',
          icon: 'none'
        });
      }
    });
  },

  // 注册逻辑
  onRegister: function() {
    const { account, password } = this.data;

    // 检查账号和密码是否填写
    if (!account.trim() || !password.trim()) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none'
      });
      return;
    }

    // 从本地存储中检查是否有已有账号
    wx.getStorage({
      key: 'userAccount',
      success: (res) => {
        const savedAccount = res.data.account;

        // 检查账号是否已注册
        if (account === savedAccount) {
          wx.showToast({
            title: '账号已注册',
            icon: 'none'
          });
        } else {
          this.saveAccount(account, password);
        }
      },
      fail: () => {
        // 如果没有存储过任何账号，直接保存新的账号
        this.saveAccount(account, password);
      }
    });
  },

  // 保存账号和密码的函数
  saveAccount: function(account, password) {
    wx.setStorage({
      key: 'userAccount',
      data: {
        account: account,
        password: password
      },
      success: () => {
        wx.showToast({
          title: '注册成功，请登录',
          icon: 'none'
        });
      },
      fail: () => {
        wx.showToast({
          title: '注册失败，请重试',
          icon: 'none'
        });
      }
    });
  }
});
