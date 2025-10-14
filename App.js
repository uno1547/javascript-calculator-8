import { Console } from "@woowacourse/mission-utils"
// Console의 readLineAsync, print를 사용해야함
async function run() {
  async function getString() {
    try {
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n")
      return input
    } catch (e) {
      Console.print(e.message)
      return getString()
    }
  }
  const input = await getString()
  Console.print(`입력하신 내용은 ${input}입니다.`)
}
run()