setTimeout(() => {
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