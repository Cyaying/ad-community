// pages/index/index.js
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        navbar: [
            {name: '首页', id: '0'},
            {name: '病因', id: '1'},
            {name: '防治', id: '2'},
            {name: '护理', id: '3'},
            {name: '咨询', id: '4'},
            {name: '探索', id: '5'},
        ],
        swiperItems: [
            {num: "1", picUrl: '/image/index/1.png'},
            {num: "2", picUrl: '/image/index/2.png'},
            {num: "3", picUrl: '/image/index/3.png'},
            {num: "4", picUrl: '/image/index/4.png'},
            {num: "5", picUrl: '/image/index/5.png'},
            {num: "6", picUrl: '/image/index/6.png'},
            {num: "7", picUrl: '/image/index/7.png'},
            {num: "8", picUrl: '/image/index/8.png'},
            {num: "9", picUrl: '/image/index/9.png'},
            {num: "10", picUrl: '/image/index/10.png'},
        ],
        articles: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
        history: [],
        currentTab: 0,
        scrollHeight: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let height = wx.getSystemInfoSync().windowHeight - 50
        this.setData({
            currentTab: app.globalData.currentTab,
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
                this.setData({
                    history: []
                })
            }
        })
        this.getArticles()
    },
    getArticles () {
        // 按热度值从大到小排序
        function compare(property){
            return function(a,b){
                let value1 = a[property];
                let value2 = b[property];
                return value2 - value1;
            }
        }

        let that = this
        let now = that.getTime()
        console.log(now)
        let category = that.data.navbar[that.data.currentTab].id
        console.log(category)
        wx.request({
            // url: 'https://www.csdn.net/api/articles?type=more&category=' + category + '&shown_offset=' + now + '&first_view=false',
            url: 'https://a.catcher.fun:8000/content/?type=' + category,

            success: (res) => {
                console.log(res)
                let articles = that.data.articles
                for (let i = 0; i < res.data.length; i++) {
                    let article = {
                        title: res.data[i].title,
                        views: (parseInt(res.data[i].views)/10000).toFixed(1),
                        nickname: res.data[i].nickname,
                        desc: res.data[i].abstract,
                        url: res.data[i].url.replace('article/details', 'wx/article/details'),
                    }
                    articles[that.data.currentTab].push(article);
                    articles[that.data.currentTab].sort(compare('views'))
                    that.setData({
                        articles: articles
                    })
                }
                console.log("articles: ", that.data.articles)
            }
        })
    },
    getTime () {
        let date = new Date()
        let x = date.toLocaleDateString(); 
        console.log("date: ", x)
        return date.getTime()
    },
    // 导航栏点击事件
    navbarTap: function (e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
        //全局变量
        app.globalData.currentTab = e.currentTarget.dataset.idx
    },
    // 导航栏滑动事件
    swiperChange: function (e) {
        this.setData({
            currentTab: e.detail.current
        })
        app.globalData.currentTab = e.detail.current
        if (this.data.articles[this.data.currentTab].length == 0) {
            this.getArticles()
        }
    },
    // 内容点击事件，跳转详情页
    toDetail: function(e) {
        let url = e.currentTarget.dataset.url
        let x = this.data.currentTab
        let y = e.currentTarget.dataset.id
        let record = this.data.articles[x][y]
        wx.navigateTo({
            url: '/pages/detail/detail?url=' + url,
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


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
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
