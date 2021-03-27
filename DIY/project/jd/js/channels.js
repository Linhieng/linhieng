window.addEventListener('DOMContentLoaded', function () {
    const ajaxPicture1 = document.getElementById('ajaxPicture1')
    const ajaxPicture2 = document.getElementById('ajaxPicture2')
    
    let url1, url2
    const xhr1 = new XMLHttpRequest()
    xhr1.open('GET', 'http://47.97.117.167:8080/test/picture/1')
    xhr1.send()
    xhr1.timeout = 3000
    xhr1.ontimeout = () => { xhr1.abort(); console.log('网络延迟') }
    xhr1.onreadystatechange = function () { if (xhr1.readyState === 4 && xhr1.status >= 200 && xhr1.status < 300) { url1 = xhr1.response; callback1() } }
    const xhr2 = new XMLHttpRequest()
    xhr2.open('GET', 'http://47.97.117.167:8080/test/picture/2')
    xhr2.send()
    xhr2.timeout = 3000
    xhr2.ontimeout = () => { xhr2.abort(); console.log('网络延迟') }
    xhr2.onreadystatechange = function () { if (xhr2.readyState === 4 && xhr2.status >= 200 && xhr2.status < 300) { url2 = xhr2.response; callback2() } }
    
    
    function callback1() {
        ajaxPicture1.setAttribute('src',url1)
    }
    function callback2() {
        // 去除收尾引号
        ajaxPicture2.setAttribute('src', url2.replace(/^"+|"+$/g, ""))
    }
})