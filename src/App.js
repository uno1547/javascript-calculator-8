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

  // 검증 로직
  isValidateInput(input) {

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
    // console.log(tokens);
    return tokens
  }
  // 커스텀 구분자 처리 로직

  // run
  async run() {
    const string = await this.getString()
    // console.log(string);
    // 검증

    let tokens
    if ("1") { // 기본구분자일경우 isValidateInput 결과 "1" 로 구분
      tokens = this.parseBasicDelimiter(string)
      console.log(tokens);
    } else if (this.isValidateInput(string)) { // 커스텀 구분자일경우 isValidateInput 결과 "2" 로 구분

    }
  }
}

export default App;
