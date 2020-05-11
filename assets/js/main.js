$(document).ready(function () {

    var newTodoInput = $('#new-todo-input');
    var newTodoButton = $('#new-todo-button');
    var todosList = $('.todos');
    var itemList = $('.todo');

    //API
    var apiUrl = 'http://157.230.17.132:3001/todos';

    //Handlebars
    var source = $("#todo-template").html();
    var template = Handlebars.compile(source);
    
    printAllTodos(apiUrl, template, todosList);

    // add item
    newTodoButton.click(function () {

        createTodo(apiUrl, newTodoInput, template, todosList);

    });

    newTodoInput.keyup(function(event){

        if(event.which == 13){
            createTodo(apiUrl, newTodoInput, template, todosList);
        };
    });

    // Remove item

    $(document).on('click', '.remove', function () {

        itemList.addClass('deleted');

        setTimeout(() => {

            deleteTodo( $(this), apiUrl, template, todosList);
        }, 4000);

        

    });

    itemList.click(function(){
        itemList.addClass('deleted');
    })
});

// FUNCTION

function printAllTodos(apiUrl, template, todosList) {

    // reset
    todosList.html('');

    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (data) {

            var todos = data;

            for (var i = 0; todos.length; i++) {
                var todo = todos[i];

                var context = {
                    todo: todo.text,
                    id: todo.id
                }

                var html = template(context);
                todosList.append(html).fadeIn('slow');;


            }
        },
        error: function () {
            console.log('Errore');

        }
    });
};

function createTodo(apiUrl, input, template, todosList) {

    var todoValue = input.val().trim();

    if (todoValue !== ''){

        $.ajax({
            url: apiUrl,
            method: 'POST',
            data: {
                text: todoValue,
            },
    
            success: function () {
    
                printAllTodos(apiUrl, template, todosList);
            },
    
            error: function () {
                console.log('Errore');
    
            }
        })
    } else {
        alert ('Non puoi inserire un campo vuoto!')
    }

    input.val('');
};

function deleteTodo(self, apiUrl, template, todosList) {

    var todoId = self.data('id');

    $.ajax({
        url: apiUrl + "/" + todoId,
        method: "DELETE",

        success: function () {

            printAllTodos(apiUrl, template, todosList);

        },
        error: function () {
            console.log('Errore nella cancellazione del Todo');

        }
    });
};