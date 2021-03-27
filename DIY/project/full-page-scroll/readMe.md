参考：https://xiaogliu.github.io/2018/04/28/develop-full-page-scroll-by-es6/#2%EF%BC%89%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E5%8F%8A%E4%BB%A3%E7%A0%81%E6%9E%B6%E6%9E%84
简单概要重点：
    <!-- 通过修改top值修改页面
    通过js动态获取想要的高度(因为手机端)
    通过定时器加if实现截流和防抖
    手机端需要禁止下拉刷新, 可在css中设置 touch-action: none; -->
    
    HTML:
        <!-- 外层，决定位置。CSS设置 overflow:hidden -->
        <div id="full-page-box">
            <!-- 显示层，宽高设置多少，用户就看到多少 -->
            <!-- 为兼容手机浏览器，高度不要简单的设为100vh，应由js动态获取，因为手机端有搜索框，且该搜索框被包含进vh -->
            <!-- 通过修改显示层的top值修改页面显示 -->
            <div id="full-page">
                <!-- 单个页面，宽高均设为100%，100%是相对#full-page而言 -->
                <div class="page"></div>
            </div>
        </div>
    CSS:
        注意在#full-page上设置 touch-action: none;(阻止 touchmove 下拉刷新)
    JS:
        - 获取窗口高度
            document.documentElement.clientHeight
            之所以这样获取，而不使用 100vh 是因为这样获取到的高度不包括手机端的搜索框，而100vh会获取到搜索框
        - 监听滚轮事件
            <!-- wheelCallBack 是回调函数, 即滚动事件响应时会执行的函数 -->
            if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
                <!-- 普通浏览器 -->
                document.addEventListener('mousewheel', wheelCallBack);
            } else {
                <!-- 兼容火狐，火狐的滚动事件是使用 DOMMouseScroll -->
                document.addEventListener('DOMMouseScroll', wheelCallBack);
            }
        - 监听窗口变化
            window.addEventListener('resize', function)
        - 判断滚动方向
              - 返回值: 上正下负
                function getWheelDelta(event) {
                    if (event.wheelDelta) {
                        // 调用一次函数后就无需判断了
                        this.getWheelDelta = event => event.wheelDelta
                        return event.wheelDelta;
                    } else {
                        this.getWheelDelta = event => -event.detail
                        // 兼容火狐
                        return -event.detail;
                    }
                }
            手机端判断滚动方向使用 touchstart 和 touchend 两个阶段的 clientY 判断
        - 所谓的不让用户滚动页面过快，实现起来其实很简单
            设置一个参数flag=1，执行函数后将flag修改为0，然后设置一个定时器，1s后再将flag修改为1
        - 使用一个函数创建导航点时，在函数体内声明了一个变量，此时变量的作用域是在函数体内
          - 想要在函数体外(全局)能够访问它，又不想在函数体外写代码，则可以在函数体内使用 全局名.变量名 = 变量名 这是浅拷贝(应该没错)
