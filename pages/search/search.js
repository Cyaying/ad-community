// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploadPics: [],
    },

    chooseImg: function (e) {
        wx.chooseImage({
            count: 1,
            sizeType: ['original','compressed'],
            sourceType: ['album','camera'],
            success: (result)=>{
                this.setData({
                    uploadPics: result.tempFilePaths,
                })
            },
        });
    },

    deleteImg: function (e) {
        wx.showModal({
            title: '提示',
            content: '是否删除',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#d81f06',
            success: (result) => {
                if(result.confirm){
                    this.setData ({
                        uploadPics: [],
                    })
                }
            },
        });
    },

    uploadImg: function (e) {
        if (this.data.uploadPics.length) {
            var paths = this.data.uploadPics
            for (var i = 0; i < paths.length; i++) {
                wx.uploadFile({
                    url: 'http://127.0.0.1:8000/predict/',
                    filePath: paths[i],
                    name: "frmi-image",
                    formData: {},
                    success: (result)=>{
                        wx.showToast({
                            title: '上传成功！',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: false,
                        });
                        this.setData ({
                            uploadPics: [],
                        })
                    },
                    fail: (e)=>{
                        console.log(e)
                        wx.showToast({
                            title: '上传失败！',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: false,
                        });
                    },
                    complete: ()=>{},
                });
            }
        }
        else {
            wx.showToast({
                title: '您还未上传图片',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
            });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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