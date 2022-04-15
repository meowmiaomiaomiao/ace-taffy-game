import { Orientation } from '@/geometry/orientation';
export const getContainerVertices = (topLeft: Phaser.Math.Vector2, bottomRight: Phaser.Math.Vector2) => {
  return [
    topLeft,
    new Phaser.Math.Vector2(topLeft.x, bottomRight.y),
    new Phaser.Math.Vector2(bottomRight.x, topLeft.y),
    bottomRight
  ]
}

export const setDirectionRotation = (obj: Phaser.GameObjects.Sprite, direction: Orientation) => {
  // obj.setRotation(angle);
  switch (direction) {
    case Orientation.Up:
      obj.setDepth(2);
      // this.body.setAngle()
      break;
    case Orientation.Down:
      // this.body.rotation = Math.PI
      obj.setRotation(Math.PI);
      break;
    case Orientation.Left:
      // this.body.rotation = -Math.PI / 2
      obj.setRotation(-Math.PI / 2);
      break;
    case Orientation.Right:
      // this.body.rotation = (Math.PI / 2)
      obj.setRotation(Math.PI / 2);
      break;
    default:
      break;
  }
}

export const getRandomFromRate2 = (array: number[]) => {
  const boxes: number[][] = []
  const allRate = array.reduce((prev, curr, idx) => {
    boxes[idx] = [prev, prev + curr]
    return prev + curr;
  }, 0)
  const random = Math.random() * allRate
  const result: number[] = []
  boxes.forEach((range, i)=>{
    if (random > range[0] && random <= range[1]) {
      result[i] = random
    } else {
      result[i] = 0
    }
  })
  return result
}


export const getRandomFromRate = <T extends Record<string, number>>(obj: T) => {
  let allRate = 0
  const boxes: Partial<Record<keyof T , number[]>> = {};
  for (const key in obj) {
    boxes[key] = [allRate, allRate + obj[key]]
    allRate += obj[key] 
  }
  const random = Math.random() * allRate
  const result: Partial<Record<keyof T , number>> = {} = {}
  for (const key in boxes) {
    const range = boxes[key]
    if (random > range[0] && random <= range[1]) {
      result[key] = random
    } else {
      result[key] = 0
    }
  }
  return result;
}

export const shuffle = <T extends any[]>(arr: T) => {
  let i = arr.length;
  while (i) {
      const j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr
}

export const mapZoneSizeReset = (obj: {x: number; y: number; width: number; height: number}, scale = 1) => {
  const { x, y, width, height} = obj
  return {
    x: x * scale + width * scale / 2,
    y: y * scale + height * scale / 2,
    width: width * scale,
    height: height * scale,
  }
}

export const getRandomElement = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)]
}






