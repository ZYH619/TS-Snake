class Food{

  // 定义一个属性表示食物对应的元素
  element: HTMLElement;

  constructor() {
    // 获取页面中的food元素并将其赋值给element
    this.element = document.getElementById('food')!;


  }

    // 获取食物x轴坐标的方法
  get X() {
    return this.element.offsetLeft;

  }
  // 获取食物y轴的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物位置的方法
  change() {
    // 生成随机的位置
    // 食物的位置最小是0 最大290 蛇移动一次就是一格 一格的大小就是10 所以要求食物的坐标必须是整10

    let top = Math.round((Math.random() * 28)) * 10;
    let left = Math.round((Math.random() * 28)) * 10;

    this.element.style.left = left + 'px'
    this.element.style.top = top+'px'
    
  }
}

export default Food