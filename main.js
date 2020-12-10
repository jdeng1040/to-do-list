var storage = localStorage.getItem("StorageKey");

if (storage !== null) {
  var data = JSON.parse(storage);
  loadData(data);
  var id = data.length;
}

else {
  id = 0;
  data = [];
}

function loadData(array) {
  array.forEach(function(todo) {
    newItem(todo.name, todo.trash, todo.id);
  });
}

document.body.onkeyup = function(e) {
  if (e.keyCode == 13) {
    var todo = document.getElementById("input").value;
    newItem(todo, false, id);
    data.push({
      name: todo,
      trash: false,
      id: id
    });
    localStorage.setItem("StorageKey", JSON.stringify(data));
  }
};

function newItem(todo, trash, id) {
  if (trash == true) {
    return;
  }
  var ul = document.getElementById("list");

  var li = document.createElement("li");

  li.appendChild(document.createTextNode(todo));

  li.setAttribute("id", id);

  ul.appendChild(li);

  todo = document.getElementById("input").value = "";

  li.onclick = removeItem;
}

function removeItem(event) {
  element = event.target;

  element.remove();

  data[element.id].trash = true;

  localStorage.setItem("StorageKey", JSON.stringify(data));
}