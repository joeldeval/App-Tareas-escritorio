
import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {NgFor, FormBuilder, Validators, ControlGroup, AbstractControl} from 'angular2/common';

import {Database} from './services/database';
import {Task} from './models/Task';

@Component({
 	selector: 'app',
   	templateUrl: './views/tareas.html',
	providers: [Database]
})

export class App {

  	app_name: string;
    taskForm: ControlGroup;
    title: AbstractControl;
    category: AbstractControl;
    isDone: AbstractControl;

    tasks: any;
    searchValue: string;
 
    constructor (public db: Database, builder: FormBuilder) {

        this.app_name = "Pendientes de Joel";
 
        this.taskForm = builder.group({
            title: ["", Validators.required],
            category: ["", Validators.required]
        });
 
        this.title = this.taskForm.controls["title"];
        this.category = this.taskForm.controls["category"];
        this.isDone = this.taskForm.controls["isDone"];
    }
 
    save (f: any) {
        
 
        let task = {
            title: f.value.title,
            category: f.value.category,
            isDone: f.value.isDone
        };

        this.addTask(task);
 
        for(let c in f.form.controls)
        {
            f.form.controls[c].updateValue('');
        }
    }

    searchEvent (value){
    	this.searchValue = value;
    	this.search();
    }
 
    search () {
    	if(this.searchValue == ''){
    		this.findTasks();
    	}else{
    		this.db.findValue(this.searchValue).then(
	            (tasks) => {
	                this.tasks = tasks;
	            },
	            (err) => {
	                console.log(err);
	            }
        	)	
    	}
        
    }
 
    ngOnInit () {
        this.findTasks();
    }
 
    findTasks () {
        this.db.findAll().then(
            (tasks) => {
                this.tasks = tasks;
            },
            (err) => {
                console.log(err);
            }
        )
    }
 
    addTask (task) {
        this.db.insert(task).then(
            (newTask) => {
                this.findTasks();
            },
            (err) => {
                console.log(err);
            }
        )
    }
 
    remove (id) {
        this.db.remove(id).then(
            (success) => {
                this.findTasks();
            },
            (err) => {
                console.log(err);
            }
        )
    }

    updateStatus(task){
        var _task = {
            _id:task._id,
            title: task.title,
            category: task.category,
            isDone: !task.isDone
        };

        this.db.updateStatus(_task).then(
            (success) => {
                this.findTasks();
            },
            (err) => {
                console.log(err);
            }
        )
    }

}

bootstrap(App);