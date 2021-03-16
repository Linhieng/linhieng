window.addEventListener('DOMContentLoaded', function () {
    const divGood = document.getElementById('nice-goods-recommend')
    const goodsUl = document.getElementById('nice-goods')
    const goodLi = goodsUl.getElementsByTagName('li')
    const dot = document.getElementById('dot')
    const line = document.getElementById('line')
    const a = document.getElementById('progressBar')

    let num = goodLi.length - 5
    let progressBar = num * goodLi[0].offsetWidth
    let dotProgressBar = line.clientWidth - dot.clientWidth
    let scale = progressBar / dotProgressBar


    let dotX = 0
    let divX = 0
    let timer = null
    rotate()
    divGood.onmousemove = () => { clearInterval(timer) }
    divGood.onmouseout = () => {
        if (!isClick) rotate()
    }
    let isClick = false
    dot.onmousedown = function (e1) {
        a.style.opacity = '1'
        isClick = true
        let dotXTemo = dotX
        // 防止被识别为拖拽文本
        e1.preventDefault()
        document.onmousemove = function (e2) {
            dotX = e2.pageX - e1.pageX + dotXTemo
            if (dotX >= dotProgressBar) dotX = dotProgressBar
            if (dotX <= 0) dotX = 0
            divX = scale * dotX
            dot.style.transform = `translateX(${dotX}px)`
            goodsUl.style.transform = `translateX(${-divX}px)`
        }
    }
    document.onmouseup = function () {
        a.style.opacity = ''
        isClick = false
        document.onmousemove = null
        rotate()
    }
    window.onblur = function () {
        isClick = false
        document.onmousemove = null
        rotate()
    }
    function rotate() {
        clearInterval(timer)
        timer = setInterval(() => {
            dotX += 1 / 10
            divX = scale * dotX
            // if (divX > progressBar) divX = 0
            // if (dotX > dotProgressBar) dotX = 0
            divX %= progressBar
            dotX %= dotProgressBar
            goodsUl.style.transform = `translateX(${-divX}px)`
            dot.style.transform = `translateX(${dotX}px)`
        }, 1);
    }
})