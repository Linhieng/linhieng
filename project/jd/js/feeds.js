window.addEventListener('DOMContentLoaded', function() {
    const titleNav = document.getElementById('feeds').getElementsByClassName('nav')[0].getElementsByTagName('a')
    const titleP = document.getElementById('feeds').getElementsByClassName('feeds-title')
    const titleInfoP = document.getElementById('feeds').getElementsByClassName('feeds-title-info')
    
    const feedsItems = document.getElementById('feeds').getElementsByClassName('feeds-items')
    const dislike =  document.getElementById('feeds').getElementsByClassName('dislike')
    
    titleP[0].style.backgroundColor = '#e1251b'
    titleP[0].style.color = '#fff'
    titleInfoP[0].style.color = '#e1251b'
    for (let i = 0; i < titleNav.length; i++) {
        titleNav[i].onclick = () => {
            for (let i = 0; i < titleP.length; i++) {
                titleP[i].style.backgroundColor = ''
                titleP[i].style.color = ''
                titleInfoP[i].style.color = ''
            }
            titleP[i].style.backgroundColor = '#e1251b'
            titleP[i].style.color = '#fff'
            titleInfoP[i].style.color = '#e1251b'
            for (let j = 0; j < feedsItems.length; j++) {
                feedsItems[j].getElementsByClassName('goods-price')[0].innerHTML = `<i>¥</i>3${i}${j}.<i>00</i>`
                feedsItems[j].getElementsByTagName('img')[0].setAttribute('src', `./images/recommend/recommendImg0${i+2}.webp`)
            }
        }
    }
    // 点击不喜欢
    for (let i = 0; i < dislike.length; i++) {
        dislike[i].onclick = () => {
            feedsItems[i].style.display = 'none'
        }
        
    }

    /* const a = document.getElementById('aaaa')
    const more = document.getElementById('moreGoods')
    let timer
    a.onclick = function() {
        let i = 0
        timer = setInterval(() => {
            i++
            more.innerHTML += `<li class="feeds-items"> <a href="#_"> <div class="show"> <img src="./images/recommend/recommendImg01.webp"> <p class="goods-info"><i class="self">自营</i>罗技（G）G502 HERO主宰者有线鼠标 游戏鼠标 HERO引擎 RGB鼠标 电竞鼠标 25600DPI</p> <p class="goods-price"><i>¥</i>349.<i>00</i></p> <span class="juan">卷</span> </div> <div class="cover"> <div class="findmore">找相似</div> <span class="dislike" title="不喜欢">×</span> </div> </a> </li>`
            i > 10? clearInterval(timer) : null
        }, 500);
    } */
})