const Bwidth = 9, Bheight = 10, Bpadding = 10
function spawnPointTag(ce, x, y, size) {
    let list = []
    let h = size / 2
    list.push(ce('line', {
        'class': {
            tag: true
        },
        attrs: {
            x1: x,
            y1: y - h,
            x2: x - h,
            y2: y
        }
    }))
    list.push(ce('line', {
        'class': {
            tag: true
        },
        attrs: {
            x1: x,
            y1: y + h,
            x2: x + h,
            y2: y
        }
    }))
    list.push(ce('line', {
        'class': {
            tag: true
        },
        attrs: {
            x1: x,
            y1: y - h,
            x2: x + h,
            y2: y
        }
    }))
    list.push(ce('line', {
        'class': {
            tag: true
        },
        attrs: {
            x1: x,
            y1: y + h,
            x2: x - h,
            y2: y
        }
    }))
    return list
}
Vue.component('board-line', {
    render: function (ce) {
        let list = []
        let pds = this.size / 2
        for (let y = 0; y <= Bwidth; y++) {
            list.push(ce('line', {
                'class': {
                    horizonta: true
                },
                attrs: {
                    x1: y * this.size - pds,
                    y1: pds,
                    x2: y * this.size - pds,
                    y2: Bheight * this.size - pds,
                }
            }))
        }
        for (let x = 0; x <= Bheight; x++) {
            list.push(ce('line', {
                'class': {
                    vertical: true
                },
                attrs: {
                    x1: pds,
                    y1: x * this.size - pds,
                    x2: Bwidth * this.size - pds,
                    y2: x * this.size - pds,
                }
            }))
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        const outLinePds = 3;
        list.push(ce('line', {
            'class': {
                auxiliary: true,
                tag: true
            },
            attrs: {
                x1: this.size - pds - outLinePds,
                y1: pds - outLinePds,
                x2: this.size - pds - outLinePds,
                y2: Bheight * this.size - pds + outLinePds,
            }
        }))
        list.push(ce('line', {
            'class': {
                auxiliary: true,
                tag: true
            },
            attrs: {
                x1: pds - outLinePds,
                y1: this.size - pds - outLinePds,
                x2: Bwidth * this.size - pds + outLinePds,
                y2: this.size - pds - outLinePds,
            }
        }))
        list.push(ce('line', {
            'class': {
                auxiliary: true,
                tag: true
            },
            attrs: {
                x1: 9 * this.size - pds + outLinePds,
                y1: pds - outLinePds,
                x2: 9 * this.size - pds + outLinePds,
                y2: Bheight * this.size - pds + outLinePds,
            }
        }))
        list.push(ce('line', {
            'class': {
                auxiliary: true,
                tag: true
            },
            attrs: {
                x1: pds - outLinePds,
                y1: 10 * this.size - pds + outLinePds,
                x2: Bwidth * this.size - pds + outLinePds,
                y2: 10 * this.size - pds + outLinePds,
            }
        }))
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        list.push(ce('line', {
            'class': {
                auxiliary: true
            },
            attrs: {
                x1: 4 * this.size - pds,
                y1: pds,
                x2: 6 * this.size - pds,
                y2: 3 * this.size - pds,
            }
        }))
        list.push(ce('line', {
            'class': {
                auxiliary: true
            },
            attrs: {
                x1: 6 * this.size - pds,
                y1: pds,
                x2: 4 * this.size - pds,
                y2: 3 * this.size - pds,
            }
        }))
        list.push(ce('line', {
            'class': {
                auxiliary: true
            },
            attrs: {
                x1: 4 * this.size - pds,
                y1: 8 * this.size - pds,
                x2: 6 * this.size - pds,
                y2: 10 * this.size - pds,
            }
        }))
        list.push(ce('line', {
            'class': {
                auxiliary: true
            },
            attrs: {
                x1: 6 * this.size - pds,
                y1: 8 * this.size - pds,
                x2: 4 * this.size - pds,
                y2: 10 * this.size - pds,
            }
        }))
        list = list.concat(spawnPointTag(ce, 2 * this.size - pds, 3 * this.size - pds, this.size * 0.6))
        list = list.concat(spawnPointTag(ce, 8 * this.size - pds, 3 * this.size - pds, this.size * 0.6))
        list = list.concat(spawnPointTag(ce, 2 * this.size - pds, 8 * this.size - pds, this.size * 0.6))
        list = list.concat(spawnPointTag(ce, 8 * this.size - pds, 8 * this.size - pds, this.size * 0.6))
        let rivers = []
        rivers.unshift(ce('style', {
            domProps: {
                innerHTML: `#board>.line>article>.river>div{width:${this.size}px;height:${this.size}px;` +
                `line-height:${this.size}px;font-size: ${this.size*0.75}px;}`
            }
        }))
        for (let i = 0; i < Bwidth - 1; i++){
            rivers.push(ce('div', {
                style: {
                    left: i * this.size + 1
                }
            },'۞'))
        }
        return ce('article', [
            ce('svg', list),
            ce('div', {
                'class': {
                    river: true
                },
                style: {
                    width: 8 * this.size + 2,
                    height: this.size - 1,
                    top: 4 * this.size + pds + 0.5,
                    left: pds - 1
                }
            }, rivers)
        ])
    },
    props: {
        size: {
            type: Number,
            default: 60
        }
    }
})
Vue.component('chunk-info',{
    render: function (ce) {
        return ce('div', {
            on: {
                click: () => {
                    event.$emit('click', this.y, this.x, this.type, this.state)
                }
            },
            'class': this.sclass
        }, [ce('div', {
            'class': this.tclass
        })])
    },
    computed: {
        tclass() {
            let tclass = {}
            if (this.type != '') {
                tclass['c'] = true
                tclass[this.type] = true
            }
            return tclass
        },
        sclass() {
            let tclass = {}
            if (this.state == 1) {
                tclass['cho'] = true
            } else if (this.state == 2) {
                tclass['pot'] = true
            } else if (this.state == 3) {
                tclass['tar'] = true
            }
            return tclass
        }
    },
    data: function () {
        return {
            type: '',
            state: 0
        }
    },
    props: {
        x: Number,
        y: Number
    },
    created() {
        event.$emit('loadChunk', this)
        event.$on('clearBoard', () => {
            this.type = ''
        })
        event.$on('clearState', () => {
            this.state = 0
        })
    }
})
Vue.component('board-chunk', {
    render: function (ce) {
        let list = []
        let a = []
        list.unshift(ce('style', {
            domProps: {
                innerHTML: `.boardChunk>article{width:${this.size}px;height:${this.size}px;padding:${this.padding}px}` +
                `.boardChunk>article>div{border-width:${this.border}px;font-size:${this.font}px;}` + 
                `.boardChunk>article>div>div{line-height:${(this.size - (this.padding + this.border) * 2) - 4}px}`
            }
        }))
        for (let y = 0; y < Bheight; y++){
            for (let x = 0; x < Bwidth; x++) {
                let c = ce('article', [
                    ce('chunk-info', {
                        props: {
                            x: x,
                            y: y
                        }
                    })
                ])
                if (a[y] == undefined) {
                    a[y] = []
                }
                a[y][x] = c
                list.push(c)
            }
        }
        return ce('section', {
            'class': {
                boardChunk: true
            }
        }, list)
    },
    props: {
        size: {
            type: Number,
            default: 60
        },
        padding: {
            type: Number,
            default: 5
        },
        border: {
            type: Number,
            default: 3
        },
        font: {
            type: Number,
            default: 25
        }
    }
})
const event = new Vue({
    data() {
        return {
            onWaitChose: false,
            onWaitChunk: [-1, -1]
        }
    }
})
window.onload = function () {
    const board = new Vue({
        el: '#board',
        data: {
            chunkSize: 60,
            paddingSize: 1,
            chunkBorder: 3,
            chunkFont: 25,
            list: []
        },
        computed: {
            size: function () {
                let w = Bwidth * this.chunkSize
                let h = Bheight * this.chunkSize
                return {
                    width: w,
                    height: h,
                    marginLeft: parseInt((w / -2) - Bpadding),
                    marginTop: parseInt((h / -2) - Bpadding),
                    padding: Bpadding
                }
            },
            csize: function () {
                return {
                    width: Bwidth * this.chunkSize,
                    height: Bheight * this.chunkSize,
                }
            }
        },
        methods: {
            chose(y, x, type, state) {
                event.$emit('clearState')
                if (type != '') {
                    if (event.onWaitChunk[0] == y && event.onWaitChunk[1] == x) {
                        event.onWaitChunk = [-1, -1]
                    } else {
                        if (state == 3) {
                            this.eat(event.onWaitChunk[0], event.onWaitChunk[1], y, x)
                            event.onWaitChunk = [-1, -1]
                            return
                        }
                        event.onWaitChunk = [y, x]
                        this.ChessCheck(y, x, type)
                    }
                } else {
                    if (state == 2) {
                        this.moveTo(event.onWaitChunk[0], event.onWaitChunk[1], y, x)
                    }
                    event.onWaitChunk = [-1, -1]
                }
            },
            spawnDef() {
                this.list[0][0].type = 'jb'
                this.list[0][1].type = 'mb'
                this.list[0][2].type = 'xb'
                this.list[0][3].type = 'sb'
                this.list[0][4].type = 's'
                this.list[0][5].type = 'sb'
                this.list[0][6].type = 'xb'
                this.list[0][7].type = 'mb'
                this.list[0][8].type = 'jb'

                this.list[2][1].type = 'pb'
                this.list[2][7].type = 'pb'

                this.list[3][0].type = 'bb'
                this.list[3][2].type = 'bb'
                this.list[3][4].type = 'bb'
                this.list[3][6].type = 'bb'
                this.list[3][8].type = 'bb'

                this.list[9][0].type = 'jr'
                this.list[9][1].type = 'mr'
                this.list[9][2].type = 'xr'
                this.list[9][3].type = 'sr'
                this.list[9][4].type = 'j'
                this.list[9][5].type = 'sr'
                this.list[9][6].type = 'xr'
                this.list[9][7].type = 'mr'
                this.list[9][8].type = 'jr'

                this.list[7][1].type = 'pr'
                this.list[7][7].type = 'pr'

                this.list[6][0].type = 'br'
                this.list[6][2].type = 'br'
                this.list[6][4].type = 'br'
                this.list[6][6].type = 'br'
                this.list[6][8].type = 'br'
            },
            ChessCheck(y, x, type) {
                this.list[y][x].state = 1
                let t = TypeEnum[type]
                if (t == 1) {
                    this.CHOCHUNK(y - 1, x, t)
                    if (y < 5) {
                        this.CHOCHUNK(y, x - 1, t)
                        this.CHOCHUNK(y, x + 1, t)
                    }
                }
                if (t == -1) {
                    this.CHOCHUNK(y + 1, x, t)
                    if (y > 4) {
                        this.CHOCHUNK(y, x - 1, t)
                        this.CHOCHUNK(y, x + 1, t)
                    }
                }
                if (t == 2 || t == -2) {
                    let c = false
                    for (let i = y - 1; i >= 0; i--) {
                        if (this.list[i][x].type != '') {
                            if (c) {
                                this.CHOCHUNK(i, x, t)
                                break
                            }
                            c = true
                            continue
                        }
                        if (!c) {
                            this.CHOCHUNK(i, x, t)
                        }
                    }
                    c = false
                    for (let i = y + 1; i < Bheight; i++) {
                        if (this.list[i][x].type != '') {
                            if (c) {
                                this.CHOCHUNK(i, x, t)
                                break
                            }
                            c = true
                            continue
                        }
                        if (!c) {
                            this.CHOCHUNK(i, x, t)
                        }
                    }
                    c = false
                    for (let i = x + 1; i < Bwidth; i++) {
                        if (this.list[y][i].type != '') {
                            if (c) {
                                this.CHOCHUNK(y, i, t)
                                break
                            }
                            c = true
                            continue
                        }
                        if (!c) {
                            this.CHOCHUNK(y, i, t)
                        }
                    }
                    c = false
                    for (let i = x - 1; i >= 0; i--) {
                        if (this.list[y][i].type != '') {
                            if (c) {
                                this.CHOCHUNK(y, i, t)
                                break
                            }
                            c = true
                            continue
                        }
                        if (!c) {
                            this.CHOCHUNK(y, i, t)
                        }
                    }
                }
                if (t == 3 || t == -3) {
                    for (let i = y - 1; i >= 0; i--) {
                        this.CHOCHUNK(i, x, t)
                        if (this.list[i][x].type != '') {
                            break
                        }
                    }
                    for (let i = y + 1; i < Bheight; i++) {
                        this.CHOCHUNK(i, x, t)
                        if (this.list[i][x].type != '') {
                            break
                        }
                    }
                    for (let i = x + 1; i < Bwidth; i++) {
                        this.CHOCHUNK(y, i, t)
                        if (this.list[y][i].type != '') {
                            break
                        }
                    }
                    for (let i = x - 1; i >= 0; i--) {
                        this.CHOCHUNK(y, i, t)
                        if (this.list[y][i].type != '') {
                            break
                        }
                    }
                }
                if (t == 4 || t == -4) {
                    if (this.CHOHAS(y - 1, x) && this.list[y - 1][x].type == '') {
                        this.CHOCHUNK(y - 2, x + 1, t)
                        this.CHOCHUNK(y - 2, x - 1, t)
                    }
                    if (this.CHOHAS(y + 1, x) && this.list[y + 1][x].type == '') {
                        this.CHOCHUNK(y + 2, x + 1, t)
                        this.CHOCHUNK(y + 2, x - 1, t)
                    }
                    if (this.CHOHAS(y, x - 1) && this.list[y][x - 1].type == '') {
                        this.CHOCHUNK(y + 1, x - 2, t)
                        this.CHOCHUNK(y - 1, x - 2, t)
                    }
                    if (this.CHOHAS(y, x + 1) && this.list[y][x + 1].type == '') {
                        this.CHOCHUNK(y + 1, x + 2, t)
                        this.CHOCHUNK(y - 1, x + 2, t)
                    }
                }
                if (t == 5 || t == -5) {
                    if (this.CHOHAS(y - 1, x - 1) && this.list[y - 1][x - 1].type == '') {
                        this.CHOCHUNK(y - 2, x - 2, t)
                    }
                    if (this.CHOHAS(y + 1, x - 1) && this.list[y + 1][x - 1].type == '') {
                        this.CHOCHUNK(y + 2, x - 2, t)
                    }
                    if (this.CHOHAS(y + 1, x + 1) && this.list[y + 1][x + 1].type == '') {
                        this.CHOCHUNK(y + 2, x + 2, t)
                    }
                    if (this.CHOHAS(y - 1, x + 1) && this.list[y - 1][x + 1].type == '') {
                        this.CHOCHUNK(y - 2, x + 2, t)
                    }
                }
                if (t == 6 || t == -6) {
                    let ymi = t == -6 ? 0 : 7
                    let yma = t == -6 ? 2 : 9
                    if (y >= ymi && y <= yma && x >= 3 && x <= 5) {
                        if (y == yma && x == 5) {
                            this.CHOCHUNK(y - 1, x - 1, t)
                        } else if (y == yma && x == 3) {
                            this.CHOCHUNK(y - 1, x + 1, t)
                        } else if (y == ymi && x == 5) {
                            this.CHOCHUNK(y + 1, x - 1, t)
                        } else if (y == ymi && x == 3) {
                            this.CHOCHUNK(y + 1, x + 1, t)
                        } else {
                            this.CHOCHUNK(y - 1, x - 1, t)
                            this.CHOCHUNK(y - 1, x + 1, t)
                            this.CHOCHUNK(y + 1, x - 1, t)
                            this.CHOCHUNK(y + 1, x + 1, t)
                        }
                    }
                }
                if (t == 7 || t == -7) {
                    let ymi = t == -7 ? 0 : 7
                    let yma = t == -7 ? 2 : 9
                    if (y >= ymi && y <= yma && x >= 3 && x <= 5) {
                        if (y != ymi) {
                            this.CHOCHUNK(y - 1, x, t)
                        }
                        if (y != yma) {
                            this.CHOCHUNK(y + 1, x, t)
                        }
                        if (x != 3) {
                            this.CHOCHUNK(y, x - 1, t)
                        }
                        if (x != 5) {
                            this.CHOCHUNK(y, x + 1, t)
                        }
                    }
                    if (t == 7) {
                        for (let i = y - 1; i >= 0; i--) {
                            if (this.list[i][x].type != '') {
                                if (TypeEnum[this.list[i][x].type] == -t) {
                                    this.CHOCHUNK(i, x, t)
                                }
                                break
                            }
                        }
                    } else {
                        for (let i = y + 1; i < Bheight; i++) {
                            if (this.list[i][x].type != '') {
                                if (TypeEnum[this.list[i][x].type] == -t) {
                                    this.CHOCHUNK(i, x, t)
                                }
                                break
                            }
                        }
                    }
                }
            },
            CHOHAS(y, x) {
                if (y >= 0 && y < Bheight && x >= 0 && x < Bwidth) {
                    return true
                }
                return false
            },
            CHOCHUNK(y, x, type) {
                if (y >= 0 && y <= Bheight - 1 && x >= 0 && x <= Bwidth - 1) {
                    if (this.list[y][x].type != '') {
                        if (!(type < 0) && TypeEnum[this.list[y][x].type] < 0
                            || type < 0 && !(TypeEnum[this.list[y][x].type] < 0)) {
                            this.list[y][x].state = 3
                        }
                    } else {
                        this.list[y][x].state = 2
                    }
                }
            },
            moveTo(wy, wx, y, x) {
                let t = this.list[wy][wx].type
                this.list[y][x].type = t
                this.list[wy][wx].type = ''
            },
            eat(wy, wx, y, x) {
                this.moveTo(wy, wx, y, x)
            }
        },
        created() {
            event.$on('loadChunk', (chunk) => {
                if (this.list[chunk.y] == undefined) {
                    this.list[chunk.y] = []
                }
                this.list[chunk.y][chunk.x] = chunk
            })
            event.$on('spawnDef', () => {
                this.spawnDef()
            })
            event.$on('click', (...val) => {
                this.chose(...val)
            })
        }
    })
    const consoles = new Vue({
        el: '#consoles',
        data: {
            val: 'spawnDef'
        },
        methods: {
            ret() {
                let val = this.val
                if (val == '') {
                    console.groupCollapsed('$> 没有输入任何东西')
                    console.groupEnd()
                    return
                }
                console.group('$> ' + val)
                if (typeof this[val] == 'function') {
                    this[val].call()
                }
                console.groupEnd()
                this.val = ''
            },
            spawnDef() {
                this.clearBoard()
                console.log('生成默认棋盘')
                event.$emit('spawnDef')
            },
            clearBoard() {
                console.log('清空棋盘')
                event.$emit('clearBoard') 
            }
        }
    })
}
const TypeEnum = {
    br: 1,
    pr: 2,
    jr: 3,
    mr: 4,
    xr: 5,
    sr: 6,
    j: 7,
    bb: -1,
    pb: -2,
    jb: -3,
    mb: -4,
    xb: -5,
    sb: -6,
    s: -7,
    1: 'br',
    2: 'pr',
    3: 'jr',
    4: 'mr',
    5: 'xr',
    6: 'sr',
    7: 'j',
    '-1': 'bb',
    '-2': 'pb',
    '-3': 'jb',
    '-4': 'mb',
    '-5': 'xb',
    '-6': 'sb',
    '-7': 's'
}
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})