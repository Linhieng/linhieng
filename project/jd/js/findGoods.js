window.addEventListener('DOMContentLoaded', function () {

    // 整个框
    const divGood = document.getElementById('nice-goods-recommend')
    // 商品滚动框
    const goodsUl = document.getElementById('nice-goods')
    // 每件商品框
    const goodLi = goodsUl.getElementsByTagName('li')
    // 底部滑动区
    const progressDiv = document.getElementById('progressBar')
    // 滑动按钮
    const dot = document.getElementById('dot')
    // 滑动线
    const line = document.getElementById('line')

    // 商品滚动区的可滚动长度
    let goodsWrapperWidth = goodsUl.scrollWidth - divGood.offsetWidth
    // 滚动条的可滚动长度
    let dotProgressBar = line.clientWidth - dot.clientWidth
    // 比率, 用于决定商品区的每次滚动距离
    let scale = goodsWrapperWidth / dotProgressBar

    // 滚动块的translateX坐标
    let dotX = 0
    // 商品区的translateX坐标
    let divX = 0
    let timer = null
    let isClick = false
    let isIn = false
    rotate()
    divGood.onmousemove = () => { 
        clearInterval(timer) 
        isIn = true
    }
    divGood.onmouseout = () => {
        isIn = false
        if (!isClick) {
            progressDiv.style.opacity = ''
            rotate()
        }
    }
    dot.onmousedown = function (e1) {
        progressDiv.style.opacity = '1'
        isClick = true
        let dotXTemp = dotX
        // 防止被识别为拖拽文本
        e1.preventDefault()
        document.onmousemove = function (e2) {
            dotX = e2.pageX - e1.pageX + dotXTemp
            if (dotX >= dotProgressBar) dotX = dotProgressBar
            if (dotX <= 0) dotX = 0
            divX = scale * dotX
            dot.style.transform = `translateX(${dotX}px)`
            goodsUl.style.transform = `translateX(${-divX}px)`
        }
    }
    divGood.onmouseup = function () {
        isClick = false
        document.onmousemove = null
    }
    document.onmouseup = function () {
        if (!isIn) {
            progressDiv.style.opacity = ''
            isClick = false
            document.onmousemove = null
            rotate()
        }
    }
    window.onblur = function () {
        isClick = false
        document.onmousemove = null
        rotate()
    }

    // 自动滚动函数
    function rotate() {
        clearInterval(timer)
        timer = setInterval(() => {
            dotX += 1 / 10
            divX = scale * dotX
            // if (divX > progressBar) divX = 0
            // if (dotX > dotProgressBar) dotX = 0
            divX %= goodsWrapperWidth
            dotX %= dotProgressBar
            goodsUl.style.transform = `translateX(${-divX}px)`
            dot.style.transform = `translateX(${dotX}px)`
        }, 1);
    }
})