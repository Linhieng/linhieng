window.addEventListener('DOMContentLoaded', function() {
    
    const username = document.getElementById('user-name')
    const password = document.getElementById('password')
    const loginBtn = document.getElementById('loginBtn')
    
    loginBtn.onclick = function() {
        const data = {username: username.value, password: password.value}
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://47.97.117.167:8080/test/login')
        xhr.send(JSON.stringify(data))
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                if (xhr.response == '"登陆成功"') {
                    console.log('登陆成功！！！')
                    localStorage.setItem('isLogin', true)
                    localStorage.setItem('username', username.value)
                    // window.location.href= '../index.html'
                    window.location.href= './index.html'
                } else {
                    localStorage.setItem('isLogin', false)
                    alert('登陆失败, '+xhr.response)
                }
            }
        }
        
    }
})