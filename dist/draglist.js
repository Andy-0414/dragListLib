(() => {
    var dragList = document.getElementsByClassName("drag-list") // drag-list 클래스 찾기
        ;[...dragList].forEach(drag => {
            drag.style.position = "relative"
            drag.style.overflow = "hidden"

            var target = null
            var itemHeight = drag.children[0].scrollHeight

            var tmpElement = null
            drag.addEventListener("mousedown", e => { // 마우스 누르기
                if (e.target != drag)
                    target = e.target
                var selectIndex = [...drag.children].findIndex(x => x == target)

                tmpElement = target.cloneNode("true")
                tmpElement.style.opacity = 0.2
                drag.insertBefore(tmpElement, drag.children[selectIndex])

                target.style.zIndex = target.style.zIndex + 1
                target.style.position = "absolute"
                target.style.top = e.clientY - drag.getBoundingClientRect().top - target.clientHeight / 2 + "px"
            })
            drag.addEventListener("mousemove", e => { // 마우스 움직이기
                if (target) {
                    var itemIndex = Math.floor((e.clientY - drag.getBoundingClientRect().top + itemHeight / 2) / itemHeight)
                    var tmpIndex = [...drag.children].findIndex(x => x == tmpElement)
                    if (tmpIndex != itemIndex) {
                        drag.removeChild(tmpElement)
                        drag.insertBefore(tmpElement, drag.children[itemIndex])
                    }
                    target.style.top = e.clientY - drag.getBoundingClientRect().top - target.clientHeight / 2 + "px"
                    target.style.boxShadow = "0px 5px 10px 0px #AAAAAAAA"
                }
            })

            function outEvent(e) {
                var itemIndex = Math.floor((e.clientY - drag.getBoundingClientRect().top + itemHeight / 2) / itemHeight)
                if (tmpElement) {
                    drag.removeChild(tmpElement)
                    drag.insertBefore(target, drag.children[itemIndex > drag.children.length ? drag.children.length : itemIndex])
                }
                if (target) {
                    target.style.zIndex = target.style.zIndex - 1
                    target.style.position = "static"
                    target.style.boxShadow = "none"

                    tmpElement = null
                    target = null
                }
            }
            drag.addEventListener("mouseup", outEvent) // 마우스 떼기
            drag.addEventListener("mouseleave", outEvent) // 마우스 떼기
        })
})()