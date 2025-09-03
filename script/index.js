const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then( res => res.json())
    .then( json => displayLesson(json.data))
}

const displayLesson = (lessons) => {
    // console.log(lessons)
    const lessonsContainer = document.getElementById('lesson-container')
    lessonsContainer.innerText = ''

    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        
            <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open-reader"></i>Lesson - ${lesson.level_no}</button>
        
        `

        lessonsContainer.appendChild(btnDiv)
    });
}
loadLesson();