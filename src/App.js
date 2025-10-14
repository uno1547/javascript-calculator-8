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
  isValid(string) {
    return true
  }

  // run
  async run() {
    const input = await this.getString()
    console.log(input);
  }
}

export default App;
