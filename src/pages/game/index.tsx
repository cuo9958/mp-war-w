/**
 * 首页
 */
import React, { MouseEvent } from 'react';
import './index.less';
import { Button, Input, Message, Dialog } from 'element-react';
// import request from '../../services/request';

interface iState {
    width: number;
    height: number;
    x: number;
    y: number;
    war_x: number;
    war_y: number;
}

export default class extends React.Component<iReactRoute, iState> {
    constructor(props: any) {
        super(props);
        this.window_w = window.innerWidth;
        this.window_h = window.innerHeight;
        const max_line = Math.min(this.window_w, this.window_h) - 20;
        this.state = {
            width: max_line,
            height: max_line,
            x: 0,
            y: 0,
            war_x: 0,
            war_y: 0,
        };
    }
    window_w = 0;
    window_h = 0;
    render() {
        const { width, height, x, y, war_x, war_y } = this.state;
        return (
            <div id="container">
                <canvas onClick={() => this.onHua()} onMouseMove={this.onMove} id="game" style={{ width, height }}></canvas>
                <div id="top_nav">
                    <Input value={x} placeholder="x坐标" className="input px" />
                    <Input value={y} placeholder="y坐标" className="input px" />
                    <Button onClick={() => this.onBig()}>放大</Button>
                    <Button onClick={() => this.onSmall()}>缩小</Button>
                </div>
                <div id="footer">
                    <div className="item">
                        {war_x}:{war_y}
                    </div>
                </div>
            </div>
        );
    }
    war: any = null;
    ctx: any = null;
    MAX_NUMBER = 2000;
    game_left = 0;
    game_top = 0;
    componentDidMount() {
        this.war = document.getElementById('game');
        this.war.width = this.MAX_NUMBER;
        this.war.height = this.MAX_NUMBER;
        this.ctx = this.war.getContext('2d');
        this.game_left = this.war.offsetLeft;
        this.game_top = this.war.offsetTop;
        // this.showData();
    }

    showData() {
        const ctx = this.ctx;
        ctx.strokeStyle = '#ddd';
        for (let index = 0; index < 1001; index++) {
            ctx.beginPath();
            ctx.moveTo(0, index * 10);
            ctx.lineTo(this.MAX_NUMBER, index * 10);
            ctx.closePath();
            ctx.stroke();
        }
        for (let index = 0; index < 1001; index++) {
            ctx.beginPath();
            ctx.moveTo(index * 10, 0);
            ctx.lineTo(index * 10, this.MAX_NUMBER);
            ctx.closePath();
            ctx.stroke();
        }
    }
    onBig() {
        this.setState({
            width: this.state.width + 200,
            height: this.state.height + 200,
        });
    }
    onSmall() {
        if (this.state.width < 200) return;
        this.setState({
            width: this.state.width - 200,
            height: this.state.height - 200,
        });
    }
    onMove = (e: MouseEvent) => {
        this.showPX(e.screenX, e.screenY);
    };
    onHua() {
        this.fillPX(this.state.war_x, this.state.war_y, '#bb0000');
    }
    //展示坐标
    showPX(screen_x: number, screen_y: number) {
        const war_x = Math.ceil(((screen_x - this.game_left) / this.state.width) * this.MAX_NUMBER);
        const war_y = Math.ceil(((screen_y - this.game_top) / this.state.height) * this.MAX_NUMBER);
        console.log('坐标x', war_x, war_y);
        this.setState({ war_x, war_y });
    }

    fillPX(x: number, y: number, color: string) {
        const ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 10, 10);
    }
}
