'use strict';
class snake {
  constructor(options){
    const snake = 'y1x4 y1x3 y1x2 y1x1'.split(' ');
    const $ = this.$;
    const replace = $('.snake');

    replace.parentNode.replaceChild(this.field(40,20), replace);
    this.options = options;
    this.snake           = snake;
    this.Y               = 1 ;
    this.X               = 4;
    this.right           = true;
    this.bottom          = false;
    this.left            = false;
    this.top             = false;
    this.stat            = true;
    this.count           = 0;
    this.countTarget     = 0;
    this.score           = {a:0,b:5}
    this.objectOfTurns   = new Object()
    this.class           = true;
    this.directionOfTurn = 'right';
    this.tail            = 'tail-r';
    this.speed           = 0;
    this.pause          = false;
    this.acceleration    = true;
    this.speed           = {
      stat: false,
      count: 0,
      '0':  200,
      '1':  190,
      '2':  180,
      '3':  170,
      '4':  160,
      '5':  150,
      '6':  140,
      '7':  130,
      '8':  120,
      '9':  110,
      '10':  100
    };
    this.time = this.speed[0]

    this.interval(e => this.start(), this.time);
    this.motion();
    this.target();
    this.turn();
    addEventListener('click', e => this.bonus());
    this.level();
  }

  level(level){
    this.options.level.forEach( elem => {
      this.$(`#${elem}`).className = 'wall';
    });

    // this.snake = this.options.snake;
      this.snake.forEach(elem => this.$(`#${elem}`).className = 'snake snakeX');
      this.$(`#${this.snake[0]}`).classList.add('Right');
      this.$(`#${this.snake[this.snake.length-1]}`).classList.add('trail-r');
  }

  speedPlus(){
    if(this.countTarget % 9 === 0 && this.speed.stat && this.speed.count < 10){
      this.time = this.speed[this.speed.count++]
      this.speed.stat = false;
      this.$('.speed').textContent = `speed ${this.speed.count}`;
    }else if(this.countTarget%9 > 0 && !this.speed.stat)
      this.speed.stat = true;
  }

  gameOwer(){
    const _this = this;
    const popap = document.createElement('div');
    const h1 = document.createElement('h1');
    const restart = document.createElement('button');
    const score = document.createElement('span');
    restart.className = 'fa fa-refresh';
    h1.textContent = 'Game Over';
    popap.appendChild(h1);
    popap.appendChild(score);
    popap.appendChild(restart);
    popap.className = 'popap';

    clearInterval(this.targetInt);

    setTimeout(e=>clearTimeout(this.int),5);
    setTimeout(e => {
      document.body.replaceChild(popap, this.$('.field'));
    },400);

    if(+localStorage.score  < this.score.a)
      localStorage.score = this.score.a + '';
      score.innerHTML = `Hight Score: ${localStorage.score} <br> Points: ${this.score.a} <br> `;

    restart.addEventListener('click', e=> {
      location.reload()
    });
  }


  turn(){
    addEventListener('keydown', e => {
      if(e.keyCode === 37 && this.left){
        this.objectOfTurns[`${this.snake[0]}`] = `${this.directionOfTurn}-left`;
        this.directionOfTurn = 'left';
      }

      if(e.keyCode === 38 && this.top){
        this.objectOfTurns[`${this.snake[0]}`] = `${this.directionOfTurn}-top`;
        this.directionOfTurn = 'top';
      }

      if(e.keyCode === 39 && this.right){
        this.objectOfTurns[`${this.snake[0]}`] = `${this.directionOfTurn}-right`;
        this.directionOfTurn = 'right';
      }

      if(e.keyCode === 40 && this.bottom){
        this.objectOfTurns[`${this.snake[0]}`] = `${this.directionOfTurn}-bottom`;
        this.directionOfTurn = 'bottom';
      }
    })
  }

  interval(callback, time){
    const _this = this;
    setTimeout(function a(){
      callback();
      _this.int = setTimeout(a, _this.time);
    },time);
  }


  start(){
    if(this.pause) return;

    const $ = this.$;
    const _this = this;
    if(this.X < this._x && this.right) this.X++; else if(this.right) this.X = 1; //right
    if(this.X > 1 && this.left) this.X--; else if(this.left) this.X = this._x; //left

    if(this.Y < this._y && this.bottom) this.Y++; else if(this.bottom) this.Y = 1; //bottom
    if(this.Y > 1 && this.top) this.Y--; else if(this.top) this.Y = this._y; //top

    this.count = (this.count < this._x*1.1)? this.count+1: 0;
    this.$('.steps').textContent = this._x*1.1 - this.count;
    this.snake.unshift(`y${this.Y}x${this.X}`);
    if($(`#${this.snake[0]}`).matches('.snake') || $(`#${this.snake[0]}`).matches('.wall')){
      this.gameOwer();
      return;
    }
    this.target()

    let elem;
    if(!$(`#${this.snake[0]}`).matches('.target')){
      elem = this.snake.pop();
      $(`#${elem}`).className = '';
    }else{
      this.count = 0;
      this.target()
      this.plus();
      this.countTarget++;
    }

      $(`#${this.snake[0]}`).className = (this.top)? 'snakeHead Top': (this.right)? 'snakeHead Right':(this.bottom)? 'snakeHead Bottom':(this.left)?'snakeHead Left':'snakeHead Left';
      $(`#${this.snake[1]}`).className = (this.top || this.bottom)? 'snake snakeY': (this.right || this.left)? 'snake snakeX':'';

      const elema = $(`#${this.snake[this.snake.length-1]}`);

      if(elema.matches('.left-bottom') || elema.matches('.right-bottom') ) this.tail = 'tail-b';
      if(elema.matches('.left-top') || elema.matches('.right-top') ) this.tail       = 'tail-t';
      if(elema.matches('.bottom-left') || elema.matches('.top-left') ) this.tail     = 'tail-l';
      if(elema.matches('.bottom-right') || elema.matches('.top-right') ) this.tail   = 'tail-r';
      elema.classList.add(this.tail);

      for(let key in this.objectOfTurns){
        if(elem === key) delete this.objectOfTurns[key];
        else $(`#${key}`).classList.add(this.objectOfTurns[key]);
      }
      this.stat = true;
      this.speedPlus();

    }

    paused() {
      if(!this.pause) {
        this.pause = true;
        this.$('.pause').textContent = 'pause';
        this.snake.forEach( cell => {this.$(`#${cell}`).classList.add('blink')});
        this.$('.target').classList.add('blink');
      }else{
        this.pause = false;
        this.$('.pause').textContent = '';
        this.snake.forEach( cell => {this.$(`#${cell}`).classList.remove('blink')});
        this.$('.target').classList.remove('blink');
      }
    }

    motion(){
      let [motionX, motionY] = [false, true];
      const _this = this;

      addEventListener('keydown', event => {
        switch(event.keyCode) {
          case 37: _left(); break;
          case 38: _top(); break;
          case 39: _right(); break;
          case 40: _bottom(); break;
        }

        if(event.shiftKey)
          _this.time = 50;

        if(event.keyCode === 32 && this.$('.field')) this.paused()
          
        },false);

      addEventListener('keyup', e => {
        if(!e.shiftKey){  
          _this.time = _this.speed[_this.speed.count]
        }
      })


      function _top(){
        if(!motionY || !_this.stat) return;
        _this.top = true;
        _this.right = false;
        _this.bottom = false;
        _this.left = false;
        _this.stat = false;
        motionY = false;
        motionX = true;
      }
      function _right(){
        if(!motionX || !_this.stat) return;
        _this.top = false;
        _this.right = true;
        _this.bottom = false;
        _this.left = false;
        _this.stat = false;
        motionX = false;
        motionY = true;
      }
      function _bottom(){
        if(!motionY || !_this.stat) return;
        _this.top = false;
        _this.right = false;
        _this.bottom = true;
        _this.left = false;
        _this.stat = false;
        motionY = false;
        motionX = true;
      }
      function _left(){
        if(!motionX || !_this.stat) return;
        _this.top = false;
        _this.right = false;
        _this.bottom = false;
        _this.left = true;
        _this.stat = false;
        motionX = false;
        motionY = true;
      }
    }

    pause(){  
      if(!this.pause) {
        this.pause = true;
        const pause = document.createElement('div');
        pause.className = 'pause';
        pause.textContent = 'pause';
        document.body.appendChild(pause);
        this.snake.forEach( cell => {this.$(`#${cell}`).classList.add('blink')});
        this.$('.target').classList.add('blink');
      }else{
        this.pause = false;
        document.body.removeChild(_this.$('.pause'));
        this.snake.forEach( cell => {_this.$(`#${cell}`).classList.remove('blink')});
        this.$('.target').classList.remove('blink');
      }
    }

    target(){
      if(this.count !== 0)return;
      let X = Math.floor(Math.random() * (this._x+1));
      let Y = Math.floor(Math.random() * (this._y+1));
      X = (X === 0)? 1: X;
      Y = (Y === 0)? 1: Y;

      let count = 1;
      const targets = ['bananas', 'grapes', 'poison', 'cherries'];

      const target = this.$('.target');
      const cell = this.$(`#y${Y}x${X}`);
      if(target) target.className = '';

      if(cell.matches('.snake') || cell.matches('.snakeHead') || cell.matches('.wall')){this.target(); return;}
      cell.className = 'target cherries';
    }

    plus(){
      const _this = this
      const plus = document.createElement('div');
      const elem = this.$(`#${this.snake[0]}`)
      plus.className = `plus ${this.$('.target').getAttribute('class').split(' ')[1]}`;
      plus.style.top = elem.getBoundingClientRect().top + 'px';
      plus.style.left = elem.getBoundingClientRect().left + 'px';
      elem.appendChild(plus);
      _this.score.a = (_this.score.a === 0)? 5 : _this.score.a + ++_this.score.b;
      _this.$('span.score').textContent = _this.score.a;

      if(!localStorage.score) localStorage.score = '0';
      if(+localStorage.score < _this.score.a) _this.$('.high-score').textContent = 'HIGH SCORE';
      localStorage.score = (_this.score.a >= +localStorage.score)? this.score.a: localStorage.score;

      setTimeout(e => {
        plus.style.left = '-30px';
        plus.style.top = 0; 
      },20)

      setTimeout(e => {elem.removeChild(plus);},600)
    }


  field(x=10, y=x){
    const field = document.createElement('div');
    const info = document.createElement('div');
    const table = document.createElement('table');

    'score high-score speed level steps pause'.split(' ').forEach(elem => {
      const el = document.createElement('span');
      el.className = elem;
      if(elem !== 'high-score')
        el.textContent = '0';
      if(elem === 'level')
        el.textContent = 'level 0';
      if(elem === 'pause')
        el.textContent = '';
      if(elem === 'speed')
        el.textContent = 'speed 0';
      info.appendChild(el);
    })

    info.className = 'info';
    info.style.height = `${20 * y}px`;

    let [X, Y] = [0, 0];
    this._x = x;
    this._y = y;
    field.classList.add('field');
    field.classList.add('row');
    field.style.width = `${x * 20 + 80}px`;
    while(X++ < y){
      const tr = document.createElement('tr');
      while(Y++ < x){
        const td = document.createElement('td');
        td.id = `y${X}x${Y}`;
        tr.appendChild(td);
      }
      Y = 0;
      table.appendChild(tr);
    }
    field.appendChild(info);
    field.appendChild(table);
    return field
  }

  $(val){return document.querySelector(val)}

}

new snake({level: [
  "y4x19", "y4x20", "y4x21", "y4x22", "y5x22", "y5x21", 
  "y5x20", "y5x19", "y6x22", "y5x23", "y6x23", "y7x23", 
  "y7x24", "y6x24", "y6x19", "y5x18", "y6x18", "y7x18", 
  "y8x18", "y9x18", "y9x17", "y8x17", "y7x17", "y6x17", 
  "y9x19", "y10x18", "y10x19", "y10x20", "y11x20", "y11x19", 
  "y11x21", "y10x21", "y10x22", "y11x22", "y11x23", "y12x22", 
  "y12x23", "y13x23", "y14x23", "y15x23", "y15x24", "y14x24", 
  "y13x24", "y12x24", "y16x23", "y15x22", "y16x22", "y17x22", 
  "y17x21", "y17x20", "y17x19", "y16x19", "y16x20", "y16x21", 
  "y15x19", "y16x18", "y15x18", "y15x17", "y14x17", "y14x18"
  ], snake: ["y3x22", "y3x21", "y3x20", "y3x19"]})