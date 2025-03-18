class MyPromise {
  // 생성자
  constructor(promiseCallback) {
    this.promiseCallback = promiseCallback;
    promiseCallback(this.resolve.bind(this), this.reject);
    this.thenCallback = [];
  }

  // resolve의 매개변수를 then의 콜백 함수의 매개뱐수로 전달
  resolve(message) {
    this.thenCallback[0](message);
  }

  reject() {}

  // 전달받은 콜백을 등록한다.
  then(fn) {
    this.thenCallback.push(fn);
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

myPromise.then((successMessage) => {
  console.log(successMessage);
});

//

// 스스로 다시 구현해보기
class MyPromise2 {
  // 생성자: resolve와 reject 함수를 매개변수로 받는 함수 실행
  constructor(fn) {
    fn(this.resolve.bind(this), this.reject.bind(this));
    this.thenCallback = [];
    this.i = 0;
  }

  // resolve 함수 -> then 콜백 함수 실행, 매개변수를 then의 콜백 매개변수로 전달
  resolve(message) {
    this.thenCallback[this.i](message);
    this.i++;
  }

  // reject 함수 -> then 콜백 함수 실행, 매개변수를 then의 콜백 매개변수로 전달
  reject() {}

  // then 콜백 함수 등록
  then(cb) {
    this.thenCallback.push(cb);
  }
}

let myFirstPromise = new MyPromise2((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

myFirstPromise.then((successMessage) => {
  console.log("Yay! " + successMessage);
});
