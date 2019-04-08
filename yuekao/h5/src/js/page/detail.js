define(['mui'], function(mui) {
    const types = document.querySelectorAll('.type>span')
    const type = document.querySelector('.type');
    const img = document.querySelector('.img>img');
    const num = document.querySelector('.num>input');
    const size = document.querySelector('.color>input');
    const place = document.querySelector('.place>input');
    const btn = document.querySelector('.btn')
    let p = "现货";
    let index = 0;

    function init() {
        mui.init();
        bind();
        // mui('.num').popover(status[anchor]);
    }

    function bind() {
        type.addEventListener('click', function(e) {
            var tar = e.target;
            if (tar.nodeName === 'SPAN') {
                types[index].classList.remove('active')
                tar.classList.add('active');
                index = tar.id;
                p = document.querySelector('.active').innerHTML;
                getdata();
            }
        })
        btn.onclick = function() {
            getdata();
        }
    }

    function getdata() {

        let data = {
            img: 'pic1.png',
            tit: num.value,
            h: size.value,
            con: place.value,
            p: p
        }

        mui.ajax('/adddata', {
            data: data,
            success(rs) {
                location.href = 'index.html';
                console.log(rs)
            }
        })
    }
    init()
});