/**
 * 首页
 */
import React, { MouseEvent } from 'react';
import './index.less';
import { Button, Input, Message, Dialog, ColorPicker } from 'element-react';
// import request from '../../services/request';

const createjs: any = window.createjs;

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
        for (let index = 0; index < 40000; index++) {
            this.list.push({
                x: index,
                color: '#ccc',
            });
        }
    }
    list: any = [];
    window_w = 0;
    window_h = 0;
    render() {
        const { width, height, x, y, move_x, move_y } = this.state;
        return (
            <div id="container">
                <div id="content">
                    <canvas draggable={true} id="game" style={{ width, height, transform: 'translate3d(' + move_x + 'px,' + move_y + 'px,0)' }}></canvas>
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
    stage: any = null;
    componentDidMount() {
        let war: any = document.getElementById('game');
        if (!war) return;
        war.width = this.MAX_NUMBER;
        war.height = this.MAX_NUMBER;

        const stage: ICreateStage = new createjs.Stage('game');
        this.stage = stage;
        war.addEventListener('mousedown', (e: any) => this.onStartMove(e));
        document.addEventListener('mousemove', (e: any) => this.onMove(e));
        document.addEventListener('mouseup', (e: any) => this.onEndMove(e));
        this.showData();
    }

    showData() {
        const stage = this.stage;
        for (let index = 0; index < this.list.length; index++) {
            const item = this.list[index];
            const x = Math.floor(index / 200) * 10;
            const y = (index % 200) * 10;
            const rect = new createjs.Shape();
            rect.graphics.beginFill(item.color).drawRect(x, y, 10, 10);
            rect.name = x + '_' + y;
            rect.lastColor = item.color;
            stage.addChild(rect);
            rect.addEventListener('click', () => {
                this.huaOne(x, y);
                this.setState({ x, y });
                return false;
            });
        }

        stage.update();
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
        this._start_x = e.screenX;
        this._start_y = e.screenY;
        this._is_move = true;
        return false;
    }
    onMove = (e: MouseEvent) => {
        if (!this._is_move) return;
        const x = e.screenX - this._start_x;
        const y = e.screenY - this._start_y;
        this.setState({
            move_x: this._x + x,
            move_y: this._y + y,
        });
        return false;
    };
    onEndMove(e: MouseEvent) {
        this._is_move = false;
    }
    lastName = '';
    //画一个框
    huaOne(x: number, y: number) {
        const name = x + '_' + y;
        if (this.lastName && name !== this.lastName) {
            const temp = this.stage.getChildByName(this.lastName);
            temp.graphics.clear();
            temp.graphics.beginFill(temp.lastColor).drawRect(temp.graphics.command.x, temp.graphics.command.y, 10, 10);
        }
        this.lastName = name;
        const obj = this.stage.getChildByName(name);
        obj.graphics.beginStroke('#ff0000').drawRect(x, y, 10, 10);
        this.stage.update();
    }
    //展示坐标
    showPX(screen_x: number, screen_y: number) {}

    fillPX(x: number, y: number, color: string) {}
    //画一个块
    draw() {
        const name = this.state.x + '_' + this.state.y;
        const obj = this.stage.getChildByName(name);
        console.log(obj);
        obj.graphics.clear();
        obj.lastColor = this.state.color;
        obj.graphics.beginFill(this.state.color).drawRect(this.state.x, this.state.y, 10, 10);
        this.stage.update();
    }
}
