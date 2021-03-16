
    var indexPage = 0
    var pagesNum = document.getElementsByClassName('page').length
    var fullPage = document.getElementById('full-page')
    var windowHeight = document.documentElement.clientHeight
    var fullBox = document.getElementById('full-page-box')
    let timeoutResize
    let timeoutWheel
    let delay = 1

    fullPage.style.height = windowHeight + 'px';

    // 创建导航点
    creatNav()
    function creatNav() {

        const nav = document.createElement('div');
        nav.className = 'nav';
        fullBox.appendChild(nav);
        // 有几页，显示几个点
        for (let i = 0; i < this.pagesNum; i++) {
            nav.innerHTML += '<p class="nav-dot"><span></span></p>';
        }
        const navDots = document.querySelectorAll('.nav-dot');
        this.navDots = navDots
        // 添加初始样式
        navDots[0].classList.add('active')
        // 添加点式导航点击事件
        this.navDots.forEach((value, index) => {
            value.addEventListener('click', event => {
                // 页面跳转
                fullPage.style.top = - index * windowHeight + 'px'
                //  导航点样式
                changeDot(index)
            });
        });
    }

    // 监听窗口变化
    window.addEventListener('resize', function () {
        clearTimeout(timeoutResize)
        timeoutResize = setTimeout(() => {
            windowHeight = document.documentElement.clientHeight
            fullPage.style.height = windowHeight + 'px';
            fullPage.style.top = - indexPage * windowHeight + 'px'
        }, 700);
    })

    // 监听滚轮事件
    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        document.addEventListener('mousewheel', wheelCallBack);
    } else {
        document.addEventListener('DOMMouseScroll', wheelCallBack);
    }

    // 滚动回调函数
    function wheelCallBack(event) {
        if (/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent)) {
            if (getWheelDelta(event) > 0) {
                goUp()
            } else {
                goDown()
            }
        } else {
            // 锁
            if (delay) {
                delay = 0
                if (getWheelDelta(event) > 0) {
                    goUp()
                } else {
                    goDown()
                }
                clearTimeout(timeoutWheel)
                timeoutWheel = setTimeout(() => {
                    delay = 1
                }, 1000);
            }
        }
    }
    function goUp() {
        indexPage--
        if (indexPage == -1) {
            indexPage = 0
        }
        fullPage.style.top = - indexPage * windowHeight + 'px'
        changeDot(indexPage)
    }
    function goDown() {
        indexPage++
        if (indexPage == pagesNum) {
            indexPage = pagesNum - 1
        }
        fullPage.style.top = - indexPage * windowHeight + 'px'
        changeDot(indexPage)
    }

    // 手指接触屏幕
    document.addEventListener('touchstart', event => {
        this.startY = event.touches[0].pageY;
    });
    //手指离开屏幕
    document.addEventListener('touchend', event => {
        let endY = event.changedTouches[0].pageY;
        if (endY - this.startY < 0) {
            // 手指向上滑动，对应页面向下滚动
            this.goDown();
        } else {
            // 手指向下滑动，对应页面向上滚动
            this.goUp();
        }
    });

    // 判断上下滚动, 上滑正, 下滑负
    function getWheelDelta(event) {
        if (event.wheelDelta) {
            // 调用一次函数后就无需判断了
            this.getWheelDelta = event => event.wheelDelta
            return event.wheelDelta;
        } else {
            this.getWheelDelta = event => -event.detail
            // 兼容火狐
            return -event.detail;
        }
    }

    // 更改导航点样式
    function changeDot(index) {
        indexPage = index
        navDots.forEach(function (value, index) {
            navDots[index].classList.remove('active')
        })
        navDots[index].classList.add('active')
    }