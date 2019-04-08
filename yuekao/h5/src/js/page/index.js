define(["mui", 'BScroll'], function(mui, BScroll) {
    const box = document.querySelectorAll('.pull>section'); //渲染的盒子
    let pull = document.querySelector('.pullup'); //上拉刷新
    const [a, b] = [
        [],
        []
    ]
    let page = 1;
    let flag = false;;
    var BS = new BScroll('.mainbody', {
        probeType: 2
    })

    function init() {
        mui.init()
        getdata(1, 10) //ajax获取数据
        scroll() //滚动事件
    }

    function getdata(skip, limit) {
        mui.ajax('/getdata', {
            data: {
                skip: skip,
                limit: limit
            },
            success(rs) {
                const sdata = rs.data;
                render(sdata)
            }
        })
    }

    function render(data) { //渲染
        const bdata = waterpull(data);
        bdata.map(function(item, i) {
            box[i].innerHTML = item.map(function(evey) {
                return `<dl>
                <dt><img src="img/${evey.img}" alt="" style="width:${evey.h}px"></dt>
                <dd>
                    <p>${evey.tit}</p>
                    <p>${evey.con} <span>${evey.p}</span></p>
                </dd>
            </dl>`
            }).join('')
        })
        BS.refresh()
    }

    function waterpull(data) { //瀑布流数据
        data.map(function(item) {
            if (!a.length) {
                a.push(item);
                return;
            }
            if (!b.length) {
                b.push(item);
                return;
            }
            const A = a.reduce(function(s, v) {
                return s + v.h
            })
            const B = a.reduce(function(s, v) {
                return s + v.h
            })
            if (a < b) {
                a.push(item)
            } else {
                b.push(item)
            }
        })
        return [a, b]
    }

    function scroll() {
        BS.on('scroll', function() {

            if (this.y < this.maxScrollY - 50) {
                pull.innerHTML = '释放刷新。。。';
                flag = true;
            } else {
                pull.innerHTML = '上拉加载';
                flag = false;
            }
        })
        BS.on('scrollEnd', function() {
            if (flag) {

                page++;
                getdata(page, 10);
                pull.innerHTML = '释放刷新。。。'
                return
            } else {
                pull.innerHTML = '没有更多数据';
            }

        })
    }
    init()
});