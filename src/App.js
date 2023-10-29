import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  constructor() {
    this.players = [];
  }

  async getPlayerName() {
    const PLAYER_NAME = await MissionUtils.Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)',
    );
    const PLAYER_NAME_SPLIT = PLAYER_NAME.split(',').map((name) => name.trim());

    if (
      PLAYER_NAME_SPLIT.some((name) => name.length > 5 || name.length === 0)
    ) {
      throw new Error('[ERROR] 이름은 1자 이상 5자 이하만 가능합니다.');
    }

    PLAYER_NAME_SPLIT.forEach((name) => {
      this.players.push({ name, moveAttempts: 0 });
    });
  }

  async getPlayerInputRacingRounds() {
    const ROUNDS =
      await MissionUtils.Console.readLineAsync('시도할 횟수는 몇 회인가요?');
    const ROUNDSNUMBER = parseInt(ROUNDS, 10);

    if (isNaN(ROUNDSNUMBER)) {
      throw new Error('[ERROR] 숫자가 잘못된 형식입니다.');
    }

    this.ROUNDS = ROUNDSNUMBER;
  }

  findWinner() {
    const MAX_MOVEATTEMPTS = Math.max(
      ...this.players.map((player) => player.moveAttempts),
    );
    const WINNERS = this.players.filter(
      (player) => player.moveAttempts === MAX_MOVEATTEMPTS,
    );
    let raceResult = WINNERS.map((player) => player.name).join(', ');
    return `최종 우승자 : ${raceResult}`;
  }

  playerMoveCount(player) {
    if (MissionUtils.Random.pickNumberInRange(0, 9) >= 4) {
      player.moveAttempts++;
    }
  }

  playerStatus(player) {
    return `${player.name} : ${'-'.repeat(player.moveAttempts)}`;
  }

  async play() {
    await this.getPlayerName();
    await this.getPlayerInputRacingRounds();

    MissionUtils.Console.print('\n실행결과');
    for (let i = 0; i < this.ROUNDS; i++) {
      this.players.forEach((player) => this.playerMoveCount(player));
      this.players.forEach((player) =>
        MissionUtils.Console.print(this.playerStatus(player)),
      );
      MissionUtils.Console.print(''); // 실행 결과 표시에서 필요한 결과 사이 공백
    }

    MissionUtils.Console.print(this.findWinner());
  }
}

export default App;
