const modal = document.getElementById("myModal") as HTMLElement
const btn = document.getElementById("myBtn") as HTMLElement
const spanClose = document.getElementsByClassName("close")[0] as HTMLElement
const userName = document.getElementById("username")as HTMLInputElement
const textArea = document.querySelector("textarea") as HTMLTextAreaElement
const ratingStars = document.querySelectorAll(".fa-star ")as  NodeListOf <HTMLElement>
const buttonSubmit = document.getElementById("addCommenct") as HTMLElement
const commentsContainer = document.querySelector(".comments-container")as HTMLElement
const ratingNumber = document.querySelector(".rating-number") as HTMLInputElement
const sortBtn = document.querySelector(".sort") as HTMLElement



interface UserCommentsInterface{
    name:string,
    rating:number,
    comment:string

}


let commentsArray:UserCommentsInterface[] =[]


// modal
btn.onclick =()=>{
    modal.style.display = "flex"
}


spanClose.onclick =()=>{
    modal.style.display ="none"
}

window.onclick = (e)=>{
    if(e.target == modal){
        modal.style.display = "none"
    }
}

function updateHtml(){

    const generateStars = (rating:number)=>{
        let template:string = ""

        for(let i = 0; i < rating ; i++){
            template += `<span class="fa fa-star checked"></span>`
        }

        for(let i = 0; i < 5 - rating ; i++){
            template += `<span class="fa fa-star"></span>`
        }



        return template
    }

    commentsContainer.innerHTML = ""
    commentsArray.map((x,i)=>{
        commentsContainer.innerHTML +=
        `
        <span id="${i}" class="delete-comment">&times;</span>
        <div class="comment" id="comment">
      
        <h3>${x.name}</h3>
        <div class="ratings">
            ${generateStars(Number(x.rating))}
          <h3>Rating:${x.rating}/5</h3>
        </div>
        <div class="comment-value">${x.comment} </div>
        
        ` 

    })
    
    const deleteCommentBtn = document.querySelectorAll(".delete-comment") as
    NodeListOf <HTMLElement>
    deleteCommentBtn.forEach(x=>{
        x.onclick =(e:any)=> deleteComments(e)
    })


}

function deleteComments(e:any){
    console.log(e.target.id)
    commentsArray = commentsArray.filter((x,y)=> y!== Number(e.target.id))
    updateHtml()
   
}


function showComments(){

    const userComments:UserCommentsInterface = {
        name:userName.value,
        rating: Number(ratingNumber.value),
        comment:textArea.value
    }
    commentsArray.push(userComments)
    updateHtml() 
}

 
buttonSubmit.onclick =():void=> showComments()


sortBtn.onclick =()=>{
    commentsArray= commentsArray.sort((a,b) => b.rating - a.rating)
    updateHtml() 
    
}
