/**
 * 首页
 */
import React, { MouseEvent } from 'react';
import './index.less';
import { Button, Input, Message, Dialog, ColorPicker } from 'element-react';
import request from '../../services/request';

interface iState {
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    move_x: number;
    move_y: number;
}

export default class extends React.Component<iReactRoute, iState> {
    constructor(props: any) {
        super(props);
        this.window_w = window.innerWidth;
        this.window_h = window.innerHeight;
        const max_line = Math.min(this.window_w, this.window_h);
        this.state = {
            width: max_line,
            height: max_line,
            x: 0,
            y: 0,
            color: '',
            move_x: 0,
            move_y: 0,
        };
    }
    list: any = [];
    window_w = 0;
    window_h = 0;
    render() {
        const { width, height, x, y, move_x, move_y } = this.state;
        return (
            <div id="container">
                <div id="content">
                    <canvas id="game" style={{ width, height, transform: 'translate3d(' + move_x + 'px,' + move_y + 'px,0)' }}></canvas>
                    <div className="test_x" style={{ top: this.state.y }}></div>
                    <div className="test_y" style={{ left: this.state.x }}></div>
                    <div id="top_canvas" style={{ width, height, transform: 'translate3d(' + move_x + 'px,' + move_y + 'px,0)' }}></div>
                </div>
                <div id="top_nav">
                    <Input value={x} placeholder="x坐标" className="input px" />
                    <Input value={y} placeholder="y坐标" className="input px" />
                    <Button onClick={() => this.onBig()}>放大</Button>
                    <Button onClick={() => this.onSmall()}>缩小</Button>

                    <ColorPicker value={this.state.color} onChange={(e: any) => this.setState({ color: e })} />
                    <Button onClick={() => this.draw()}>画一个点</Button>
                </div>
            </div>
        );
    }

    MAX_NUMBER = 2000;
    ctx: any = null;
    componentDidMount() {
        let war: any = document.getElementById('game');
        if (!war) return;
        war.width = this.MAX_NUMBER;
        war.height = this.MAX_NUMBER;
        this.ctx = war.getContext('2d');
        // const context = this.ctx;
        // context.save();
        // context.lineWidth = 1;
        // context.strokeStyle = '#666';
        // for (let index = 0; index < 200; index++) {
        //     context.beginPath();
        //     context.moveTo(0, index * 10);
        //     context.lineTo(this.MAX_NUMBER, index * 10);
        //     context.moveTo(index * 10, 0);
        //     context.lineTo(index * 10, this.MAX_NUMBER);
        //     context.closePath();
        //     context.stroke();
        // }
        // context.restore();
        const top_canvas: any = document.getElementById('top_canvas');
        top_canvas.addEventListener('mousedown', (e: any) => this.onStartMove(e));
        top_canvas.addEventListener('mouseup', (e: any) => this.test(e));
        document.addEventListener('mousemove', (e: any) => this.onMove(e));
        document.addEventListener('mouseup', (e: any) => this.onEndMove(e));
        this.showData();
    }

    test(e: any) {
        this.setState({ x: e.pageX, y: e.pageY });
        const x = e.offsetX;
        const y = e.offsetY;
        const curr_x = Math.floor((200 / this.state.width) * x);
        const curr_y = Math.floor((200 / this.state.height) * y);
        // console.log(curr_x, curr_y);
        this.huaOne(curr_x, curr_y);
    }
    async showData() {
        try {
            const data: any[] = await request.get('/test');
            this.list = data;
            this.DrawRect();
        } catch (error) {
            console.log(error);
        }
    }
    DrawRect() {
        const ctx = this.ctx;
        ctx.save();
        ctx.lineWidth = 0;
        this.list.forEach((item: any) => {
            const x = parseInt(item.x);
            const y = parseInt(item.y);
            const color = item.color;
            ctx.fillStyle = color;
            ctx.fillRect(x * 10, y * 10, 10, 10);
        });
        ctx.restore();
    }
    //放大
    onBig() {
        this.setState({
            width: this.state.width + 200,
            height: this.state.height + 200,
        });
    }
    // 缩小
    onSmall() {
        if (this.state.width < 200) return;
        this.setState({
            width: this.state.width - 200,
            height: this.state.height - 200,
        });
    }
    _x = 0;
    _y = 0;
    _start_x = 0;
    _start_y = 0;
    _is_move = false;
    //开始移动
    onStartMove(e: MouseEvent) {
        this._x = this.state.move_x;
        this._y = this.state.move_y;
        this._start_x = e.pageX;
        this._start_y = e.pageY;
        this._is_move = true;
        return false;
    }
    is_move = false;
    onMove = (e: MouseEvent) => {
        if (!this._is_move) {
            this.setState({ x: e.pageX, y: e.pageY });
            return;
        }
        this.is_move = true;
        const x = e.pageX - this._start_x;
        const y = e.pageY - this._start_y;
        this.setState({
            move_x: this._x + x,
            move_y: this._y + y,
            x: e.pageX,
            y: e.pageY,
        });
        return false;
    };
    onEndMove(e: MouseEvent) {
        this._is_move = false;
        this.is_move = false;
    }
    //画一个框
    huaOne(x: number, y: number) {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, this.MAX_NUMBER, this.MAX_NUMBER);
        ctx.restore();
        this.DrawRect();
        ctx.save();
        ctx.beginPath();
        ctx.rect(x * 10 + 1, y * 10 + 1, 8, 8);
        ctx.lineCap = 'square';
        ctx.strokeStyle = '#f00';
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        this.dot = { x, y };
    }
    dot = { x: 0, y: 0 };
    //展示坐标
    showPX(screen_x: number, screen_y: number) {}

    fillPX(x: number, y: number, color: string) {}
    //画一个块
    async draw() {
        const model = {
            x: this.dot.x,
            y: this.dot.y,
            color: this.state.color,
            nickname: '游客',
        };
        this.list.push(model);
        this.DrawRect();
        try {
            await request.post('/test/set', model);
        } catch (error) {
            console.log(error);
        }
    }
}
