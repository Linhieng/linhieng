window.addEventListener('DOMContentLoaded', function () {

    /* ================秒杀倒计时=================== */
    //#region 
    const seckillTime = document.getElementById('seckill-time')
    const timeArr = seckillTime.getElementsByTagName('span')
    let min, second, hour, killHour
    setTimeout(() => {
        min = ((Date.now() / 1000)) % 86400 % 3600 / 60
        min = 59 - Math.floor(min)
        min = (min < 10 ? '0' : '') + min
        timeArr[2].innerText = min

        hour = Math.floor(((Date.now() / 1000)) % 86400 / 3600) + 8
        killHour = (hour + 2) - (hour % 2)
        killHour %= 24
        hour = (hour + 1) % 2
        killHour = (killHour < 10 ? '0' : '') + killHour
        timeArr[0].innerText = killHour + ':00'
        timeArr[1].innerText = '0' + hour
    })

    countDown()

    function countDown() {
        setInterval(() => {
            second = ((Date.now() / 1000)) % 86400 % 3600 % 60
            second = 60 - Math.floor(second)
            second = (second < 10 ? '0' : '') + second
            timeArr[3].innerText = second

            second === 1 ? (
                setTimeout(() => {
                    min = ((Date.now() / 1000)) % 86400 % 3600 / 60
                    min = 59 - Math.floor(min)
                    min = (min < 10 ? '0' : '') + min
                    timeArr[2].innerText = min

                    hour = Math.floor(((Date.now() / 1000)) % 86400 / 3600) + 8
                    killHour = (hour + 2) - (hour % 2)
                    killHour %= 24
                    hour = (hour + 1) % 2
                    killHour = (killHour < 10 ? '0' : '') + killHour
                    timeArr[0].innerText = killHour + ':00'
                    timeArr[1].innerText = '0' + hour
                })
            ) : a()
        }, 1000);

    }
    function a() { }
    //#endregion

    /* ================滚图=================== */
    const slide = document.getElementById('seckill-slide')
    const wrapper = document.getElementById('seckill-wrapper')
    const prev = document.getElementById('seckill-prev')
    const next = document.getElementById('seckill-next')

    let slideWidth = slide.clientWidth
    let prevWid = -slideWidth // 保存 translateX()的值, 初始值为 -slide.clientWidth，(可左右滑动)
    let toWid
    let timer = null
    let flag = false // 是否正在滑动

    prev.onclick = () => {
        if (flag === false) {
            toWid = prevWid + slideWidth
            slip(prevWid, toWid, () => {
                if (prevWid === 0) {
                    prevWid = 2 * slideWidth - wrapper.clientWidth
                    setTimeout(() => {
                        wrapper.style.transform = `translateX(${prevWid}px)`
                    });
                }
            })
            prevWid = toWid
        }
    }
    next.onclick = () => {
        if (flag === false) {
            toWid = prevWid - slideWidth
            slip(prevWid, toWid, () => {
                if (prevWid === slideWidth - wrapper.clientWidth) {
                    prevWid = -slideWidth
                    setTimeout(() => {
                        wrapper.style.transform = `translateX(${prevWid}px)`
                    });
                }
            })
            prevWid = toWid
        }
    }

    // 只负责变化，不负责判断
    function slip(from, to, callback) {
        flag = true
        let tiny = (to - from) / 100
        timer = setInterval(() => {
            from += tiny
            wrapper.style.transform = `translateX(${from}px)`
            if (from === to) {
                clearInterval(timer)
                flag = false
                callback()
            }
        }, 5);
    }
})