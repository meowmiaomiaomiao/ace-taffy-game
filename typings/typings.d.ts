declare module '*.json' {
  const value: any;
  export default value;
}

declare global {
  interface Window {
    USER_ID: string;
    Tweens:  Phaser.Tweens.TweenManager;
  }
}

interface Window {
  USER_ID: string;
  Tweens:  Phaser.Tweens.TweenManager;
}



