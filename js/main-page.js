setTimeout(() => {
    window.open('./project/full-page-scroll/index.html','_blank');
    $('.text').css('height', '200px')
    setTimeout(() => {
        $('#cover').css('opacity', '0')
        $('.text').css('border-color', '#ffffff')
        $('.text p a, #oneSentence').css('display', 'block')
    }, 800);
}, 500);

$('#oneSentence').on('mouseover', function () {
    $('#translate').css('display', 'block')
})
$('#oneSentence').on('mouseout', function () {
    $('#translate').css('display', '')
})

const oneSentence = document.getElementById('oneSentence')
oneSentence.onclick = () => {
    // js 文件最终是在 html 文件中，所以相对路径是相对于 html 文件来说的
    window.open('./project/full-page-scroll/index.html','_blank');
}