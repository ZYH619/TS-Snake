// 游戏控制器,控制其它所有类
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Food from "./Food";

class GameControl {
  // 定义三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  // 创建一个属性来存储蛇的移动方向(也就是按键的方向)
  direction: string = '';
  // 创建一个属性用来记录游戏是否结束
  isLive: boolean=true;
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10,2);
    this.init();
  }

  // 游戏的初始化方法,调用后游戏即开始
  init() {
    // 绑定键盘按下的事件
    document.addEventListener('keydown', this.keydownHandler);
    this.run();
  }

  // 设置键盘按下的响应函数
  keydownHandler = (event: KeyboardEvent) => {
    // 检查用户是否按下了正确的按键 
    this.direction = event.key;
  }

  // 创建控制蛇移动的方法
  run = () => {
    // 根据方向(this.direction)来改变蛇的位置

    // 获取蛇现在的坐标
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;

    }
    // 检查蛇是否吃到了食物
    this.checkEat(X,Y)
    // 修改蛇的X和Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 进入到catch,说明出现异常,游戏结束,弹出提示信息
      alert(e.message+'游戏结束');
      //将isLive改为false
      this.isLive = false
    }
    // 开启一个定时调用
    this.isLive&&setTimeout(this.run, 300 - (this.scorePanel.level - 1) * 30);
  }
  // 定义一个方法,用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物的位置进行重置
      this.food.change()
      // 分数增加
      this.scorePanel.addScore()
      // 蛇增加一节
      this.snake.addBody()
    }
  }
}

export default GameControl