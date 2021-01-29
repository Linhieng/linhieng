// 备注：
{
/**
 * 知识点：
 * 节点.classList.add("类名")可添加类
 * 节点.classList.remove("类名")可删除类
 * 节点.classList.replace("原", "末");可替换类
 * homeNav.childNodes[]
 *      利用这个会获取所有子节点，包括文件节点（源代码中的换行）
 * 函数的另外一种写法
 *       var time = setInterval(() => {
 *           console.log("2");
 *       }, 3000);
 * document.documentElement.scrollTop
 *      可以获取滚动条滚动的距离
 * pageX不是直接使用对象.pageX是不可以是，值会是undefined
 * 
 * 翻页：
 *      一个方法是全部写在html里面，然后css中hidden和定位，最后在js修改top值
 *      还有一个方法是格子不动，东西放在类库中，通过js增删类来实现
 * 
 * 注意
 *  - 定时器中++放在定时器开始前，不然容易出bug
 *  - 事件直接等于函数时，函数不要带括号（所以适用于无需参数的函数）
 *  - 获取的是对象，需要innerHTML或者innerText才能获取字符或数字！！！
 *  - 新写一个函数期间是最容易出bug的时候，因此要注意哪里需要更新！！
 *  - if千万千万要注意条件不要让前面的if判断给“吞”！！！
 *  - 新增类时注意该类是否和其他类的修改的样式重合，重合的话需要删去某个类！！！
 *  - 处理事件时，注意变化的内容的顺序先后，别前面的有用到后面的修改值而你却不知道
 * 
 * 问题
 *  - 节点.classList.add("类名")提取为外部函数
        报错add类型错误
        replace也一样，remove倒不会。。。
        可以是写错了或者没刷新，以后再遇到再看

    - 如何直接获取节点的子元素节点？？？而不是子节点？？
        直接的函数还不知道，不过要解决的话还是有很多方法的，比如获取他们的标签名
    - 轮播图特效，如何设计翻页效果
        慢慢积累吧
    - 为什么经常使用元素.style.属性，没生效，
        有注意到单位问题，但还是没生效
        又不知道为什么突然好了。。。。。。。
        回答不了。。。
    - 有没有现成的移出collection的某个元素的方法？
            也可以自己写一个
            不知道。。。
    - 如何实现拉动overflow：hidden的页面
        函数：更新页数
        修改方式：“拉下来”,怎么拉？？？？
        不知道，可以通过定位模拟出“拉的效果”
    - 歌手切换处做的很敷衍。。。。
        不想弄太多图片，觉得没必要，都是相同的知识点。。。
        优化了一下，思路更清晰了，不过日韩和更多处的图片没有全部敲，懒。。。
        其实和华语和欧美部分是一样的。如果真要弄，也只需要在css中新建类，并将类名替换到js中的数组即可，主意尺寸
    - switch、if判断语句嵌套是否影响效率
        是要一次性遍历全部还是排除一些选项在遍历？
        我觉得判断完再遍历效率更高，但这样可能好让代码看起来很长，而且重复
        所以？？？？？？
        看样子代码的本质都是一样的，逃不开算法。。。。

 */
}


window.onload = function () {

    /**
     * 处理“更多”中的二级菜单显示/隐藏
     * */
    {
        // 获取“更多”
        var moreMenu = document.getElementById("more");
        // 获取“更多”的二级菜单
        var moreSecond = document.getElementById("moreSecond");
        // 鼠标移入
        moreMenu.onmousemove = function () {
            moreSecond.classList.replace("hideSecond", "showSecond");
        };
        moreSecond.onmousemove = function () {
            moreSecond.classList.replace("hideSecond", "showSecond");
        };
        // 鼠标移出
        moreMenu.onmouseleave = function () {
            moreSecond.classList.replace("showSecond", "hideSecond");
        };
        moreSecond.onmouseleave = function () {
            moreSecond.classList.replace("showSecond", "hideSecond");
        };

        /**
         * 处理导航条以蓝色显示当前所在页面
         * 
         * */
        // 默认是首页
        // 获取导航条左侧所有项li
        var homeNav = document.getElementById("homeNav");
        var homeNavChild = homeNav.getElementsByClassName("homeNavChild");
        changeBackgroundColorBlue(0);

        //  *  搭配上方获取标签使用，不是独立的函数
        //  *  设置背景颜色函数,使用添加类方法
        //  *  index：首页、榜单、下载客户端（无“更多”）

        function changeBackgroundColorBlue(index) {
            // 先把所有元素的backgroundColorBlue类删去
            for (var i = 0; i < homeNavChild.length; i++) {
                homeNavChild[i].classList.remove("backgroundColorBlue");
                // 获取子元素超链接并删去类
                homeNavChild[i].getElementsByTagName("a")[0].classList.remove("backgroundColorBlue");
            }
            // 再为指定的元素加上类
            homeNavChild[index].classList.add("backgroundColorBlue");
            homeNavChild[index].getElementsByTagName("a")[0].classList.add("backgroundColorBlue");
        }
        // 点击时变色。 -1是为了排除“更多”
        for (var i = 0; i < homeNavChild.length - 1; i++) {
            // 为元素设置下标属性
            homeNavChild[i].index = i;
            homeNavChild[i].onclick = function () {
                // 注意此处使用this
                changeBackgroundColorBlue(this.index);
            };
        }
    }


    /**
     * 处理轮播图
     *  自动切换
     *  点击导航点
     *  点击左右切换图片
     * */
    {

        // 获取图片列表ul
        var sliderItem = document.getElementById("sliderItem");
        // 获取图片列表li
        var pictureListA = sliderItem.getElementsByTagName("a");
        // 用于获取导航点
        var sliderPages = document.getElementById("sliderPages");
        // 获取导航点列表
        var allPoint = sliderPages.getElementsByTagName("a");
        // 获取点击上一张
        var sliderPrev = document.getElementById("sliderPrev");
        // 获取点击下一张
        var sliderNext = document.getElementById("sliderNext");
        // 设置当前显示的图片下标
        var indexNow = 0;
        // 保存定时器
        var time;
        // 更新导航点
        updatePoint();
        // 启动自动播放
        autoShow();
        // 点击上一张
        sliderPrev.onclick = function () {
            if (indexNow <= 0) {
                indexNow = pictureListA.length - 1;
            } else {
                indexNow--;
            }
            updatePoint();
            showPicture();
            autoShow();
        };
        // 点击下一张
        sliderNext.onclick = function () {
            if (indexNow >= pictureListA.length - 1) {
                indexNow = 0;
            } else {
                indexNow++;
            }
            updatePoint();
            showPicture();
            autoShow();
        };

        for (var i = 0; i < allPoint.length; i++) {
            allPoint[i].index = i;
            // 鼠标移入导航点切换图片
            allPoint[i].onmousemove = function () {
                indexNow = this.index;
                updatePoint();
                showPicture();
                // 停止自动切换：官网没有停止
                clearInterval(time);
            };
            // 鼠标移出时继续播放,注意不要加括号！autoShow
            allPoint[i].onmouseleave = autoShow;
            // allPoint[i].onmouseleave = function(){
            //     autoShow();
            // };
        }
        // 根据indexNow值显示图片
        function showPicture() {
            for (var i = 0; i < allPoint.length; i++) {
                pictureListA[i].style.opacity = 0;
            }
            pictureListA[indexNow].style.opacity = 1;
        }
        // 时刻更新导航点
        function updatePoint() {
            for (var i = 0; i < allPoint.length; i++) {
                allPoint[i].style.backgroundPosition = "";
            }
            allPoint[indexNow].style.backgroundPosition = "0 -37px";
        }
        // 自动播放图片
        function autoShow() {
            clearInterval(time);
            // 这里--是为了下面的++放前面
            // ？？？！！！！，这里--后反而出bug了
            // indexNow--;
            time = setInterval(() => {
                // ++放前面，不然点击上一张时容易出现点了“无效”的情况
                // 因为在用户看来，图片回去了，但同时indexNow也++了，而点击上一张又--，等于点击无效
                indexNow++;
                indexNow %= pictureListA.length;
                updatePoint();
                showPicture();
            }, 2000);

        }
    }

    /**
     * 处理新歌首发
     *  蓝色停留在所在语言歌单
     *  鼠标移入所在语言歌单切换显示
     *  下标页码可切换页
     *  可移动的箭头变深色
     * */ 
    {
        // 获取弹出框
        var popup = document.getElementById("popup");
        // 获取四个语言的父集ul
        let languageSong = document.getElementById("languageSong");
        // 获取语言li 顺序是华语-欧美-韩国-日本
        let language = languageSong.getElementsByTagName("li");
        // 获取四个语言榜单, 用数组存起来
        let ChineseSong = document.getElementById("ChineseSong");
        let English = document.getElementById("English");
        let Korean = document.getElementById("Korean");
        let Japan = document.getElementById("Japan");
        let fourLanguageSong = [ChineseSong, English, Korean, Japan];
        // 获取左箭头
        let leftPage = document.getElementById("leftPage");
        // 获取右箭头
        let rightPage = document.getElementById("rightPage");
        // 获取当前页数,这是节点，不是数字
        let nowPage = document.getElementById("nowPage");
        // 获取总页数
        let allPage = document.getElementById("allPage");
        // 当前现在显示的语言下标
        let indexNow = 0;
        // 默认华语变色
        updateLanguageColor();
        // 默认显示华语歌单
        updateLanguageSong();
        // top值默认是0（函数里面会更新左右箭头是否可点）
        updateLanguagePage();
        // 将欧美的独家取消掉
        for (let i = 0; i < fourLanguageSong[1].getElementsByTagName("li").length; i++) {
            // 跳过一个
            if (i == 5) continue;
            fourLanguageSong[1].getElementsByTagName("li")[i].getElementsByClassName("exclusive")[0].style.display = "none";
        }
        // console.log(fourLanguageSong[1].);

        // 鼠标移入华语、欧美、韩语、日语事件
        for (let i = 0; i < language.length; i++) {
            language[i].index = i;
            language[i].onmousemove = function(){
                indexNow = this.index;
                // 同时将当前页数改为1
                nowPage.innerText = 1;
                // 显示的歌单修改为对应语言歌单
                updateLanguageSong();
                // 变色
                updateLanguageColor();
                // 修改bug：top归位为0
                updateLanguagePage();
            };
        }

        // 鼠标点击上一页
        leftPage.onmousedown = function(event) {
            if (nowPage.innerText > 1) {
                nowPage.innerText--;
                // 修改top值和页数
                updateLanguagePage();
            } else {
                // 提示无法点击
                popup.style.height = 80 + "px";
                setTimeout(function(){
                    popup.style.height = "";
                }, 500);
                popup.style.top = event.clientY-100+"px";
                popup.style.left = event.clientX+"px";
            }
        };
        // 鼠标点击下一页
        rightPage.onmousedown = function(event) {
            if (nowPage.innerText < allPage.innerText) {
                nowPage.innerText++;
                // 修改top值和页数
                updateLanguagePage();
            } else {
                // event.clientX、Y是获取鼠标的相对可见框的坐标
                // popup.style.position = "fixed";
                popup.style.height = 80 + "px";
                setTimeout(function(){
                    popup.style.height = "";
                }, 500);
                popup.style.top = event.clientY-100+"px";
                popup.style.left = event.clientX+"px";
            }
        };

        // 函数：更新显示的语言颜色
        function updateLanguageColor(){
            for (let i = 0; i < language.length; i++) {
                language[i].style.color = "";
            }
            language[indexNow].style.color = "#009af3";
        }
        //  函数：更新显示哪种语言的榜单
        function updateLanguageSong(){
            for (let i = 0; i < language.length; i++) {
                fourLanguageSong[i].style.display = "";
            }
            // 尝试修改  独家
            // if (indexNow == 1) {
            //     fourLanguageSong[indexNow]
            // }
            fourLanguageSong[indexNow].style.display = "block";

            // 修改总页数
            // 这一项要在更新左右两点是否可点是设置，因为这里面有更新allPage
            switch(indexNow) {
                case 0 :
                    allPage.innerText = 3;
                    break;
                case 1 :
                case 3 :
                    allPage.innerText = 2;
                    break;
                case 2 :
                    allPage.innerText = 1;
                    updatePagePoint();
                    break;
                default:
                    break;
            }
            // 不要在这里设置，在鼠标移入时设置
            // nowPage.innerText = 1;

        };
        
        // 函数：更新显示的是第几页
        //  通过绝对定位修改top值
        function updateLanguagePage(){
            fourLanguageSong[indexNow].style.top = (nowPage.innerText-1)*(-280) + "px";
            updatePagePoint();
        }
        // 函数：更新左右箭头是否可点。由updateLanguagePage()调用
        function updatePagePoint() {
            // 可以点击下一页
            if (nowPage.innerText == 1 && nowPage.innerText < allPage.innerText) {
                leftPage.style.cursor = "not-allowed";
                rightPage.style.cursor = "";
                leftPage.style.backgroundPosition = "";
                rightPage.style.backgroundPosition = "-13px -14px";
            // 可以点击上一页
            } else if (nowPage.innerText != 1 && nowPage.innerText == allPage.innerText) {
                leftPage.style.cursor = "";
                rightPage.style.cursor = "not-allowed";
                leftPage.style.backgroundPosition = "0 -14px";
                rightPage.style.backgroundPosition = "";
            // 上下页都不可点击
            } else if (nowPage.innerText == 1 && nowPage.innerText == allPage.innerText) {
                leftPage.style.cursor = "not-allowed";
                rightPage.style.cursor = "not-allowed";
                leftPage.style.backgroundPosition = "0 0";
                rightPage.style.backgroundPosition = "-13px 0";
            // 上下页都可以点击
            } else {
                leftPage.style.cursor = "";
                rightPage.style.cursor = "";
                leftPage.style.backgroundPosition = "0 -14px";
                rightPage.style.backgroundPosition = "-13px -14px";
            }
        }
        
        
    }

    /**
     * 处理歌手切换
     *  鼠标移入所在语言歌手切换显示
     *  导航点移入可切换
     *  变色
     *  通过类库实现，技术原理已了解，能修改就行，就不搞全部图片了
     * */ 
    {
        // 用数组存起来类名
        // 图片类库。。。这种方式太累了！！！应该有个交互。。。
        // 用了let不能加花括号
        // {
        // 华语六张大图h:hua,b:big,6:六张图
        let hb6 = ["coverSingerTop1","coverSingerTop2","coverSingerTop3","coverSingerTop4","coverSingerTop5","coverSingerTop6"]
        // 欧美六张大图
        let ob6 = ["coverSingerTop21","coverSingerTop22","coverSingerTop23","coverSingerTop24","coverSingerTop25","coverSingerTop26"]
        // 日韩六张大图，就两张。。
        let rb6 = ["coverSingerTop31","coverSingerTop32","coverSingerTop32","coverSingerTop31","coverSingerTop31","coverSingerTop31"];
        // 更多六张大图
        let gb6 = ["coverSingerTop41","coverSingerTop42","coverSingerTop42","coverSingerTop41","coverSingerTop41","coverSingerTop41"];
        // 华语九张小图：h:hua,x:xiao,9:九张图
        let hx9 = ["coverSingerB1","coverSingerB2","coverSingerB3","coverSingerB4","coverSingerB5","coverSingerB6","coverSingerB7","coverSingerB8","coverSingerB9"];
        // 欧美
        let ox9 = ["coverSingerB21","coverSingerB22","coverSingerB23","coverSingerB24","coverSingerB25","coverSingerB26","coverSingerB27","coverSingerB28","coverSingerB29"];
        // 日韩
        let rx9 = ["coverSingerB31","coverSingerB32","coverSingerB33","coverSingerB33","coverSingerB32","coverSingerB31","coverSingerB32","coverSingerB31","coverSingerB33"];
        // 更多
        let gx9 = ["coverSingerB41","coverSingerB42","coverSingerB43","coverSingerB43","coverSingerB42","coverSingerB41","coverSingerB42","coverSingerB41","coverSingerB43"];
        // }
        // 获取语言栏, 用数组存起来，分别是华语-欧美-日韩-更多
        let languageSinger = [document.getElementById("chineseSinger"),document.getElementById("englishSinger"),document.getElementById("asiaSinger"),document.getElementById("moreSinger")];
        // 获取导航点
        let allSpan = document.getElementById("hotRadioRightContentPoint").getElementsByTagName("span");
        // 获取显示封面的节点,分别是大图左边，大图右边，小图左边、中间、右边
        let img = document.getElementById("hotRadioRightContent").getElementsByTagName("img");
        // 获取显示名字的节点，顺序同上
        let name = document.getElementById("hotRadioRightContent").getElementsByTagName("p");

        // 创建一个字符串数组，没什么用，纯属懒
        let namestring = ["华语人","欧美人","日韩人","更多人"]
        // 当前正在显示的语言栏,0,1,2,3分别代表华语，欧美，日韩，更多
        let nowLanguages = 0;
        // 当前正在显示的页数，都三页，恩。。。，懒了。。。。。
        let nowSpan = 0;

        // 导航点变色
        updatePoint();
        // 语言栏变色
        updateLanguage();
        // 显示名字
        modifiedName();
        // 切换页
        addClass();
        // 两个事件：鼠标移入导航点和鼠标移入语言栏
        // 调用两个函数，分别解决两种事件

        // 鼠标移入语言栏事件
        for (let i = 0; i < languageSinger.length; i++) {
            // 存储语言栏对象的下标
            languageSinger[i].index = i;
            // 鼠标移入语言栏
            languageSinger[i].onmousemove = function(){
                // 在更新前先将当前的类清空
                clearClass();
                // 更新页数下标
                nowSpan = 0;
                // 更新语言栏下标
                nowLanguages = this.index;
                // 语言栏变色
                updateLanguage();
                // 显示名字
                modifiedName();
                // 切换页
                addClass();
                // 导航点变色
                updatePoint();
            };
        }

        // 鼠标移入导航点事件
        for (let i = 0; i < allSpan.length; i++) {
            allSpan[i].index = i;
            // 鼠标移入导航点
            allSpan[i].onmousemove = function(){
                // 在更新前先将当前的类清空
                clearClass();
                // 修改当前正在显示页数
                nowSpan = this.index;
                // 导航点变色
                updatePoint();
                // 显示名字
                modifiedName();
                // 切换页
                addClass();
            };
        }

        // *******函数部分*******
        // 让导航点变色
        function updatePoint(){
            // 先更新导航点，导航点变色
            // 先清空导航点
            for (let i = 0; i < 3; i++) {
                allSpan[i].style.backgroundPosition = "";
            }
            // 让指定导航点变色
            allSpan[nowSpan].style.backgroundPosition = "0 0";
        }

        // 让语言栏变色
        function updateLanguage(){
            for (let i = 0; i < 4; i++) {
                languageSinger[i].style.color = "";
            }
            // 让指定导航点变色
            languageSinger[nowLanguages].style.color = "#009af3";
        }

        // 修改名字
        // 函数，移入语言栏修改封面和名字，由changeSinger调用
        function modifiedName(){
            // 含义：某某语言 + 第几页 + 当页第几人
            for(let i = 0; i < 2; i++){
                name[i].innerText = namestring[nowLanguages]+(nowSpan+1)+(i+1);
            }
            for (let i = 2; i < 5; i++) {
                name[i].innerText = namestring[nowLanguages]+(nowSpan+1)+(i+1);
            }

        }

        // 增加类其实合适清空类相同，不过就是remove换成add而已.......
        function addClass(){
            switch(nowLanguages){
                // 华语
                case 0:
                    // 在hb6和hx9中清空类
                    switch(nowSpan){
                        // 第1页
                        case 0:
                            // 已找到，开始清空
                            img[0].classList.add(hb6[0]);
                            img[1].classList.add(hb6[1]);
                            img[2].classList.add(hx9[0]);
                            img[3].classList.add(hx9[1]);
                            img[4].classList.add(hx9[2]);
                            break;
                        // 第2页
                        case 1:
                            img[0].classList.add(hb6[2]);
                            img[1].classList.add(hb6[3]);
                            img[2].classList.add(hx9[3]);
                            img[3].classList.add(hx9[4]);
                            img[4].classList.add(hx9[5]);
                            break;
                        // 第3页
                        case 2:
                            img[0].classList.add(hb6[4]);
                            img[1].classList.add(hb6[5]);
                            img[2].classList.add(hx9[6]);
                            img[3].classList.add(hx9[7]);
                            img[4].classList.add(hx9[8]);
                            break;
                    }
                    break;
                // 欧美
                case 1:
                    // 在ob6和ox9中清空类
                    switch(nowSpan){
                        // 第1页
                        case 0:
                            // 已找到，开始清空
                            img[0].classList.add(ob6[0]);
                            img[1].classList.add(ob6[1]);
                            img[2].classList.add(ox9[0]);
                            img[3].classList.add(ox9[1]);
                            img[4].classList.add(ox9[2]);
                            break;
                        // 第2页
                        case 1:
                            img[0].classList.add(ob6[2]);
                            img[1].classList.add(ob6[3]);
                            img[2].classList.add(ox9[3]);
                            img[3].classList.add(ox9[4]);
                            img[4].classList.add(ox9[5]);
                            break;
                        // 第3页
                        case 2:
                            img[0].classList.add(ob6[4]);
                            img[1].classList.add(ob6[5]);
                            img[2].classList.add(ox9[6]);
                            img[3].classList.add(ox9[7]);
                            img[4].classList.add(ox9[8]);
                            break;
                    }
                    break;
                // 日韩
                case 2:
                    // 在rb6中清空类
                    // 因为偷懒了，所以这里无需遍历所有
                    // 不对，虽然少了些图片，但是不同页，类也是不一样的
                    // 如果不判断第几页，那么每张图都需要删除2/3个类名
                    // 算了，添加类时也可以用这个代码，那么就统一吧，判断页数
                    // 在rb6和rx9中清空类
                    switch(nowSpan){
                        // 第1页
                        case 0:
                            // 已找到，开始清空
                            img[0].classList.add(rb6[0]);
                            img[1].classList.add(rb6[1]);
                            img[2].classList.add(rx9[0]);
                            img[3].classList.add(rx9[1]);
                            img[4].classList.add(rx9[2]);
                            break;
                        // 第2页
                        case 1:
                            img[0].classList.add(rb6[2]);
                            img[1].classList.add(rb6[3]);
                            img[2].classList.add(rx9[3]);
                            img[3].classList.add(rx9[4]);
                            img[4].classList.add(rx9[5]);
                            break;
                        // 第3页
                        case 2:
                            img[0].classList.add(rb6[4]);
                            img[1].classList.add(rb6[5]);
                            img[2].classList.add(rx9[6]);
                            img[3].classList.add(rx9[7]);
                            img[4].classList.add(rx9[8]);
                            break;
                    }
                    break;
                // 更多
                case 3:
                    // 在gb6和gx9中清空类
                    switch(nowSpan){
                        // 第1页
                        case 0:
                            // 已找到，开始清空
                            img[0].classList.add(gb6[0]);
                            img[1].classList.add(gb6[1]);
                            img[2].classList.add(gx9[0]);
                            img[3].classList.add(gx9[1]);
                            img[4].classList.add(gx9[2]);
                            break;
                        // 第2页
                        case 1:
                            img[0].classList.add(gb6[2]);
                            img[1].classList.add(gb6[3]);
                            img[2].classList.add(gx9[3]);
                            img[3].classList.add(gx9[4]);
                            img[4].classList.add(gx9[5]);
                            break;
                        // 第3页
                        case 2:
                            img[0].classList.add(gb6[4]);
                            img[1].classList.add(gb6[5]);
                            img[2].classList.add(gx9[6]);
                            img[3].classList.add(gx9[7]);
                            img[4].classList.add(gx9[8]);
                            break;
                    }
                    break;
            }
        }
        
        // 清空类库
        // 此函数应在事件最开始时调用，然后再修改nowSpan和nowLanguage
        function clearClass(){
            // 无需全部遍历，只需知道未改变时是哪个语言栏，第几页
            // 所以需要nowSpan和nowLanguage没有变化！
            // 第一个switch，找到是哪种语言
            // 第二个switch，找到是第几页
            switch(nowLanguages){
                // 华语
                case 0:
                    // 在hb6和hx9中清空类
                    switch(nowSpan){
                        // 第1页
                        case 0:
                            // 已找到，开始清空
                            img[0].classList.remove(hb6[0]);
                            img[1].classList.remove(hb6[1]);
                            img[2].classList.remove(hx9[0]);
                            img[3].classList.remove(hx9[1]);
                            img[4].classList.remove(hx9[2]);
                            break;
                        // 第2页
                        case 1:
                            img[0].classList.remove(hb6[2]);
                            img[1].classList.remove(hb6[3]);
                            img[2].classList.remove(hx9[3]);
                            img[3].classList.remove(hx9[4]);
                            img[4].classList.remove(hx9[5]);
                            break;
                        // 第3页
                        case 2:
                            img[0].classList.remove(hb6[4]);
                            img[1].classList.remove(hb6[5]);
                            img[2].classList.remove(hx9[6]);
                            img[3].classList.remove(hx9[7]);
                            img[4].classList.remove(hx9[8]);
                            break;
                    }
                    break;
                // 欧美
                case 1:
                    // 在ob6和ox9中清空类
                    switch(nowSpan){
                        // 第1页
                        case 0:
                            // 已找到，开始清空
                            img[0].classList.remove(ob6[0]);
                            img[1].classList.remove(ob6[1]);
                            img[2].classList.remove(ox9[0]);
                            img[3].classList.remove(ox9[1]);
                            img[4].classList.remove(ox9[2]);
                            break;
                        // 第2页
                        case 1:
                            img[0].classList.remove(ob6[2]);
                            img[1].classList.remove(ob6[3]);
                            img[2].classList.remove(ox9[3]);
                            img[3].classList.remove(ox9[4]);
                            img[4].classList.remove(ox9[5]);
                            break;
                        // 第3页
                        case 2:
                            img[0].classList.remove(ob6[4]);
                            img[1].classList.remove(ob6[5]);
                            img[2].classList.remove(ox9[6]);
                            img[3].classList.remove(ox9[7]);
                            img[4].classList.remove(ox9[8]);
                            break;
                    }
                    break;
                // 日韩
                case 2:
                    // 在rb6中清空类
                    // 因为偷懒了，所以这里无需遍历所有
                    // 不对，虽然少了些图片，但是不同页，类也是不一样的
                    // 如果不判断第几页，那么每张图都需要删除2/3个类名
                    // 算了，添加类时也可以用这个代码，那么就统一吧，判断页数
                    // 在rb6和rx9中清空类
                    switch(nowSpan){
                        // 第1页
                        case 0:
                            // 已找到，开始清空
                            img[0].classList.remove(rb6[0]);
                            img[1].classList.remove(rb6[1]);
                            img[2].classList.remove(rx9[0]);
                            img[3].classList.remove(rx9[1]);
                            img[4].classList.remove(rx9[2]);
                            break;
                        // 第2页
                        case 1:
                            img[0].classList.remove(rb6[2]);
                            img[1].classList.remove(rb6[3]);
                            img[2].classList.remove(rx9[3]);
                            img[3].classList.remove(rx9[4]);
                            img[4].classList.remove(rx9[5]);
                            break;
                        // 第3页
                        case 2:
                            img[0].classList.remove(rb6[4]);
                            img[1].classList.remove(rb6[5]);
                            img[2].classList.remove(rx9[6]);
                            img[3].classList.remove(rx9[7]);
                            img[4].classList.remove(rx9[8]);
                            break;
                    }
                    break;
                // 更多
                case 3:
                    // 在gb6和gx9中清空类
                    switch(nowSpan){
                        // 第1页
                        case 0:
                            // 已找到，开始清空
                            img[0].classList.remove(gb6[0]);
                            img[1].classList.remove(gb6[1]);
                            img[2].classList.remove(gx9[0]);
                            img[3].classList.remove(gx9[1]);
                            img[4].classList.remove(gx9[2]);
                            break;
                        // 第2页
                        case 1:
                            img[0].classList.remove(gb6[2]);
                            img[1].classList.remove(gb6[3]);
                            img[2].classList.remove(gx9[3]);
                            img[3].classList.remove(gx9[4]);
                            img[4].classList.remove(gx9[5]);
                            break;
                        // 第3页
                        case 2:
                            img[0].classList.remove(gb6[4]);
                            img[1].classList.remove(gb6[5]);
                            img[2].classList.remove(gx9[6]);
                            img[3].classList.remove(gx9[7]);
                            img[4].classList.remove(gx9[8]);
                            break;
                    }
                    break;
            }

        }

            {
                    // // 函数，用来切换语言栏，华语、欧美。。。
                    // function changeSinger(){
                    //     // 通过加上类来实现切换效果
                    //     switch(nowLanguages) {
                    //         // 加上华语的类
                    //         case 0:
                    //             modifiedColor();
                    //             modifiedImgName();
                    //             break;
                    //         // 欧美
                    //         case 1:
                    //             modifiedColor();
                    //             modifiedImgName();
                    //             break;
                    //         // 日韩
                    //         case 2:
                    //             modifiedColor();
                    //             modifiedImgName();
                    //             break;
                    //         // 更多
                    //         case 3:
                    //             modifiedColor();
                    //             modifiedImgName();
                    //             break;

                    //     }
                    // }

                    // // 函数，移入语言栏修改封面和名字，由changeSinger调用
                    // function modifiedImgName(){
                    //     // 含义：某某语言 + 第几页 + 当页第几人
                    //     for(let i = 0; i < 2; i++){
                    //         img[i].classList.add(coverSingerTop[i]);
                    //         name[i].innerText = namestring[nowLanguages]+(nowSpan+1)+(i+1);
                    //     }
                    //     for (let i = 2; i < 5; i++) {
                    //         img[i].classList.add(coverSingerB[i]);
                    //         name[i].innerText = namestring[nowLanguages]+(nowSpan+1)+(i+1);
                    //     }

                    // }

                    // // 函数，修改语言栏的文字颜色
                    // // 也就4个类，所以这里数字写死了
                    // function modifiedColor() {
                    //     // 先变原色
                    //     for (let i = 0; i < 4; i++) {
                    //         languageSinger[i].style.color = "";
                    //     }
                    //     // 再变蓝色
                    //     languageSinger[nowLanguages].style.color = "#009af3";
                    // }

                    // // 函数：导航点变色同时切换图片
                    // function flipPage(){
                    //     // 先变色
                    //     // 恢复原色
                    //     for (var i = 0; i < 3; i++) {
                    //         allSpan[i].style.backgroundPosition = "";
                    //     }
                    //     // 变色
                    //     allSpan[nowSpan].style.backgroundPosition = "0 0";
                    //     // 修改图片
                    //     flipPageImg();
                    // }

                    // // 移入导航点修改封面
                    // function flipPageImg(){
                    //     // 含义：某某语言 + 第几页 + 当页第几人
                    //     // i是当页第i+1人
                    //     for(let i = 0; i < 2; i++){
                    //         // 注意，添加类之前要删除类，不然无法生效
                    //         removeAllImg(1, i)
                    //         img[i].classList.add(coverSingerTop[i+nowSpan+nowLanguages]);
                    //         name[i].innerText = namestring[nowLanguages]+(nowSpan+1)+(i+1);
                    //     }
                    //     for (let i = 2; i < 5; i++) {
                    //         removeAllImg(0, i)
                    //         img[i].classList.add(coverSingerB[i-2+nowSpan+nowLanguages]);
                    //         name[i].innerText = namestring[nowLanguages]+(nowSpan+1)+(i+1);
                    //     }
                    // }
                    // // 清空所有img类
                    // // TB说明是删大图的类还是小图的类，x说明是第几个图片
                    // function removeAllImg(TB, x){
                    //     if (TB == 1) {
                    //         for (let i = 0; i < coverSingerTop.length; i++) {
                    //             img[x].classList.remove(coverSingerTop[i]);
                    //         }
                    //     } else{
                    //         for (let i = 0; i < coverSingerB.length; i++) {
                    //             img[x].classList.remove(coverSingerB[i]);
                    //         }
                    //     }
                    // }
                }

    }
    
    
    /**
     * 处理回到顶部箭头响应式出现
     * 
    */
    {
        // 获取回到顶部箭头对象
        var returnUp = document.getElementById("returnUp");
        // 获取箭头相对整个页面的坐标
        document.onscroll = function(event){
            // document.documentElement.scrollTop滚轮滚动距离
            // document.body.scrollHeight获取整个页面的高度
            let temp = document.body.scrollHeight - document.documentElement.scrollTop;
            if (document.documentElement.scrollTop >= 400 && temp < 1025) {
                returnUp.style.visibility = "visible";
                returnUp.style.bottom = 100 + 1025 - temp + "px";
            } else if (document.documentElement.scrollTop >= 400) {
                // returnUp.classList.add("showUp");
                // returnUp.style.position = "fixed";
                returnUp.style.visibility = "visible";
                returnUp.style.bottom = 100 + "px";
            } else {
                returnUp.style.visibility = "hidden";
            }
            
        };
        
    }

    
    
    
};