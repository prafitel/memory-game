const MAX_LENGTH = 10;

class LocalStorage {
  setLeaderBoard(attempts) {
    const date = new Date();
    const leaderBoardInfo = this.getSortedLeaderBoard([
      ...this.getLeaderBoard(),
      { date, attempts },
    ]);

    const newLeaderBoard =
      leaderBoardInfo.length > MAX_LENGTH
        ? leaderBoardInfo.slice(0, MAX_LENGTH)
        : leaderBoardInfo;

    localStorage.setItem('leaderBoard', JSON.stringify(newLeaderBoard));
  }

  getLeaderBoard() {
    return JSON.parse(localStorage.getItem('leaderBoard')) ?? [];
  }

  getSortedLeaderBoard(leaderBoardInfo) {
    if (leaderBoardInfo.length > 1) {
      leaderBoardInfo.sort((a, b) => {
        if (b.attempts !== a.attempts) {
          return a.attempts - b.attempts;
        }

        const dateA = Date.parse(a.date.split('.').reverse().join('-'));
        const dateB = Date.parse(b.date.split('.').reverse().join('-'));

        return +dateA - +dateB;
      });
    }

    return leaderBoardInfo;
  }
}

export default new LocalStorage();
