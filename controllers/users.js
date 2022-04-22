import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

let users =[]

export const getUsers = (req, res) =>{
    fs.readFile('./users.json', 'utf-8', (err,jsonString)=>{
        if (err) {
            console.log(err)
        }else {
        try{
            console.log(jsonString)
            const data = JSON.parse(jsonString)
            console.log(data.publication);
        }catch(err) {
            console.log('Error parsing JSON',err)
        }
    }
        res.send(jsonString)
});  

}

export const createUser = (req,res)=>{
    const userBook = req.body;
    const data = JSON.parse(jsonString)
    fs.readFile('./users.json', 'utf-8', (err,jsonString)=>{
    if (err) {
    console.log(err)
    }else{
        console.log(jsonString)
        const data = JSON.parse(jsonString)
        console.log(data);
        data.push( {...userBook,id:uuidv4()});  
        fs.writeFile('./users.json', JSON.stringify(data, null, 2),err=> {
        if(err)
        console.log(err)
    })
    res.send(`user with the name ${userBook.bookName}added to the Database`)
}
})
}

export const deleteUser =(req,res)=>{ 
const { id }= req.params;
fs.readFile('./users.json','utf-8',(err,jsonString)=>{
        const data = JSON.parse(jsonString)
        let usersData = data.filter((user)=>user.id!==id);   
        console.log(usersData)
        fs.writeFile('./users.json',JSON.stringify(usersData,null,2),err=>{
        if(err) {
        console.log(err)
        }
    })
})
res.send(`user with id${id} is deleted from Database`)
}

export const updateUser = (req, res) =>{
    const { id } = req.params;
    const user = users.find((user)=>user.id === id);
    const{bookName, authorName, publication} = req.body;
    
    if(bookName)user.bookName = bookName;
    if(authorName)user.authorName = authorName;
    if(publication)user.publication = publication;
    
    res.send(`user with id ${id} has been updated`)
}