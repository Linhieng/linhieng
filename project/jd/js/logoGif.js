window.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('header-logo')
    const gif = document.getElementById('mouseMove')
    const text = gif.getElementsByClassName('text')[0]
    let lock = false
    let isUp = false
    let timer = null
    gif.onmouseover = () => {
        isUp = true
        if (lock === false) {
            // 开始加载图片, 锁住
            lock = true
            setTimeout(() => {
                gif.style.backgroundImage = `url('../images/logoMove.gif?${new Date()}')`;
                gif.style.opacity = '1'
                setTimeout(() => {
                    text.style.opacity = '1'
                    timer = setInterval(() => {
                        // 图片动画完成, 每两秒判断一次是否鼠标是否停留在其上
                        if (isUp === false) {
                            gif.style.backgroundImage = '';
                            gif.style.opacity = ''
                            text.style.opacity = ''
                            lock = false
                            // 鼠标已离开，无需继续判断
                            clearInterval(timer)
                        }
                    }, 2000);
                }, 3000);
            }, 300);
        }
    }
    logo.onmouseout = () => {
        isUp = false
    }

    /* =========变化5周年======== */
    const hot = document.getElementById('search-hot')
    const li = document.getElementById('nav-fiveYear')
    const p  = li.getElementsByTagName('p')[0]
    const fiveYear  = li.getElementsByTagName('i')[0]
    let flag = true
    let flag2 = true
    setInterval(() => {
        if (flag2) {
            hot.innerText = '户外运动购'
        } else {
            hot.innerText = '十元包邮品'
        }
        flag2 = !flag2
    }, 4000);
    setInterval(() => {
        if (flag) {
            moveY(p, 0, -100, () => {
                p.style.transform = 'translateY(100%)'
            })
            moveY(fiveYear, 120, 0)
        } else {
            moveY(p, 100, 0)
            moveY(fiveYear, 0, -120, () => {
                fiveYear.style.transform = 'translateY(120%)'
            })
            // p.style.transform = 'translateY(-100%)'
            // fiveYear.style.transform = 'translateY(0)'
        }
        flag = !flag
    }, 2000);
    
    function moveY(obj , prev, next, callback) {
        let i = (next - prev) / 10
        let timer
        timer = setInterval(() => {
            prev+=i
            obj.style.transform = `translateY(${prev}%)`
            if (prev == next) {
                clearInterval(timer)
                callback && callback()
            }
        }, 10);
    }
})