import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('validatePlayerName', () => {
  test('사용자 이름 입력 유효성 테스트 - 무효한 입력', () => {
    //given
    const inputs = ['longName'];

    // when
    const app = new App();

    // then
    expect(() => app.validatePlayerName(inputs)).toThrow('[ERROR]');
  });

  test('사용자 이름 입력 유효성 테스트 - 유효한 입력', () => {
    // given
    const inputs = ['jeong', 'yeung,jin', 'test'];

    // when
    const app = new App();
    app.validatePlayerName([inputs]);

    // then
    expect(app.players).toEqual([
      { name: 'jeong', moveAttempts: 0 },
      { name: 'yeung', moveAttempts: 0 },
      { name: 'jin', moveAttempts: 0 },
      { name: 'test', moveAttempts: 0 },
    ]);
  });
});
