function taskList(){
    //property
    this.arr = [];

    //method
    this.addTask = function(task){
        this.arr.push(task);
    }

    this.findIndex = function(name){
        var index = -1;

        this.arr.forEach(function(task,i){
            if(task.taskName === name){
                index = i;
            }
        })

        return index;
    }

    this.deleteTask = function(name){
        var index = this.findIndex(name);

        if(index !== -1){
            this.arr.splice(index, 1);
        }
    }

    this.getTaskByName = function(name){
        var index = this.findIndex(name);

        if(index !== -1){
            return this.arr[index];
        }

        return null;
    }

    this.updateTask = function(task){
        var index = this.findIndex(task.taskName);

        if(index !== -1){
            this.arr[index] = task;
        }
    }
}