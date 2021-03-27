window.addEventListener('DOMContentLoaded', function () {
    const slide = document.getElementById('slide-picture')
    const slideArr = slide.getElementsByTagName('li')
    const dot = document.getElementById('slide-dot')
    const dotArr = dot.getElementsByTagName('li')
    const prev = document.getElementById('fs-prev')
    const next = document.getElementById('fs-next')

    let timer = null
    let now = 0

    slideArr[now].style.opacity = '1'
    slideArr[now].style.zIndex = '1'
    dotArr[now].style.backgroundColor = '#ddd'
    dotArr[now].style.border = '2px solid #00000055'

    slideShow()

    slide.onmouseover = clearTimer
    slide.onmouseout = slideShow
    prev.onmouseover = clearTimer
    prev.onmouseout = slideShow
    next.onmouseover = clearTimer
    next.onmouseout = slideShow

    prev.onclick = () => {
        if (now === 0) {
            now = slideArr.length-1
        } else {
            now--;
        }
        pictureUpdate()
        dotUpdate()
    }
    next.onclick = () => {
        now++;
        now %= slideArr.length
        pictureUpdate()
        dotUpdate()
    }
    
    for (let i = 0; i < dotArr.length; i++) {
        dotArr[i].onmouseover = () => {
            now = i
            dotUpdate()
            clearInterval(timer)
            pictureUpdate()
        }
        dotArr[i].onmouseout = slideShow
        
    }
    
    function slideShow() {
        clearInterval(timer)
        timer = setInterval(() => {
            now++
            now %= slideArr.length
            dotUpdate()
            pictureUpdate()
        }, 1000);
    }

    function pictureUpdate() {
        for (let i = 0; i < slideArr.length; i++) {
            slideArr[i].style.opacity = '0'
            slideArr[i].style.zIndex = '0'
        }
        slideArr[now].style.opacity = '1'
        slideArr[now].style.zIndex = '1'
    }
    
    function dotUpdate() {
        for (let i = 0; i < dotArr.length; i++) {
            dotArr[i].style.backgroundColor = ''
            dotArr[i].style.border = ''
        }
        dotArr[now].style.backgroundColor = '#ddd'
        dotArr[now].style.border = '2px solid #00000055'
    }

    function clearTimer() {
        clearInterval(timer)
    }

})