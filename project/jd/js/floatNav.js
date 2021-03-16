window.addEventListener('DOMContentLoaded', function () {

    const floatNav = document.getElementById('floatNav')
    const fixedTop = document.getElementById('fixedTop')
    
    /* =========缓慢迅速上滑======= */
    const toTop = document.getElementById('toTop')
    toTop.onclick = scrollTop
    let timer = null
    function scrollTop() {
        clearInterval(timer)
        timer = setInterval(() => {
            document.documentElement.scrollTop -= 1
            if (document.documentElement.scrollTop <= 0) {
                document.documentElement.scrollTop = 0
                clearInterval(timer)
            }
        }, 2);
    }
    
    
    
    /* ==============滚动页面到指定板块============= */
    // 获取各个板块
    const navDiv = [
        document.getElementById('seckill'),  //  京东秒杀
        document.getElementById('corel'),  //  每日特价
        document.getElementById('findGoods'),  //  发现好货
        document.getElementById('channels'),  //  频道广场
        document.getElementById('feeds'),  //  为你推荐
        document.getElementById('footer') //  底部信息
    ]
    // 获取板块对应的按钮
    const nav = floatNav.getElementsByClassName('div')
    // 绑定点击事件
    for (let i = 0; i < nav.length; i++) {
        nav[i].onclick = () => {
            scrollNav(i)
        }
    }
    // 监听滚动事件
    document.addEventListener('scroll', scrollCallback)
    // 滚动回调事件
    function scrollCallback() {
        let scrollT = document.documentElement.scrollTop
        if (scrollT + 40 >= 680) {
            toTop.style.display = 'block'
            floatNav.style.position = 'fixed'
            floatNav.style.top = '70px'
            fixedTop.style.transform = 'translateY(0)'
        } else {
            floatNav.style.position = ''
            floatNav.style.top = ''
            fixedTop.style.transform = ''
            toTop.style.display = ''
        }
        
        // 获取滚动时的那一刻(注意是滚动时而不是滚动后)
        let top = scrollT + 300
        if (top < navDiv[0].offsetTop - 10) {for (let i = 0; i < nav.length; i++) { nav[i].style.color = '' }}
        else if (navDiv[0].offsetTop < top && top < navDiv[1].offsetTop) changeNavColor(0)
        else if (navDiv[1].offsetTop < top && top < navDiv[2].offsetTop) changeNavColor(1)
        else if (navDiv[2].offsetTop < top && top < navDiv[3].offsetTop) changeNavColor(2)
        else if (navDiv[3].offsetTop < top && top < navDiv[4].offsetTop) changeNavColor(3)
        else if (navDiv[4].offsetTop < top && top < navDiv[5].offsetTop) changeNavColor(4)
        else if (navDiv[5].offsetTop < top) changeNavColor(5)
    }
    // 变色
    function changeNavColor(num) {
        for (let i = 0; i < nav.length; i++) {
            nav[i].style.color = ''
        }
        nav[num].style.color = '#e1251b'
    }
    // 滚动
    function scrollNav(num) {
        clearInterval(timer)
        let top = 0
        switch (num) {
            case 0: top = navDiv[0].offsetTop; break
            case 1: top = navDiv[1].offsetTop; break
            case 2: top = navDiv[2].offsetTop; break
            case 3: top = navDiv[3].offsetTop; break
            case 4: top = navDiv[4].offsetTop; break
            case 5: top = navDiv[5].offsetTop; break
        }
        window.scroll({ top: top - 200, left: 0, behavior: 'smooth' })
    }
})