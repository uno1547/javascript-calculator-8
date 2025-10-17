import { Console } from '@woowacourse/mission-utils';
// Console의 readLineAsync, print를 사용해야함
class App {
  // 문자열 입력 받기
  async getString() {
    try {
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n")
      return input
    } catch (e) {
      Console.print(e.message)
      return getString()
    }
  }

  // 타입 검증
  getStringType(str) {
    const trimmed = str.trim();
    const customDelimiterPattern = /^\/\/(.)\\n(\d+(\1\d+)*)?$/
    if (customDelimiterPattern.test(trimmed)) {
      // console.log('커스텀구분자');
      return "2" // 커스텀 구분자일경우 "2" 반환
    }
    const basicDelimiterPattern = /^(\d+([,:]\d+)*)?$/
    if (basicDelimiterPattern.test(trimmed)) {
      // console.log('기본구분자');
      return "1" // 기본 구분자일경우 "1" 반환
    }
    throw new Error("[ERROR]입력값이 올바르지 않습니다.")
  }

  // 기본 구분자 처리 로직
  parseBasicDelimiter(string) {
    const tokens = []
    if(string === '') return tokens

    let tmp = ''
    for (let i = 0; i < string.length; i++) {
      const char = string[i]
      if (char === ',' || char === ':') {
        tokens.push(Number(tmp))
        tmp = ''
        continue
      }
      tmp += char
    }
    tokens.push(Number(tmp))
    return tokens
  }
  // 커스텀 구분자 처리 로직
  parseCustomDelimiter(string) {
    const tokens = []
    const delimiter = string.slice(2, 3)
    // console.log(delimiter);
    let tmp = ''
    for (let i = 5; i < string.length; i++) {
      const char = string[i]
      if (char === delimiter) {
        tokens.push(Number(tmp))
        tmp = ''
        continue
      }
      tmp += char
    }
    tokens.push(Number(tmp))
    return tokens
  }
  // run
  async run() {
    const string = await this.getString()
    // 타입 검증
    const getStringType = this.getStringType(string)
    let tokens
    if (getStringType === "1") { // 기본구분자일경우 getStringType 결과 "1" 로 구분
      tokens = this.parseBasicDelimiter(string)
    } else if (getStringType === "2") { // 커스텀 구분자일경우 getStringType 결과 "2" 로 구분
      tokens = this.parseCustomDelimiter(string)
    }
    const sum = tokens.reduce((acc, val) => acc + val, 0)
    Console.print(`결과 : ${sum}`);
  }
}

export default App;
