class Snake {
// 设置蛇头的元素
  head: HTMLElement;
  // 蛇的身体 包括蛇头
  bodies: HTMLCollection;
// 蛇的容器
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake>div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 获取蛇的坐标

  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  set X(value: number) {
    if (this.X === value) return;

    // X的合法值为0-290

    if (value < 0 || value >290) {
      // 说明蛇撞墙了
      throw new Error('蛇撞墙了')
    }
    // 判断水平方向是否掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
       }

    }
     this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  
  }
  set Y(value: number) {
    if (this.Y === value) return

    // Y的合法值为0-290

    if (value < 0 || value > 290) {
      // 说明蛇撞墙了
      throw new Error('蛇撞墙了')
    }
    // 判断垂直方向是否掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }

    }
    this.moveBody()

    this.head.style.top = value + 'px'
  this.checkHeadBody()
  }

  // 蛇增加身体的方法
  addBody() {
    // 向element中添加一个div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  // 蛇身体移动的方法
  moveBody() {
    // 将后边的身体位置设置为前面一个身体位置
    for (let i = this.bodies.length - 1; i >0; i--){
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';

      
    }
  }
  // 用来检查蛇头是否撞到身体的方法
  checkHeadBody() {
    // 获取所有的身体,检查其是否和蛇头坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++){
      let bd = this.bodies[i] as HTMLElement
      if (bd.offsetLeft === this.X && bd.offsetTop ===this.Y) {
        
        // 进入判断说明蛇头撞到了身体,游戏结束 
        throw new Error('撞到自己了')
      }
    }
  }
}

export default Snake