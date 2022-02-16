const boardWrapper = document.querySelector(".board-wrapper");

let lists = [];

// 다음 board에서 add button, List Form 엘리먼트 그리기
function nextCreateAddListForm() {
  const section = document.createElement("section");
  const addListButton = document.createElement("button");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const div = document.createElement("div");
  const saveButton = document.createElement("button");
  const cancelButton = document.createElement("button");
  const icon = document.createElement("i");

  section.className = "board";
  addListButton.className = "add-list-button hidden";
  form.className = "add-list-form";
  input.className = "add-list-input";
  div.className = "horizontal-align";
  saveButton.className = "add-list-submit default-button";
  cancelButton.className = "cancel-button list";
  icon.className = "fas fa-times";

  form.setAttribute("action", "post");
  addListButton.setAttribute("type", "button");
  saveButton.setAttribute("type", "submit");
  cancelButton.setAttribute("type", "button");

  addListButton.innerText = "Add a list...";
  saveButton.innerText = "Save";
  input.placeholder = "Add a list...";

  boardWrapper.appendChild(section);
  section.appendChild(addListButton);
  section.appendChild(form);
  form.appendChild(input);
  form.appendChild(div);
  div.appendChild(saveButton);
  div.appendChild(cancelButton);
  cancelButton.appendChild(icon);
  input.focus();
}

// List 엘리먼트 그리기
function paintList(title, event) {
  const currentBoard = event.closest(".board");

  const listUl = document.createElement("ul");
  const cardUl = document.createElement("ul");
  const li = document.createElement("li");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const ellipsisButton = document.createElement("button");
  const addCardButton = document.createElement("button");
  const icon = document.createElement("i");

  const newId = lists.length + 1;

  listUl.className = "board-list";
  cardUl.className = "card-list";
  div.className = "board horizontal-align";
  p.className = "board-title";
  ellipsisButton.className = "ellipsis-button";
  addCardButton.className = "add-card-button";
  icon.className = "fas fa-ellipsis-h";

  cardUl.setAttribute("ondragover", "onDragOver(event);");
  cardUl.setAttribute("ondrop", "onDrop(event);");
  p.innerText = title;
  addCardButton.innerText = "Add a card...";

  currentBoard.appendChild(listUl);
  listUl.appendChild(li);
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(ellipsisButton);
  ellipsisButton.appendChild(icon);
  li.appendChild(cardUl);
  li.appendChild(addCardButton);

  li.id = newId;

  const ListObject = {
    id: newId,
    title: title,
    card: [],
  };

  lists.push(ListObject);
  nextCreateAddListForm();

  addCardButton.addEventListener("click", function () {
    if (ListObject.id === newId) {
      addCardButton.classList.add("hidden");
      paintAddCardForm(ListObject.id);
    }
  });
}

// List input 값 보내기
function handleSubmitAddList(event) {
  event.preventDefault();
  const target = event.target;

  const currentForm = target.closest(".add-list-form");
  const addInput = currentForm.querySelector(".add-list-input");

  const currentValue = addInput.value;
  paintList(currentValue, target);

  addInput.value = "";
  currentForm.style.display = "none";
}

// add card form 그리기
function paintAddCardForm(listId) {
  const currentBoardList = document.getElementById(listId);

  const form = document.createElement("form");
  const textarea = document.createElement("textarea");
  const div = document.createElement("div");
  const addButton = document.createElement("button");
  const cancelButton = document.createElement("button");
  const ellipsisButton = document.createElement("button");
  const cancelIcon = document.createElement("i");
  const ellipsisIcon = document.createElement("i");

  form.className = "add-card-form";
  textarea.className = "card-description";
  div.className = "horizontal-align";
  addButton.className = "add-card-submit default-button";
  cancelButton.className = "cancel-button card";
  ellipsisButton.className = "ellipsis-button";
  cancelIcon.className = "fas fa-times";
  ellipsisIcon.className = "fas fa-ellipsis-h";

  form.setAttribute("action", "post");
  addButton.setAttribute("type", "submit");
  cancelButton.setAttribute("type", "button");
  ellipsisButton.setAttribute("type", "button");

  addButton.innerText = "Add";

  currentBoardList.appendChild(form);
  form.appendChild(textarea);
  form.appendChild(div);
  div.appendChild(addButton);
  div.appendChild(cancelButton);
  div.appendChild(ellipsisButton);
  cancelButton.appendChild(cancelIcon);
  ellipsisButton.appendChild(ellipsisIcon);

  form.addEventListener("keydown", function (event) {
    let key = event.key || event.keyCode;

    if ((key === "Enter" && !event.shiftKey) || (key === 13 && key !== 16)) {
      event.preventDefault();
      addButton.click();
    }
  });

  addButton.addEventListener("click", function (event) {
    handleSubmitAddCard(listId, event);
  });
}

// card textarea 값 보내기
function handleSubmitAddCard(listId, event) {
  event.preventDefault();
  const target = event.target;

  const currentForm = target.closest(".add-card-form");
  const addTextarea = currentForm.querySelector(".card-description");

  const currentValue = addTextarea.value;
  paintCard(currentValue, listId);

  addTextarea.value = "";
}

// card 엘리먼트 그리기
function paintCard(text, listId) {
  const currentBoardList = document.getElementById(listId);
  const currentCardList = currentBoardList.querySelector(".card-list");

  const li = document.createElement("li");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const editButton = document.createElement("button");
  const icon = document.createElement("i");

  const randomNumber = Math.floor(Math.random() * 101);
  const newId = `card${listId}-${randomNumber}`;

  div.className = "card horizontal-align";
  p.className = "card-title";
  editButton.className = "edit-button";
  icon.className = "fas fa-pencil-alt";

  li.setAttribute("draggable", "true");
  li.setAttribute("ondragstart", "onDragStart(event);");
  editButton.setAttribute("type", "button");
  p.innerText = text;

  currentCardList.appendChild(li);
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(editButton);
  editButton.appendChild(icon);

  li.id = `card${listId}-${randomNumber}`;

  const cardObject = {
    id: newId,
    text: text,
  };

  lists.filter((list) => {
    if (list.id === listId) {
      return (list.card = list.card.concat(cardObject));
    }
  });
}

// 드래그가 시작되었을때
function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

// 드래그 요소가 해당 영역에 왔을때
function onDragOver(event) {
  event.preventDefault();
}

// 해당 영역에 드롭했을때
function onDrop(event) {
  event.preventDefault();

  const listId = event.currentTarget.closest(".board-list li").id;
  const id = event.dataTransfer.getData("text");

  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  const dropzoneParent = dropzone.closest(".card-list li");

  if (dropzoneParent === null) {
    dropzone.appendChild(draggableElement);
  } else {
    // 해당 영역 node 뒤에 추가
    insertAfter(draggableElement, dropzoneParent);
  }

  event.dataTransfer.clearData();

  deleteCardFromArray(draggableElement, listId);
  addCardToArray(draggableElement, listId, event.currentTarget);
}

// 배열에 카드 삭제
function deleteCardFromArray(card, listId) {
  // card가 다른 list로 옮겼을때 (리스트 2개)
  let transferredCard1;
  const ByTwoParentLists = lists.find((list) => list.id != (listId *= 1));

  if (ByTwoParentLists != undefined) {
    transferredCard1 = ByTwoParentLists.card.find((item) => item.id == card.id);
  }

  if (transferredCard1 != undefined) {
    lists.forEach(function (list) {
      list.card = list.card.filter((card) => card.id != transferredCard1.id);
    });
  }

  // 기존 list 안에서 card를 옮겼을때
  let transferredCard2;
  const currentParentList = lists.find((list) => list.id == (listId *= 1));

  if (currentParentList != undefined) {
    transferredCard2 = currentParentList.card.find(
      (item) => item.id == card.id
    );
  }

  if (transferredCard2 != undefined) {
    lists.forEach(function (list) {
      list.card = list.card.filter((card) => card.id != transferredCard2.id);
    });
  }

  // card가 다른 list로 옮겼을때 (리스트가 2개 이상)
  let transferredCard3;
  const ByManyParentLists = lists.filter((list) => list.id != (listId *= 1));

  if (ByManyParentLists != undefined) {
    ByManyParentLists.forEach(function (list) {
      transferredCard3 = list.card.find((item) => item.id == card.id);
    });
  }

  if (transferredCard3 != undefined) {
    lists.forEach(function (list) {
      list.card = list.card.filter((card) => card.id != transferredCard3.id);
    });
  }
}

// 배열에 카드 추가
function addCardToArray(card, listId, currentCardList) {
  const cardObject = {
    id: card.id,
    text: card.innerText,
  };

  const li = currentCardList.children;

  // 추가된 카드 id와 html 콜렉션 id와 일치하는 node의 index 위치에 card 추가
  [...li].forEach((item, index) => {
    if (item.id == card.id) {
      lists.filter((list) => {
        if (list.id == (listId *= 1)) {
          return list.card.splice(index, 0, cardObject);
        }
      });
    }
  });

  console.log(lists);
}

// 기준 엘리먼트 뒤에 추가
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

window.addEventListener("load", function () {
  document.addEventListener("click", function (event) {
    if (event.target.className === "add-list-submit default-button") {
      handleSubmitAddList(event);
    }

    if (event.target.className === "add-list-button") {
      const targetParentNode = event.target.parentNode;
      const addListForm = targetParentNode.querySelector(".add-list-form");
      const addListInput = targetParentNode.querySelector(".add-list-input");

      event.target.classList.toggle("hidden");
      addListForm.classList.toggle("hidden");
      addListInput.focus();
    }

    if (event.target.parentNode.className === "cancel-button list") {
      const currentBoard = event.target.closest(".board");
      const addListButton = currentBoard.querySelector(".add-list-button");
      const addListForm = currentBoard.querySelector(".add-list-form");

      addListButton.classList.toggle("hidden");
      addListForm.classList.toggle("hidden");
    }

    if (event.target.parentNode.className === "cancel-button card") {
      const currentBoardList = event.target.closest(".board-list");
      const addCardButton = currentBoardList.querySelector(".add-card-button");
      const addCardForm = currentBoardList.querySelector(".add-card-form");

      addCardButton.classList.toggle("hidden");
      addCardForm.remove();
    }
  });
});
