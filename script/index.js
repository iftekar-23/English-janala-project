const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)
}

const displayWordDetails = (word) => {
    console.log(word)
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
                <div>
                    <h1 class="font-bold text-xl">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
                </div>
                <div>
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
                    <button class="btn">sync 1</button>
                    <button class="btn">sync 1</button>
                    <button class="btn">sync 1</button>
                </div>
    `
    document.getElementById('my_modal_5').showModal();
}

const removeActive = () => {
    const btns = document.querySelectorAll('.lesson-btn');
    btns.forEach(btn => btn.classList.remove('active'))
}

const loadLevelWord = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        })
}

const displayLevelWord = (elements) => {
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ''

    if (elements.length == 0) {
        // alert('ss')
        wordContainer.innerHTML = `
        
        <div class="text-center col-span-full space-y-5 p-8">
            <img class = "mx-auto" src="./assets/alert-error.png">
            <h3 class="text-sm text-gray-400 font-semibold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
            <h2 class="text-2xl font-bold ">নেক্সট Lesson এ যান</h2>
        </div>
        `
        return;
    }

    elements.forEach(word => {
        // console.log(word)
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML = `
        <div class="bg-white py-10 px-5 shadow-sm text-center rounded-xl space-y-3 ">
            <h1 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায় নি "}</h1>
            <p class="font-semibold ">Meaning /Pronounciation</p>
            <p class="font-bold text-xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি "} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি "}"</p>

            <div class=" flex justify-between items-center  ">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-low"></i></button>
            </div>
        </div>
        `
        wordContainer.appendChild(wordDiv)
    });
}

const displayLesson = (lessons) => {
    // console.log(lessons)
    const lessonsContainer = document.getElementById('lesson-container')
    lessonsContainer.innerText = ''

    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        
            <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open-reader"></i>Lesson - ${lesson.level_no}</button>
        
        `

        lessonsContainer.appendChild(btnDiv)
    });
}

loadLesson();