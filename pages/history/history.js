const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        picUrl: [
            '/image/index/h_1.png',
            '/image/index/h_2.png',
            '/image/index/h_3.png',
            '/image/index/4.png',
            '/image/index/5.png',
            '/image/index/6.png',
            '/image/index/7.png',
            '/image/index/8.png',
            '/image/index/9.png',
            '/image/index/10.png'
        ],
        history: [],
        scrollHeight: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let height = wx.getSystemInfoSync().windowHeight - 50
        this.setData({
            scrollHeight: height
        })
        wx.getStorage({
            key: 'history',
            success: (res) => {
                this.setData({
                    history: res.data
                })
            },
            fail: (err) => {
                console.log("error!!!")
                this.setData({
                    history: []
                })
            }
        })
    },

    toDetail: function(e) {
        let idx = e.currentTarget.dataset.id
        let array = (this.data.history[idx].url || '').split('/')
        let userName = array[3]
        let articleId = array[7]
        let record = this.data.history[idx]
        console.log('record: ', record)
        wx.navigateTo({
            url: '/pages/detail/detail?userName=' + userName + '&articleId=' + articleId,
        })
        let oldHistory = this.data.history
        let history = oldHistory.filter(item => {
            return item !== record
        })
        if (history.length > 9) {
            history.pop()
        }
        history.unshift(record)
        wx.setStorageSync('history', history)
        this.setData({
            history: history
        })
        app.globalData.history = history
    },
    // 删除浏览记录
    delHistory: function (e) {
        let id = e.currentTarget.dataset.id
        let history = this.data.history
        history.splice(id, 1)
        wx.setStorageSync('history', history)
        this.setData({
            history: history
        })
        app.globalData.history = history
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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