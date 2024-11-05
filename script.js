function getAllData(){
    var ul = document.getElementById('todo-lists');
    ul.innerHTML = '';

    var url = 'https://api.freeapi.app/api/v1/todos?query=&complete=false';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
    xhr.send();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            var response = JSON.parse(xhr.responseText)
            response.data.map(dat => {
                var li = document.createElement('li'); 
                li.innerHTML = '<strong>' + dat.title + '</strong> - ' + dat.description + ' - ' + (dat.id || dat._id); 
                ul.appendChild(li);
            });
        }
    }
}

function submitTodo(){
    var inputTitle = document.getElementById('title');
    var inputDescription = document.getElementById('description');

    const url = 'https://api.freeapi.app/api/v1/todos/';
    const method = 'POST';

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    var data = {
        description: inputDescription.value,
        title: inputTitle.value,
    };
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));
    
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            var response = xhr.responseText;
            console.log(response);
        }
    }

    inputTitle.value = '';
    inputDescription.value = '';
}

function getTodoById() {
    var todoId = document.getElementById('todo-id').value;
    var url = 'https://api.freeapi.app/api/v1/todos/' + todoId; 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4) { 
            var response = JSON.parse(xhr.responseText);
            if (response.data) {
                document.getElementById('todo-title').innerText = "Title: " + response.data.title;
                document.getElementById('todo-description').innerText = "Description: " + response.data.description;
                
                document.getElementById('todo-detail').style.display = 'block';
                
                document.getElementById('edit-todo').setAttribute('data-id', response.data.id || response.data._id);
                document.getElementById('delete-todo').setAttribute('data-id', response.data.id || response.data._id);
            } else {
                alert("Todo with ID " + todoId + "not found");
            }
        }
    }
}

function editTodo() {
    var todoId = document.getElementById('edit-todo').getAttribute('data-id');
    var inputTitle = document.getElementById('title');
    var inputDescription = document.getElementById('description');

    inputTitle.value = document.getElementById('todo-title').innerText.replace("Title: ", "");
    inputDescription.value = document.getElementById('todo-description').innerText.replace("Description: ", "");
    
    const url = 'https://api.freeapi.app/api/v1/todos/' + todoId; 
    const method = 'PUT'; 

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true); 
    var data = {
        description: inputDescription.value,
        title: inputTitle.value,
    };
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));
    
    xhr.onreadystatechange = function() {
        if(this.readyState == 4) { 
            var response = JSON.parse(xhr.responseText);
            alert("Todo berhasil diedit");
            getAllData();
        }
    }

    var textList = document.createElement('li');
    var taskText = document.createElement('p');
    taskText.textContent = taskInput.value;
    textList.appendChild(taskText);
    
    var editButton = document.createElement('button');
    var button = document.createTextNode('edit');
    editButton.appendChild(button);
    editButton.onclick = function(){
        var newTask = prompt('edit teks:', taskText.textContent);
        if(newTask){
            taskText.textContent = newTask; 
        }
     };
     
     textList.appendChild(editButton);
}

function deleteTodo() {
    var todoId = document.getElementById('delete-todo').getAttribute('data-id');
    const url = 'https://api.freeapi.app/api/v1/todos/' + todoId; 
    const method = 'DELETE'; 

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true); 
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if(this.readyState == 4) { 
            var response = JSON.parse(xhr.responseText);
            alert("Todo berhasil dihapus");
            getAllData(); 
        }
    }

}