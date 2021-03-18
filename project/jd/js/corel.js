window.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('corel-title')
    const titleArr = title.getElementsByTagName('a')
    const content = document.getElementById('corel-content')
    const items = content.getElementsByClassName('items')

    titleArr[0].style.color = '#e12518'
    titleArr[0].style.borderBottom = '2px solid #e12518'
    items[0].style.zIndex = '11'
    
    for (let i = 0; i < titleArr.length; i++) {
        titleArr[i].onmouseover = () => {
            for (let j = 0; j < titleArr.length; j++) {
                titleArr[j].style.color = ''
                titleArr[j].style.borderBottom = ''
                items[j].style.zIndex = '10'
            }
            titleArr[i].style.color = '#e12518'
            titleArr[i].style.borderBottom = '2px solid #e12518'
            items[i].style.zIndex = '11'

        }
        
    }
    
    
})