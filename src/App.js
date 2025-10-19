import { Console } from '@woowacourse/mission-utils';
// Console의 readLineAsync, print를 사용해야함
class Calculator {
  constructor() {
    this.string = ''
    this.result = 0
  }
  async init() {
    this.string = await this.getString()
    // 타입 검증
    const stringType = this.getStringType(this.string)
    let tokens
    if (stringType === "1") { // 기본구분자일경우 getStringType 결과 "1" 로 구분
      tokens = this.parseBasicDelimiter(this.string)
    } else if (stringType === "2") { // 커스텀 구분자일경우 getStringType 결과 "2" 로 구분
      tokens = this.parseCustomDelimiter(this.string)
    }
    this.result = tokens.reduce((acc, val) => acc + val, 0)
    Console.print(`결과 : ${this.result}`);    
  }
  // 문자열 입력 받기
  async getString() {
    try {
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n")
      return input
    } catch (e) {
      Console.print(e.message)
      return this.getString()
    }
  }
  // 타입 검증
  getStringType(str) {
    const trimmed = str.trim();
    const customDelimiterPattern = /^\/\/(.)\\n(\d+(\1\d+)*)?$/
    if (customDelimiterPattern.test(trimmed)) {
      return "2" // 커스텀 구분자일경우 "2" 반환
    }
    const basicDelimiterPattern = /^(\d+([,:]\d+)*)?$/
    if (basicDelimiterPattern.test(trimmed)) {
      return "1" // 기본 구분자일경우 "1" 반환
    }
    throw new Error("[ERROR]입력값이 올바르지 않습니다.")
  }

  // 기본 구분자 처리 로직
  parseBasicDelimiter(string) {
    return string.split(/[,:]/).map(Number)
  }
  // 커스텀 구분자 처리 로직
  parseCustomDelimiter(string) {
    const customDelimiterPattern = /^\/\/(.)\\n(\d+(\1\d+)*)?$/
    const match = string.match(customDelimiterPattern) 
    const delimiter = match[1] // 커스텀 구분자
    const numbersPart = match[2] || '' // '' or 1 or 1;2;3
    return numbersPart.split(delimiter).map(Number)
  }
}
class App {
  // run
  async run() {
    const calculator = new Calculator()
    await calculator.init()
  }
}

export default App;
