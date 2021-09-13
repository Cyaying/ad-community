const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            nickName: "登陆后，随时收藏、关注",
            avatarUrl: "/image/user/avatar_girl.png"
        },
        hasUserInfo: false,
        canIUseGetUserProfile: false,
    },

    onLoad() {
        if (wx.getUserProfile) {
          this.setData({
            canIUseGetUserProfile: true
          })
        }
    },

    getUserProfile(e) {
        wx.getUserProfile({
          desc: '用于完善会员资料',
          success: (res) => {
              console.log(app.globalData.userInfo)
              console.log(res)
              this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
              })
              app.globalData.userInfo = res.userInfo
              console.log(app.globalData.userInfo)
          },
          fail: (err) => {
              console.log(err)
          }
        })
    },
    // 浏览历史记录
    toHistory: function(e) {
      wx.navigateTo({
        url: '/pages/history/history',
      })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */

     toKnown: function () {
        wx.navigateTo({
          url: '/pages/known/known',
        })
     },

    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {}
})