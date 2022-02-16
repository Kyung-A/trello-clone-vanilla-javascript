// Board 생성자 함수 (이 함수를 new 연산자를 사용하여 호출할 경우 새로운 object가 된다)
// 객체를 만들지 않고 생성자 함수와 new 연산자를 쓰는 이유는 일일이 만들 필요 없이 간단하게 사용할 수 있어서
(function () {
  function Board(title) {
    let nextId = 0;

    this.title - title;
    this.lists = [];
    this.cards = [];

    this.boardNode = document.createElement("div");
    this.boardTitleNode = document.getElementById("board-title");

    this.boardNode.className = "board-wrapper";
    this.formNode = createAddListForm();
    this.boardTitleNode.appendChild(document.createTextNode(this.title));

    this.getNextId = function () {
      return `_${(nextId++).toString()}`;
    };
  }

  Board.prototype.render = function () {};

  window.addEventListener("load", function () {
    let title = "New Board";
    let board = new Board(title);

    document.getElementById("main").appendChild(board.boardNode);

    console.log(board);
  });
})();

// List 생성자 함수
function List(board, title, index, dummyList) {}

// List 추가 Form 생성
function createAddListForm() {
  const section = document.createElement("section");
  section.className = "board";

  section.innerHTML = `
      <button class="add-list-button" type="button">Add a list...</button>
  
      <form class="add-list-form hidden" action="post">
          <input type="text" name="add-list-input" class="add-list-input" placeholder="Add a list..." />
          <div class="horizontal-align">
              <button type="submit" class="add-list-submit default-button">Save</button>
              <button type="button" class="cancel-button list">
                  <i class="fas fa-times"></i>
              </button>
          </div>
      </form>
    `;

  return section;
}
