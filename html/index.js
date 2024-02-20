methods: {
    //使用_.debounce控制搜索的触发频率
    //准备搜索
    search: _.debounce(
        function () {
            let that = this;
            //删除已经结束的请求
            _.remove(sources, function (n) {
                return n.source === null;
            });
            //取消还未结束的请求
            sources.forEach(function (item) {
                if (item !== null && item.source !== null && item.status === 1) {
                    item.status = 0;
                    item.source.cancel('取消上一个')
                }
            });

            //创建新的请求cancelToken,并设置状态请求中
            var sc = {
                source: axios.CancelToken.source(),
                status: 1 //状态1：请求中，0:取消中
            };
            //这个对象加入数组中
            sources.push(sc);
            //开始搜索数据，yourhttp替换成你自己的请求路径
            axios.get('https://music.163.com/', {
                cancelToken: sc.source.token
            }).then(function (res) {
                //请求成功
                sc.source = null; //置空请求canceltoken

                //TODO这里处理搜索结果
                console.log(res.data);
                that.result = res.data;

            }).catch(function (thrown) {
                //请求失败
                sc.source = null; //置空请求canceltoken

                //下面的逻辑其实测试用
                if (axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    //handle error
                }

            });
        },
        500 //空闲时间间隔设置500ms
    )
}