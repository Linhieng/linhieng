window.addEventListener('DOMContentLoaded', function () {
    // 判断登陆
    let isLogin = localStorage.getItem('isLogin') === 'true'
    const user = document.getElementById('fs-user')

    if (isLogin === true) {
        user.getElementsByClassName('noLogin')[0].style.display = 'none'
        user.getElementsByClassName('hadLogin')[0].style.display = 'block'
    } else {
        user.getElementsByClassName('noLogin')[0].style.display = 'block'
        user.getElementsByClassName('hadLogin')[0].style.display = 'none'

    }

    /* 左侧菜单========================================== */
    const nav = document.getElementById('fs-nav')
    const menu = document.getElementById('fs-nav-menu')
    const menuArr = menu.getElementsByTagName('li')
    const pop = document.getElementById('fs-nav-pop')
    const popDiv = pop.getElementsByClassName('nav-pop')
    const popArr = pop.getElementsByClassName('nav-pop-li')
    for (let i = 0; i < menuArr.length; i++) {
        menuArr[i].onmouseover = () => {
            menuArr[i].style.backgroundColor = '#d9d9d9'
            for (let j = 0; j < popDiv.length; j++) {
                popDiv[j].style.display = ''
            }
            popDiv[i].style.display = 'block'
        }
        menuArr[i].onmouseout = () => {
            menuArr[i].style.backgroundColor = ''
        }
    }
    nav.onmouseover = () => {
        pop.style.display = 'block'
    }
    nav.onmouseout = () => {
        pop.style.display = ''
    }

    /* 右侧服务========================================== */

    const serviceList = document.getElementById('fs-service-list')
    const serviceListLi = serviceList.getElementsByTagName('li')
    const servicePop = document.getElementById('fs-service-pop')
    const iconArr = [serviceListLi[0], serviceListLi[1], serviceListLi[2], serviceListLi[3],]
    const iconPopArr = [
        document.getElementById('callCredit'),
        document.getElementById('airTicket'),
        document.getElementById('hotel'),
        document.getElementById('game')
    ]
    const closePop = document.getElementById('service-pop-close')

    // 显示 / 关闭 / 初始化 pop
    let timer = null
    for (let i = 0; i < iconArr.length; i++) {
        iconArr[i].onmouseover = () => {
            serviceList.style.display = 'none'
            servicePop.style.display = 'block'
            // servicePop.style.transform = `translateY(${y}px)`
            let y = 240
            timer = setInterval(() => {
                // transition 失效？？？？？
                servicePop.style.transform = `translateY(${y}px)`
                y-=20
                if (y <= 0) {
                    clearInterval(timer)
                    servicePop.style.transform = `translateY(0px)`
                }
            }, 10);
            
            updatePop(i)
            if (i === 3) {
                iconPopArr[0].style.display = 'none'
                iconPopArr[3].style.display = 'block'
            } else {
                iconPopArr[0].style.display = 'block'
                iconPopArr[3].style.display = 'none'
            }
        }
    }
    closePop.onclick = () => {
        serviceList.style.display = 'flex'
        servicePop.style.display = 'none'
    }

    const serviceContent = document.getElementById('service-content')
    // 话费/酒店... 的内容部分
    const serviceContentLi = serviceContent.getElementsByClassName('service-content-li')

    // 鼠标移入标题(话费/酒店...)
    for (let i = 0; i < iconPopArr.length; i++) {
        iconPopArr[i].onmouseover = () => {
            updatePop(i)
        }
    }
    function updatePop(i) {
        for (let j = 0; j < iconPopArr.length; j++) {
            iconPopArr[j].style.borderBottom = '';
            iconPopArr[j].style.color = '';
            serviceContentLi[j].style.display = 'none'
        }
        iconPopArr[i].style.borderBottom = '2px solid #e1251b';
        iconPopArr[i].style.color = '#e1251b';
        serviceContentLi[i].style.display = 'block'
    }

    //#region 话费  采用顺变效果
    // 话费标题（话费充值、流量充值）
    const hfTitle = serviceContentLi[0].getElementsByClassName('service-content-title')[0].getElementsByTagName('a')
    // 话费充值、流量充值的内容 
    const hfContent = serviceContentLi[0].getElementsByTagName('li')
    hfTitle[0].style.color = '#e1251b'
    hfContent[0].style.display = 'block'
    hfContent[1].style.display = 'none'
    for (let i = 0; i < hfTitle.length; i++) {
        hfTitle[i].onmouseover = () => {
            for (let i = 0; i < hfTitle.length; i++) {
                hfTitle[i].style.color = ''
                hfContent[i].style.display = 'none'
            }
            hfTitle[i].style.color = '#e1251b'
            hfContent[i].style.display = 'block'
        }
    }
    //#endregion 尾


    //#region 机票、酒店、游戏  采用滚动效果
    for (let j = 1; j < serviceContentLi.length; j++) {
        // 各个服务的小标题
        const title = serviceContentLi[j].getElementsByClassName('service-content-title')[0].getElementsByTagName('a')
        // 各个服务的内容(横排)
        const content = serviceContentLi[j].getElementsByClassName('content-wrapper')[0]

        title[0].style.color = '#e1251b'

        for (let i = 0; i < title.length; i++) {
            title[i].onmouseover = () => {
                for (let i = 0; i < title.length; i++) {
                    title[i].style.color = ''
                }
                title[i].style.color = '#e1251b'
                content.style.transform = `translateX(${-160*i}px)`
            }
        }

    }
    //#endregion
})