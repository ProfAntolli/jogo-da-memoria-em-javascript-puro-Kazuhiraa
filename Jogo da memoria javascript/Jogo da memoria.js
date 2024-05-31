const images = [
    'https://w7.pngwing.com/pngs/696/30/png-transparent-overwatch-character-characters-of-overwatch-mei-tracer-overwatch-miscellaneous-game-video-game-thumbnail.png', 'https://w7.pngwing.com/pngs/540/912/png-transparent-blue-green-and-black-overwatch-character-characters-of-overwatch-mei-video-game-hero-overwatch-miscellaneous-fictional-character-mythical-creature-thumbnail.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUxyHtZf7_RfmLxlkZAtoLMGUJ0tBvVgR5Jg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMUBEIsJ-VBQ7-OOiwDLLzGeu0M1uj9wzllA&s',
    'https://w7.pngwing.com/pngs/918/650/png-transparent-characters-of-overwatch-youtube-tracer-video-game-overwatch-game-video-game-widowmaker-thumbnail.png', 'https://w7.pngwing.com/pngs/363/566/png-transparent-characters-of-overwatch-mei-doomfist-sombra-l-miscellaneous-video-game-fictional-character-thumbnail.png', 'https://w7.pngwing.com/pngs/390/319/png-transparent-characters-of-overwatch-world-of-warcraft-blizzard-entertainment-video-game-overwatch-weapon-warlord-action-figure-thumbnail.png', 'https://w7.pngwing.com/pngs/300/915/png-transparent-overwatch-29045-games-junkrat-pop-vinyl-figure-heroes-of-the-storm-characters-of-overwatch-tracer-toy-photography-video-game-fictional-character-thumbnail.png',
    'https://w7.pngwing.com/pngs/696/30/png-transparent-overwatch-character-characters-of-overwatch-mei-tracer-overwatch-miscellaneous-game-video-game-thumbnail.png', 'https://w7.pngwing.com/pngs/540/912/png-transparent-blue-green-and-black-overwatch-character-characters-of-overwatch-mei-video-game-hero-overwatch-miscellaneous-fictional-character-mythical-creature-thumbnail.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUxyHtZf7_RfmLxlkZAtoLMGUJ0tBvVgR5Jg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMUBEIsJ-VBQ7-OOiwDLLzGeu0M1uj9wzllA&s',
    'https://w7.pngwing.com/pngs/918/650/png-transparent-characters-of-overwatch-youtube-tracer-video-game-overwatch-game-video-game-widowmaker-thumbnail.png', 'https://w7.pngwing.com/pngs/363/566/png-transparent-characters-of-overwatch-mei-doomfist-sombra-l-miscellaneous-video-game-fictional-character-thumbnail.png', 'https://w7.pngwing.com/pngs/390/319/png-transparent-characters-of-overwatch-world-of-warcraft-blizzard-entertainment-video-game-overwatch-weapon-warlord-action-figure-thumbnail.png', 'https://w7.pngwing.com/pngs/300/915/png-transparent-overwatch-29045-games-junkrat-pop-vinyl-figure-heroes-of-the-storm-characters-of-overwatch-tracer-toy-photography-video-game-fictional-character-thumbnail.png'
];
// Ordem das imagens: 1-Tracer, 2-Lucio, 3-Mei, 4-Reinhardt, 5-Reaper, 6-Doomfist, 7-

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    shuffle(images);
    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.innerHTML = `<img src="${image}" alt="memory card">`;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.getElementById('reset-button').addEventListener('click', createBoard);

createBoard();
