declare var require: any;
let Datastore = require('nedb');

export class Database{
	public db;

	constructor(){
		this.db = new Datastore({filename: 'db.json', autoload: true});
	}

	
	insert(task) {
        return new Promise((resolve, reject) => {
            return this.db.insert(task, ((err, newTask) => {
                if ( err ) 
                {
                    reject(err);
                }
                else 
                {
                    resolve(newTask);
                }
            }))
        }); 
    }
 
    findAll() {
        return new Promise((resolve, reject) => {
            return this.db.find({}, ((err, tasks) => {
                if ( err ) 
                {
                    reject(err);
                }
                else 
                {
                    resolve(tasks);
                }
            }));
        })
    }
 
    findValue(value) {
        return new Promise((resolve, reject) => {
            return this.db.find({ $or: [{title: value}, {category: value}]}, ((err, tasks) => {
                if ( err ) 
                {
                    reject(err);
                }
                else 
                {
                	console.log(tasks);
                    resolve(tasks);
                }
            }));
        })
    }
 
    remove(id) {
        return new Promise((resolve, reject) => {
            return this.db.remove({ _id: id }, {}, ((err, numRemoved) => {
                if ( err ) 
                {
                    reject(err);
                }
                else 
                {
                    resolve(numRemoved);
                }
            })); 
        })
    }

    updateStatus(task){

    	return new Promise((resolve, reject) => {
            return this.db.update({_id: task._id}, task, ((err, updateTask) => {
                if ( err ) 
                {
                    reject(err);
                }
                else 
                {
                    resolve(updateTask);
                }
            }))
        }); 

    }


}